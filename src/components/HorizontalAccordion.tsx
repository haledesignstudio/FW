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
    tabWidth?: number | string;
    expandedWidth?: number;
    onActiveChange?: (isActive: boolean) => void;
    fullContainerWidth?: string;
}

export default function HorizontalAccordion({ 
  items, 
  className = '',
  tabWidth = 60,
  onActiveChange,
  fullContainerWidth = 'calc(200% + 4vh)'
}: HorizontalAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTabClick = (index: number) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      
      // If clicking the same tab, close it (set to null), otherwise open the new tab
      const newActiveIndex = index === activeIndex ? null : index;
      setActiveIndex(newActiveIndex);
      
      // Notify parent about state change
      if (onActiveChange) {
        onActiveChange(newActiveIndex !== null);
      }
      
      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    }
  };

  return (
    <div className={`flex h-full overflow-visible ${className}`} style={{ justifyContent: 'flex-end' }}>
      {/* Calculate total width when closed and when expanded */}
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        
        // Calculate width based on position and state
        const closedWidth = tabWidth;
        
        // Handle different types of tabWidth for expansion calculation
        let availableExpandedWidth: string;
        if (typeof tabWidth === 'string') {
          // If tabWidth is a string (calc), calculate expansion while preserving all tabs
          // We need to ensure all tabs remain visible, so subtract space for all tabs except the expanded one
          availableExpandedWidth = `calc(${fullContainerWidth} - (${tabWidth} * ${items.length - 1}))`;
        } else {
          // If tabWidth is a number, calculate as before
          const totalTabsWidth = items.length * tabWidth;
          availableExpandedWidth = `calc(${fullContainerWidth} - ${totalTabsWidth - tabWidth}px)`;
        }
        
        const expandedTotalWidth = isActive ? availableExpandedWidth : closedWidth;
        
        // Determine text color based on background
        const getTextColor = (bgColor: string | undefined) => {
          const color = bgColor?.toLowerCase();
          if (color === '#f9f7f2') {
            return '#232323';
          } else if (color === '#dc5a50') {
            return '#F9F7F2';
          } else if (color === '#232323') {
            return '#F9F7F2';
          } else {
            // Default logic for other colors
            return color === '#ffffff' ? '#000000' : '#ffffff';
          }
        };
        
        const textColor = getTextColor(item.color);
        const verticalTextColor = textColor;
        
        return (
          <motion.div
            key={item.id}
            className="relative cursor-pointer flex-shrink-0"
            style={{
              overflow: 'hidden' // Ensure content doesn't overflow
            }}
            animate={{
              width: expandedTotalWidth,
              zIndex: isActive ? 50 : 10
            }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            onClick={() => handleTabClick(index)}
          >
            {/* Background Color */}
            <div 
              className="absolute inset-0 overflow-visible"
              style={{
                backgroundColor: item.color || '#1a1a1a',
                filter: isActive ? 'brightness(1)' : 'brightness(0.8)',
                zIndex: isActive ? 50 : 10
              }}
            />
            
            {/* Tab Title (Vertical) - Always positioned at the right edge of this tab */}
            <motion.div
              className="absolute top-0 h-full flex items-center justify-center z-20"
              style={{ 
                width: typeof tabWidth === 'string' ? tabWidth : `${tabWidth}px`,
                right: 0 // Always anchor to the right of this tab
              }}
              animate={{
                opacity: isActive ? 0 : 1
              }}
              transition={{ duration: 0.3, delay: isActive ? 0 : 0.3 }}
            >
              <div 
                className="font-semibold text-lg tracking-wider"
                style={{
                  color: verticalTextColor,
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
              {isActive && (
                <motion.div
                  className="absolute top-0 left-0 flex flex-col justify-center p-8 z-30"
                  style={{ 
                    color: textColor,
                    height: '100%',
                  }}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ 
                    opacity: 1,
                    width: `calc(${availableExpandedWidth} - ${typeof tabWidth === 'string' ? tabWidth : `${tabWidth}px`})`,
                  }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ 
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  {/* Content wrapper */}
                  <div className="relative w-full h-full flex flex-col justify-center overflow-hidden">
                    <motion.h2 
                      className="text-3xl font-bold mb-4"
                      style={{ 
                        minHeight: '2.5rem',
                        color: textColor
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.4,
                        delay: 0.3,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                    >
                      {item.title}
                    </motion.h2>
                    
                    <motion.div
                      className="text-lg leading-relaxed"
                      style={{ color: textColor }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.4,
                        delay: 0.4,
                        ease: [0.25, 0.1, 0.25, 1]
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
