'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface FadeInOnVisibleProps {
  children: React.ReactNode | ((inView: boolean) => React.ReactNode);
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const FadeInOnVisible: React.FC<FadeInOnVisibleProps> = ({
  children,
  className = '',
  threshold = 0.2,
  rootMargin = '0px',
  triggerOnce = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          controls.start('visible');
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [controls, threshold, rootMargin, triggerOnce]);

  const content = typeof children === 'function' ? (children as (v: boolean) => React.ReactNode)(inView) : children;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            opacity: { duration: 1.5, delay: 0, ease: 'easeOut' },
            y: { duration: 1, delay: 0, ease: [0.25, 1, 0.5, 1] },
          },
        },
      }}
    >
      {content}
    </motion.div>
  );
};

export default FadeInOnVisible;
