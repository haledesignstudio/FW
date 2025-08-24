'use client';
import { useEffect, useRef } from 'react';

export default function ReloadOnBreakpoint() {
  const BREAKPOINT = 768;
  const prevIsMobile = useRef(typeof window !== 'undefined' ? window.innerWidth < BREAKPOINT : false);

  useEffect(() => {
    function handleResize() {
      const isMobile = window.innerWidth < BREAKPOINT;
      if (isMobile !== prevIsMobile.current) {
        prevIsMobile.current = isMobile;
        window.location.reload();
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return null;
}