'use client';

import React, { useState } from 'react';

interface Props {
  originalText: string;
  hoverText: string;
  className?: string;
}

const MaskedTextSwap: React.FC<Props> = ({ originalText, hoverText, className }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative inline-block h-[2.5vh] overflow-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ lineHeight: '2.5vh' }}
    >
      <div
        className="transition-all duration-300 ease-in-out"
        style={{
          display: 'flex',
          flexDirection: 'column',
          transform: hovered ? 'translateY(-50%)' : 'translateY(0%)',
        }}
      >
        {/* Original text with faded opacity */}
        <span
          className="transition-opacity duration-300"
          style={{
            opacity: hovered ? 0 : 0.5,
          }}
        >
          {originalText}
        </span>

        {/* Hover text with optional underline */}
        <span
          className={`transition-opacity duration-300 ${
            hovered ? 'underline decoration-[2px] underline-offset-[2px]' : ''
          }`}
          style={{
            opacity: hovered ? 1 : 0.5,
          }}
        >
          {hoverText}
        </span>
      </div>
    </div>
  );
};

export default MaskedTextSwap;
