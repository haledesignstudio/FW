import React from 'react';


export type UnderlineOnHoverAnimationProps = {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
};

export default function UnderlineOnHoverAnimation({
  children,
  className = '',
  isActive = false,
}: UnderlineOnHoverAnimationProps) {
  return (
    <span className={`nav-link nav-link-ltr ${isActive ? 'underline-active' : ''} ${className}`}>{children}</span>
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
      opacity: 0.5;
      cursor: pointer;
      transition: opacity 200ms;
    }
    .nav-link:hover {
      opacity: 1;
    }
    .nav-link::before {
      transition: 300ms;
      height: 2px;
      content: "";
      position: absolute;
      background-color: #000000;
      left: 0;
    }
    .nav-link-ltr::before {
      width: 0%;
      bottom: -8px;
    }
    .nav-link-ltr:hover::before,
    .nav-link-ltr.underline-active::before {
      width: 100%;
    }
  `;
  document.head.appendChild(style);
}
