// src/components/insights/Corporate.tsx
'use client';

import { HighlightText } from '@/components/HighlightText';
import ResponsiveGridCarousel from '@/components/ResponsiveGridCarousel';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';

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
        <FadeInOnVisible>
        <div className="text-[20vh] font-graphik leading-[20vh]">
          {title}
        </div>
        </FadeInOnVisible>
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
        <FadeInOnVisible>
        <div className="text-[3.5vh] font-roboto leading-tight">
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
        <div className="text-[5vh] font-graphik leading-tight">
          <HighlightText text={subheading} />
        </div>
        </FadeInOnVisible>
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
        <FadeInOnVisible>
        <div className="text-[2.25vh] font-graphik leading-[2.25vh]">
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
    {
      id: 'corporate-8',
      content: <></>,
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'corporate-9',
      content: 
      <FadeInOnVisible>
      <ResponsiveGridCarousel items={carouselItems} />
      </FadeInOnVisible>,
      colSpan: 6,
      rowSpan: 2,
    },
  ];
}
