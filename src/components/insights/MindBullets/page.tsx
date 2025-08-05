'use client';

import { HighlightText } from '@/components/HighlightText';
import ResponsiveGridCarousel from '@/components/ResponsiveGridCarousel';
import TypeMotion from '@/components/typeMotion';


type GridItem = {
    id: string;
    content: React.ReactNode;
    colSpan: number;
    rowSpan: number;
};


type Props = {
    title: string;
    subheading: string;
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


export default function Mindbullets({ title, subheading, podcasts }: Props): GridItem[] {
    const carouselItems = podcasts.map((podcast) => ({
        id: `podcastcarousel-${podcast._id}`,  // Ensures uniqueness
        image: podcast.headerImage?.asset?.url || '/placeholder-image.png',
        heading: podcast.headline,
        body: podcast.description,
        link: podcast.embedLink || '#',
    }));

  return [
    {
      id: 'mindbullets-1',
      content: (
        <TypeMotion delay={2.0} className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[20vh] font-graphik leading-[20vh]">
          {title}
        </TypeMotion>
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
        <div className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[6vh] font-graphik leading-[7vh]">
          <HighlightText text={subheading} />
        </div>
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
      content:
      <ResponsiveGridCarousel items={carouselItems} />,
      colSpan: 6,
      rowSpan: 2,
    },

  ];
}
