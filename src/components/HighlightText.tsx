'use client';

import React, { useEffect, useRef, useState } from 'react';

export function HighlightText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const highlightColor = '#DC5A50';

  const futureRegex = /\bFuture\b/i;
  const growthRegex = /\bGrowth\b/i;
  const tomorrowRegex = /\bTomorrow\b/i;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // only animate once
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Do this AFTER all hooks
  const match = text.match(futureRegex) || text.match(growthRegex) || text.match(tomorrowRegex);
  if (!match) return <>{text}</>;

  const start = match.index!;
  const end = start + match[0].length;

  return (
    <>
      {text.slice(0, start)}
      <span ref={ref} className="relative inline-block">
        <span
          className={`
            relative z-10 
            transition-colors duration-300
            ${isVisible ? 'text-black' : 'text-inherit'}
          `}
        >
          {text.slice(start, end)}
        </span>
        <span
          className={`
            absolute inset-0 z-0 
            bg-[${highlightColor}] 
            origin-left 
            transition-transform duration-800 ease-out 
            ${isVisible ? 'scale-x-100' : 'scale-x-0'} 
            transform
            will-change-transform
            delay-[1000ms]
          `}
          style={{ pointerEvents: 'none' }}
        />
      </span>
      {text.slice(end)}
    </>
  );
}
