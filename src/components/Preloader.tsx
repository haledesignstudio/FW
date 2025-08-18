'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Preloader() {
  const [stage, setStage] = useState<'gif' | 'fadeOut' | 'complete'>('gif');
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setShowPreloader(false);
      setStage('complete');
    } else {
      sessionStorage.setItem('hasVisited', 'true');
      const gifTimer = setTimeout(() => {
        setStage('fadeOut');
      }, 2000);

      return () => clearTimeout(gifTimer);
    }
  }, []);

  useEffect(() => {
    if (stage === 'fadeOut') {
      const fadeTimer = setTimeout(() => {
        setShowPreloader(false);
        setStage('complete');
      }, 500); // 0.5s fade out

      return () => clearTimeout(fadeTimer);
    }
  }, [stage]);

  if (!showPreloader) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#F9F7F2] flex items-center justify-center">
      <div className="flex items-center justify-center">
        <Image
          src="/assets/gifs/Futureworld-Preloader (2).gif"
          alt="Loading..."
          width={200}
          height={200}
          className={`w-[150px] h-[150px] [@media(max-width:768px)]:w-[80px] [@media(max-width:768px)]:h-[80px] object-contain transition-opacity duration-500 ${
            stage === 'fadeOut' ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
    </div>
  );
}