'use client';
import React, { useEffect, useRef } from 'react';

export type UnderlineOnHoverAnimationProps = {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  hasStaticUnderline?: boolean;
};

export default function UnderlineOnHoverAnimation({
  children,
  className = '',
  isActive = false,
  hasStaticUnderline = false,
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
      className={`nav-link nav-link-ltr ${
        isActive ? 'underline-active' : ''
      } ${hasStaticUnderline ? 'underline-static' : ''} ${className}`}
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
      text-decoration: none;
      padding: 0;
      margin: 0;
      display: inline-block;
      position: relative;
      opacity: 1;
      cursor: pointer;
      transition: opacity 200ms;
    }

    .nav-link:hover {
      opacity: 1;
    }

    .nav-link::before {
      height: 1px;
      content: "";
      position: absolute;
      background-color: #000000;
      left: 0;
      bottom: -4px;
      width: 0%;
      transition: width 300ms ease-in-out;
    }

    /* Hover triggers animation */
    .nav-link-ltr:hover::before {
      width: 100%;
    }

    /* Active animation */
    .nav-link-ltr.underline-active::before {
      width: 0%;
    }
    .nav-link-ltr.underline-active.animate-entrance::before {
      width: 100%;
    }

    /* Static underline that's still interactive on hover */
    .nav-link.underline-static::before {
      width: 100%;
    }

    .nav-link.underline-static:hover::before {
      width: 0%;
      animation: underline-reenter 300ms forwards;
    }

    @keyframes underline-reenter {
      from {
        width: 0%;
      }
      to {
        width: 100%;
      }
    }
  `;
  document.head.appendChild(style);
}
