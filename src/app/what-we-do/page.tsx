'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { client } from '@/sanity/lib/client';
import { whatWeDoQuery } from '@/sanity/lib/queries';

type WhatWeDoContent = {
    heading: string;
    mainline: string;
    cta: string;
    mail: string;
    statement1: string;
    statement2: string;
    statement3: string;
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
    const [data, setData] = useState<WhatWeDoContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        client
            .fetch<WhatWeDoContent>(whatWeDoQuery)
            .then((result) => {
                setData(result);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching WhatWeDo content:', error);
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
                <p className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[12vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight">
                    {data.heading}
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
            id: 2,
            content: <></>,
            colSpan: 1,
            rowSpan: 1,
            mobileColSpan: 1,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 1,
        },
        {
            id: 3,
            content: <p className="whitespace-pre-line text-[2.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[4.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight">
                {data.mainline}
            </p>,
            colSpan: 3,
            rowSpan: 2,
            mobileColSpan: 2,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 1,
        },
        {
            id: 4,
            content: (
                <></>
            ),
            colSpan: 3,
            rowSpan: 1,
            mobileColSpan: 0,
            mobileRowSpan: 0,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 5,
            content: (
                <>
                    <div className="hidden [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:block">
                        <a
                            href={`mailto:${data.mail}?subject=${encodeURIComponent(data.cta)}`}
                            className="underline text-[6vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight"
                        >
                            {data.cta}
                        </a>
                    </div>

                    <div className="block flex flex-col h-full [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:hidden">
                        <p className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] leading-tight">
                            {data.statement1}
                        </p>
                        <br />
                        <p className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] leading-tight">
                            {data.statement2}
                        </p>
                        <br />
                        <p className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] leading-tight">
                            {data.statement3}
                        </p>

                        <a
                            href={`mailto:${data.mail}?subject=${encodeURIComponent(data.cta)}`}
                            className="mt-auto underline text-right text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight"
                        >
                            {data.cta}
                        </a>
                    </div>

                </>

            ),
            colSpan: 1,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 3,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 6,
            content: (
                <></>
            ),
            colSpan: 2,
            rowSpan: 1,
            mobileColSpan: 0,
            mobileRowSpan: 0,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 7,
            content: (
                <p className=" text-[6vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] leading-tight">
                    {data.statement1}
                </p>
            ),
            colSpan: 1,
            rowSpan: 1,
            mobileColSpan: 0,
            mobileRowSpan: 0,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 8,
            content: (
                <p className=" text-[6vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] leading-tight">
                    {data.statement2}
                </p>
            ),
            colSpan: 1,
            rowSpan: 1,
            mobileColSpan: 0,
            mobileRowSpan: 0,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 9,
            content: (
                <p className=" text-[6vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] leading-tight">
                    {data.statement3}
                </p>
            ),
            colSpan: 1,
            rowSpan: 1,
            mobileColSpan: 0,
            mobileRowSpan: 0,
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
