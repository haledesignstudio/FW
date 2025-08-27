'use client';

import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { urlFor } from '@/sanity/lib/image';

type SanityImageAsset = { _ref: string; _type: string };
type PartnerImage = {
  asset?: SanityImageAsset;
  alt?: string;
};
type PartnerItem = {
  partnerName?: string;
  partnerImage: PartnerImage;
};

interface PartnersMarqueeProps {
  partners: PartnerItem[];
  className?: string;
  /** seconds for one full loop */
  durationSec?: number;          // default 30
  /** logo height in vh */
  logoHeightVh?: number;         // default 8
  /** gap between logos (e.g. '4vw') */
  gap?: string;                  // default '4vw'
  /** extra space at the loop seam (between the two halves) */
  cycleGap?: string;             // default = gap
  /** left/right fade width in vw (set 0 to disable fades) */
  edgeFadeVw?: number;           // default 6
  /** background behind fades (so the gradient blends) */
  fadeBg?: string;               // default 'transparent'
  /** scroll direction */
  direction?: 'left' | 'right';  // default 'left'
}

export default function PartnersMarquee({
  partners,
  className = '',
  durationSec = 30,
  logoHeightVh = 21,
  gap = '4vw',
  cycleGap = '0vw',
  edgeFadeVw = 6,
  fadeBg = 'transparent',
  direction = 'left',
}: PartnersMarqueeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLUListElement | null>(null);
  const [cyclesPerHalf, setCyclesPerHalf] = useState(2); // Start with 2 for better coverage
  const [ready, setReady] = useState(false);

  // Mobile detection for perf tweaks
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const items = useMemo(
    () =>
      (partners ?? []).filter(
        (p): p is PartnerItem & { partnerImage: { asset: SanityImageAsset } } =>
          Boolean(p?.partnerImage?.asset)
      ),
    [partners]
  );

  // Simplified measurement and setup
  useEffect(() => {
    if (!items.length) return;

    let mounted = true;
    
    const setup = () => {
      if (!mounted) return;
      
      const container = containerRef.current;
      const measure = measureRef.current;
      if (!container || !measure) return;

      // Force a layout calculation
      const containerW = container.getBoundingClientRect().width;
      const baseW = measure.scrollWidth;
      
      if (containerW && baseW) {
        const needed = Math.max(2, Math.ceil((containerW * 1.5) / baseW)); // 1.5x for safety
        setCyclesPerHalf(needed);
      }

      // Start animation after a brief delay
      setTimeout(() => {
        if (mounted) setReady(true);
      }, 100);
    };

    // Initial setup
    setup();

    // Handle resize
    const handleResize = () => {
      if (mounted) {
        setReady(false);
        setTimeout(setup, 50);
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      mounted = false;
      window.removeEventListener('resize', handleResize);
    };
  }, [items]);

  if (!items.length) return null;

  const renderCycle = (keyPrefix: string) =>
    items.map((p, i) => {
      const heightMultiplier = isMobile ? 1.5 : 2;
      const src = urlFor(p.partnerImage)
        .height(Math.round(logoHeightVh * heightMultiplier * 16))
        .fit('max')
        .auto('format')
        .url();

      const alt = p.partnerImage.alt ?? p.partnerName ?? 'Partner logo';
      const assetRef = p.partnerImage.asset?._ref ?? String(i);

      return (
        <li key={`${keyPrefix}-${assetRef}-${i}`} className="shrink-0">
          <Image
            src={src}
            alt={alt}
            style={{ height: `${logoHeightVh}vh`, width: 'auto' }}
            className="block object-contain"
            loading="lazy"
            decoding="async"
            width={160}
            height={64}
            unoptimized
          />
        </li>
      );
    });

  const groupContent = (prefix: string) =>
    Array.from({ length: cyclesPerHalf }).flatMap((_, r) => renderCycle(`${prefix}-r${r}`));

  const seamGap = cycleGap ?? gap;
  
  // Generate stable animation names using component props hash
  const propsHash = `${direction}-${durationSec}-${gap}-${logoHeightVh}`.replace(/[^a-zA-Z0-9]/g, '');
  const animationName = `marquee-${propsHash}`;
  const reverseAnimationName = `marquee-reverse-${propsHash}`;

  return (
    <>
      {/* Inject CSS animations */}
      <style jsx global>{`
        @keyframes ${animationName} {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes ${reverseAnimationName} {
          from { transform: translate3d(-50%, 0, 0); }
          to   { transform: translate3d(0, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { 
            animation: none !important; 
            transform: translateX(0) !important; 
          }
        }
      `}</style>

      <div
        ref={containerRef}
        className={`relative overflow-hidden w-full ${className}`}
        aria-label="Partner logos"
      >
        {/* EDGE FADES */}
        {edgeFadeVw > 0 && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10"
              style={{
                width: `${edgeFadeVw}vw`,
                background: `linear-gradient(to right, ${fadeBg} 0%, transparent 100%)`,
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10"
              style={{
                width: `${edgeFadeVw}vw`,
                background: `linear-gradient(to left, ${fadeBg} 0%, transparent 100%)`,
              }}
            />
          </>
        )}

        {/* TRACK with two identical halves for seamless loop */}
        <div
          className="marquee-track flex w-max will-change-transform"
          style={{
            animationName: direction === 'left' ? animationName : reverseAnimationName,
            animationDuration: `${durationSec}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationPlayState: ready ? 'running' : 'paused',
          }}
        >
          <ul className="flex-none flex items-center" style={{ gap }}>
            {groupContent('a')}
            <li
              className="shrink-0"
              aria-hidden="true"
              style={{ width: seamGap }}
            />
          </ul>

          <ul className="flex-none flex items-center" style={{ gap }} aria-hidden="true">
            {groupContent('b')}
            <li
              className="shrink-0"
              aria-hidden="true"
              style={{ width: seamGap }}
            />
          </ul>
        </div>

        {/* Hidden measurer */}
        <ul
          ref={measureRef}
          className="absolute left-[-9999px] top-[-9999px] opacity-0 pointer-events-none flex items-center"
          style={{ gap }}
          aria-hidden="true"
        >
          {renderCycle('m')}
          <li className="shrink-0" aria-hidden="true" style={{ width: seamGap }} />
        </ul>
      </div>
    </>
  );
}