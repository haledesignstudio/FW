'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  image?: string;
  color?: string;
}

interface VerticalAccordionProps {
  items: AccordionItem[];
  className?: string;
  tabHeight?: number;
  expandedHeight?: number;
}

export default function VerticalAccordion({ 
  items, 
  className = '',
  tabHeight = 60,
}: VerticalAccordionProps) {
  const [activeIndices, setActiveIndices] = useState<number[]>([0]); // Allow multiple active tabs
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTabClick = (index: number) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      
      // Toggle the tab in the active indices array
      setActiveIndices(prev => {
        if (prev.includes(index)) {
          // If tab is active, remove it
          return prev.filter(i => i !== index);
        } else {
          // If tab is not active, add it
          return [...prev, index];
        }
      });
      
      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400);
    }
  };

  return (
    <div className={`flex flex-col w-full ${className}`} style={{ fontFamily: 'DT-H1, sans-serif' }}>
      {items.map((item, index) => {
        const isActive = activeIndices.includes(index);
        
        // Determine text color based on background color
        const getTextColor = (bgColor: string | undefined) => {
          const color = bgColor?.toLowerCase();
          if (color === '#f9f7f2') {
            return '#232323';
          } else if (color === '#dc5a50') {
            return '#F9F7F2';
          } else if (color === '#232323') {
            return '#F9F7F2';
          } else if (color === '#ffffff') {
            return '#000000';
          } else if (color === '#000000') {
            return '#FFFFFF';
          } else {
            // Default logic for other colors
            return color === '#ffffff' ? '#000000' : '#ffffff';
          }
        };

        const textColor = getTextColor(item.color);
        const horizontalTextColor = textColor;
        
        // Calculate individual tab heights and overlaps based on design requirements
        let individualTabHeight;
        let marginTopValue = '0';
        
        if (item.id === 'benchmark') {
          // Larger tab for 2-line text
          individualTabHeight = tabHeight * 1.5; // 1.5x normal height
        } else {
          // Normal height for single-line tabs
          individualTabHeight = tabHeight;
        }
        
        // Set specific overlaps for the stacked design
        if (item.id === 'process') {
          // "Our process" should be halfway up the "Benchmark" tab
          marginTopValue = `${-tabHeight * 0.25}px`; // Overlap to position halfway up benchmark
        } else if (item.id === 'case-studies') {
          // "Case studies" should be visible at bottom, overlapping with our process bottom
          marginTopValue = `${-tabHeight * 0.27}px`; // Moderate overlap to stay visible
        }
        
        return (
          <div
            key={item.id}
            className="relative cursor-pointer flex-shrink-0"
            style={{
              zIndex: isActive ? 999 : index + 1,
              marginTop: marginTopValue,
              position: 'relative',
              minHeight: individualTabHeight + 'px'
            }}
            onClick={() => handleTabClick(index)}
          >
            {/* Background Color */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundColor: item.color || '#232323'
              }}
            />
            
            {/* Tab Title (Horizontal) - Always visible, fixed position */}
            <div
              className="absolute top-0 left-0 w-full flex items-center z-20"
              style={{ 
                height: individualTabHeight, 
                paddingLeft: '4vh',
                justifyContent: 'flex-start',
                alignItems: item.id === 'benchmark' ? 'flex-start' : 'center',
                paddingTop: item.id === 'benchmark' ? '20px' : '0'
              }}
            >
              <div 
                className="font-bold text-[8vw] tracking-wider"
                style={{ 
                  fontFamily: 'DT-H1, sans-serif',
                  lineHeight: item.id === 'benchmark' ? '1.2' : '1',
                  color: horizontalTextColor
                }}
              >
                {item.title}
              </div>
            </div>

            {/* Expanded Content */}
            {isActive && (
              <div
                className={`w-full relative`}
                style={{ 
                  paddingLeft: '4vh',
                  paddingRight: '4vh',
                  paddingTop: individualTabHeight + 'px',
                  paddingBottom: '4vh',
                  zIndex: 1000
                }}
              >
                <div 
                  className={`text-[2vw] leading-relaxed`}
                  style={{ 
                    marginTop: '2vh',
                    color: textColor
                  }}
                >
                  {item.content}
                </div>
              </div>
            )}

            {/* Hover Effect */}
            <motion.div
              className="absolute inset-0 bg-white/10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: isActive ? 0 : 0.2 }}
              transition={{ duration: 0.2 }}
            />
          </div>
        );
      })}
    </div>
  );
}
