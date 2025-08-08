'use client';

import { HighlightText } from '@/components/HighlightText';
import ResponsiveGridCarousel from '@/components/ResponsiveGridCarousel';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import { PortableTextBlock } from '@portabletext/types';


type GridItem = {
    id: string;
    content: React.ReactNode;
    colSpan: number;
    rowSpan: number;
};


type Props = {
    title: string;
    subheading: PortableTextBlock[];
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
      id: 'mindbullets-2',
      content: <></>,
      colSpan: 1,
      rowSpan: 3,
    },
    {
      id: 'mindbullets-3',
      content: (
        <FadeInOnVisible>
        <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-graphik leading-tight">
          <HighlightText value={subheading} />
        </div>
        </FadeInOnVisible>
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
      <FadeInOnVisible>
      <ResponsiveGridCarousel items={carouselItems} />
      </FadeInOnVisible>,
      colSpan: 6,
      rowSpan: 2,
    },

  ];
}
