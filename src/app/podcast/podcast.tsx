// app/insights/podcast/podcast.tsx
'use client';

import type { PortableTextBlock } from '@portabletext/types';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import { HighlightText } from '@/components/HighlightText';
import PodcastCarousel from '@/components/PodcastCarousel';
import { getGridClasses } from '@/components/insights/grid';
import useIsMobile from '@/hooks/useIsMobile';
import { useCallback } from 'react';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';

type Podcast = {
  _id: string;
  headline: string;
  description: string;
  embedLink?: string;
  slug?: { current: string } | string; // ← allow either
  headerImage?: { asset: { url: string }; alt?: string };
};

const basePath = "/podcast";

const hrefFromSlug = (p: Podcast) => {
  const s = p.slug;
  const slugStr = typeof s === "string" ? s : s?.current;
  return slugStr ? `${basePath}/${encodeURIComponent(slugStr)}` : "#";
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
    src: p.headerImage?.asset?.url || "/placeholder-image.png",
    heading: p.headline,
    description: p.description,
    href: hrefFromSlug(p), // ← now works for both string or {current}
  }));




  const handleBackToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  if (isMobile) {
    // 4 column grid, rows as described
    return (
      <div className="col-span-4 w-full grid grid-cols-4 auto-rows-[minmax(7.701vh,auto)] overflow-visible gap-x-[4.53vw] gap-y-[2.09vh]">
        {/* Row 1: Title (col 1-3) */}

        <div className="col-span-3 row-span-2 flex items-center">
          <FadeInOnVisible>
            <div className="dt-h1">{title}</div>
          </FadeInOnVisible>
        </div>

        <div className="col-span-4 row-span-3">
          <FadeInOnVisible>
            <div className="dt-h3">
              <HighlightText value={subheading} />
            </div>
          </FadeInOnVisible>
        </div>
        {/* Row 5+: Carousel (col 1-4) */}
        <div className="col-span-4 row-end-auto">
          <FadeInOnVisible>
            <PodcastCarousel items={carouselItems} readMoreText='Listen now' />
          </FadeInOnVisible>
        </div>
        {/* Back to Top Button (col 3-4, right aligned) */}
        <div className="col-span-2 col-start-3 flex justify-end items-center cursor-pointer mt-[10vh]" onClick={handleBackToTop}>
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
    );
  }

  // Desktop version (unchanged)
  const gridItems = [
    {
      id: 'podcast-1',
      content: (
        <FadeInOnVisible>
          <div className="dt-h1">
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
          <div className="dt-h3">
            <HighlightText value={subheading} />
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 4,
      rowSpan: 2,
    },
    {
      id: 'podcast-4',
      content: (
        <FadeInOnVisible>
          <PodcastCarousel items={carouselItems} readMoreText='Listen now' />

        </FadeInOnVisible>
      ),
      colSpan: 6,
      rowSpan: 2,
    },
    {
      id: 'podcast-5',
      content: <></>,
      colSpan: 6,
      rowSpan: 1,
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
