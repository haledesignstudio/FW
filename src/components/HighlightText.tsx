'use client';

import React from 'react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

const PRIORITY = ['Future', 'Growth', 'Tomorrow'] as const;

const makeWordRegex = (w: string, flags = 'i') => new RegExp(`\\b(${w})\\b`, flags);


type TextChild = { text?: string };
type TextBlock = PortableTextBlock & { children?: TextChild[] };


function extractPlainText(blocks: PortableTextBlock[]): string {
  return blocks
    .map((b) => (b as TextBlock).children?.map((c) => c.text ?? '').join('') ?? '')
    .join('\n');
}


function renderWithHighlight(
  text: string,
  HighlightedWord: React.FC<{ children: React.ReactNode }>,
  chosenWord: string | null
) {
  if (!chosenWord) return text;

  const rx = makeWordRegex(chosenWord, 'gi'); 
  const parts = text.split(rx);               

  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <HighlightedWord key={i}>{part}</HighlightedWord>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

export function HighlightText({ value }: { value: string | PortableTextBlock[] }) {
  const highlightColor = '#DC5A50';

  // 1) Decide ONE word for the entire input (string or all PT blocks)
  const chosenWord = React.useMemo(() => {
    const haystack =
      typeof value === 'string' ? value : extractPlainText(value ?? []);
    for (const w of PRIORITY) {
      if (makeWordRegex(w, 'i').test(haystack)) return w;
    }
    return null;
  }, [value]);


  const HighlightedWord = ({ children }: { children: React.ReactNode }) => {
    const ref = React.useRef<HTMLSpanElement>(null);
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
      const node = ref.current;
      if (!node) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            obs.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(node);
      return () => obs.disconnect();
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
          style={{ pointerEvents: 'none', backgroundColor: highlightColor }}
        />
      </span>
    );
  };


  const wrapStrings = (children: React.ReactNode) =>
    React.Children.map(children, (child) =>
      typeof child === 'string'
        ? renderWithHighlight(child, HighlightedWord, chosenWord)
        : child
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

  // String mode
  if (typeof value === 'string') {
    return <>{renderWithHighlight(value, HighlightedWord, chosenWord)}</>;
  }

  // Portable Text mode
  return <PortableText value={value} components={components} />;
}
