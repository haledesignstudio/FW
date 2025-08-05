'use client';

import React, { useEffect, useRef } from 'react';

interface TypeMotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}

const TypeMotion: React.FC<TypeMotionProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  stagger = 0.2 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Function to split text into lines and wrap them
    const splitTextIntoLines = (element: Element) => {
      const text = element.textContent || '';
      if (!text.trim()) return;

      // Split by line breaks and filter out empty lines
      const lines = text.split(/\n/).filter(line => line.trim());
      element.innerHTML = '';
      
      lines.forEach((line) => {
        const lineDiv = document.createElement('div');
        lineDiv.textContent = line;
        lineDiv.style.display = 'block';
        lineDiv.style.transform = 'translateY(100%)';
        lineDiv.style.willChange = 'transform';
        lineDiv.style.overflow = 'hidden';
        element.appendChild(lineDiv);
      });
    };

    // Function to animate lines
    const animateLines = (element: Element, baseDelay: number) => {
      const lines = element.querySelectorAll('div');
      lines.forEach((line, index) => {
        const animationDelay = baseDelay + (index * stagger);
        
        setTimeout(() => {
          line.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
          line.style.transform = 'translateY(0)';
        }, animationDelay * 1000);
      });
    };

    // Process all text nodes
    const processElement = (element: Element, currentDelay: number): number => {
      let totalDelay = currentDelay;
      
      // Check if this element has direct text content
      const hasDirectText = Array.from(element.childNodes).some(
        node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
      );

      if (hasDirectText) {
        splitTextIntoLines(element);
        animateLines(element, totalDelay);
        const lineCount = (element.textContent || '').split(/\n/).filter(line => line.trim()).length;
        totalDelay += lineCount * stagger;
      } else {
        // Process child elements
        Array.from(element.children).forEach(child => {
          totalDelay = processElement(child, totalDelay);
        });
      }

      return totalDelay;
    };

    // Start animation after initial delay
    setTimeout(() => {
      processElement(container, 0);
    }, delay);

    // Cleanup function
    return () => {
      // No cleanup needed for transform-only animations
    };
  }, [delay, stagger]);

  return (
    <div 
      ref={containerRef}
      className={`split ${className}`}
      style={{ 
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

export default TypeMotion;
