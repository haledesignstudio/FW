
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
  logoHeightVh = 8,
  gap = '4vw',
  edgeFadeVw = 6,
  fadeBg = 'transparent',
  direction = 'left',
}: PartnersMarqueeProps) {
  // ✅ Call all hooks unconditionally (before any returns)
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLUListElement | null>(null);
  const [cyclesPerHalf, setCyclesPerHalf] = useState(1);

  // Mobile detection for performance optimization
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const items = useMemo(
    () =>
      (partners ?? []).filter(
        (p): p is PartnerItem & { partnerImage: { asset: SanityImageAsset } } =>
          Boolean(p?.partnerImage?.asset)
      ),
    [partners]
  );

  // Recompute repeats so each half >= container width (prevents gaps)
  useEffect(() => {
    if (!items.length) return;

    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const compute = () => {
      const containerW = container.offsetWidth;
      const baseW = measure.scrollWidth; // width of one cycle
      if (!containerW || !baseW) return;
      const needed = Math.max(1, Math.ceil(containerW / baseW));
      setCyclesPerHalf(needed);
    };

    // Throttle ResizeObserver for mobile performance
    let timeoutId: NodeJS.Timeout;
    const throttledCompute = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(compute, isMobile ? 100 : 50); // Less frequent on mobile
    };

    const ro = new ResizeObserver(throttledCompute);
    ro.observe(container);
    ro.observe(measure);

    // Recompute after each image loads (but throttled on mobile)
    const imgs = Array.from(measure.querySelectorAll('img'));
    imgs.forEach((img) => {
      if (!img.complete) {
        const handler = isMobile ? throttledCompute : compute;
        img.addEventListener('load', handler, { once: true });
      }
    });

    compute();

    return () => {
      ro.disconnect();
      clearTimeout(timeoutId);
    };
  }, [items, isMobile]);

  if (!items.length) return null;

  const renderCycle = (keyPrefix: string) =>
    items.map((p, i) => {
      // Optimize image resolution for mobile
      const heightMultiplier = isMobile ? 1.5 : 2; // Lower resolution on mobile
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
            style={{ height: `calc(${logoHeightVh}vh)`, width: 'auto' }}
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

  return (
    <div
      ref={containerRef}
      className={['relative overflow-hidden w-full', className].join(' ')}
      style={
        {
          '--pm-duration': `${durationSec}s`,
          '--pm-gap': gap,
          '--pm-edge': `${edgeFadeVw}vw`,
          '--pm-fade-bg': fadeBg,
        } as React.CSSProperties
      }
      aria-label="Partner logos"
    >
      {/* EDGE FADES */}
      {edgeFadeVw > 0 && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0"
            style={{
              width: 'var(--pm-edge)',
              background: `linear-gradient(to right, var(--pm-fade-bg) 0%, transparent 100%)`,
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0"
            style={{
              width: 'var(--pm-edge)',
              background: `linear-gradient(to left, var(--pm-fade-bg) 0%, transparent 100%)`,
            }}
          />
        </>
      )}

      {/* TRACK with two identical halves for a seamless -50% loop */}
      <div
        className={`pm-track flex w-max ${isMobile ? 'will-change-transform' : 'will-change-transform'} [gap:var(--pm-gap)]`}
        style={{
          animation: `${direction === 'left' ? 'pm-marquee' : 'pm-marquee-rev'} var(--pm-duration) linear infinite`,
          // Performance optimization for mobile
          ...(isMobile && {
            transform: 'translateZ(0)', // Force hardware acceleration
            backfaceVisibility: 'hidden' as const,
          })
        }}
      >
        <ul className="pm-group flex items-center [gap:var(--pm-gap)]">
          {groupContent('a')}
        </ul>
        <ul className="pm-group flex items-center [gap:var(--pm-gap)]" aria-hidden="true">
          {groupContent('b')}
        </ul>
      </div>

      {/* Hidden measurer — one cycle only */}
      <ul
        ref={measureRef}
        className="absolute left-[-9999px] top-[-9999px] opacity-0 pointer-events-none flex items-center [gap:var(--pm-gap)]"
        aria-hidden="true"
      >
        {renderCycle('m')}
      </ul>

      <style jsx>{`
        @keyframes pm-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes pm-marquee-rev {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pm-track { animation: none !important; transform: translateX(0) !important; }
        }
        /* Mobile performance optimizations */
        @media (max-width: 767px) {
          .pm-track {
            transform: translateZ(0);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
        }
      `}</style>
    </div>
  );
}
