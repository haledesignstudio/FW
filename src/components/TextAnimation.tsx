'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

interface TextAnimationProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number; // Delay before animation starts (seconds)
  letterDelay?: number; // Delay between each letter (seconds)
  duration?: number; // Duration of each letter animation (seconds)
  triggerOnScroll?: boolean; // Whether to trigger on scroll into view
  once?: boolean; // Whether animation should only happen once
}

export default function TextAnimation({
  text,
  className = '',
  style = {},
  delay = 0,
  letterDelay = 0.05,
  duration = 0.6,
  triggerOnScroll = false,
  once = true
}: TextAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once, amount: 0.1 });

  // Determine if animation should play
  const shouldAnimate = triggerOnScroll ? isInView : true;

  // Split text into characters, preserving spaces
  const characters = text.split('').map((char, index) => ({
    char: char === ' ' ? '\u00A0' : char, // Use non-breaking space
    index,
    isSpace: char === ' '
  }));

  return (
    <motion.div
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{
        overflow: 'hidden',
        lineHeight: '1.2',
        ...style
      }}
    >
      {characters.map(({ char, index }) => (
        <motion.span
          key={index}
          className="inline-block"
          style={{
            display: 'inline-block'
          }}
          initial={{ y: 80, opacity: 0 }}
          animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
          transition={{
            duration: duration,
            delay: delay + (index * letterDelay),
            ease: "easeOut"
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}