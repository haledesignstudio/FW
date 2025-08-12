'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

const PRIORITY = ['Future', 'Growth', 'Tomorrow'] as const;

const makeWordRegex = (w: string, flags = 'i') =>
  new RegExp(`\\b(${w})\\b`, flags);

/** Pick the first word that appears in the text, by priority */
function pickHighlightWord(text: string): string | null {
  for (const w of PRIORITY) {
    if (makeWordRegex(w).test(text)) return w;
  }
  return null;
}

/** Split on the chosen word and wrap only those matches */
function renderWithHighlight(
  text: string,
  HighlightedWord: React.FC<{ children: React.ReactNode }>
) {
  const word = pickHighlightWord(text);
  if (!word) return text;

  // Build a regex for just the chosen word (global so split finds all, case-insensitive)
  const rx = makeWordRegex(word, 'gi');

  // Using a *capturing* group means split will keep the matches in the array.
  const parts = text.split(rx);

  // Matches will be at odd indices (1, 3, 5, ...)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <HighlightedWord key={i}>{part}</HighlightedWord>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

export function HighlightText({ value }: { value: PortableTextBlock[] }) {
  const highlightColor = '#DC5A50';

  const HighlightedWord = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [isVisible, setIsVisible] = useState(false);

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

    return (
      <span ref={ref} className="relative inline-block">
        <span
          className={`relative z-10 transition-colors duration-300 ${
            isVisible ? 'text-black' : 'text-inherit'
          }`}
        >
          {children}
        </span>
        <span
          className={`
            absolute inset-0 z-0 
            origin-left 
            transition-transform duration-800 ease-out 
            ${isVisible ? 'scale-x-100' : 'scale-x-0'} 
            transform will-change-transform delay-[1000ms]
          `}
          // Tailwind can't read bg-[${...}]; use inline style:
          style={{ pointerEvents: 'none', backgroundColor: highlightColor }}
        />
      </span>
    );
  };

  const wrapStrings = (children: React.ReactNode) =>
    React.Children.map(children, (child) =>
      typeof child === 'string' ? renderWithHighlight(child, HighlightedWord) : child
    );

  const components: PortableTextComponents = {
    list: {
      bullet: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li className="mb-1">{wrapStrings(children)}</li>,
      number: ({ children }) => <li className="mb-1">{wrapStrings(children)}</li>,
    },
    block: {
      normal: ({ children }) => <p className="mb-2">{wrapStrings(children)}</p>,
    },
  };

  return <PortableText value={value} components={components} />;
}
