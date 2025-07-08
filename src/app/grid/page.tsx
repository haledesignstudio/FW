'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { client } from '@/sanity/lib/client';
import { shareholderValueAnalyticsQuery } from '@/sanity/lib/queries';

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

type GridItem = {
    id: number;
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

    // Mobile
    if (item.mobileColSpan === 0 || item.mobileRowSpan === 0) {
        baseClasses.push('block', '[@media(max-width:767px)]:hidden');
    } else {
        baseClasses.push(`col-span-${item.mobileColSpan}`);
        baseClasses.push(`row-span-${item.mobileRowSpan}`);
    }

    // Landscape
    if (item.landscapeColSpan === 0 || item.landscapeRowSpan === 0) {
        baseClasses.push('[@media(max-height:600px)_and_(max-width:768px)]:hidden');
    } else {
        baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:col-span-${item.landscapeColSpan}`);
        baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:row-span-${item.landscapeRowSpan}`);
    }

    // Desktop
    if (item.colSpan === 0 || item.rowSpan === 0) {
        baseClasses.push('[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:hidden');
    } else {
        baseClasses.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-${item.colSpan}`);
        baseClasses.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-${item.rowSpan}`);
    }

    return baseClasses.join(' ');
};


export default function Page() {
    const [data, setData] = useState<ShareholderValueAnalyticsContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        client
            .fetch<ShareholderValueAnalyticsContent>(shareholderValueAnalyticsQuery)
            .then((result) => {
                setData(result);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching Content:', error);
                setLoading(false);
            });
    }, []);

    if (loading || !data) {
        return null;
    }

    const items: GridItem[] = [

        {
            id: 1,
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
            id: 2,
            content: (
                <>
                <span className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] font-bold">Categories</span>
                <br></br>
                    <ul className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh]">
                        <li>
                            <a href="/insights" className="underline">
                                Shareholder Value Analytics
                            </a>
                        </li>
                        <li>
                            <a href="/mindbullets">Mindbullets: News From the Future</a>
                        </li>
                        <li>
                            <a href="/insights/keynotes">Keynotes</a>
                        </li>
                        <li>
                            <a href="/podcast">Podcast</a>
                        </li>
                        <li>
                            <a href="/corporate-venturing">Corporate Venturing</a>
                        </li>
                        <li>
                            <a href="/the-edge">The Edge: Insights Driven by Disruption</a>
                        </li>
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
        {
            id: 3,
            content: (
                <p className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[20vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-graphik leading-[20vh]">
                    {data.headline}
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
            id: 4,
            content: <></>,
            colSpan: 1,
            rowSpan: 2,
            mobileColSpan: 1,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 1,
        },
        {
            id: 5,
            content: (
                <p className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[4vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] leading-tight">
                    {data.question}
                </p>
            ),
            colSpan: 2,
            rowSpan: 1,
            mobileColSpan: 1,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 6,
            content: (
                <p className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight">
                    {data.mainline}
                </p>
            ),
            colSpan: 4,
            rowSpan: 1,
            mobileColSpan: 1,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 7,
            content: <></>,
            colSpan: 2,
            rowSpan: 1,
            mobileColSpan: 1,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 1,
        },
        {
            id: 8,
            content: (
                <p className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] leading-tight">
                    {data.statement1}
                </p>
            ),
            colSpan: 1,
            rowSpan: 1,
            mobileColSpan: 1,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 9,
            content: (
                <p className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] leading-tight">
                    {data.statement2}
                </p>
            ),
            colSpan: 1,
            rowSpan: 1,
            mobileColSpan: 1,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 10,
            content: <></>,
            colSpan: 2,
            rowSpan: 1,
            mobileColSpan: 1,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 1,
        },
        {
            id: 11,
            content: <></>,
            colSpan: 2,
            rowSpan: 1,
            mobileColSpan: 1,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 1,
        },
        {
            id: 12,
            content: (
                <a
                    href={`mailto:${data.mail1}?subject=${encodeURIComponent(data.cta1)}`}
                    className="underline text-[6vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight"
                >
                    {data.cta1}
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
            id: 13,
            content: (
                <a
                    href={`mailto:${data.mail2}?subject=${encodeURIComponent(data.cta2)}`}
                    className="underline text-[6vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight"
                >
                    {data.cta2}
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
            id: 14,
            content: <></>,
            colSpan: 6,
            rowSpan: 5,
            mobileColSpan: 1,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 1,
        },

    ];

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