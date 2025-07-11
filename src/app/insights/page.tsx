'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { client } from '@/sanity/lib/client';
import { insightsPageQuery } from '@/sanity/lib/queries';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import ResponsiveGridCarousel from '@/components/ResponsiveGridCarousel';

const carouselItems = [
  {
    id: 'carousel-1',
    image: '/placeholder-image.png',
    heading: 'Moon colonists suspend mineral supply to Earth',
    body: 'Chinese officials today announced they lost control of the Moon base, Yueling. Text that is used to check if the truncation abilities of my code are working or not working. Who knows?',
    link: '#',
  },
  {
    id: 'carousel-2',
    image: '/menu-our-work.png',
    heading: 'AI for President / The next Commander in Chief is an avatar',
    body: 'When a Presidential decision can affect millions...',
    link: '#',
  },
  {
    id: 'carousel-3',
    image: '/menu-people.png',
    heading: 'Should we create Superman?',
    body: 'New technologies to “reinvent” humanity spark global alarm...',
    link: '#',
  },
  {
    id: 'carousel-4',
    image: '/menu-what-we-do.png',
    heading: 'AI for President / The next Commander in Chief is an avatar',
    body: 'When a Presidential decision can affect millions...',
    link: '#',
  },
  {
    id: 'carousel-5',
    image: '/Privacy Policy.png',
    heading: 'Should we create Superman?',
    body: 'New technologies to “reinvent” humanity spark global alarm...',
    link: '#',
  },
  
];




type insightsPageContent = {
    title: string;
    shareholderValueAnalytics?: {
        title: string;
        subheading?: PortableTextBlock[];
        contentText?: PortableTextBlock[];
        statement1?: PortableTextBlock[];
        statement2?: PortableTextBlock[];
        CTA1?: string;
        Mail1?: string;
        CTA2?: string;
        Mail2?: string;
    };
    mindbullets?: {
        title: string;
        subheading?: PortableTextBlock[];
    };
    keynotes?: {
        topicSection?: {
            topicSectionTitle?: string;
            topicSectionSubtitle?: PortableTextBlock[];
            topicContentText?: PortableTextBlock[];
            topicCTA1?: string;
            topicMail1?: string;
            topicCTA2?: string;
        };
        speakerSection?: {
            speakerSectionTitle?: string;
            speakerSectionSubtitle?: string;
            speakerContentText?: PortableTextBlock[];
            speakerCTA1?: string;
            speakerMail1?: string;
            speakerCTA2?: string;
        };
    };
    podcast?: {
        title: string;
        subheading?: PortableTextBlock[];
    };
    corporateVenturing?: {
        title: string;
        subheading?: PortableTextBlock[];
        contentText?: PortableTextBlock[];
        CTA?: string;
        Mail?: string;
    };
    theEdge?: {
        title: string;
        subheading?: PortableTextBlock[];
        contentText?: PortableTextBlock[];
    };
};


type GridItem = {
    id: string;
    content: React.ReactNode;
    colSpan?: number;
    rowSpan?: number;
    mobileColSpan?: number;
    mobileRowSpan?: number;
    landscapeColSpan?: number;
    landscapeRowSpan?: number;
};

const getGridClasses = (item: GridItem) => {
    const baseClasses = ['bg-[#F9F7F2]', 'flex', 'flex-col'];

    if (item.mobileColSpan === 0 || item.mobileRowSpan === 0) {
        baseClasses.push('block', '[@media(max-width:767px)]:hidden');
    } else {
        baseClasses.push(`col-span-${item.mobileColSpan}`);
        baseClasses.push(`row-span-${item.mobileRowSpan}`);
    }

    if (item.landscapeColSpan === 0 || item.landscapeRowSpan === 0) {
        baseClasses.push('[@media(max-height:600px)_and_(max-width:768px)]:hidden');
    } else {
        baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:col-span-${item.landscapeColSpan}`);
        baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:row-span-${item.landscapeRowSpan}`);
    }

    if (item.colSpan === 0 || item.rowSpan === 0) {
        baseClasses.push('[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:hidden');
    } else {
        baseClasses.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-${item.colSpan}`);
        baseClasses.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-${item.rowSpan}`);
    }

    return baseClasses.join(' ');
};

