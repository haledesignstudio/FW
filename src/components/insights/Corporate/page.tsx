// src/components/insights/Corporate.tsx
'use client';

import { HighlightText } from '@/components/HighlightText';
import ResponsiveGridCarousel from '@/components/ResponsiveGridCarousel';

type GridItem = {
  id: string;
  content: React.ReactNode;
  colSpan: number;
  rowSpan: number;
};



type Props = {
    title: string;
    subheading: string;
    contentText: string;
    CTA: string;
    Mail: string;
    podcasts: {
        _id: string;
        headline: string;
        subheading: string;
        description: string;
        embedLink?: string;
        slug?: { current: string };
        headerImage?: {
            asset: {
                url: string;
            };
            alt?: string;
        };
    }[];
};


export default function Corporate({ title, subheading, contentText, CTA, Mail, podcasts }: Props): GridItem[] {
    const carouselItems = podcasts.map((podcast) => ({
        id: `podcastcarousel-${podcast._id}`,  // Ensures uniqueness
        image: podcast.headerImage?.asset?.url || '/placeholder-image.png',
        heading: podcast.headline,
        body: podcast.description,
        link: podcast.embedLink || '#',
    }));

  return [
    {
      id: 'corporate-1',
      content: (
        <h2 className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[20vh] font-graphik leading-[20vh]">
          {title}
        </h2>
      ),
      colSpan: 5,
      rowSpan: 2,
    },
    {
      id: 'corporate-2',
      content: <></>,
      colSpan: 1,
      rowSpan: 2,
    },
    {
      id: 'corporate-3',
      content: (
        <div className="text-[3vh] font-roboto leading-[4vh]">
          {contentText}
        </div>
      ),
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'corporate-4',
      content: (
        <div className="text-[5vh] font-graphik leading-[6vh]">
          <HighlightText text={subheading} />
        </div>
      ),
      colSpan: 3,
      rowSpan: 1,
    },
    {
      id: 'corporate-5',
      content: <></>,
      colSpan: 1,
      rowSpan: 1,
    },
    {
      id: 'corporate-6',
      content: <></>,
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'corporate-7',
      content: (
        <a
          href={`mailto:${Mail ?? 'info@futureworld.org'}?subject=${encodeURIComponent(CTA ?? '')}`}
          className="underline text-[2vh] font-graphik leading-[2vh]"
        >
          {CTA ?? 'Get in Touch'}
        </a>
      ),
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'corporate-8',
      content: <></>,
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'corporate-9',
      content: 
      <ResponsiveGridCarousel items={carouselItems} />,
      colSpan: 6,
      rowSpan: 2,
    },
  ];
}
