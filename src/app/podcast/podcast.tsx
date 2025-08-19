// app/insights/podcast/podcast.tsx
'use client';

import type { PortableTextBlock } from '@portabletext/types';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import { HighlightText } from '@/components/HighlightText';
import ResponsiveGridCarousel from '@/components/ResponsiveGridCarousel';
import { getGridClasses } from '@/components/insights/grid';
import useIsMobile from '@/hooks/useIsMobile';
import { useCallback } from 'react';

type Podcast = {
  _id: string;
  headline: string;
  subheading: string;
  description: string;
  embedLink?: string;
  slug?: { current: string };
  headerImage?: { asset: { url: string }; alt?: string };
};

export default function PodcastSection({
  title,
  subheading,
  podcasts,
}: {
  title: string;
  subheading: PortableTextBlock[];
  podcasts: Podcast[];
}) {
  const isMobile = useIsMobile();
  const carouselItems = podcasts.map((p) => ({
    id: `podcast-${p._id}`,
    image: p.headerImage?.asset?.url || '/placeholder-image.png',
    heading: p.headline,
    body: p.description,
    link: p.embedLink || '#',
  }));

  const handleBackToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  if (isMobile) {
    // 4 column grid, rows as described
    return (
      <div className="grid grid-cols-4 gap-y-2 gap-x-2 px-2 w-full">
        {/* Row 1: Title (col 1-3) */}
        <div className="col-span-4 row-span-2"></div>
        <div className="col-span-3 row-span-2 flex items-center">
          <FadeInOnVisible>
            <div className="text-[12vw] font-graphik leading-tight">{title}</div>
          </FadeInOnVisible>
        </div>
        {/* Row 2: Empty (col 1-4) */}
        <div className="col-span-4 row-span-2" />
        {/* Row 3-4: Subheading (col 1-4) */}
        <div className="col-span-4 row-span-2">
          <FadeInOnVisible>
            <div className="text-[4vw] font-graphik leading-tight">
              <HighlightText value={subheading} />
            </div>
          </FadeInOnVisible>
        </div>
        {/* Row 5+: Carousel (col 1-4) */}
        <div className="col-span-4 row-end-auto">
          <FadeInOnVisible>
            <ResponsiveGridCarousel items={carouselItems} />
          </FadeInOnVisible>
        </div>
        {/* Back to Top Button (col 3-4, right aligned) */}
        <div className="col-span-2 col-start-3 flex justify-end items-center cursor-pointer mt-4" onClick={handleBackToTop}>
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
    );
  }

  // Desktop version (unchanged)
  const gridItems = [
    {
      id: 'podcast-1',
      content: (
        <FadeInOnVisible>
          <div className="text-[clamp(8vw,20vh,10vw)] font-graphik leading-[clamp(8vw,20vh,10vw)]">
            {title}
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 5,
      rowSpan: 1,
    },
    {
      id: 'podcast-2',
      content: <></>,
      colSpan: 1,
      rowSpan: 1,
    },
    {
      id: 'podcast-3',
      content: (
        <FadeInOnVisible>
          <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-graphik leading-tight">
            <HighlightText value={subheading} />
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 4,
      rowSpan: 2,
    },
    {
      id: 'podcast-4',
      content: <></>,
      colSpan: 3,
      rowSpan: 2,
    },
    {
      id: 'podcast-5',
      content: <></>,
      colSpan: 6,
      rowSpan: 4,
    },
    {
      id: 'podcast-6',
      content: (
        <FadeInOnVisible>
          <ResponsiveGridCarousel items={carouselItems} />
        </FadeInOnVisible>
      ),
      colSpan: 6,
      rowSpan: 2,
    },
  ] as const;

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
