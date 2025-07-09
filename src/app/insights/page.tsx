'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { client } from '@/sanity/lib/client';
import { shareholderValueAnalyticsQuery } from '@/sanity/lib/queries';
import { keynoteQuery } from '@/sanity/lib/queries';
import { insightsPageQuery } from '@/sanity/lib/queries';
import { PortableText } from '@portabletext/react';

type ShareholderValueAnalyticsContent = {
    headline: string;
    question: string;
    mainline: string;
    statement1: string;
    statement2: string;
    cta1: string;
    mail1: string;
    cta2: string;
    mail2: string;
    embedLink: string;
};

type keynoteContent = {
    _id: string;
    topicHeadline: string;
    topicMainline: string;
    topicStatement: string;
    topicCTA1: string;
    topicMail1: string;
    topicCTA2: string;
    topicCTA3: string;
    topicMail3: string;
    topicCarousel: {
        topicCarouselImage: {
            asset: {
                _ref: string;
                _type: 'reference';
            };
            alt: string;
        };
        topicCarouselHeadline: string;
        topicCarouselDescription: string;
    }[];
    speakerHeadline: string;
    speakerMainline: string;
    speakerStatement: string;
    speakerCTA1: string;
    speakerMail1: string;
    speakerCTA2: string;
};

type insightsPageContent = {
    title: string;
    shareholderValueAnalytics?: {
        title: string;
        subheading?: any[];
        contentText?: any[]; // Portable Text block
        statement1?: any[];
        statement2?: any[];
        CTA1?: string;
        Mail1?: string;
        CTA2?: string;
        Mail2?: string;
    };
    mindbullets?: {
        title: string;
        subheading?: any[];
    };
    keynotes?: {
        topicSection?: {
            topicSectionTitle?: string;
            topicSectionSubtitle?: any[];
            topicContentText?: any[];
            topicCTA1?: string;
            topicMail1?: string;
            topicCTA2?: string;
        };
        speakerSection?: {
            speakerSectionTitle?: string;
            speakerSectionSubtitle?: string;
            speakerContentText?: any[];
            speakerCTA1?: string;
            speakerMail1?: string;
            speakerCTA2?: string;
        };
    };
    podcast?: {
        title: string;
        subheading?: any[];
    };
    corporateVenturing?: {
        title: string;
        subheading?: any[];
        contentText?: any[];
        CTA?: string;
        Mail?: string;
    };
    theEdge?: {
        title: string;
        subheading?: any[];
        contentText?: any[];
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
        analytics: ShareholderValueAnalyticsContent;
        keynotes: keynoteContent;
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
            client.fetch<ShareholderValueAnalyticsContent>(shareholderValueAnalyticsQuery),
            client.fetch<keynoteContent>(keynoteQuery),
            client.fetch<insightsPageContent>(insightsPageQuery),
        ])
            .then(([analyticsResult, keynoteResult, insightsResult]) => {
                setData({ analytics: analyticsResult, keynotes: keynoteResult, insights: insightsResult });
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
                        <PortableText value={data.insights.shareholderValueAnalytics?.contentText} />
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
                        <PortableText value={data.insights.shareholderValueAnalytics?.subheading} />
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
                    <PortableText value={data.insights.shareholderValueAnalytics?.statement1} />
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
                        <PortableText value={data.insights.shareholderValueAnalytics?.statement2} />
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
                        <PortableText value={data.insights.mindbullets?.subheading} />
                    </div>,

                colSpan: 3,
                rowSpan: 2,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 3,
                landscapeRowSpan: 1,
            },
            {
                id: 'mindbullets-4',
                content: <div className="bg-[#eee] p-6">Visual insight area</div>,
                colSpan: 6,
                rowSpan: 2,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 6,
                landscapeRowSpan: 2,
            },
            {
                id: 'mindbullets-5',
                content: <div className="p-4">Key contributors and commentary</div>,
                colSpan: 6,
                rowSpan: 1,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 6,
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
                        <PortableText value={data.insights.theEdge?.contentText} />
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
                        <PortableText value={data.insights.theEdge?.subheading} />
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
                        <PortableText value={data.insights.keynotes?.topicSection?.topicContentText} />
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
                        <PortableText value={data.insights.keynotes?.topicSection?.topicSectionSubtitle} />
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
                            href={`mailto:${data.keynotes.topicMail1}?subject=${encodeURIComponent(data.keynotes.topicCTA1)}`}
                            className="underline text-[6vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight"
                        >
                            {data.keynotes.topicCTA1}
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
                            {data.keynotes.topicCTA2}
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
                        <PortableText value={data.insights.podcast?.subheading} />
                    </div>,

                colSpan: 3,
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
                        <PortableText value={data.insights.corporateVenturing?.contentText} />
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
                        <PortableText value={data.insights.corporateVenturing?.subheading} />
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
