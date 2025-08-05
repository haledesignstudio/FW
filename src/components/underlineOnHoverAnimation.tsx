import React, { useEffect, useRef } from 'react';

export type UnderlineOnHoverAnimationProps = {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  hasStaticUnderline?: boolean; // New prop to control static underline behavior
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
      // Add a class that will trigger the entrance animation after a delay
      setTimeout(() => {
        spanRef.current?.classList.add('animate-entrance');
      }, 600); // 1.5 second delay to let other page animations finish
    }
  }, [isActive]);

  return (
    <span 
      ref={spanRef}
      className={`nav-link nav-link-ltr ${isActive ? 'underline-active' : ''} ${hasStaticUnderline ? 'has-static-underline' : ''} ${className}`}
    >
      {children}
    </span>
  );
}

// Inline styles for animation (can be moved to a CSS/SCSS file if desired)
if (typeof window !== 'undefined' && !document.getElementById('underline-on-hover-animation-styles-v2')) {
  const style = document.createElement('style');
  style.id = 'underline-on-hover-animation-styles-v2';
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
      bottom: -6px;
      width: 0%;
      transition: width 300ms ease-in-out;
    }
    
    /* Static underline that disappears on hover */
    .nav-link.has-static-underline {
      text-decoration: underline;
      text-underline-offset: 8px;
      text-decoration-thickness: 1px;
    }
    .nav-link.has-static-underline:hover {
      text-decoration: none;
    }
    
    /* Regular hover animation */
    .nav-link-ltr:hover::before {
      width: 100%;
    }
    
    /* Active state animations */
    .nav-link-ltr.underline-active::before {
      width: 0%;
    }
    .nav-link-ltr.underline-active.animate-entrance::before {
      width: 100%;
    }
  `;
  document.head.appendChild(style);
}