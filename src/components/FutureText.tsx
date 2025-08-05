'use client';

import React, { useEffect, useRef, useState } from 'react';

interface FutureTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  triggerOnVisible?: boolean;
}

export function FutureText({ text, className = '', delay = 0, speed = 30, triggerOnVisible = false }: FutureTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const elementRef = useRef<HTMLSpanElement>(null);

  const getRandomChar = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const animateText = async () => {
    setIsAnimating(true);
    const targetText = text; // Keep original case instead of toUpperCase()
    let currentText = '';
    
    // Build up the text character by character
    for (let i = 0; i < targetText.length; i++) {
      const targetChar = targetText[i];
      
      // If it's a space, just add it immediately
      if (targetChar === ' ') {
        currentText += ' ';
        setDisplayText(currentText);
        continue;
      }
      
      // Cycle through random characters before settling on the target
      const cycles = Math.floor(Math.random() * 4) + 3; // 3-6 cycles per character (faster)
      
      for (let cycle = 0; cycle < cycles; cycle++) {
        const randomChar = cycle === cycles - 1 ? targetChar : getRandomChar();
        setDisplayText(currentText + randomChar);
        
        // Wait for the next cycle
        await new Promise(resolve => setTimeout(resolve, speed));
      }
      
      currentText += targetChar;
    }
    
    setIsAnimating(false);
  };

  useEffect(() => {
    if (triggerOnVisible && elementRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasTriggered) {
              setHasTriggered(true);
              const timer = setTimeout(() => {
                animateText();
              }, delay);
              
              // Clean up the timer if component unmounts
              return () => clearTimeout(timer);
            }
          });
        },
        {
          threshold: 0.1, // Trigger when 10% of the element is visible
          rootMargin: '0px 0px -10% 0px' // Trigger slightly before fully in view
        }
      );
      
      observer.observe(elementRef.current);
      
      return () => {
        observer.disconnect();
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else if (!triggerOnVisible) {
      // Original behavior - trigger immediately with delay
      const timer = setTimeout(() => {
        animateText();
      }, delay);

      return () => {
        clearTimeout(timer);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [text, delay, speed, triggerOnVisible, hasTriggered]);

  return (
    <span ref={elementRef} className={`${className} ${isAnimating ? 'text-black' : ''}`}>
      {displayText}
      {isAnimating && <span className="animate-pulse">|</span>}
    </span>
  );
}
