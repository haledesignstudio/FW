// app/insights/edge/edge.tsx
'use client';

import { PortableTextBlock } from '@portabletext/types';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import { HighlightText } from '@/components/HighlightText';
import ResponsiveGridCarousel from '@/components/ResponsiveGridCarousel';
import { getGridClasses } from '@/components/insights/grid';

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
  const carouselItems = podcasts.map((p) => ({
    id: `edge-podcast-${p._id}`,
    image: p.headerImage?.asset?.url || '/placeholder-image.png',
    heading: p.headline,
    body: p.description,
    link: p.embedLink || '#',
  }));

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
