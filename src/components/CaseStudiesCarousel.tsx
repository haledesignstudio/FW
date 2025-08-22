"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import UnderlineOnHoverAnimation from "@/components/underlineOnHoverAnimation";
import { createRoot, type Root } from "react-dom/client";

export type CarouselItem = {
    src: string;
    heading?: string;
    description?: string;
    href?: string; // optional Read More link
};

export type CarouselProps = {
    items: CarouselItem[];

    /** Desktop sizes */
    imageHeight?: string;        // e.g. "25vh"
    captionHeight?: string;      // e.g. "25vh"
    innerRowGap?: string;        // e.g. "4vh" (between caption and image)
    gap?: string;                // e.g. "4vh" (between columns)

    /** Mobile overrides */
    mobileImageHeight?: string;
    mobileCaptionHeight?: string;
    mobileInnerRowGap?: string;
    mobileGap?: string;

    /** If set, overrides computed (caption + innerRowGap + image + readyBar). */
    height?: string;

    className?: string;
    rounded?: string;
    ariaLabel?: string;
};

function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
        const onChange = (ev: MediaQueryListEvent) => setIsMobile(ev.matches);

        setIsMobile(mql.matches);

        if (typeof mql.addEventListener === "function") {
            mql.addEventListener("change", onChange);
            return () => mql.removeEventListener("change", onChange);
        }
        if (typeof mql.addListener === "function") {
            mql.addListener(onChange);
            return () => mql.removeListener(onChange);
        }
        return;
    }, [breakpoint]);
    return isMobile;
}

// Helper type to stash mounted React roots on DOM nodes (for cleanup)
type WithRoots = { __roots?: Root[] };

// ------- small helpers to access parts inside a column -------
function $imgWrap(el: HTMLElement) {
    return el.querySelector(".carousel-imgwrap") as HTMLElement | null;
}
function $img(el: HTMLElement) {
    return el.querySelector("img") as HTMLImageElement | null;
}
function $textWrap(el: HTMLElement) {
    return el.querySelector(".carousel-textwrap") as HTMLElement | null;
}
function $heading(el: HTMLElement) {
    return el.querySelector(".carousel-heading") as HTMLElement | null;
}
function $desc(el: HTMLElement) {
    return el.querySelector(".carousel-desc") as HTMLElement | null;
}
function $actions(el: HTMLElement) {
    return el.querySelector(".carousel-actions") as HTMLElement | null;
}
function $readyBar(el: HTMLElement) {
    return el.querySelector(".carousel-readybar") as HTMLElement | null;
}

// --- animation constants & helpers ---
const EASE = "450ms cubic-bezier(.22,.61,.36,1)";

function setTextVisible(textWrap: HTMLElement, visible: boolean, capH: string) {
    textWrap.style.transition = textWrap.style.transition || `opacity ${EASE}, max-height ${EASE}`;
    textWrap.style.overflow = "hidden";
    textWrap.style.pointerEvents = visible ? "auto" : "none";
    textWrap.style.opacity = visible ? "1" : "0";
    textWrap.style.maxHeight = visible ? capH : "0px";
}

