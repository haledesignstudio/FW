import { motion } from 'framer-motion';
import React from 'react';

type AccordionPulseProps = React.PropsWithChildren<{ pulse?: boolean; delay?: number }>;

export const AccordionPulse = ({ children, pulse = false, delay = 0, ...props }: AccordionPulseProps) => (
  <motion.div
    animate={pulse ? { scale: [1, 1.025, 1] } : { scale: 1 }}
    transition={pulse ? { duration: 1.15, repeat: Infinity, repeatType: 'reverse', repeatDelay: 9, ease: 'easeInOut', delay } : {}}
    style={{ display: 'block', width: '100%', transformOrigin: 'center' }}
    {...props}
  >
    {children}
  </motion.div>
);
