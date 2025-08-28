'use client';

import Image from 'next/image';
import React, { useMemo } from 'react';
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
  durationSec?: number;
  logoHeightVh?: number;
  gap?: string;
  edgeFadeVw?: number;
  fadeBg?: string;
  direction?: 'left' | 'right';
}

export default function PartnersMarquee({
  partners,
  className = '',
  durationSec = 10,
  logoHeightVh = 21,
  gap = '4vw',
  edgeFadeVw = 6,
  fadeBg = 'transparent',
  direction = 'left',
}: PartnersMarqueeProps) {
  const items = useMemo(
    () =>
      (partners ?? []).filter(
        (p): p is PartnerItem & { partnerImage: { asset: SanityImageAsset } } =>
          Boolean(p?.partnerImage?.asset)
      ),
    [partners]
  );

  if (!items.length) return null;

  const renderLogos = () =>
    items.map((p, i) => {
      const src = urlFor(p.partnerImage)
        .height(Math.round(logoHeightVh * 2 * 16))
        .fit('max')
        .auto('format')
        .url();

      const alt = p.partnerImage.alt ?? p.partnerName ?? 'Partner logo';

      return (
        <div key={i} className="shrink-0" style={{ marginRight: gap }}>
          <Image
            src={src}
            alt={alt}
            style={{ height: `${logoHeightVh}vh`, width: 'auto' }}
            className="block object-contain"
            loading="lazy"
            width={160}
            height={64}
            unoptimized
          />
        </div>
      );
    });

  return (
    <>
      <style jsx global>{`
        .marquee-container {
          --gap: ${gap};
          --duration: ${durationSec}s;
          --direction: ${direction === 'left' ? 'scroll-left' : 'scroll-right'};
        }
        
        .marquee-track {
          animation: var(--direction) var(--duration) linear infinite;
        }
        
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes scroll-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { 
            animation-play-state: paused !important;
          }
        }
      `}</style>

      <div
        className={`marquee-container relative overflow-hidden w-full ${className}`}
        aria-label="Partner logos"
      >
        {/* Edge fades */}
        {edgeFadeVw > 0 && (
          <>
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10"
              style={{
                width: `${edgeFadeVw}vw`,
                background: `linear-gradient(to right, ${fadeBg} 0%, transparent 100%)`,
              }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10"
              style={{
                width: `${edgeFadeVw}vw`,
                background: `linear-gradient(to left, ${fadeBg} 0%, transparent 100%)`,
              }}
            />
          </>
        )}

        <div className="marquee-track flex will-change-transform">
          {/* Render multiple copies for seamless loop */}
          <div className="flex shrink-0">
            {renderLogos()}
          </div>
          <div className="flex shrink-0">
            {renderLogos()}
          </div>
          <div className="flex shrink-0">
            {renderLogos()}
          </div>
          <div className="flex shrink-0">
            {renderLogos()}
          </div>
        </div>
      </div>
    </>
  );
}