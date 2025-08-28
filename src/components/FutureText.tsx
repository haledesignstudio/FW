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
  const [displayWords, setDisplayWords] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const elementRef = useRef<HTMLSpanElement>(null);

  const getRandomChar = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    return chars[Math.floor(Math.random() * chars.length)];
  };

  // Animate by word, not by character
  const animateText = useCallback(async () => {
    setIsAnimating(true);
    const words = text.split(/(\s+)/); // keep spaces as tokens
  const currentWords: string[] = [];

    for (let w = 0; w < words.length; w++) {
      const word = words[w];
      if (/^\s+$/.test(word)) {
        // spaces
        currentWords.push(word);
        setDisplayWords([...currentWords]);
        onUpdate?.(currentWords.join(''));
        continue;
      }
      let current = '';
      for (let i = 0; i < word.length; i++) {
        const targetChar = word[i];
        const cycles = Math.floor(Math.random() * 4) + 3;
        for (let cycle = 0; cycle < cycles; cycle++) {
          const randomChar = cycle === cycles - 1 ? targetChar : getRandomChar();
          const updated = current + randomChar;
          setDisplayWords([...currentWords, updated]);
          onUpdate?.([...currentWords, updated].join(''));
          await new Promise((resolve) => setTimeout(resolve, speed));
        }
        current += targetChar;
      }
      currentWords.push(current);
      setDisplayWords([...currentWords]);
      onUpdate?.(currentWords.join(''));
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

  // Render each word in a span with white-space: nowrap to prevent word breaks
  return (
    <span
      key={fadeKey}
      ref={elementRef}
      className={`${className} ${isAnimating ? 'text-[#232323]' : ''}`}
      style={{ whiteSpace: 'pre-wrap' }}
    >
      {displayWords.map((word, i) => (
        <span key={i} style={{ whiteSpace: /\s+/.test(word) ? undefined : 'nowrap', display: 'inline-block' }}>
          {word.split('').map((char, j) => (
            <motion.span
              key={j}
              initial={{ opacity: 0.15 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
      {isAnimating && <span className="animate-pulse">|</span>}
    </span>
  );
}
