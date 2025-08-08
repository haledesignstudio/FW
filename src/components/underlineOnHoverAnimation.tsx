'use client';
import React, { useEffect, useRef } from 'react';

export type UnderlineOnHoverAnimationProps = {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  hasStaticUnderline?: boolean;
  color?: string; // optional custom underline color
};

const underlineVar = '--underline-color' as const;

export default function UnderlineOnHoverAnimation({
  children,
  className = '',
  isActive = false,
  hasStaticUnderline = false,
  color, // ✅ you forgot this
}: UnderlineOnHoverAnimationProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isActive && spanRef.current) {
      setTimeout(() => {
        spanRef.current?.classList.add('animate-entrance');
      }, 600);
    }
  }, [isActive]);

  return (

    <span
      ref={spanRef}
      className={`nav-link nav-link-ltr ${isActive ? 'underline-active' : ''} ${hasStaticUnderline ? 'underline-static' : ''} ${className}`}
      style={{ [underlineVar]: color || '#000' } as React.CSSProperties}
    >
      {children}
    </span>


  );

}

// Inline styles
if (typeof window !== 'undefined' && !document.getElementById('underline-on-hover-animation-styles-v4')) {
  const style = document.createElement('style');
  style.id = 'underline-on-hover-animation-styles-v4';
  style.innerHTML = `
    .nav-link {
      background-image: linear-gradient(transparent calc(100% - 1px), var(--underline-color, #000) 1px);
      background-repeat: no-repeat;
      background-size: 0% 100%;
      background-position: left bottom;
      transition: background-size 300ms ease-in-out;
      text-decoration: none;
      position: relative;
      display: inline;
      cursor: pointer;
      opacity: 1;
    }

    .nav-link:hover {
      background-size: 100% 100%;
    }

    .nav-link.underline-static {
      background-size: 100% 100%;
    }

    .nav-link.underline-static:hover {
      background-size: 0% 100%;
      animation: underline-reenter 700ms forwards;
    }

    .nav-link.underline-active {
      background-size: 0% 100%;
    }

    .nav-link.underline-active.animate-entrance {
      background-size: 100% 100%;
    }

    @keyframes underline-reenter {
      from {
        background-size: 0% 100%;
      }
      to {
        background-size: 100% 100%;
      }
    }

  `;
  document.head.appendChild(style);
}
