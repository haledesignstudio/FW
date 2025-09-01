'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function PreloaderPage() {
  const [stage, setStage] = useState<'gif' | 'fadeOut' | 'complete'>('gif');
  const router = useRouter();

  useEffect(() => {
    // Stage 1: Show GIF for 2.5 seconds, then start fade out
    const gifTimer = setTimeout(() => {
      setStage('fadeOut');
    }, 2000);

    return () => clearTimeout(gifTimer);
  }, []);

  useEffect(() => {
    if (stage === 'fadeOut') {
      // Stage 2: Fade out for 0.5 seconds, then redirect to homepage
      const fadeTimer = setTimeout(() => {
        sessionStorage.setItem('preloaderShown', 'true');
        router.push('/');
      }, 200); 

      return () => clearTimeout(fadeTimer);
    }
  }, [stage, router]);

  return (
    <div className="fixed inset-0 z-50 bg-[#F9F7F2] flex items-center justify-center">
      <div className="flex items-center justify-center">
        <Image
          src="/assets/gifs/Futureworld-Preloader (2).gif"
          alt="Loading..."
          width={200}
          height={200}
          className={`w-[150px] h-[150px] [@media(max-width:1080px)]:w-[80px] [@media(max-width:1080px)]:h-[80px] object-contain transition-opacity duration-500 ${
            stage === 'fadeOut' ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
    </div>
  );
}
