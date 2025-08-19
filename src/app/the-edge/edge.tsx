// app/insights/edge/edge.tsx
'use client';

import { PortableTextBlock } from '@portabletext/types';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import { HighlightText } from '@/components/HighlightText';
import ResponsiveGridCarousel from '@/components/ResponsiveGridCarousel';
import { getGridClasses } from '@/components/insights/grid';
import useIsMobile from '@/hooks/useIsMobile';
import { useCallback } from 'react';
import ProvocativeScenarios from '@/components/ProvocativeScenarios';

type Podcast = {
  _id: string;
  headline: string;
  subheading: string;
  description: string;
  embedLink?: string;
  slug?: { current: string };
  headerImage?: { asset: { url: string }; alt?: string };
};

export default function Edge({
  title,
  subheading,
  contentText,
  podcasts,
}: {
  title: string;
  subheading: PortableTextBlock[];
  contentText: string;
  podcasts: Podcast[];
}) {
  const isMobile = useIsMobile();
  const carouselItems = podcasts.map((p) => ({
    id: `edge-podcast-${p._id}`,
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
        {/* Row 1-2: Title (col 1-4) */}
        <div className="col-span-4 row-span-2 flex items-center">
          <FadeInOnVisible>
            <div className="text-[12vw] font-graphik leading-tight">{title}</div>
          </FadeInOnVisible>
        </div>
        {/* Row 3: Empty (col 1-4) */}
        <div className="col-span-4 row-span-6" />
        {/* Row 4: contentText (col 1-4) */}
        <div className="col-span-4 row-span-2">
          <FadeInOnVisible>
            <div className="text-[4vw] font-roboto leading-tight">{contentText}</div>
          </FadeInOnVisible>
        </div>
        {/* Row 5: subheading (col 1-4) */}
        <div className="col-span-4 row-span-2">
          <FadeInOnVisible>
            <div className="text-[4vw] font-graphik leading-tight">
              <HighlightText value={subheading} />
            </div>
          </FadeInOnVisible>
        </div>
        {/* Row 6: Empty (col 1-4) */}
        <div className="col-span-4 row-span-2" />
        {/* Row 7+: Carousel (col 1-4) */}
        <div className="col-span-4 row-end-auto">
          <FadeInOnVisible>
            <ResponsiveGridCarousel items={carouselItems} />
          </FadeInOnVisible>
        </div>
        {/* After carousel: Empty row */}
        <div className="col-span-4 row-start-auto row-end-auto" style={{ minHeight: '2vh' }} />
        {/* ProvocativeScenarios component */}
        <div className="col-span-4">
          <FadeInOnVisible>
            <ProvocativeScenarios />
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
      id: 'edge-1',
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
      id: 'edge-2',
      content: <></>,
      colSpan: 1,
      rowSpan: 3,
    },
    {
      id: 'edge-3',
      content: (
        <FadeInOnVisible>
          <div className="text-[clamp(1vw,3.5vh,1.75vw)] font-roboto leading-tight">
            {contentText}
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 2,
    },
    {
      id: 'edge-4',
      content: (
        <FadeInOnVisible>
          <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-graphik leading-tight">
            <HighlightText value={subheading} />
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 3,
      rowSpan: 2,
    },
    {
      id: 'edge-5',
      content: <></>,
      colSpan: 1,
      rowSpan: 2,
    },
    {
      id: 'edge-6',
      content: <></>,
      colSpan: 6,
      rowSpan: 4,
    },
    {
      id: 'edge-7',
      content: (
        <FadeInOnVisible>
          <ResponsiveGridCarousel items={carouselItems} />
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
