'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { client } from '@/sanity/lib/client';
import { insightsPageQuery, podcastQuery } from '@/sanity/lib/queries';
import type { PortableTextBlock } from '@portabletext/types';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import Podcast from '@/components/insights/Podcast/page';
import Keynote from '@/components/insights/Keynote/page';
import Mindbullets from '@/components/insights/MindBullets/page';
import Analytics from '@/components/insights/Analytics/page';
import Corporate from '@/components/insights/Corporate/page';
import Edge from '@/components/insights/Edge/page';




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
        podcasts: {
            _id: string;
            headline: string;
            description: PortableTextBlock[];
            embedLink?: string;
            slug?: { current: string };
            headerImage?: {
                asset: {
                    url: string;
                };
                alt?: string;
            };
        }[];
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
            client.fetch(podcastQuery)
        ])
            .then(([insightsResult, podcastResults]) => {
                setData({
                    insights: insightsResult,
                    podcasts: podcastResults
                });
                setLoading(false);
            })

    }, []);


    if (loading || !data) return null;



    const commonItems: GridItem[] = [
        {
            id: 'common-1',
            content: (

                <MainTitleAnimation
                    text={data.insights.title}
                    typeSpeed={60}
                    delay={500}
                    className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[8vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight"
                />
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
        analytics: data.insights.shareholderValueAnalytics
            ? Analytics({ analytics: data.insights.shareholderValueAnalytics })
            : [],

        mindbullets: Mindbullets({
            title: data.insights.mindbullets?.title,
            subheading: data.insights.mindbullets?.subheading,
        }),

        edge: data.insights.theEdge
            ? Edge({ edge: data.insights.theEdge })
            : [],


        keynotes: Keynote({ keynotes: data.insights.keynotes }),

        podcast: Podcast({
            title: data.insights.podcast?.title || '',
            subheading: data.insights.podcast?.subheading,
            podcasts: data.podcasts
        }),

        corporate: data.insights.corporateVenturing
            ? Corporate({ corporate: data.insights.corporateVenturing })
            : [],
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
