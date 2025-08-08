'use client';

import React, { useEffect, useState } from 'react';

interface CountingAnimationProps {
  target: number;
  duration?: number;
  className?: string;
  fontSize?: string;
}

export default function CountingAnimation({
  target,
  duration = 6000,
  className = '',
  fontSize = '60px'
}: CountingAnimationProps) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const startTime = Date.now();
    
    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOut * target);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };
    
    requestAnimationFrame(updateCount);
  }, [target, duration]);

  return (
    <div 
      className={`counting-numbers ${className}`}
      style={{
        fontSize,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '20px auto'
      }}
    >
      {count}
    </div>
  );
}