"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

export type CarouselItem = {
  src: string;
  heading?: string;
  description?: string;
  href?: string; // optional Read More link
};

export type SixColumnCarouselProps = {
  items: CarouselItem[];

  /** Desktop sizes */
  imageHeight?: string;        // e.g. "25vh"
  captionHeight?: string;      // e.g. "25vh"
  innerRowGap?: string;        // gap BETWEEN image & caption rows in a column (desktop), e.g. "4vh"
  gap?: string;                // horizontal GAP between columns in the track (desktop), e.g. "4vh"

  /** Mobile sizes (override desktop when isMobile) */
  mobileImageHeight?: string;      // e.g. "22vh"
  mobileCaptionHeight?: string;    // e.g. "22vh"
  mobileInnerRowGap?: string;      // e.g. "3vh"
  mobileGap?: string;              // e.g. "3vh"

  /** If you set height, it overrides computed (image + innerRowGap + caption). */
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

    // initial
    setIsMobile(mql.matches);

    // modern
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }
    // legacy Safari
    if (typeof mql.addListener === "function") {
      mql.addListener(onChange);
      return () => mql.removeListener(onChange);
    }
    return;
  }, [breakpoint]);
  return isMobile;
}

export default function SixColumnCarousel({
  items,

  // Desktop defaults
  imageHeight = "25vh",
  captionHeight = "25vh",
  innerRowGap = "4vh",
  gap = "4vh",

  // Mobile overrides (fallback to desktop if not provided)
  mobileImageHeight,
  mobileCaptionHeight,
  mobileInnerRowGap,
  mobileGap,

  height,
  className,
  rounded = "rounded-2xl",
  ariaLabel = "Six column image carousel",
}: SixColumnCarouselProps) {
  const isMobile = useIsMobile(768);

  // Effective sizes for current breakpoint
  const IMG_H = isMobile ? (mobileImageHeight ?? imageHeight) : imageHeight;
  const CAP_H = isMobile ? (mobileCaptionHeight ?? captionHeight) : captionHeight;
  const INNER_GAP = isMobile ? (mobileInnerRowGap ?? innerRowGap) : innerRowGap;
  const COL_GAP = isMobile ? (mobileGap ?? gap) : gap;

  // Track layout: desktop=5 units (1 featured + 3 normals visible), mobile=1
  const TRACK_UNITS = useMemo(() => (isMobile ? 1 : 5), [isMobile]);
  const NORMALS = useMemo(() => (isMobile ? 0 : TRACK_UNITS - 2), [isMobile, TRACK_UNITS]);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [nextIndex, setNextIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0); // for mobile action bar "Read More"
  const [isAnimating, setIsAnimating] = useState(false);

  // Column total height (2 rows + innerRowGap) unless height is explicitly provided
  const colHeight = useMemo(
    () => height ?? `calc(${IMG_H} + ${INNER_GAP} + ${CAP_H})`,
    [height, IMG_H, INNER_GAP, CAP_H]
  );

  // Unit width after subtracting total column gaps in the track
  const UNIT_WIDTH = useMemo(
    () => `calc((100% - ((${COL_GAP}) * (${TRACK_UNITS} - 1))) / ${TRACK_UNITS})`,
    [COL_GAP, TRACK_UNITS]
  );
  // Slide by one unit + one gap (prevents end jump from gap)
  const SHIFT_X = useMemo(
    () => `calc(-1 * (${UNIT_WIDTH} + ${COL_GAP}))`,
    [UNIT_WIDTH, COL_GAP]
  );

  // Set a column's span (mobile forces 1)
  const setColSpan = useCallback(
    (el: HTMLElement, span: 1 | 2) => {
      const s = isMobile ? 1 : span;
      el.dataset.span = String(s);
      el.style.transition = "flex-basis 450ms cubic-bezier(.22,.61,.36,1)";
      el.style.flex = `0 0 calc((${UNIT_WIDTH}) * ${s})`;
      el.style.height = colHeight;
    },
    [UNIT_WIDTH, colHeight, isMobile]
  );

  // Build a column (2-row grid: image then text)
  const makeCol = useCallback(
    (item: CarouselItem) => {
      const col = document.createElement("div");
      col.className = "col relative bg-[#F9F7F2] text-black overflow-hidden";
      col.style.display = "grid";
      col.style.gridTemplateRows = `${IMG_H} ${CAP_H}`; // explicit 2 rows
      col.style.rowGap = INNER_GAP;                     // gap between rows
      col.style.height = colHeight;

      // IMAGE row (make it relative if you want to overlay desktop arrow here)
      const imgWrap = document.createElement("div");
      imgWrap.className = "relative w-full h-full";
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.heading || "Carousel image";
      img.decoding = "async";
      img.loading = "lazy";
      img.className = "w-full h-full object-cover";
      imgWrap.appendChild(img);

      // TEXT row
      const textWrap = document.createElement("div");
      textWrap.className = "h-full text-left text-sm flex flex-col justify-start p-4";
      if (item.heading) {
        const h = document.createElement("div");
        h.className = "font-semibold text-base";
        h.textContent = item.heading;
        textWrap.appendChild(h);
      }
      if (item.description) {
        const d = document.createElement("div");
        d.className = "mt-1";
        d.textContent = item.description;
        textWrap.appendChild(d);
      }

      col.appendChild(imgWrap);
      col.appendChild(textWrap);
      return col as HTMLElement;
    },
    [IMG_H, CAP_H, INNER_GAP, colHeight]
  );

  // Initialize / re-init when responsive or inputs change
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.innerHTML = "";
    if (!items || items.length === 0) return;

    // First item
    const first = makeCol(items[0]);
    track.appendChild(first);
    setColSpan(first, isMobile ? 1 : 2); // featured on desktop, normal on mobile

    // Desktop: add 3 normals
    for (let i = 1; i <= NORMALS; i++) {
      const item = items[i % items.length];
      const col = makeCol(item);
      setColSpan(col, 1);
      track.appendChild(col);
    }

    // Indices
    setCurrentIndex(0);
    setNextIndex((isMobile ? 1 : 1 + NORMALS) % items.length);
  }, [items, colHeight, COL_GAP, isMobile, NORMALS, makeCol, setColSpan]);

  // next item getter
  const getNextItem = useCallback(() => {
    const idx = nextIndex % items.length;
    const item = items[idx];
    setNextIndex((v) => (v + 1) % items.length);
    return item;
  }, [nextIndex, items]);

  // Shift left
  const shiftLeft = useCallback(() => {
    if (isAnimating) return;
    const track = trackRef.current;
    if (!track || !items?.length) return;

    setIsAnimating(true);

    // Append next incoming (span=1)
    const incoming = makeCol(getNextItem());
    setColSpan(incoming, 1);
    track.appendChild(incoming);

    // Desktop: promote/demote widths (featured <-> normal)
    if (!isMobile) {
      const first = track.children[0] as HTMLElement | undefined;
      const second = track.children[1] as HTMLElement | undefined;
      if (first && second) {
        setColSpan(first, 1);
        setColSpan(second, 2);
      }
    }

    // Slide
    void track.offsetWidth; // reflow
    track.style.transition = "transform 450ms cubic-bezier(.22,.61,.36,1)";
    track.style.transform = `translateX(${SHIFT_X})`;

    const onDone = () => {
      track.removeEventListener("transitionend", onDone);

      // Remove first
      const firstNow = track.firstElementChild as HTMLElement | null;
      if (firstNow) firstNow.remove();

      // Reset transform instantly
      track.style.transition = "none";
      track.style.transform = "translateX(0)";
      void track.offsetWidth; // reflow
      track.style.transition = "";

      // Ensure correct spans
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

      // Update current index for mobile action bar
      setCurrentIndex((v) => (v + 1) % items.length);

      setIsAnimating(false);
    };
    track.addEventListener("transitionend", onDone as EventListener, { once: true });
  }, [SHIFT_X, getNextItem, isAnimating, isMobile, items?.length, makeCol, setColSpan]);

  // Current item (for mobile Read More)
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

          {/* Desktop-only control column - first-row bottom-right arrow */}
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
              {/* First row - button positioned in bottom right */}
              <div className="relative flex items-end justify-end p-2">
                <button
                  type="button"
                  onClick={shiftLeft}
                  className="bg-[#F9F7F2] text-black disabled:opacity-50"
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
              {/* Second row - empty to match grid structure */}
              <div />
            </div>
          )}
        </div>

        {/* Mobile fixed action bar (does NOT move with slides) */}
        {isMobile && (
          <div className="mt-2 flex items-center justify-between gap-3">
            {currentItem?.href ? (
              <a
                href={currentItem.href}
                className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4 decoration-2"
              >
                Read More
              </a>
            ) : (
              <button
                type="button"
                className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4 decoration-2"
              >
                Read More
              </button>
            )}

            <button
              type="button"
              onClick={shiftLeft}
              aria-label="Next"
              disabled={isAnimating}
              className="p-2 rounded-md bg-[#F9F7F2] disabled:opacity-50"
            >
              <img
                src="/carousel-arrow.png"
                alt=""
                className="w-[3vh] h-auto object-contain"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
