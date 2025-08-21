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
      heading: mb.title ?? 'Untitled',
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
      <main className="p-[2vh] bg-[#F9F7F2]">
  <div className="grid grid-cols-4 gap-y-2">
          {/* Row 1-2: Title */}
          <div className="col-span-4">
            <FadeInOnVisible>
              <div className="text-[5vh] font-bold font-graphik leading-tight text-left">
                {title}
              </div>
            </FadeInOnVisible>
          </div>

          {/* Row 3: Empty */}
          <div className="col-span-4 mt-[2vh] mb-[2vh]" />

          {/* Row 4-5: Subheading */}
          <div className="col-span-4 mt-[2vh] mb-[2vh]">
            <FadeInOnVisible>
              <div className="text-[2.5vh] font-bold leading-tight">
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
                imageHeight="25vh"
                captionHeight="25vh"
                innerRowGap="4vh"
                gap="4vh"
              />
            </FadeInOnVisible>
          </div>

          {/* Row 13-17: Archive */}
          <div className="col-span-4">
            <FadeInOnVisible>
              <div className="grid auto-rows-auto">
                <MindbulletArchive />
              </div>
            </FadeInOnVisible>
          </div>

          {/* Row 18: See Keynotes + Back to top */}
          <div className="col-span-2">
            <FadeInOnVisible>
              <Link href="/keynotes" className="transition font-bold cursor-pointer">
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  See Keynotes
                </UnderlineOnHoverAnimation>
              </Link>
            </FadeInOnVisible>
          </div>
          <div
            className="col-start-3 col-span-2 flex justify-end items-center mt-2 cursor-pointer"
            onClick={handleBackToTop}
          >
            <FadeInOnVisible>
              <span className="underline text-[2vh] flex items-center gap-1 font-bold">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ transform: 'rotate(-45deg)' }}
                >
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
                Back to top
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
          <div className="text-[clamp(8vw,20vh,10vw)] font-graphik leading-[clamp(8vw,20vh,10vw)]">
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
          <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-graphik leading-tight">
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
          {/* ⬇️ Carousel fed by Mindbullets */}
          <Carousel
            items={carouselItems}
            imageHeight="25vh"
            captionHeight="25vh"
            innerRowGap="4vh"
            gap="4vh"
          />
        </FadeInOnVisible>
      ),
      colSpan: 6,
      rowSpan: 2,
    },
    {
      id: 'mindbullets-7',
      content: (
        <FadeInOnVisible>
          <div>
            <MindbulletArchive />
          </div>
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
