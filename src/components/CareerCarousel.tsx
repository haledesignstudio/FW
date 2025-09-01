"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import UnderlineOnHoverAnimation from "@/components/underlineOnHoverAnimation";
import { createRoot, type Root } from "react-dom/client";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import useIsMobile from "@/hooks/useIsMobile";

export type CarouselItem = {
  src: string;
  heading?: string;
  /**
   * Can be a plain string or Sanity Portable Text blocks
   */
  description?: string | PortableTextBlock[];
  href?: string; // optional Read More link
  readMoreText?: string; // OPTIONAL: per-item override label
};

export type CarouselProps = {
  items: CarouselItem[];

  /** Desktop sizes */
  imageHeight?: string; // e.g. "25vh"
  captionHeight?: string; // e.g. "25vh"
  innerRowGap?: string; // e.g. "4vh" (between image & caption)
  gap?: string; // e.g. "4vh" (between columns)

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

  /** Optional: override the default block-aware PT mapping used inside description */
  portableTextComponents?: PortableTextComponents;
};

// ===== helpers for dynamic line-clamp =====
const ALL_CLAMPS = [
  "line-clamp-none", // allow unlimited lines
  "line-clamp-1",
  "line-clamp-2",
  "line-clamp-3",
  "line-clamp-4",
  "line-clamp-5",
  "line-clamp-6",
];
function applyClamp(el: HTMLElement, lines: number) {
  ALL_CLAMPS.forEach((c) => el.classList.remove(c));
  if (lines <= 0) el.classList.add("line-clamp-none");
  else el.classList.add(`line-clamp-${lines}`);
}
// ==========================================

type WithRoots = { __roots?: Root[] };

