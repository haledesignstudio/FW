'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface FadeInOnVisibleProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const FadeInOnVisible: React.FC<FadeInOnVisibleProps> = ({
  children,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [controls]);

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
                        opacity: {
                            duration: 1.5,
                            delay: 0, // fade starts after 0.2s
                            ease: 'easeOut',
                        },
                        y: {
                            duration: 1,
                            delay: 0, // slide starts immediately
                            ease: [0.25, 1, 0.5, 1],
                        },
                    },
                },
            }}


        >
            {children}
        </motion.div>
    );
};

export default FadeInOnVisible;