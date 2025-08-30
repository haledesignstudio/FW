'use client';

import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import React from 'react';

type SanityImageAsset = { _ref: string; _type: string };
type PartnerImage = { asset?: SanityImageAsset; alt?: string };
export type PartnerItem = { partnerName?: string; partnerImage: PartnerImage };

type LogoBeltProps = {
  partners: PartnerItem[];               // <-- type your props
  speed?: number;                        // px/s
  gap?: string;
  direction?: 'left' | 'right';
  fadeBg?: string;
};

type CSSVars = React.CSSProperties & { ['--fadeBg']?: string };

export default function LogoBelt({
  partners,
  speed = 50,
  gap = '4vw',
  direction = 'left',
  fadeBg = 'transparent',
}: LogoBeltProps) {
  const items = (partners ?? []).filter(
    (p): p is PartnerItem & { partnerImage: { asset: SanityImageAsset } } =>
      Boolean(p?.partnerImage?.asset)
  );

  if (!items.length) return null;

  const style: CSSVars = { '--fadeBg': fadeBg };

  return (
    <div className="relative overflow-hidden w-full" style={style}>
      <Marquee
        autoFill
        speed={speed}
        direction={direction}
        gradient={false}
      >
        {items.map((p, i) => {
          const src = urlFor(p.partnerImage).fit('max').auto('format').url();
          const alt = p.partnerImage.alt ?? p.partnerName ?? 'Partner logo';
          return (
            <div key={i} className="shrink-0" style={{ marginRight: gap }}>
              <Image
                src={src}
                alt={alt}
                width={160}
                height={64}
                className="h-[17vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:h-[21vh] w-auto object-contain"
                unoptimized
                priority={i < 6}
              />
            </div>
          );
        })}
      </Marquee>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-[var(--fadeBg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-[var(--fadeBg)] to-transparent" />
    </div>
  );
}
