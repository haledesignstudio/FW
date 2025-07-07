'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { client } from '@/sanity/lib/client';
import { keynoteQuery } from '@/sanity/lib/queries';

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
    const [data, setData] = useState<keynoteContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        client
            .fetch<keynoteContent>(keynoteQuery)
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
                            <a href="/insights">
                                Shareholder Value Analytics
                            </a>
                        </li>
                        <li>
                            <a href="/mindbullets">Mindbullets: News From the Future</a>
                        </li>
                        <li>
                            <a href="/keynotes" className="underline">Keynotes</a>
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
                <p className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[20vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight">
                    {data.topicHeadline}
                </p>
            ),
            colSpan: 5,
            rowSpan: 1,
            mobileColSpan: 1,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 4,
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
            id: 5,
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
            id: 6,
            content: (
                <p className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[3vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] leading-tight">
                    {data.topicStatement}
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
            id: 7,
            content: (
                <p className="whitespace-pre-line text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[4.25vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight">
                    {data.topicMainline}
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
            id: 8,
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
            id: 9,
            content: (
                <div className="flex flex-col justify-end h-full">
                    <a
                        href={`mailto:${data.topicMail1}?subject=${encodeURIComponent(data.topicCTA1)}`}
                        className="underline text-[6vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight"
                    >
                        {data.topicCTA1}
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
            id: 10,
            content: (
                <div className="flex flex-col justify-end h-full">
                    <a
                        href="#our-speakers" className="underline text-[6vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight"
                    >
                        {data.topicCTA2}
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
            id: 11,
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
            id: 12,
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
            id: 13,
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
