/**
 * AccordionPulse
 *
 * Usage:
 * <AccordionPulse pulse={shouldPulse} delay={delayValue}>...</AccordionPulse>
 * - 'pulse': boolean, set to true for the tab you want to animate
 * - 'delay': number (seconds), set to stagger or delay the animation
 *
 * Example in parent:
 * <AccordionPulse pulse={tab.id === pulseTabId} delay={tabPulseDelay[tab.id] || 0}>...</AccordionPulse>
 */

import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';



type AccordionPulseProps = React.PropsWithChildren<{
  pulse?: boolean;
  delay?: number;
  paused?: boolean;
}>;

export const AccordionPulse = ({ children, pulse = false, delay = 0, paused = false, ...rest }: AccordionPulseProps) => {
  const controls = useAnimation();

  useEffect(() => {
    if (pulse) {
      if (!paused) {
        controls.start({
          scale: [1, 1.025, 1],
          transition: {
            duration: 1.15,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 9,
            delay,
          },
        });
      } else {
        controls.stop();
      }
    } else {
      controls.set({ scale: 1 });
    }
  }, [pulse, paused, delay, controls]);

  return (
    <motion.div
      animate={controls}
      style={{ display: 'block', width: '100%', transformOrigin: 'center' }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
