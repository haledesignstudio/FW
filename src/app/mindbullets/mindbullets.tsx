'use client';

import Link from 'next/link';
import { HighlightText } from '@/components/HighlightText';
import Carousel from '@/components/Carousel';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import MindbulletArchive from '@/components/mindbulletsArchive';
import { PortableTextBlock } from '@portabletext/types';
import { getGridClasses } from '@/components/insights/grid';
import { useCallback, useEffect, useState } from 'react';

type MindbulletDoc = {
  _id: string;
  title?: string;
  byLine?: string;
  slug?: { current: string } | string;
  mainImage?: { asset?: { url?: string } };
  bodyPlain?: string; // ⬅️ from GROQ pt::text(body)
};

type Props = {
  title: string;
  subheading: PortableTextBlock[];
  mindbullets: MindbulletDoc[];
};

export default function Mindbullets({ title, subheading, mindbullets }: Props) {
  // Map Mindbullet docs -> Carousel items
  const carouselItems = mindbullets.map((mb) => {
    const slugStr = typeof mb.slug === 'string' ? mb.slug : mb.slug?.current;
    return {
      src: mb.mainImage?.asset?.url || '/placeholder-image.png',
      heading: mb.title
        ? `${mb.title}${mb.byLine ? " / " + mb.byLine : ""}`
        : 'Untitled',
      description: mb.bodyPlain ?? '', // ⬅️ use bodyPlain
      href: slugStr ? `/mindbullets/${slugStr}` : '#',
    };
  });

  // Your existing mobile helper
  function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < breakpoint);
      check();
      window.addEventListener('resize', check);
      return () => window.removeEventListener('resize', check);
    }, [breakpoint]);
    return isMobile;
  }

  const isMobile = useIsMobile();

  const handleBackToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (isMobile) {
    return (
      <main className="bg-[#F9F7F2]">
        <div className="grid grid-cols-4 auto-rows-[minmax(7.701vh,auto)] overflow-visible gap-x-[4.53vw] gap-y-[2.09vh]
">
          {/* Row 1-2: Title */}
          <div className="col-span-4 row-span-3">
            <FadeInOnVisible>
              <div className="dt-h1 text-left">
                {title}
              </div>
            </FadeInOnVisible>
          </div>

          {/* Row 4-5: Subheading */}
          <div className="col-span-4 row-span-2">
            <FadeInOnVisible>
              <div className="dt-h3">
                <HighlightText value={subheading} />
              </div>
            </FadeInOnVisible>
          </div>

          {/* Row 6-12: Carousel */}
          <div className="col-span-4">
            <FadeInOnVisible>
              <Carousel
                items={carouselItems}
                // Mobile-specific sizing (adjust as you like)
                mobileImageHeight="22vh"
                mobileCaptionHeight="22vh"
                mobileInnerRowGap="3vh"
                mobileGap="3vh"
                // Desktop defaults (used when screen grows)
                imageHeight="21vh"
                captionHeight="21vh"
                innerRowGap="3.2vh"
                gap="1.795vw"
              />
            </FadeInOnVisible>
          </div>
          <div className="col-span-4"></div>
          {/* Row 13-17: Archive */}
          <div className="col-span-4">
            <FadeInOnVisible>

                <MindbulletArchive />

            </FadeInOnVisible>
          </div>

          <div className="col-span-4" />

          <div className="col-span-2 row-span-1 flex items-end">
            <FadeInOnVisible className="text-balance">
              <Link href="/keynotes" className="dt-btn transition cursor-pointer">
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  See Keynotes
                </UnderlineOnHoverAnimation>
              </Link>
            </FadeInOnVisible>
          </div>
          <div className="col-start-3 col-span-2 flex justify-end items-end cursor-pointer" onClick={handleBackToTop}>
            <FadeInOnVisible>
              <span className="dt-btn flex items-center">
                <svg
                  width="clamp(3.5vw,2.35vh,4.7vw)"
                  height="clamp(3.5vw,2.35vh,4.7vw)"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ transform: 'rotate(-45deg)' }}
                >
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  Back to top
                </UnderlineOnHoverAnimation>

              </span>
            </FadeInOnVisible>

          </div>
        </div>
      </main>
    );
  }

  // Desktop grid config
  const gridItems = [
    {
      id: 'mindbullets-1',
      content: (
        <FadeInOnVisible>
          <div className="dt-h1">
            {title}
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 5,
      rowSpan: 3,
    },
    { id: 'mindbullets-2', content: <></>, colSpan: 1, rowSpan: 3 },
    {
      id: 'mindbullets-3',
      content: (
        <FadeInOnVisible>
          <div className="dt-h3">
            <HighlightText value={subheading} />
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 4,
      rowSpan: 1,
    },
    { id: 'mindbullets-4', content: <></>, colSpan: 2, rowSpan: 1 },
    { id: 'mindbullets-5', content: <></>, colSpan: 6, rowSpan: 1 },
    {
      id: 'mindbullets-6',
      content: (
        <FadeInOnVisible>
          <Carousel
            items={carouselItems}
            imageHeight="21vh"
            captionHeight="21vh"
            innerRowGap="3.2vh"
            gap="1.795vw"
          />
        </FadeInOnVisible>
      ),
      colSpan: 6,
      rowSpan: 2,
    },
  ];

  return (
    <>
      {gridItems.map((item) => (
        <div
          key={item.id}
          className={getGridClasses({
            id: item.id,
            colSpan: item.colSpan,
            rowSpan: item.rowSpan,
          })}
        >
          {item.content}
        </div>
      ))}
    </>
  );
}