export default function Carousel({
    items,
    imageHeight = "25vh",
    captionHeight = "25vh",
    innerRowGap = "4vh",
    gap = "4vh",

    mobileImageHeight,
    mobileCaptionHeight,
    mobileInnerRowGap,
    mobileGap,

    height,
    className,
    rounded = "rounded-2xl",
    ariaLabel = "Five column image carousel",
}: CarouselProps) {
    const isMobile = useIsMobile(768);

    // Effective sizes for current breakpoint
    const IMG_H = isMobile ? (mobileImageHeight ?? imageHeight) : imageHeight;
    const CAP_H = isMobile ? (mobileCaptionHeight ?? captionHeight) : captionHeight;
    const INNER_GAP = isMobile ? (mobileInnerRowGap ?? innerRowGap) : innerRowGap;
    const COL_GAP = isMobile ? (mobileGap ?? gap) : gap;

    // Ready bar height (small, fixed)
    const READY_H = "5vh";

    // Desktop = 5 columns of items, Mobile = 1
    const TRACK_UNITS = useMemo(() => (isMobile ? 1 : 5), [isMobile]);

    // Featured at column 4 (index 3) on desktop
    const FEATURED_INDEX = useMemo(() => (isMobile ? 0 : 3), [isMobile]);

    // Track (desktop & mobile)
    const trackRef = useRef<HTMLDivElement | null>(null);

    const [nextIndex, setNextIndex] = useState(0);
    const [windowStartIndex, setWindowStartIndex] = useState(0);
    const [, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Column total height (desktop)
    const colHeight = useMemo(
        () => height ?? `calc(${CAP_H} + ${INNER_GAP} + (2 * ${IMG_H}) + ${READY_H})`,
        [height, IMG_H, INNER_GAP, CAP_H]
    );

    // Unit width (used for flex-basis)
    const UNIT_WIDTH = useMemo(
        () => `calc((100% - ((${COL_GAP}) * (${TRACK_UNITS} - 1))) / ${TRACK_UNITS})`,
        [COL_GAP, TRACK_UNITS]
    );

    // Slide distance
    const SHIFT_X = useMemo(
        () => (isMobile ? `calc(-1 * 100%)` : `calc(-1 * (${UNIT_WIDTH} + ${COL_GAP}))`),
        [isMobile, UNIT_WIDTH, COL_GAP]
    );

    // Update the text content in a column (desktop neighbor-of-featured)
    const setTextContent = useCallback((el: HTMLElement, item: CarouselItem | null) => {
        const heading = $heading(el);
        const desc = $desc(el);
        const actions = $actions(el);

        if (!item) {
            if (heading) heading.textContent = "";
            if (desc) desc.textContent = "";
            if (actions) actions.style.display = "none";
            return;
        }

        if (heading) heading.textContent = item.heading || "";
        if (desc) desc.textContent = item.description || "";
        if (actions) {
            actions.style.display = "block";
            const link = actions.querySelector("a,button") as HTMLAnchorElement | HTMLButtonElement | null;
            if (link) {
                if (item.href) {
                    if (link.tagName.toLowerCase() === "a") {
                        (link as HTMLAnchorElement).href = item.href;
                        (link as HTMLAnchorElement).target = "_self";
                    } else {
                        const a = document.createElement("a");
                        a.href = item.href;
                        a.target = "_self";
                        a.className = link.className;
                        while (link.firstChild) a.appendChild(link.firstChild);
                        link.replaceWith(a);
                    }
                } else {
                    if (link.tagName.toLowerCase() === "a") {
                        const btn = document.createElement("button");
                        btn.type = "button";
                        btn.className = link.className;
                        while (link.firstChild) btn.appendChild(link.firstChild);
                        link.replaceWith(btn);
                    }
                }
            }
        }
    }, []);

    // ---------- DESKTOP styles ----------
    const applyDesktopStyles = useCallback(
        (track: HTMLElement, featuredItem: CarouselItem) => {
            const normalImageHeight = `calc(2 * ${IMG_H})`;
            const featuredImageHeight = `calc((2 * ${IMG_H}) + ${CAP_H} + ${INNER_GAP})`;

            for (let i = 0; i < track.children.length; i++) {
                const el = track.children[i] as HTMLElement;

                const imgWrap = $imgWrap(el);
                const img = $img(el);
                const textWrap = $textWrap(el);
                const heading = $heading(el);
                const desc = $desc(el);
                const actions = $actions(el);
                const readyBar = $readyBar(el);
                const barFill = readyBar?.querySelector(".carousel-readybar-fill") as HTMLElement | null;

                // defaults
                el.style.flex = `0 0 ${UNIT_WIDTH}`;
                el.style.height = colHeight as string;
                el.style.display = "grid";
                el.style.gridTemplateRows = `${CAP_H} calc(2 * ${IMG_H}) ${READY_H}`;
                el.style.rowGap = "0";

                if (!imgWrap || !img || !textWrap) continue;

                // stacking
                textWrap.style.zIndex = "1";
                imgWrap.style.zIndex = "2";
                if (readyBar) {
                    readyBar.style.zIndex = "3";
                    readyBar.style.pointerEvents = "none";
                    readyBar.style.marginTop = `-${READY_H}`;
                    readyBar.style.overflow = "hidden";
                }

                imgWrap.style.transition = imgWrap.style.transition || `height ${EASE}, filter ${EASE}`;
                img.style.transition = img.style.transition || `filter ${EASE}`;

                // reset to "normal"
                imgWrap.style.gridRow = "2";
                imgWrap.style.alignSelf = "";
                imgWrap.style.height = normalImageHeight;
                img.style.filter = "grayscale(100%)";
                if (heading) heading.className = "carousel-heading font-semibold text-base";

                textWrap.style.marginBottom = INNER_GAP;
                setTextVisible(textWrap, false, CAP_H);
                if (actions) actions.style.display = "block";

                if (desc) {
                    desc.classList.remove(
                        "line-clamp-1", "line-clamp-2", "line-clamp-3", "line-clamp-4", "line-clamp-5", "line-clamp-6"
                    );
                    desc.classList.add("line-clamp-3");
                }

                // Bar default: collapsed & transparent
                if (readyBar && barFill) {
                    barFill.style.transformOrigin = "left";
                    barFill.style.transition = barFill.style.transition || `transform ${EASE}, opacity ${EASE}`;
                    barFill.style.transform = "scaleX(0)";
                    barFill.style.opacity = "0";
                }

                // Featured column
                if (i === FEATURED_INDEX) {
                    imgWrap.style.gridRow = "1 / span 2";
                    imgWrap.style.alignSelf = "end";
                    imgWrap.style.height = featuredImageHeight;
                    img.style.filter = "none";
                    if (heading) heading.className = "carousel-heading font-bold text-2xl";
                    if (barFill) {
                        barFill.style.transform = "scaleX(1)";
                        barFill.style.opacity = "1";
                    }
                }

                // Neighbor right shows text
                if (i === FEATURED_INDEX + 1) {
                    setTextContent(el, featuredItem);
                    setTextVisible(textWrap, true, CAP_H);
                    if (desc) {
                        desc.classList.remove(
                            "line-clamp-1", "line-clamp-2", "line-clamp-3", "line-clamp-4", "line-clamp-5", "line-clamp-6"
                        );
                        desc.classList.add("line-clamp-5");
                    }
                }
            }
        },
        [CAP_H, IMG_H, INNER_GAP, FEATURED_INDEX, UNIT_WIDTH, colHeight, setTextContent]
    );

    // ---------- MOBILE slide builder (single UNIT: image+bar left, text+CTA right) ----------
    const makeMobileUnit = useCallback((item: CarouselItem, itemIndex: number) => {
        const slide = document.createElement("div") as HTMLElement & WithRoots;
        (slide as unknown as WithRoots).__roots = [];
        slide.className = "mobile-slide grid bg-[#F9F7F2] text-black overflow-hidden";
        slide.dataset.itemIndex = String(itemIndex);
        slide.style.flex = "0 0 100%"; // one full-viewport slide
        slide.style.height = `calc((2 * ${IMG_H}) + ${READY_H})`;
        slide.style.gridTemplateColumns = "1fr 1fr";
        slide.style.columnGap = "0";
        slide.style.transition = `opacity ${EASE}, transform ${EASE}`;
        slide.style.willChange = "opacity, transform";

        // LEFT: image + ready bar (2 rows)
        const left = document.createElement("div");
        left.style.display = "grid";
        left.style.gridTemplateRows = `calc(2 * ${IMG_H}) ${READY_H}`;
        left.style.rowGap = "0";
        left.style.height = "100%";
        left.style.overflow = "hidden";

        const imgWrap = document.createElement("div");
        imgWrap.className = "carousel-imgwrap relative w-full h-full";
        imgWrap.style.height = `calc(2 * ${IMG_H})`;
        imgWrap.style.transition = `filter ${EASE}`;
        imgWrap.style.zIndex = "2";
        imgWrap.style.lineHeight = "0";

        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.heading || "Carousel image";
        img.decoding = "async";
        img.loading = "lazy";
        img.className = "block w-full h-full object-cover";
        img.style.transition = `filter ${EASE}`;
        img.style.filter = "grayscale(100%)";
        imgWrap.appendChild(img);

        const readyBar = document.createElement("div");
        readyBar.className = "carousel-readybar w-full";
        readyBar.style.height = READY_H;
        readyBar.style.zIndex = "3";
        readyBar.style.pointerEvents = "none";
        readyBar.style.marginTop = '0';
        readyBar.style.overflow = "hidden";

        const barFill = document.createElement("div");
        barFill.className = "carousel-readybar-fill";
        barFill.style.width = "100%";
        barFill.style.height = "100%";
        barFill.style.background = "#DC5A50";
        barFill.style.transformOrigin = "left";
        barFill.style.transform = "scaleX(0)";
        barFill.style.opacity = "0";
        barFill.style.transition = `transform ${EASE}, opacity ${EASE}`;
        readyBar.appendChild(barFill);

        left.appendChild(imgWrap);
        left.appendChild(readyBar);

        // RIGHT: text column (flex; CTA pinned bottom)
        const right = document.createElement("div") as HTMLElement & WithRoots;
        (right as unknown as WithRoots).__roots = [];
        right.className = "carousel-textwrap";
        right.style.display = "flex";
        right.style.flexDirection = "column";
        right.style.height = "100%";
        right.style.padding = "0.5rem 1rem";

        if (item.heading) {
            const h = document.createElement("div");
            h.className = "carousel-heading font-bold text-xl mb-2";
            h.textContent = item.heading;
            right.appendChild(h);
        }

        if (item.description) {
            const d = document.createElement("div");
            d.className = "carousel-desc text-sm leading-relaxed";
            d.textContent = item.description;
            right.appendChild(d);
        }

        // CTA row pinned to bottom
        const row = document.createElement("div");
        row.className = "mb-[3vh] carousel-actions flex items-center justify-between gap-[2vh]";
        row.style.marginTop = "auto"; // 👈 pins row to bottom of the column

        const cta = document.createElement(item.href ? "a" : "button");
        if (item.href) {
            cta.setAttribute("href", item.href || "#");
            (cta as HTMLAnchorElement).target = "_self";
        } else {
            (cta as HTMLButtonElement).type = "button";
        }
        cta.className = "inline-flex items-center gap-2 text-base font-semibold";
        const mountSpan = document.createElement("span");
        cta.appendChild(mountSpan);
        row.appendChild(cta);

        const root = createRoot(mountSpan);
        (right as unknown as WithRoots).__roots!.push(root);
        root.render(
            <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                Read more
            </UnderlineOnHoverAnimation>
        );

        // Arrow (next)
        const nextBtn = document.createElement("button");
        nextBtn.type = "button";
        nextBtn.className = "p-1 rounded-md bg-[#F9F7F2]";
        nextBtn.setAttribute("data-next", ""); // event delegation hook
        const arrowImg = document.createElement("img");
        arrowImg.src = "/carousel-arrow.png";
        arrowImg.alt = "";
        arrowImg.className = "w-[3vh] h-auto object-contain";
        nextBtn.appendChild(arrowImg);
        row.appendChild(nextBtn);

        right.appendChild(row);

        // Assemble slide
        slide.appendChild(left);
        slide.appendChild(right);
        return slide;
    }, [IMG_H, READY_H]);

    const applyMobileStyles = useCallback((track: HTMLElement) => {
        for (let i = 0; i < track.children.length; i++) {
            const slide = track.children[i] as HTMLElement;
            const img = slide.querySelector("img") as HTMLImageElement | null;
            const barFill = slide.querySelector(".carousel-readybar-fill") as HTMLElement | null;
            if (!img || !barFill) continue;

            if (i === 0) {
                img.style.filter = "none";
                barFill.style.transform = "scaleX(1)";
                barFill.style.opacity = "1";
            } else {
                img.style.filter = "grayscale(100%)";
                barFill.style.transform = "scaleX(0)";
                barFill.style.opacity = "0";
            }
        }
    }, []);

    // ---------- DESKTOP column builder ----------
    const makeCol = useCallback(
        (item: CarouselItem, itemIndex: number) => {
            const col = document.createElement("div") as HTMLElement & WithRoots;
            (col as unknown as WithRoots).__roots = [];
            col.className = "col relative bg-[#F9F7F2] text-black overflow-hidden";
            col.dataset.itemIndex = String(itemIndex);
            col.style.display = "grid";
            col.style.gridTemplateRows = `${CAP_H} calc(2 * ${IMG_H}) ${READY_H}`;
            col.style.rowGap = "0";
            col.style.height = colHeight as string;
            col.style.flex = `0 0 ${UNIT_WIDTH}`;
            col.style.transition = `opacity ${EASE}, transform ${EASE}`;
            col.style.willChange = "opacity, transform";

            // TEXT
            const textWrap = document.createElement("div");
            textWrap.className = "carousel-textwrap h-full text-left text-sm flex flex-col justify-start p-4";
            textWrap.style.transition = `opacity ${EASE}, max-height ${EASE}`;
            textWrap.style.overflow = "hidden";
            textWrap.style.opacity = "0";
            textWrap.style.maxHeight = "0px";
            textWrap.style.zIndex = "1";
            textWrap.style.marginBottom = INNER_GAP;

            const h = document.createElement("div");
            h.className = "carousel-heading font-semibold text-base";
            h.style.transition =
                "font-size 450ms cubic-bezier(.22,.61,.36,1), font-weight 450ms cubic-bezier(.22,.61,.36,1)";
            h.textContent = item.heading || "";
            textWrap.appendChild(h);

            const d = document.createElement("div");
            d.className = "carousel-desc mt-1 line-clamp-3";
            d.textContent = item.description || "";
            textWrap.appendChild(d);

            const actions = document.createElement("div");
            actions.className = "carousel-actions mt-auto";
            const readMore = document.createElement(item.href ? "a" : "button");
            if (item.href) {
                readMore.setAttribute("href", item.href || "#");
                (readMore as HTMLAnchorElement).target = "_self";
            } else {
                (readMore as HTMLButtonElement).type = "button";
            }
            readMore.className = "inline-flex items-center gap-2 text-sm font-semibold";
            const mountSpan = document.createElement("span");
            readMore.appendChild(mountSpan);
            actions.appendChild(readMore);
            textWrap.appendChild(actions);

            const root = createRoot(mountSpan);
            (col as unknown as WithRoots).__roots!.push(root);
            root.render(
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                    Read More
                </UnderlineOnHoverAnimation>
            );

            // IMAGE
            const imgWrap = document.createElement("div");
            imgWrap.className = "carousel-imgwrap relative w-full h-full";
            imgWrap.style.height = `calc(2 * ${IMG_H})`;
            imgWrap.style.transition = `height ${EASE}, filter ${EASE}`;
            imgWrap.style.zIndex = "2";
            imgWrap.style.lineHeight = "0";

            const img = document.createElement("img");
            img.src = item.src;
            img.alt = item.heading || "Carousel image";
            img.decoding = "async";
            img.loading = "lazy";
            img.className = "block w-full h-full object-cover";
            img.style.transition = `filter ${EASE}`;
            img.style.filter = "grayscale(100%)";
            imgWrap.appendChild(img);

            // READY BAR (with fill)
            const readyBar = document.createElement("div");
            readyBar.className = "carousel-readybar w-full";
            readyBar.style.height = READY_H;
            readyBar.style.zIndex = "3";
            readyBar.style.pointerEvents = "none";
            readyBar.style.marginTop = `-${READY_H}`;
            readyBar.style.overflow = "hidden";

            const barFill = document.createElement("div");
            barFill.className = "carousel-readybar-fill";
            barFill.style.width = "100%";
            barFill.style.height = "100%";
            barFill.style.background = "#DC5A50";
            barFill.style.transformOrigin = "left";
            barFill.style.transform = "scaleX(0)";
            barFill.style.opacity = "0";
            barFill.style.transition = `transform ${EASE}, opacity ${EASE}`;
            readyBar.appendChild(barFill);

            col.appendChild(textWrap);
            col.appendChild(imgWrap);
            col.appendChild(readyBar);

            return col;
        },
        [CAP_H, IMG_H, INNER_GAP, colHeight, UNIT_WIDTH]
    );

    // Helper: apply styles for a given "start"
    const applyForStartIndex = useCallback((startIdx: number) => {
        const track = trackRef.current;
        if (!track || !items.length) return;

        if (isMobile) {
            applyMobileStyles(track);
        } else {
            const featuredItem = items[(startIdx + FEATURED_INDEX) % items.length];
            applyDesktopStyles(track, featuredItem);
        }
    }, [FEATURED_INDEX, isMobile, items, applyDesktopStyles, applyMobileStyles]);

    // Init / re-init
    useEffect(() => {
        const track = trackRef.current;
        if (!track || !items || items.length === 0) return;

        track.innerHTML = "";
        const initialStart = 0;

        if (isMobile) {
            const itemIndex = initialStart % items.length;
            const item = items[itemIndex];
            track.appendChild(makeMobileUnit(item, itemIndex));
            setWindowStartIndex(initialStart);
            setCurrentIndex(initialStart);
            setNextIndex((initialStart + 1) % items.length);
            applyMobileStyles(track);
        } else {
            for (let i = 0; i < TRACK_UNITS; i++) {
                const itemIndex = (initialStart + i) % items.length;
                const item = items[itemIndex];
                track.appendChild(makeCol(item, itemIndex));
            }
            setWindowStartIndex(initialStart);
            setCurrentIndex(initialStart);
            setNextIndex((initialStart + TRACK_UNITS) % items.length);
            const featuredItem = items[(initialStart + FEATURED_INDEX) % items.length];
            applyDesktopStyles(track, featuredItem);
        }
    }, [
        items,
        isMobile,
        TRACK_UNITS,
        makeCol,
        makeMobileUnit,
        applyDesktopStyles,
        applyMobileStyles,
        FEATURED_INDEX, // ✅ add missing dep
    ]);

    // ---------- Anim prep (desktop) ----------
    const prepSwapAnimation = useCallback((
        track: HTMLElement,
        opts: {
            CAP_H: string;
            IMG_H: string;
            INNER_GAP: string;
            FEATURED_INDEX: number;
            nextFeaturedItem: CarouselItem;
        }
    ) => {
        const { CAP_H, IMG_H, INNER_GAP, FEATURED_INDEX, nextFeaturedItem } = opts;

        const normalH = `calc(2 * ${IMG_H})`;
        const featuredH = `calc((2 * ${IMG_H}) + ${CAP_H} + ${INNER_GAP})`;

        const currFeatured = track.children[FEATURED_INDEX] as HTMLElement | undefined;
        const aboutToBeFeatured = track.children[FEATURED_INDEX + 1] as HTMLElement | undefined;
        const nextNeighbor = track.children[FEATURED_INDEX + 2] as HTMLElement | undefined;

        if (!currFeatured || !aboutToBeFeatured) return;

        const currImgWrap = $imgWrap(currFeatured);
        const currImg = $img(currFeatured);
        const currText = $textWrap(currFeatured);
        const currReadyBar = $readyBar(currFeatured);
        const currFill = currReadyBar?.querySelector(".carousel-readybar-fill") as HTMLElement | null;

        const nextImgWrap = $imgWrap(aboutToBeFeatured);
        const nextImg = $img(aboutToBeFeatured);
        const nextText = $textWrap(aboutToBeFeatured);
        const nextReadyBar = $readyBar(aboutToBeFeatured);
        const nextFill = nextReadyBar?.querySelector(".carousel-readybar-fill") as HTMLElement | null;

        const nextNeighborText = nextNeighbor ? $textWrap(nextNeighbor) : null;
        if (!currImgWrap || !nextImgWrap || !currImg || !nextImg || !nextText) return;

        currImgWrap.style.transition = currImgWrap.style.transition || `height ${EASE}, filter ${EASE}`;
        nextImgWrap.style.transition = nextImgWrap.style.transition || `height ${EASE}, filter ${EASE}`;
        currImg.style.transition = currImg.style.transition || `filter ${EASE}`;
        nextImg.style.transition = nextImg.style.transition || `filter ${EASE}`;
        if (currFill) currFill.style.transition = currFill.style.transition || `transform ${EASE}, opacity ${EASE}`;
        if (nextFill) nextFill.style.transition = nextFill.style.transition || `transform ${EASE}, opacity ${EASE}`;

        // start states
        currImgWrap.style.gridRow = "1 / span 2";
        currImgWrap.style.alignSelf = "end";
        currImgWrap.style.height = featuredH;
        currImg.style.filter = "none";
        if (currText) setTextVisible(currText, false, CAP_H);
        if (currFill) { currFill.style.transform = "scaleX(1)"; currFill.style.opacity = "1"; }

        nextImgWrap.style.gridRow = "1 / span 2";
        nextImgWrap.style.alignSelf = "end";
        nextImgWrap.style.height = normalH;
        nextImg.style.filter = "grayscale(100%)";
        if (nextFill) { nextFill.style.transform = "scaleX(0)"; nextFill.style.opacity = "1"; }

        setTextVisible(nextText, true, CAP_H);

        if (nextNeighbor && nextNeighborText) {
            setTextContent(nextNeighbor, nextFeaturedItem);
            setTextVisible(nextNeighborText, true, CAP_H);
            nextNeighborText.style.opacity = "0";
            void nextNeighborText.offsetHeight; // ✅ avoid no-unused-expressions
            nextNeighborText.style.opacity = "1";
        }

        nextText.style.transition = "none";
        setTextVisible(nextText, false, CAP_H);
        void nextText.offsetHeight; // ✅ avoid no-unused-expressions
        nextText.style.transition = `opacity ${EASE}, max-height ${EASE}`;

        // targets
        currImgWrap.style.height = normalH;
        currImg.style.filter = "grayscale(100%)";
        if (currFill) currFill.style.opacity = "0";        // fade out

        nextImgWrap.style.height = featuredH;
        nextImg.style.filter = "none";
        if (nextFill) nextFill.style.transform = "scaleX(1)"; // wipe in

        setTextVisible(nextText, false, CAP_H);
    }, [setTextContent]);

    // ---------- Anim prep (mobile) ----------
    function prepSwapAnimationMobile(track: HTMLElement) {
        const curr = track.children[0] as HTMLElement | undefined;
        const next = track.children[1] as HTMLElement | undefined;
        if (!curr || !next) return;

        const currImg = curr.querySelector("img") as HTMLImageElement | null;
        const nextImg = next.querySelector("img") as HTMLImageElement | null;
        const currFill = curr.querySelector(".carousel-readybar-fill") as HTMLElement | null;
        const nextFill = next.querySelector(".carousel-readybar-fill") as HTMLElement | null;

        // ---- pre-states (what's currently visible) ----
        if (currImg) currImg.style.filter = "none";
        if (nextImg) nextImg.style.filter = "grayscale(100%)";

        if (currFill) { currFill.style.transform = "scaleX(1)"; currFill.style.opacity = "1"; }
        if (nextFill) { nextFill.style.transform = "scaleX(0)"; nextFill.style.opacity = "1"; }

        // 🔧 Force a layout flush so the next writes animate
        void track.offsetWidth;

        // ---- target states (animate toward these) ----
        if (currImg) currImg.style.filter = "grayscale(100%)";
        if (currFill) currFill.style.opacity = "0";        // fade out old bar
        if (nextImg) nextImg.style.filter = "none";
        if (nextFill) nextFill.style.transform = "scaleX(1)"; // wipe in new bar
    }

    // next item
    const getNextItem = useCallback(() => {
        const idx = nextIndex % items.length;
        const item = items[idx];
        setNextIndex((v) => (v + 1) % items.length);
        return { item, index: idx };
    }, [nextIndex, items]);

    // Shift left
    const shiftLeft = useCallback(() => {
        if (isAnimating) return;
        const track = trackRef.current;
        if (!track || !items?.length) return;

        setIsAnimating(true);

        const nextFeaturedItem = items[(windowStartIndex + FEATURED_INDEX + 1) % items.length];

        // Append incoming slide (mobile: unit, desktop: column)
        const { item: incomingItem, index: incomingIndex } = getNextItem();
        const incoming = isMobile ? makeMobileUnit(incomingItem, incomingIndex) : makeCol(incomingItem, incomingIndex);
        track.appendChild(incoming);

        // Eager-load image to avoid pop-in
        const incomingImg = incoming.querySelector("img") as HTMLImageElement | null;
        if (incomingImg) {
            incomingImg.loading = "eager";
            incomingImg.setAttribute("fetchpriority", "high");
        }

        // Pre-enter pose
        (incoming as HTMLElement).style.opacity = "0.6";
        (incoming as HTMLElement).style.transform = "translateX(24px)";

        // Prep animations
        if (isMobile) {
            prepSwapAnimationMobile(track);
        } else {
            prepSwapAnimation(track, {
                CAP_H,
                IMG_H,
                INNER_GAP,
                FEATURED_INDEX,
                nextFeaturedItem,
            });
        }

        // Trigger incoming fade/slide-in
        void (incoming as HTMLElement).offsetWidth;
        (incoming as HTMLElement).style.opacity = "1";
        (incoming as HTMLElement).style.transform = "translateX(0)";

        // slide track
        void track.offsetWidth;
        track.style.transition = `transform ${EASE}`;
        track.style.transform = `translateX(${SHIFT_X})`;

        const onDone = (ev: TransitionEvent) => {
            if (ev.target !== track || ev.propertyName !== "transform") return;
            track.removeEventListener("transitionend", onDone);

            // Remove first element; cleanup React roots
            const firstNow = track.firstElementChild as (HTMLElement & WithRoots) | null;
            if (firstNow) {
                (firstNow as HTMLElement & WithRoots).__roots?.forEach((r: Root) => r.unmount?.());
                firstNow.remove();
            }

            // Reset transform
            track.style.transition = "none";
            track.style.transform = "translateX(0)";
            void track.offsetWidth;
            track.style.transition = "";

            // Re-apply baseline styles for new view
            setWindowStartIndex((v) => {
                const nv = (v + 1) % items.length;
                applyForStartIndex(nv);
                return nv;
            });

            setCurrentIndex((v) => (v + 1) % items.length);
            setIsAnimating(false);
        };

        track.addEventListener("transitionend", onDone);
    }, [
        isAnimating,
        items,
        getNextItem,
        makeCol,
        makeMobileUnit,
        CAP_H,
        IMG_H,
        INNER_GAP,
        FEATURED_INDEX,
        SHIFT_X,
        windowStartIndex,
        applyForStartIndex,
        isMobile,
        prepSwapAnimation, // ✅ include missing dep
    ]);

    // Mobile: delegate clicks for [data-next] (arrow next to Read more)
    useEffect(() => {
        const track = trackRef.current;
        if (!isMobile || !track) return;

        const onClick = (e: Event) => {
            const t = e.target as HTMLElement;
            if (t && t.closest("[data-next]")) {
                e.preventDefault();
                if (!isAnimating) shiftLeft();
            }
        };
        track.addEventListener("click", onClick);
        return () => track.removeEventListener("click", onClick);
    }, [isMobile, isAnimating, shiftLeft]); // ✅ include shiftLeft

    return (
        <div className={clsx("w-full", className)}>
            <div className={clsx("relative", rounded)} aria-label={ariaLabel}>
                {/* ---------- DESKTOP LAYOUT ---------- */}
                {!isMobile && (
                    <div className="flex" style={{ gap: COL_GAP }}>
                        {/* Track wrapper */}
                        <div
                            className="relative overflow-hidden"
                            style={{
                                flex: "0 0 calc(100% * 5 / 6)",
                                height: colHeight,
                            }}
                        >
                            {/* Sliding track */}
                            <div
                                ref={trackRef}
                                role="list"
                                className="flex will-change-transform"
                                style={{ gap: COL_GAP, height: colHeight }}
                            />
                        </div>

                        {/* Control column */}
                        <div
                            className="bg-[#F9F7F2] text-black"
                            style={{
                                flex: "0 0 calc(100% / 6)",
                                height: colHeight,
                                display: "grid",
                                gridTemplateRows: `${CAP_H} calc(2 * ${IMG_H})`,
                                rowGap: INNER_GAP,
                            }}
                        >
                            <div className="relative flex items-end justify-end mr-[4vh]">
                                <button
                                    type="button"
                                    onClick={shiftLeft}
                                    className="bg-[#F9F7F2] text-black disabled:scale-103 transition-transform duration-300"
                                    disabled={isAnimating}
                                    aria-label="Next"
                                >
                                    <img
                                        src="/carousel-arrow.png"
                                        alt=""
                                        className="w-[3vh] h-auto object-contain cursor-pointer"
                                    />
                                </button>
                            </div>
                            <div />
                        </div>
                    </div>
                )}

                {/* ---------- MOBILE LAYOUT (single unit slide: image+bar left, text+CTA right) ---------- */}
                {isMobile && (
                    <div className="relative overflow-hidden" style={{ height: `calc((2 * ${IMG_H}) + ${READY_H})` }}>
                        <div
                            ref={trackRef}
                            role="list"
                            className="flex will-change-transform"
                            style={{ gap: 0, height: "100%" }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
