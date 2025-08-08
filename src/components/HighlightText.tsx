'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

export function HighlightText({ value }: { value: PortableTextBlock[] }) {
  const highlightColor = '#DC5A50';

  const futureRegex = /\b(Future|Growth|Tomorrow)\b/gi;

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
          className={`
            relative z-10 
            transition-colors duration-300
            ${isVisible ? 'text-black' : 'text-inherit'}
          `}
        >
          {children}
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
    );
  };

  const components: PortableTextComponents = {
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-1">
        {React.Children.map(children, (child) => {
          if (typeof child !== 'string') return child;

          const parts = child.split(futureRegex);
          return parts.map((part, i) =>
            futureRegex.test(part) ? (
              <HighlightedWord key={i}>{part}</HighlightedWord>
            ) : (
              <React.Fragment key={i}>{part}</React.Fragment>
            )
          );
        })}
      </li>
    ),
    number: ({ children }) => (
      <li className="mb-1">
        {React.Children.map(children, (child) => {
          if (typeof child !== 'string') return child;

          const parts = child.split(futureRegex);
          return parts.map((part, i) =>
            futureRegex.test(part) ? (
              <HighlightedWord key={i}>{part}</HighlightedWord>
            ) : (
              <React.Fragment key={i}>{part}</React.Fragment>
            )
          );
        })}
      </li>
    ),
  },
  block: {
    normal: ({ children }) => (
      <p className="mb-2">
        {React.Children.map(children, (child) => {
          if (typeof child !== 'string') return child;

          const parts = child.split(futureRegex);
          return parts.map((part, i) =>
            futureRegex.test(part) ? (
              <HighlightedWord key={i}>{part}</HighlightedWord>
            ) : (
              <React.Fragment key={i}>{part}</React.Fragment>
            )
          );
        })}
      </p>
    ),
  },
};


  return <PortableText value={value} components={components} />;
}
