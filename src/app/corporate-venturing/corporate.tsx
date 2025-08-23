// app/corporate-venturing/corporate.tsx
'use client';

import type { PortableTextBlock } from '@portabletext/types';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import { HighlightText } from '@/components/HighlightText';
import { getGridClasses } from '@/components/insights/grid';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import useIsMobile from '@/hooks/useIsMobile';
import { useCallback } from 'react';
import Carousel, { type CarouselItem } from '@/components/Carousel';

type Podcast = {
  _id: string;
  headline: string;
  subheading?: string;
  description?: string;
  embedLink?: string;
  slug?: { current: string };
  headerImage?: { asset: { url: string }; alt?: string };
};

type Article = {
  _id: string;
  title: string;
  byline?: string;
  slug?: { current: string };
  image?: { asset: { url: string }; alt?: string };
};

export default function CorporateSection({
  title,
  subheading,
  contentText,
  CTA,
  Mail,
  podcasts,
  articles,
}: {
  title: string;
  subheading: PortableTextBlock[];
  contentText: string;
  CTA: string;
  Mail: string;
  podcasts: Podcast[];
  articles: Article[];
}) {
  const isMobile = useIsMobile();

  // Map Podcasts -> Carousel items
  const podcastItems: CarouselItem[] = (podcasts ?? []).map((p) => ({
    src: p.headerImage?.asset?.url || '/placeholder-image.png',
    heading: p.headline? `Podcast: ${p.headline}` : 'Podcast',
    description: p.description,
    href: p.slug?.current ? `/podcast/${p.slug.current}` : '#',
    readMoreText: 'Listen now',
  }));

  // Map Articles -> Carousel items
  const articleItems: CarouselItem[] = (articles ?? []).map((a) => ({
    src: a.image?.asset?.url || '/placeholder-image.png',
    heading: a.title ? `Article: ${a.title}` : 'Article',
    description: a.byline,
    href: a.slug?.current ? `/insights/${a.slug.current}` : '#',
    readMoreText: 'Read article', 
  }));

  // Combine Articles + Podcasts
  const carouselItems: CarouselItem[] = [...podcastItems, ...articleItems];

  const handleBackToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  if (isMobile) {
    // 4 column grid, rows as described
    return (
      <div className="grid grid-cols-4 gap-y-4 gap-x-2 px-2 w-full">
        {/* Row 1-2: Title (col 1-3) */}
        <div className="col-span-3 row-span-2 flex items-center">
          <FadeInOnVisible>
            <div className="text-[12vw] font-graphik leading-tight">{title}</div>
          </FadeInOnVisible>
        </div>
        {/* Row 3: Empty (col 1-4) */}
        <div className="col-span-4 row-span-2" />
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
        <div className="col-span-4 row-span-1" />
        {/* Row 7: CTA (col 1-2) */}
        <div className="col-span-2 row-span-1 flex items-center">
          <FadeInOnVisible>
            <div className="text-[3.5vw] font-graphik leading-tight">
              <a
                href={`mailto:${Mail ?? 'info@futureworld.org'}?subject=${encodeURIComponent(CTA ?? '')}`}
                className="transition cursor-pointer"
              >
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  {CTA ?? 'Get in Touch'}
                </UnderlineOnHoverAnimation>
              </a>
            </div>
          </FadeInOnVisible>
        </div>
        {/* Row 8+: Carousel (col 1-4) */}
        <div className="col-span-4 row-end-auto">
          <FadeInOnVisible>
            <Carousel items={carouselItems} />
          </FadeInOnVisible>
        </div>
        {/* Back to Top Button (col 3-4, right aligned) */}
        <div
          className="col-span-2 col-start-3 flex justify-end items-center cursor-pointer mt-4"
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
    );
  }

  // Desktop version
  const gridItems = [
    {
      id: 'corporate-1',
      content: (
        <FadeInOnVisible>
          <div className="dt-h1">
            {title}
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 5,
      rowSpan: 2,
    },
    { id: 'corporate-2', content: <></>, colSpan: 1, rowSpan: 2 },
    {
      id: 'corporate-3',
      content: (
        <FadeInOnVisible>
          <div className="dt-h4">
            {contentText}
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'corporate-4',
      content: (
        <FadeInOnVisible>
          <div className="dt-h3">
            <HighlightText value={subheading} />
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 3,
      rowSpan: 1,
    },
    { id: 'corporate-5', content: <></>, colSpan: 1, rowSpan: 1 },
    { id: 'corporate-6', content: <></>, colSpan: 2, rowSpan: 1 },
    {
      id: 'corporate-7',
      content: (
        <FadeInOnVisible>
          <div className="dt-btn mt-[5vh]">
            <a
              href={`mailto:${Mail ?? 'info@futureworld.org'}?subject=${encodeURIComponent(CTA ?? '')}`}
              className="transition cursor-pointer"
            >
              <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                {CTA ?? 'Get in Touch'}
              </UnderlineOnHoverAnimation>
            </a>
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 1,
    },
    { id: 'corporate-8', content: <></>, colSpan: 2, rowSpan: 1 },
    {
      id: 'corporate-9',
      content: (
        <FadeInOnVisible>
          <Carousel items={carouselItems}/>
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
