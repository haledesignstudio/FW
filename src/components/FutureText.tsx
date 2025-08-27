'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface FutureTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  triggerOnVisible?: boolean;
  onUpdate?: (animatedText: string) => void; 
}

export function FutureText({
  text,
  className = '',
  delay = 0,
  speed = 30,
  triggerOnVisible = false,
  onUpdate,
}: FutureTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const elementRef = useRef<HTMLSpanElement>(null);

  const getRandomChar = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const animateText = useCallback(async () => {
    setIsAnimating(true);
    const targetText = text;
    let currentText = '';

    for (let i = 0; i < targetText.length; i++) {
      const targetChar = targetText[i];

      if (targetChar === ' ') {
        currentText += ' ';
        setDisplayText(currentText);
        onUpdate?.(currentText);
        continue;
      }

      const cycles = Math.floor(Math.random() * 4) + 3;

      for (let cycle = 0; cycle < cycles; cycle++) {
        const randomChar = cycle === cycles - 1 ? targetChar : getRandomChar();
        const updated = currentText + randomChar;
        setDisplayText(updated);
        onUpdate?.(updated);
        await new Promise((resolve) => setTimeout(resolve, speed));
      }

      currentText += targetChar;
    }

    setIsAnimating(false);
  }, [text, speed, onUpdate]);

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

              return () => clearTimeout(timer);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -10% 0px',
        }
      );

      observer.observe(elementRef.current);

      return () => {
        observer.disconnect();
        const currentInterval = intervalRef.current;
        if (currentInterval) {
          clearInterval(currentInterval);
        }
      };
    } else if (!triggerOnVisible) {
      const timer = setTimeout(() => {
        animateText();
      }, delay);

      return () => {
        clearTimeout(timer);
        const currentInterval = intervalRef.current;
        if (currentInterval) {
          clearInterval(currentInterval);
        }
      };
    }
  }, [text, delay, speed, triggerOnVisible, hasTriggered, animateText]);

  // Use a key that changes when animation starts to re-trigger the fade-in
  const [fadeKey, setFadeKey] = useState(0);
  useEffect(() => {
    if (isAnimating) setFadeKey((k) => k + 1);
  }, [isAnimating]);

  // Render each revealed character in a motion.span for per-letter fade-in
  return (
    <span
      key={fadeKey}
      ref={elementRef}
      className={`${className} ${isAnimating ? 'text-black' : ''}`}
      style={{ whiteSpace: 'pre-wrap' }}
    >
      {displayText.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.15 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ display: 'inline-block' }}
        >
          {char}
        </motion.span>
      ))}
      {isAnimating && <span className="animate-pulse">|</span>}
    </span>
  );
}
