import ResponsiveGridCarousel from '@/components/ResponsiveGridCarousel';
import { HighlightText } from '@/components/HighlightText';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import { PortableTextBlock } from '@portabletext/types';


type GridItem = {
    id: string;
    content: React.ReactNode;
    colSpan: number;
    rowSpan: number;
};

type PodcastProps = {
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


export default function Podcast({ title, subheading, podcasts }: PodcastProps): GridItem[] {
    const carouselItems = podcasts.map((podcast) => ({
        id: `podcastcarousel-${podcast._id}`,  // Ensures uniqueness
        image: podcast.headerImage?.asset?.url || '/placeholder-image.png',
        heading: podcast.headline,
        body: podcast.description,
        link: podcast.embedLink || '#',
    }));


    return [
        {
            id: 'podcast-1',
            content: (
                <FadeInOnVisible>
                <div className="text-[clamp(8vw,20vh,10vw)] font-graphik leading-[clamp(8vw,20vh,10vw)]">
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
                <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-graphik leading-tight">
                    <HighlightText value={subheading} />
                </div>
                </FadeInOnVisible>
            ),
            colSpan: 3,
            rowSpan: 2,
        },
        {
            id: 'podcast-4',
            content: <></>,
            colSpan: 3,
            rowSpan: 2,
        },
        {
            id: 'podcast-5',
            content: (
                <FadeInOnVisible>
                <ResponsiveGridCarousel items={carouselItems} />
                </FadeInOnVisible>
            ),
            colSpan: 6,
            rowSpan: 2,
        },
    ];
}
