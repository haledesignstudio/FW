import ResponsiveGridCarousel from '@/components/ResponsiveGridCarousel';
import { HighlightText } from '@/components/HighlightText';


type GridItem = {
    id: string;
    content: React.ReactNode;
    colSpan: number;
    rowSpan: number;
};

type PodcastProps = {
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
                <h2 className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[20vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-graphik leading-[20vh]">
                    {title}
                </h2>
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
                <div className="text-[5vh] font-graphik leading-[5vh]">
                    <HighlightText text={subheading} />


                </div>
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
                <ResponsiveGridCarousel items={carouselItems} />
            ),
            colSpan: 6,
            rowSpan: 2,
        },
    ];
}