export default function Carousel({
  items,
  imageHeight = "21vh",
  captionHeight = "21vh",
  innerRowGap = "3.2vh",
  gap = "1.795vw",

  mobileImageHeight,
  mobileCaptionHeight,
  mobileInnerRowGap,
  mobileGap,

  height,
  className,
  rounded = "rounded-2xl",
  ariaLabel = "Four column image carousel",

  // default fallback
  readMoreText = "Read More",
  portableTextComponents,
}: CarouselProps) {
  const isMobile = useIsMobile();

  // Effective sizes for current breakpoint
  const IMG_H = isMobile ? (mobileImageHeight ?? imageHeight) : imageHeight;
  const CAP_H = isMobile ? (mobileCaptionHeight ?? captionHeight) : captionHeight;
  const INNER_GAP = isMobile ? (mobileInnerRowGap ?? innerRowGap) : innerRowGap;
  const COL_GAP = isMobile ? (mobileGap ?? gap) : gap;

  // Desktop: 4 units visible in the track => 1 featured (span-2) + 2 normals (span-1 each)
  const TRACK_UNITS = useMemo(() => (isMobile ? 1 : 4), [isMobile]);
  const NORMALS = useMemo(() => (isMobile ? 0 : TRACK_UNITS - 2), [isMobile, TRACK_UNITS]);
  const TOTAL_COLS = useMemo(() => (isMobile ? 1 : TRACK_UNITS + 1), [isMobile, TRACK_UNITS]); // +1 for control column

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [nextIndex, setNextIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Base column height for non-featured items
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

  // Block-aware PortableText mapping (preserves paragraphs, bullets, etc.)
  const defaultPT: PortableTextComponents = useMemo(
    () => ({
      block: {
        normal: ({ children }) => (
          // mb-2 adds a small gap between paragraphs; last:mb-0 avoids
          // extra space at the end. whitespace-pre-wrap preserves \n.
          <p className="whitespace-pre-wrap dt-body-sm mb-[3%] last:mb-0">
            {children}
          </p>
        ),
        h1: ({ children }) => <h1 className="font-bold">{children}</h1>,
        h2: ({ children }) => <h2 className="font-bold">{children}</h2>,
        h3: ({ children }) => <h3 className="font-semibold">{children}</h3>,
      },
      list: {
        // my-2 adds top/bottom gap around lists; space-y-1 keeps li spacing tight
        bullet: ({ children }) => <ul className="list-disc pl-[4%] space-y-[1%] dt-body-sm">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-[4%] space-y-[1%] dt-body-sm">{children}</ol>,
      },
      listItem: {
        bullet: ({ children }) => <li>{children}</li>,
        number: ({ children }) => <li>{children}</li>,
      },
      marks: {
        strong: ({ children }) => <strong>{children}</strong>,
        em: ({ children }) => <em>{children}</em>,
        underline: ({ children }) => <u>{children}</u>,
        link: ({ children, value }) => (
          <a href={value?.href} target="_blank" rel="noopener noreferrer" className="dt-btn">
            {children}
          </a>
        ),
      },
    }),
    []
  );


  const setColSpan = useCallback(
    (el: HTMLElement, span: 1 | 2) => {
      // Span is only meaningful on desktop
      const s = isMobile ? 1 : span;
      el.dataset.span = String(s);
      el.style.transition = "flex-basis 450ms cubic-bezier(.22,.61,.36,1)"; // height can't animate to 'auto'
      el.style.flex = `0 0 calc((${UNIT_WIDTH}) * ${s})`;

      // Grid row sizing: featured gets auto-growing caption; normals stay fixed
      if (isMobile) {
        el.style.height = "auto"; // mobile: allow caption to grow and push UI below
        el.style.gridTemplateRows = `${IMG_H} auto`;
        el.style.overflow = "visible"; // let caption expand
      } else if (s === 2) {
        el.style.height = "auto"; // desktop featured grows
        el.style.gridTemplateRows = `${IMG_H} auto`;
        el.style.overflow = "visible";
      } else {
        el.style.height = colHeight;
        el.style.gridTemplateRows = `${IMG_H} ${CAP_H}`;
        el.style.overflow = "hidden";
      }

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
        // Non-featured: single line. Featured: unlimited lines.
        const featuredLinesDesktop = 0; // unlimited on desktop when featured
        const normalLinesDesktop = 5; // single line for desktop normals

        // On mobile: never clamp (both featured and normal)
        const lines = isMobile ? 0 : (s === 2 ? featuredLinesDesktop : normalLinesDesktop);
        applyClamp(desc, lines);
      }
    },
    [UNIT_WIDTH, colHeight, isMobile, IMG_H, CAP_H]
  );

  // Build a column
  const makeCol = useCallback(
    (item: CarouselItem) => {
      const col = document.createElement("div");
      (col as unknown as WithRoots).__roots = [];
      col.className = "col relative bg-[#F9F7F2] overflow-hidden";
      col.style.display = "grid";
      col.style.gridTemplateRows = `${IMG_H} ${CAP_H}`; // may be overridden by setColSpan
      col.style.rowGap = INNER_GAP;
      col.style.height = colHeight; // may be overridden by setColSpan when featured

      // IMAGE
      const imgWrap = document.createElement("a");
imgWrap.setAttribute("href", item.href || "/people/apply/");
imgWrap.setAttribute("target", "_self");
imgWrap.className = "relative w-full h-full block";
const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.heading || "Carousel image";
      img.decoding = "async";
      img.loading = "lazy";
      img.className = "w-full h-full object-cover";
      img.style.transition = "filter 450ms cubic-bezier(.22,.61,.36,1)";
      img.style.filter = "grayscale(100%)";
      imgWrap.appendChild(img);

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
        d.className = "carousel-desc mt-[2vh] mb-[3.2vh] line-clamp-1"; // default; setColSpan will adjust
        textWrap.appendChild(d);

        const root = createRoot(d);
        (col as unknown as WithRoots).__roots!.push(root);

        if (Array.isArray(item.description)) {
          root.render(
            <PortableText
              value={item.description as PortableTextBlock[]}
              components={portableTextComponents ?? defaultPT}
            />
          );
        } else {
          // preserve line breaks in plain strings
          root.render(<p className="whitespace-pre-wrap">{item.description}</p>);
        }
      }

      // Desktop-only: Read More
      if (!isMobile) {
        const actions = document.createElement("div");
        actions.className = "mt-auto"; // stick to bottom; will be pushed down by growing text

        const readMore = document.createElement("a");
readMore.setAttribute("href", item.href || "/people/apply/");
(readMore as HTMLAnchorElement).target = "_self";
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
    [IMG_H, CAP_H, INNER_GAP, colHeight, isMobile, readMoreText, portableTextComponents, defaultPT]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.innerHTML = "";
    if (!items || items.length === 0) return;

    // First (featured)
    const first = makeCol(items[0]);
    track.appendChild(first);
    setColSpan(first, isMobile ? 1 : 2);

    // Then normals to fill the track
    for (let i = 1; i <= NORMALS; i++) {
      const item = items[i % items.length];
      const col = makeCol(item);
      setColSpan(col, 1);
      track.appendChild(col);
    }

    setCurrentIndex(0);
    setNextIndex((isMobile ? 1 : 1 + NORMALS) % items.length);
  }, [items, isMobile, NORMALS, makeCol, setColSpan]);

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
        setColSpan(first, 1); // demote old featured => fixed height
        setColSpan(second, 2); // promote next => auto-growing height
      }
    }

    // Trigger layout before transition
    void track.offsetWidth;
    track.style.transition = "transform 450ms cubic-bezier(.22,.61,.36,1)";
    track.style.transform = `translateX(${SHIFT_X})`;

    const onDone = () => {
      track.removeEventListener("transitionend", onDone);

      const firstNow = track.firstElementChild as (HTMLElement & WithRoots) | null;
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
            className="relative overflow-visible" // allow tallest featured card to define height
            style={{
              flex: isMobile ? "0 0 100%" : `0 0 calc(100% * ${TRACK_UNITS} / ${TOTAL_COLS})`,
              height: "auto",
            }}
          >
            {/* Sliding track */}
            <div
              ref={trackRef}
              role="list"
              className="flex will-change-transform"
              style={{ gap: COL_GAP, height: "auto", alignItems: "stretch" as React.CSSProperties["alignItems"] }}
            />
          </div>

          {/* Desktop-only control column */}
          {!isMobile && (
            <div
              className="bg-[#F9F7F2] z-2"
              style={{
                flex: `0 0 calc(100% / ${TOTAL_COLS})`,
                height: "auto",
                display: "grid",
                gridTemplateRows: `${IMG_H} ${CAP_H}`,
                rowGap: INNER_GAP,
                alignSelf: "stretch",
              }}
            >
              <div className="relative flex items-end ml-[1vh]">
                <button
                  type="button"
                  onClick={shiftLeft}
                  className="bg-[#F9F7F2] disabled:scale-103 transition-transform duration-300 cursor-pointer"
                  disabled={isAnimating}
                  aria-label="Next"
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
              <div />
            </div>
          )}
        </div>

        {/* Mobile fixed action bar */}
        {isMobile && (
          <div className="mt-2 flex items-center justify-between gap-3">
           <a href={currentItem?.href || "/people/apply/"}
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

            <button
              type="button"
              onClick={shiftLeft}
              aria-label="Next"
              disabled={isAnimating}
              className="bg-[#F9F7F2]"
            >
              <Image
                src="/carousel-arrow.png"
                alt=""
                className="w-[2.5vh] h-auto object-contain"
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
