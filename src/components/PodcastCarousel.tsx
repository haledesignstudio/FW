"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import UnderlineOnHoverAnimation from "@/components/underlineOnHoverAnimation";
import { createRoot, type Root } from "react-dom/client";
import Image from "next/image";

export type CarouselItem = {
  src: string;
  heading?: string;
  description?: string;
  href?: string; // optional Read More link
  readMoreText?: string; // OPTIONAL: per-item override label
};

export type CarouselProps = {
  items: CarouselItem[];

  /** Desktop sizes */
  imageHeight?: string;        // e.g. "25vh"
  captionHeight?: string;      // e.g. "25vh"
  innerRowGap?: string;        // e.g. "4vh" (between image & caption)
  gap?: string;                // e.g. "4vh" (between columns)

  /** Mobile overrides */
  mobileImageHeight?: string;
  mobileCaptionHeight?: string;
  mobileInnerRowGap?: string;
  mobileGap?: string;

  /** If set, overrides computed (image + innerRowGap + caption). */
  height?: string;

  className?: string;
  rounded?: string;
  ariaLabel?: string;

  /** customize the Read More label (fallback when item.readMoreText is not provided) */
  readMoreText?: string;
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

// ===== helpers for dynamic line-clamp =====
const ALL_CLAMPS = [
  "line-clamp-1",
  "line-clamp-2",
  "line-clamp-3",
  "line-clamp-4",
  "line-clamp-5",
  "line-clamp-6",
];
function applyClamp(el: HTMLElement, lines: number) {
  ALL_CLAMPS.forEach((c) => el.classList.remove(c));
  el.classList.add(`line-clamp-${lines}`);
}
// ==========================================

type WithRoots = { __roots?: Root[] };

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
  ariaLabel = "Six column image carousel",

  // default fallback
  readMoreText = "Read More",
}: CarouselProps) {
  const isMobile = useIsMobile(768);

  // Effective sizes for current breakpoint
  const IMG_H = isMobile ? (mobileImageHeight ?? imageHeight) : imageHeight;
  const CAP_H = isMobile ? (mobileCaptionHeight ?? captionHeight) : captionHeight;
  const INNER_GAP = isMobile ? (mobileInnerRowGap ?? innerRowGap) : innerRowGap;
  const COL_GAP = isMobile ? (mobileGap ?? gap) : gap;

  const TRACK_UNITS = useMemo(() => (isMobile ? 1 : 5), [isMobile]);
  const NORMALS = useMemo(() => (isMobile ? 0 : TRACK_UNITS - 2), [isMobile, TRACK_UNITS]);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [nextIndex, setNextIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const colHeight = useMemo(
    () => height ?? `calc(${IMG_H} + ${INNER_GAP} + ${CAP_H})`,
    [height, IMG_H, INNER_GAP, CAP_H]
  );

  const UNIT_WIDTH = useMemo(
    () => `calc((100% - ((${COL_GAP}) * (${TRACK_UNITS} - 1))) / ${TRACK_UNITS})`,
    [COL_GAP, TRACK_UNITS]
  );

  const SHIFT_X = useMemo(
    () => `calc(-1 * (${UNIT_WIDTH} + ${COL_GAP}))`,
    [UNIT_WIDTH, COL_GAP]
  );

  const setColSpan = useCallback(
    (el: HTMLElement, span: 1 | 2) => {
      const s = isMobile ? 1 : span;
      el.dataset.span = String(s);
      el.style.transition = "flex-basis 450ms cubic-bezier(.22,.61,.36,1)";
      el.style.flex = `0 0 calc((${UNIT_WIDTH}) * ${s} + (${COL_GAP}) * (${s} - 1))`;

      el.style.height = colHeight;

      const img = el.querySelector("img") as HTMLImageElement | null;
      const heading = el.querySelector(".carousel-heading") as HTMLElement | null;
      const desc = el.querySelector(".carousel-desc") as HTMLElement | null;

      if (img) {
        img.style.transition = "filter 450ms cubic-bezier(.22,.61,.36,1)";
        img.style.filter = s === 2 || isMobile ? "none" : "grayscale(100%)";
      }
      if (heading) {
        heading.className = isMobile
          ? "carousel-heading dt-h5" // mobile: the single visible card is the "featured" one
          : (s === 2
            ? "carousel-heading dt-h5"      // desktop featured
            : "carousel-heading dt-body-sm"  // desktop non-featured
          );
      }
      if (desc) {
        const featuredLinesDesktop = 5;
        const normalLinesDesktop = 3;
        const featuredLinesMobile = 3;
        const normalLinesMobile = 2;

        const lines = isMobile
          ? s === 2
            ? featuredLinesMobile
            : normalLinesMobile
          : s === 2
            ? featuredLinesDesktop
            : normalLinesDesktop;

        applyClamp(desc, lines);
      }
    },
    [UNIT_WIDTH, colHeight, isMobile]
  );

  // Build a column
  const makeCol = useCallback(
    (item: CarouselItem) => {
      const col = document.createElement("div");
      (col as unknown as WithRoots).__roots = [];
      col.className = "col relative bg-[#F9F7F2] text-black overflow-hidden";
      col.style.display = "grid";
      col.style.gridTemplateRows = `${IMG_H} ${CAP_H}`;
      col.style.rowGap = INNER_GAP;
      col.style.height = colHeight;

      // IMAGE
      // IMAGE (clickable if href)
      let imgWrap: HTMLElement;

      if (item.href) {
        const link = document.createElement("a");
        link.href = item.href;
        link.target = "_self";
        link.className = "relative w-full h-full block";

        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.heading || "Carousel image";
        img.decoding = "async";
        img.loading = "lazy";
        img.className = "w-full h-full object-cover";
        img.style.transition = "filter 450ms cubic-bezier(.22,.61,.36,1)";
        img.style.filter = "grayscale(100%)";

        link.appendChild(img);
        imgWrap = link;
      } else {
        const div = document.createElement("div");
        div.className = "relative w-full h-full";
        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.heading || "Carousel image";
        img.decoding = "async";
        img.loading = "lazy";
        img.className = "w-full h-full object-cover";
        img.style.transition = "filter 450ms cubic-bezier(.22,.61,.36,1)";
        img.style.filter = "grayscale(100%)";
        div.appendChild(img);
        imgWrap = div;
      }


      // TEXT
      const textWrap = document.createElement("div");
      textWrap.className = "h-full text-left text-sm flex flex-col justify-start";
      if (item.heading) {
        const h = document.createElement("div");
        h.className = "carousel-heading font-semibold text-base";
        h.style.transition =
          "font-size 450ms cubic-bezier(.22,.61,.36,1), font-weight 450ms cubic-bezier(.22,.61,.36,1)";
        h.textContent = item.heading;
        textWrap.appendChild(h);
      }
      if (item.description) {
        const d = document.createElement("div");
        d.className = "dt-body-sm mt-[2vh] line-clamp-7";
        d.textContent = item.description;
        textWrap.appendChild(d);
      }

      // Desktop-only: Read More
      if (!isMobile) {
        const actions = document.createElement("div");
        actions.className = "mt-auto";

        const readMore = document.createElement(item.href ? "a" : "button");
        if (item.href) {
          readMore.setAttribute("href", item.href || "#");
          (readMore as HTMLAnchorElement).target = "_self";
        } else {
          (readMore as HTMLButtonElement).type = "button";
        }
        readMore.className = "inline-flex items-center dt-btn";

        // pick per-item label first, then fallback prop
        const label = item.readMoreText ?? readMoreText;

        readMore.setAttribute(
          "aria-label",
          item.heading ? `${label}: ${item.heading}` : label
        );

        const mountSpan = document.createElement("span");
        readMore.appendChild(mountSpan);
        actions.appendChild(readMore);
        textWrap.appendChild(actions);

        const root = createRoot(mountSpan);
        (col as unknown as WithRoots).__roots!.push(root);
        root.render(
          <UnderlineOnHoverAnimation hasStaticUnderline={true}>
            {label}
          </UnderlineOnHoverAnimation>
        );
      }

      col.appendChild(imgWrap);
      col.appendChild(textWrap);
      return col as HTMLElement;
    },
    [IMG_H, CAP_H, INNER_GAP, colHeight, isMobile, readMoreText]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.innerHTML = "";
    if (!items || items.length === 0) return;

    const first = makeCol(items[0]);
    track.appendChild(first);
    setColSpan(first, isMobile ? 1 : 2);

    for (let i = 1; i <= NORMALS; i++) {
      const item = items[i % items.length];
      const col = makeCol(item);
      setColSpan(col, 1);
      track.appendChild(col);
    }

    setCurrentIndex(0);
    setNextIndex((isMobile ? 1 : 1 + NORMALS) % items.length);
  }, [items, colHeight, COL_GAP, isMobile, NORMALS, makeCol, setColSpan]);

  const getNextItem = useCallback(() => {
    const idx = nextIndex % items.length;
    const item = items[idx];
    setNextIndex((v) => (v + 1) % items.length);
    return item;
  }, [nextIndex, items]);

  const shiftLeft = useCallback(() => {
    if (isAnimating) return;
    const track = trackRef.current;
    if (!track || !items?.length) return;

    setIsAnimating(true);

    const incoming = makeCol(getNextItem());
    setColSpan(incoming, 1);
    track.appendChild(incoming);

    if (!isMobile) {
      const first = track.children[0] as HTMLElement | undefined;
      const second = track.children[1] as HTMLElement | undefined;
      if (first && second) {
        setColSpan(first, 1);
        setColSpan(second, 2);
      }
    }

    void track.offsetWidth;
    track.style.transition = "transform 450ms cubic-bezier(.22,.61,.36,1)";
    track.style.transform = `translateX(${SHIFT_X})`;

    const onDone = () => {
      track.removeEventListener("transitionend", onDone);

      const firstNow = track.firstElementChild as HTMLElement & WithRoots | null;
      if (firstNow) {
        firstNow.__roots?.forEach((r) => r.unmount());
        firstNow.remove();
      }

      track.style.transition = "none";
      track.style.transform = "translateX(0)";
      void track.offsetWidth;
      track.style.transition = "";

      if (!isMobile) {
        const newFirst = track.children[0] as HTMLElement | undefined;
        if (newFirst && newFirst.dataset.span !== "2") setColSpan(newFirst, 2);
        for (let i = 1; i < track.children.length; i++) {
          const el = track.children[i] as HTMLElement;
          if (el.dataset.span !== "1") setColSpan(el, 1);
        }
      } else {
        for (let i = 0; i < track.children.length; i++) {
          const el = track.children[i] as HTMLElement;
          if (el.dataset.span !== "1") setColSpan(el, 1);
        }
      }

      setCurrentIndex((v) => (v + 1) % items.length);
      setIsAnimating(false);
    };
    track.addEventListener("transitionend", onDone as EventListener, { once: true });
  }, [SHIFT_X, getNextItem, isAnimating, isMobile, items?.length, makeCol, setColSpan]);

  const currentItem = items[currentIndex];

  return (
    <div className={clsx("w-full", className)}>
      <div className={clsx("relative", rounded)} aria-label={ariaLabel}>
        {/* Row: track + (desktop-only) control column */}
        <div className="flex" style={{ gap: COL_GAP }}>
          {/* Track wrapper */}
          <div
            className="relative overflow-hidden"
            style={{
              flex: isMobile ? "0 0 100%" : "0 0 calc(100% * 5 / 6)",
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

          {/* Desktop-only control column */}
          {!isMobile && (
            <div
              className="bg-[#F9F7F2] text-black"
              style={{
                flex: "0 0 calc(100% / 6)",
                height: colHeight,
                display: "grid",
                gridTemplateRows: `${IMG_H} ${CAP_H}`,
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
                  <Image
                    src="/carousel-arrow.png"
                    alt=""
                    className="w-[3vh] h-auto object-contain cursor-pointer"
                    width={32}
                    height={32}
                    priority
                  />
                </button>
              </div>
              <div />
            </div>
          )}
        </div>

        {/* Mobile fixed action bar */}
        {isMobile && (
          <div className="mt-2 flex items-center justify-between gap-3">
            {currentItem?.href ? (
              <a
                href={currentItem.href}
                className="inline-flex items-center dt-btn"
                aria-label={
                  currentItem?.heading
                    ? `${(currentItem.readMoreText ?? readMoreText)}: ${currentItem.heading}`
                    : (currentItem.readMoreText ?? readMoreText)
                }
              >
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  {currentItem.readMoreText ?? readMoreText}
                </UnderlineOnHoverAnimation>
              </a>
            ) : (
              <button
                type="button"
                className="inline-flex items-center dt-btn"
                aria-label={currentItem?.heading
                  ? `${(currentItem?.readMoreText ?? readMoreText)}: ${currentItem.heading}`
                  : (currentItem?.readMoreText ?? readMoreText)}
              >
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  {currentItem?.readMoreText ?? readMoreText}
                </UnderlineOnHoverAnimation>
              </button>
            )}

            <button
              type="button"
              onClick={shiftLeft}
              aria-label="Next"
              disabled={isAnimating}
              className="p-2 rounded-md bg-[#F9F7F2] disabled:opacity-50"
            >
              <Image
                src="/carousel-arrow.png"
                alt=""
                className="w-[3vh] h-auto object-contain"
                width={32}
                height={32}
                priority
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