export default function Page() {
    const [data, setData] = useState<{
        insights: insightsPageContent;
    } | null>(null);

    const [loading, setLoading] = useState(true);
    const [activePage, setActivePage] = useState('analytics');

    const categories = [
        { key: 'analytics', label: 'Shareholder Value Analytics' },
        { key: 'mindbullets', label: 'Mindbullets: News From the Future' },
        { key: 'keynotes', label: 'Keynotes' },
        { key: 'podcast', label: 'Podcast' },
        { key: 'corporate', label: 'Corporate Venturing' },
        { key: 'edge', label: 'The Edge: Insights Driven by Disruption' },
    ];

    useEffect(() => {
        Promise.all([
            client.fetch<insightsPageContent>(insightsPageQuery),
        ])
            .then(([insightsResult]) => {
                setData({insights: insightsResult });
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching content:', error);
                setLoading(false);
            });
    }, []);


    if (loading || !data) return null;

    const commonItems: GridItem[] = [
        {
            id: 'common-1',
            content: (
                <p className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[12vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-[12vh]">
                    Insights_
                </p>
            ),
            colSpan: 4,
            rowSpan: 2,
            mobileColSpan: 1,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 'common-2',
            content: (
                <>
                    <span className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] font-bold cursor-pointer">Categories</span>
                    <br />
                    <ul className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] space-y-2">
                        {categories.map((cat) => (
                            <li key={cat.key}>
                                <button
                                    onClick={() => setActivePage(cat.key)}
                                    className={`${activePage === cat.key ? 'underline' : ''} hover:underline transition cursor-pointer`}
                                >
                                    {cat.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            ),
            colSpan: 2,
            rowSpan: 2,
            mobileColSpan: 1,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
    ];

    const pageItemSets: Record<string, GridItem[]> = {
        analytics: [
            {
                id: 'analytics-1',
                content: (
                    <p className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[20vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-graphik leading-[20vh]">
                        {data.insights.shareholderValueAnalytics?.title}
                    </p>
                ),
                colSpan: 5,
                rowSpan: 2,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 2,
            },
            {
                id: 'analytics-2',
                content: <></>,
                colSpan: 1,
                rowSpan: 2,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 1,
            },
            {
                id: 'analytics-3',
                content: (
                    <div className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[4vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] leading-tight">
                        <PortableText value={data.insights.shareholderValueAnalytics?.contentText || []} />
                    </div>
                ),
                colSpan: 2,
                rowSpan: 1,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 2,
            },
            {
                id: 'analytics-4',
                content: (
                    <div className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight">
                        <PortableText value={data.insights.shareholderValueAnalytics?.subheading || []} />
                    </div>
                ),
                colSpan: 4,
                rowSpan: 1,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 2,
            },
            {
                id: 'analytics-5',
                content: <></>,
                colSpan: 2,
                rowSpan: 1,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 1,
            },
            {
                id: 'analytics-6',
                content: (
                    <div className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] leading-tight">
                        <PortableText value={data.insights.shareholderValueAnalytics?.statement1 || []} />
                    </div>
                ),
                colSpan: 1,
                rowSpan: 1,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 2,
            },
            {
                id: 'analytics-7',
                content: (
                    <div className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] leading-tight">
                        <PortableText value={data.insights.shareholderValueAnalytics?.statement2 || []} />
                    </div>
                ),
                colSpan: 1,
                rowSpan: 1,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 2,
            },
            {
                id: 'analytics-8',
                content: <></>,
                colSpan: 2,
                rowSpan: 1,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 1,
            },
            {
                id: 'analytics-9',
                content: <></>,
                colSpan: 2,
                rowSpan: 1,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 1,
            },
            {
                id: 'analytics-10',
                content: (
                    <a
                        href={`mailto:${data.insights.shareholderValueAnalytics?.Mail1 ?? 'info@futureworld.org'}?subject=${encodeURIComponent(data.insights.shareholderValueAnalytics?.CTA1 ?? '')}`}
                        className="underline text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-graphik leading-[2vh]"
                    >
                        {data.insights.shareholderValueAnalytics?.CTA1 ?? 'Get in Touch'}
                    </a>
                ),
                colSpan: 2,
                rowSpan: 1,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 2,
            },
            {
                id: 'analytics-11',
                content: (
                    <a
                        href={`mailto:${data.insights.shareholderValueAnalytics?.Mail2 ?? 'info@futureworld.org'}?subject=${encodeURIComponent(data.insights.shareholderValueAnalytics?.CTA2 ?? '')}`}
                        className="underline text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-graphik leading-[2vh]"
                    >
                        {data.insights.shareholderValueAnalytics?.CTA2 ?? 'Get in Touch'}
                    </a>
                ),
                colSpan: 2,
                rowSpan: 1,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 2,
            },
            {
                id: 'analytics-12',
                content: <>
                    <iframe
                        src="https://fw-demo.evidence.app/"
                        width="100%"
                        height="800"
                        style={{ border: 'none' }}
                        title="Futureworld Shareholder Value Analytics"
                        allowFullScreen
                        loading="lazy"
                    />



                </>,
                colSpan: 6,
                rowSpan: 5,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 1,
            },
        ],
        mindbullets: [
            {
                id: 'mindbullets-1',
                content:
                    <h2 className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[20vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-graphik leading-[20vh]">
                        {data.insights.mindbullets?.title}
                    </h2>,
                colSpan: 5,
                rowSpan: 3,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 3,
                landscapeRowSpan: 1,
            },
            {
                id: 'mindbullets-2',
                content:
                    <></>,

                colSpan: 1,
                rowSpan: 3,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 3,
                landscapeRowSpan: 1,
            },
            {
                id: 'mindbullets-3',
                content:
                    <div className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[6vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-graphik leading-[7vh]">
                        <PortableText value={data.insights.mindbullets?.subheading || []} />
                    </div>,

                colSpan: 3,
                rowSpan: 2,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 3,
                landscapeRowSpan: 1,
            },
            
        ],
        edge: [
            {
                id: 'edge-1',
                content:
                    <h2 className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[20vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-graphik leading-[20vh]">
                        {data.insights.theEdge?.title}
                    </h2>,
                colSpan: 5,
                rowSpan: 3,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 3,
                landscapeRowSpan: 1,
            },
            {
                id: 'edge-2',
                content:
                    <></>,

                colSpan: 1,
                rowSpan: 3,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 3,
                landscapeRowSpan: 1,
            },
            {
                id: 'edge-3',
                content:
                    <div className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[3vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-roboto leading-[4vh]">
                        <PortableText value={data.insights.theEdge?.contentText || []} />
                    </div>,

                colSpan: 2,
                rowSpan: 1,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 3,
                landscapeRowSpan: 1,
            },
            {
                id: 'edge-4',
                content:
                    <div className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-graphik leading-[6vh]">
                        <PortableText value={data.insights.theEdge?.subheading || []} />
                    </div>,

                colSpan: 3,
                rowSpan: 1,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 3,
                landscapeRowSpan: 1,
            },
        ],
        keynotes: [
            {
                id: 'keynotes-1',
                content: (
                    <h2 className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[20vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-graphik leading-[20vh]">
                        {data.insights.keynotes?.topicSection?.topicSectionTitle}
                    </h2>
                ),
                colSpan: 5,
                rowSpan: 1,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 2,
            },
            {
                id: 'keynotes-2',
                content: (
                    <></>
                ),
                colSpan: 1,
                rowSpan: 1,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 2,
            },
            {
                id: 'keynotes-3',
                content: (
                    <>
                    </>
                ),
                colSpan: 6,
                rowSpan: 1,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 2,
            },
            {
                id: 'keynotes-4',
                content: (
                    <div className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[3vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] leading-tight">
                        <PortableText value={data.insights.keynotes?.topicSection?.topicContentText || []} />
                    </div>
                ),
                colSpan: 2,
                rowSpan: 1,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 2,
            },
            {
                id: 'keynotes-5',
                content: (
                    <div className="whitespace-pre-line text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[4.25vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight">
                        <PortableText value={data.insights.keynotes?.topicSection?.topicSectionSubtitle || []} />
                    </div>
                ),
                colSpan: 4,
                rowSpan: 1,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 2,
            },
            {
                id: 'keynotes-6',
                content: (
                    <></>
                ),
                colSpan: 2,
                rowSpan: 1,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 2,
            },
            {
                id: 'keynotes-7',
                content: (
                    <div className="flex flex-col justify-end h-full">
                        <a
                            href={`mailto:${data.insights.keynotes?.topicSection?.topicMail1 ?? 'info@futureworld.org'}?subject=${encodeURIComponent(data.insights.keynotes?.topicSection?.topicCTA1 ?? '')}`}
                            className="underline text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-graphik leading-[2vh]"
                        >
                            {data.insights.keynotes?.topicSection?.topicCTA1 ?? 'Get in Touch'}
                        </a>


                    </div>
                ),
                colSpan: 1,
                rowSpan: 1,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 2,
            },

            {
                id: 'keynotes-8',
                content: (
                    <div className="flex flex-col justify-end h-full">
                        <a
                            href="#our-speakers" className="underline text-[6vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight"
                        >
                            {data.insights.keynotes?.topicSection?.topicCTA2}
                        </a>
                    </div>
                ),
                colSpan: 1,
                rowSpan: 1,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 2,
            },
            {
                id: 'keynotes-9',
                content: (
                    <></>
                ),
                colSpan: 2,
                rowSpan: 1,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 2,
            },
            {
                id: 'keynotes-10',
                content: (
                    <></>
                ),
                colSpan: 6,
                rowSpan: 1,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 2,
            },

            {
                id: 'keynotes-11',
                content: (
                    <div id="our-speakers">

                        {/* other speaker content */}
                    </div>
                ),
                colSpan: 1,
                rowSpan: 1,
                mobileColSpan: 1,
                mobileRowSpan: 2,
                landscapeColSpan: 4,
                landscapeRowSpan: 2,
            },


        ],
        podcast: [
            {
                id: 'podcast-1',
                content:
                    <h2 className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[20vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-graphik leading-[20vh]">
                        {data.insights.podcast?.title}
                    </h2>,
                colSpan: 5,
                rowSpan: 1,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 3,
                landscapeRowSpan: 1,
            },
            {
                id: 'podcast-2',
                content:
                    <></>,

                colSpan: 1,
                rowSpan: 1,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 3,
                landscapeRowSpan: 1,
            },
            {
                id: 'podcast-3',
                content:
                    <div className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-graphik leading-[5vh]">
                        <PortableText value={data.insights.podcast?.subheading || []} />
                    </div>,

                colSpan: 3,
                rowSpan: 2,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 3,
                landscapeRowSpan: 1,
            },
            {
                id: 'podcast-4',
                content:
                    <></>,

                colSpan: 3,
                rowSpan: 2,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 3,
                landscapeRowSpan: 1,
            },
            {
                id: 'podcast-5',
                content:
                    <ResponsiveGridCarousel items={carouselItems} />,

                colSpan: 6,
                rowSpan: 2,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 3,
                landscapeRowSpan: 1,
            },

        ],
        corporate: [
            {
                id: 'corporate-1',
                content:
                    <h2 className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[20vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-graphik leading-[20vh]">
                        {data.insights.corporateVenturing?.title}
                    </h2>,
                colSpan: 5,
                rowSpan: 2,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 3,
                landscapeRowSpan: 1,
            },
            {
                id: 'corporate-2',
                content:
                    <></>,

                colSpan: 1,
                rowSpan: 2,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 3,
                landscapeRowSpan: 1,
            },
            {
                id: 'corporate-3',
                content:
                    <div className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[3vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-roboto leading-[4vh]">
                        <PortableText value={data.insights.corporateVenturing?.contentText || []} />
                    </div>,

                colSpan: 2,
                rowSpan: 1,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 3,
                landscapeRowSpan: 1,
            },
            {
                id: 'corporate-4',
                content:
                    <div className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-graphik leading-[6vh]">
                        <PortableText value={data.insights.corporateVenturing?.subheading || []} />
                    </div>,

                colSpan: 3,
                rowSpan: 1,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 3,
                landscapeRowSpan: 1,
            },
            {
                id: 'corporate-5',
                content:
                    <></>,

                colSpan: 1,
                rowSpan: 1,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 3,
                landscapeRowSpan: 1,
            },
            {
                id: 'corporate-6',
                content:
                    <></>,

                colSpan: 2,
                rowSpan: 1,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 3,
                landscapeRowSpan: 1,
            },
            {
                id: 'corporate-7',
                content:
                    <a
                        href={`mailto:${data.insights.corporateVenturing?.Mail ?? 'info@futureworld.org'}?subject=${encodeURIComponent(data.insights.corporateVenturing?.CTA ?? '')}`}
                        className="underline text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-graphik leading-[2vh]"
                    >
                        {data.insights.corporateVenturing?.CTA ?? 'Get in Touch'}
                    </a>,

                colSpan: 2,
                rowSpan: 1,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 3,
                landscapeRowSpan: 1,
            },

        ],
    };

    const items = [...commonItems, ...(pageItemSets[activePage] || [])];

    return (
        <>
            <Header />
            <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
                <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh]">
                    {items.map((item) => (
                        <div key={item.id} className={getGridClasses(item)}>
                            {item.content}
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}
