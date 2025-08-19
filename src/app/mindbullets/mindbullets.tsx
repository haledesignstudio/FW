'use client';

import Link from 'next/link';
import { HighlightText } from '@/components/HighlightText';
import ResponsiveGridCarousel from '@/components/ResponsiveGridCarousel';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import MindbulletArchive from '@/components/mindbulletsArchive';
import { PortableTextBlock } from '@portabletext/types';
import { getGridClasses } from '@/components/insights/grid';
import { useCallback, useState, useEffect } from 'react';

type Props = {
  title: string;
  subheading: PortableTextBlock[];
  podcasts: {
    _id: string;
    headline: string;
    subheading: string;
    description: string;
    embedLink?: string;
    slug?: { current: string };
    headerImage?: { asset: { url: string }; alt?: string };
  }[];
};


export default function Mindbullets({ title, subheading, podcasts }: Props) {
  const carouselItems = podcasts.map((podcast) => ({
    id: `podcastcarousel-${podcast._id}`,
    image: podcast.headerImage?.asset?.url || '/placeholder-image.png',
    heading: podcast.headline,
    body: podcast.description,
    link: podcast.embedLink || '#',
  }));

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
        <div className="grid grid-cols-4 gap-y-2 auto-rows-[12.5vh]">
          {/* Row 1-2: Title */}
          <div className="col-span-4 row-span-2">
            <FadeInOnVisible>
              <div className="text-[5vh] font-bold font-graphik leading-tight text-left">
                {title}
              </div>
            </FadeInOnVisible>
          </div>
          {/* Row 3: Empty */}
          <div className="col-span-4 row-span-1"></div>
          {/* Row 4-5: Subheading */}
          <div className="col-span-4 row-span-2">
            <FadeInOnVisible>
              <div className="text-[2.5vh] font-bold leading-tight">
                <HighlightText value={subheading} />
              </div>
            </FadeInOnVisible>
          </div>
          {/* Row 6-12: ResponsiveGridCarousel */}
          <div className="col-span-4 row-span-7">
            <FadeInOnVisible>
              <ResponsiveGridCarousel items={carouselItems} />
            </FadeInOnVisible>
          </div>
          {/* Row 13-17: MindbulletsArchive (mobile: 5 rows, 4 cols) */}
          <div className="col-span-4 row-span-5">
            <FadeInOnVisible>
              <div>
                <MindbulletArchive />
              </div>
            </FadeInOnVisible>
          </div>
          {/* Row 18: See Keynotes and Back to top */}
          <div className="col-span-2 row-span-1">
            <FadeInOnVisible>
              <Link href="/keynotes" className="transition font-bold cursor-pointer">
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  See Keynotes
                </UnderlineOnHoverAnimation>
              </Link>
            </FadeInOnVisible>
          </div>
          <div className="col-start-3 col-span-2 flex justify-end items-center mt-2 cursor-pointer" onClick={handleBackToTop}>
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

  // Desktop grid config (unchanged)
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
    {
      id: 'mindbullets-2',
      content: <></>,
      colSpan: 1,
      rowSpan: 3,
    },
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
    {
      id: 'mindbullets-4',
      content: <></>,
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'mindbullets-5',
      content: <></>,
      colSpan: 6,
      rowSpan: 1,
    },
    {
      id: 'mindbullets-6',
      content: (
        <FadeInOnVisible>
          <ResponsiveGridCarousel items={carouselItems} />
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
