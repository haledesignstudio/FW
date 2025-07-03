'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  image?: string;
  color?: string;
}

interface HorizontalAccordionProps {
  items: AccordionItem[];
  className?: string;
  tabWidth?: number;
  expandedWidth?: number;
}

export default function HorizontalAccordion({ 
  items, 
  className = '',
  tabWidth = 60,
  expandedWidth = 400
}: HorizontalAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousActiveIndex, setPreviousActiveIndex] = useState<number | null>(0);

  const handleTabClick = (index: number) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setPreviousActiveIndex(activeIndex);
      
      // If clicking the same tab, close it (set to null), otherwise open the new tab
      setActiveIndex(index === activeIndex ? null : index);
      
      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    }
  };

  return (
    <div className={`flex h-96 w-full max-w-6xl mx-auto overflow-hidden rounded-lg shadow-2xl ${className}`}>
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const wasActive = index === previousActiveIndex;
        const isClosing = wasActive && !isActive && isTransitioning;
        
        // Determine text color based on background
        const isLightBackground = item.color === '#ffffff' || item.color === '#FFFFFF';
        const isDarkBackground = item.color === '#000000' || item.color === '#000';
        const textColor = isLightBackground ? 'text-black' : 'text-white';
        const verticalTextColor = isLightBackground ? 'text-black' : 'text-white';
        
        return (
          <motion.div
            key={item.id}
            className="relative cursor-pointer flex-shrink-0"
            animate={{
              width: isActive ? expandedWidth : tabWidth
            }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            onClick={() => handleTabClick(index)}
          >
            {/* Background Color */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundColor: item.color || '#1a1a1a',
                filter: isActive ? 'brightness(1)' : 'brightness(0.8)'
              }}
            />
            
            {/* Tab Title (Vertical) */}
            <motion.div
              className="absolute left-0 top-0 h-full flex items-center justify-center z-10"
              style={{ width: tabWidth }}
              animate={{
                opacity: isActive ? 0 : 1
              }}
              transition={{ duration: 0.3, delay: isActive ? 0 : 0.3 }}
            >
              <div 
                className={`${verticalTextColor} font-semibold text-lg tracking-wider`}
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  transform: 'rotate(180deg)'
                }}
              >
                {item.title}
              </div>
            </motion.div>

            {/* Expanded Content */}
            <AnimatePresence mode="wait">
              {(isActive || isClosing) && (
                <motion.div
                  className={`absolute inset-0 flex flex-col justify-center p-8 ${textColor}`}
                  style={{ 
                    overflow: 'hidden',
                    width: isClosing ? '100%' : expandedWidth,
                    right: isClosing ? 0 : 'auto',
                    left: isClosing ? 'auto' : 0
                  }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0, 
                    x: isActive ? 0 : (isClosing ? -50 : 30),
                    scale: isActive ? 1 : 0.95
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: isActive ? 0.5 : 0.3,
                    delay: isActive ? 0.35 : 0,
                    ease: "easeOut"
                  }}
                >
                  {/* Content wrapper */}
                  <div className="relative w-full h-full flex flex-col justify-center">
                    <motion.h2 
                      className={`text-3xl font-bold mb-4 ${textColor}`}
                      style={{ minHeight: '2.5rem' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -10 }}
                      transition={{ 
                        duration: isActive ? 0.4 : 0.2,
                        delay: isActive ? 0.45 : 0,
                        ease: "easeOut"
                      }}
                    >
                      {item.title}
                    </motion.h2>
                    
                    <motion.div
                      className={`text-lg leading-relaxed ${textColor}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -10 }}
                      transition={{ 
                        duration: isActive ? 0.4 : 0.2,
                        delay: isActive ? 0.55 : 0,
                        ease: "easeOut"
                      }}
                    >
                      {item.content}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hover Effect */}
            <motion.div
              className="absolute inset-0 bg-white/10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: isActive ? 0 : 0.2 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
