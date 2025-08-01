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
        <h2 className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[20vh] font-graphik leading-[20vh]">
          {title}
        </h2>
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
        <div className="text-[3vh] font-roboto leading-[4vh]">
          <HighlightText text={contentText} />
        </div>
      ),
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'edge-4',
      content: (
        <div className="text-[5vh] font-graphik leading-[6vh]">
          <HighlightText text={subheading} />
        </div>
      ),
      colSpan: 3,
      rowSpan: 1,
    },
    {
      id: 'edge-5',
      content: <></>,
      colSpan: 1,
      rowSpan: 1,
    },
    {
      id: 'edge-6',
      content: <></>,
      colSpan: 6,
      rowSpan: 1,
    },
    {
      id: 'edge-7',
      content: 
      <ResponsiveGridCarousel items={carouselItems} />,
      colSpan: 6,
      rowSpan: 2,
    },
  ];
}
