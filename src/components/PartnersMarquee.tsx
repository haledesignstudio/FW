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
  cycleGap="0vw", // optional; uses gap if not provided
  edgeFadeVw = 6,
  fadeBg = 'transparent',
  direction = 'left',
}: PartnersMarqueeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLUListElement | null>(null);
  const [cyclesPerHalf, setCyclesPerHalf] = useState(1);
  const [ready, setReady] = useState(false);

  // Mobile detection for perf tweaks
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

  useEffect(() => { setReady(true); }, []);

  // Recompute repeats so each half >= container width (prevents gaps)
  useEffect(() => {
    if (!items.length) return;

    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    setReady(false);

    const compute = () => {
      const containerW = container.offsetWidth;
      const baseW = measure.scrollWidth; // width of one cycle (plus spacer we include below)
      if (!containerW || !baseW) return;
      const needed = Math.max(1, Math.ceil(containerW / baseW));
      setCyclesPerHalf(needed);
    };

    const updateReadyIfSettled = () => {
      const imgs = Array.from(measure.querySelectorAll('img'));
      if (imgs.length === 0 || imgs.every((i) => i.complete)) {
        setReady(true);
      }
    };

    let timeoutId: ReturnType<typeof setTimeout>;
    const throttled = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        compute();
        updateReadyIfSettled();
      }, isMobile ? 100 : 50);
    };

    const ro = new ResizeObserver(throttled);
    ro.observe(container);
    ro.observe(measure);

    const imgs = Array.from(measure.querySelectorAll('img'));
    let pending = imgs.filter((i) => !i.complete).length;
    if (pending === 0) {
      compute();
      setReady(true);
    } else {
      imgs.forEach((img) => {
        if (!img.complete) {
          const onLoad = () => {
            compute();
            pending -= 1;
            if (pending === 0) setReady(true);
          };
          img.addEventListener('load', onLoad, { once: true });
        }
      });
    }

    compute();

    return () => {
      ro.disconnect();
      clearTimeout(timeoutId);
    };
  }, [items, isMobile]);

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

  // seamGap falls back to item gap if not specified
  const seamGap = cycleGap ?? gap;

  return (
    <div
      ref={containerRef}
      className={['relative overflow-hidden w-full', className].join(' ')}
      style={
        {
          '--pm-duration': `${durationSec}s`,
          '--pm-gap': gap,
          '--pm-cycle-gap': seamGap,
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
        className={`pm-track flex w-max will-change-transform`}
        style={{
          animation: `${direction === 'left' ? 'pm-marquee' : 'pm-marquee-rev'} var(--pm-duration) linear infinite`,
          animationPlayState: ready ? 'running' : 'paused',
        }}
      >
        <ul className="pm-group flex-none flex items-center [gap:var(--pm-gap)]">
          {groupContent('a')}
          {/* Spacer to create a visible gap at the seam */}
          <li
            className="pm-cycle-spacer shrink-0"
            aria-hidden="true"
            style={{ width: 'var(--pm-cycle-gap)' }}
          />
        </ul>

        <ul className="pm-group flex-none flex items-center [gap:var(--pm-gap)]" aria-hidden="true">
          {groupContent('b')}
          {/* Mirror spacer so both halves have equal width */}
          <li
            className="pm-cycle-spacer shrink-0"
            aria-hidden="true"
            style={{ width: 'var(--pm-cycle-gap)' }}
          />
        </ul>
      </div>

      {/* Hidden measurer — one cycle + the seam spacer */}
      <ul
        ref={measureRef}
        className="absolute left-[-9999px] top-[-9999px] opacity-0 pointer-events-none flex items-center [gap:var(--pm-gap)]"
        aria-hidden="true"
      >
        {renderCycle('m')}
        <li className="pm-cycle-spacer shrink-0" aria-hidden="true" style={{ width: 'var(--pm-cycle-gap)' }} />
      </ul>

      <style jsx>{`
        @keyframes pm-marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes pm-marquee-rev {
          from { transform: translate3d(-50%, 0, 0); }
          to   { transform: translate3d(0, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pm-track { animation: none !important; transform: translateX(0) !important; }
        }
      `}</style>
    </div>
  );
}
