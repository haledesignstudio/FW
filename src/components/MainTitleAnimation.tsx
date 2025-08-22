'use client';

import React, { useState, useEffect } from 'react';

interface MainTitleAnimationProps {
  text: string;
  className?: string;
  typeSpeed?: number;
  delay?: number;
  start?: boolean;
}

export default function MainTitleAnimation({
  text,
  className = '',
  typeSpeed = 60,
  delay = 500,
  start = true
}: MainTitleAnimationProps) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!start) return;
    let timeoutId: NodeJS.Timeout;
    const startTyping = () => {
      let currentIndex = 0;
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeoutId = setTimeout(typeNextChar, typeSpeed);
        }
      };
      typeNextChar();
    };
    timeoutId = setTimeout(startTyping, delay);
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [text, typeSpeed, delay, start]);

  return (
    <>
      <style jsx>{`
        .typewriter-container {
          position: relative;
          display: inline-block;
          max-width: 100%;
          overflow: hidden;
        }
        
        .typewriter-cursor {
          animation: blink 1s ease-in-out infinite;
          font-weight: 900;
          font-size: 1em;
          margin-left: 0.1em;
          display: inline-block;
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0.3;
          }
        }
      `}</style>
      
      <div className={`typewriter-container ${className}`}>
        <span style={{ display: 'inline-block', maxWidth: '100%', wordBreak: 'break-word' }}>
          {displayedText}<span className="typewriter-cursor">_</span>
        </span>
      </div>
    </>
  );
}
