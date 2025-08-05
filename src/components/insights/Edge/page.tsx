'use client';

import { HighlightText } from '@/components/HighlightText';
import ResponsiveGridCarousel from '@/components/ResponsiveGridCarousel';
import FadeInOnVisible from '@/components/FadeInOnVisible';

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

export default function Edge({ title, subheading, contentText, podcasts }: Props): GridItem[] {
    const carouselItems = podcasts.map((podcast) => ({
        id: `podcastcarousel-${podcast._id}`,  // Ensures uniqueness
        image: podcast.headerImage?.asset?.url || '/placeholder-image.png',
        heading: podcast.headline,
        body: podcast.description,
        link: podcast.embedLink || '#',
    }));
  return [
    {
      id: 'edge-1',
      content: (
        <FadeInOnVisible>
        <div className="text-[20vh] font-graphik leading-[20vh]">
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
        <div className="text-[3.5vh] font-roboto leading-tight">
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
        <div className="text-[5vh] font-graphik leading-tight">
          <HighlightText text={subheading} />
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
      content: 
      <FadeInOnVisible>
      <ResponsiveGridCarousel items={carouselItems} />
      </FadeInOnVisible>,
      colSpan: 6,
      rowSpan: 2,
    },
  ];
}
