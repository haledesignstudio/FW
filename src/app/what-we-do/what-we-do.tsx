'use client';

import React, { useState } from 'react';
import Header from '@/components/header';
import { HighlightText } from '@/components/HighlightText';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import Footer from '@/components/footer';
import HorizontalAccordion, { AccordionItem } from '@/components/HorizontalAccordion';

type WhatWeDoContent = {
    heading: string;
    mainline: string;
    cta: string;
    mail: string;
    statement1: string;
    statement2: string;
    statement3: string;
    accordionHeading: string;
    accordionItems: {
        title: string;
        content: string;
        color: string;
    }[];
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

interface WhatWeDoProps {
    data: WhatWeDoContent;
}

export default function WhatWeDo({ data }: WhatWeDoProps) {
    const [isAnyAccordionOpen, setIsAnyAccordionOpen] = useState(false);
    
    // Transform sanity data to accordion format
    const accordionItems: AccordionItem[] = data.accordionItems?.map((item, index) => ({
        id: `accordion-${index}`,
        title: item.title,
        content: <p className="text-lg leading-relaxed">{item.content}</p>,
        color: item.color,
    })) || [];

    const items: GridItem[] = [
        {
            id: 1,
            content: (
                <MainTitleAnimation text={data.heading} className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[10vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight" />
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
                <HighlightText text={data.mainline} />
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
        // Accordion section - Combined area that spans full width but positions content correctly
        {
            id: 10,
            content: (
                <div className="w-full h-full relative overflow-visible">
                    {/* Title - positioned on the left, only visible when accordion is closed */}
                    {(!isAnyAccordionOpen && data.accordionHeading) && (
                        <div className="absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center">
                            <p className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[6vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight">
                                {data.accordionHeading}
                            </p>
                        </div>
                    )}
                    
                    {/* Accordion - positioned on the right, can expand to full width */}
                    {accordionItems.length > 0 && (
                        <div className="absolute top-0 right-0 w-1/2 h-full -mr-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:-mr-[4vh] overflow-visible">
                            <HorizontalAccordion
                                items={accordionItems}
                                className="h-full overflow-visible"
                                tabWidth="calc(50vw / 3)" // Each tab takes 1/3 of half screen width
                                expandedWidth={600}
                                onActiveChange={setIsAnyAccordionOpen}
                                fullContainerWidth="calc(100vw - 2vh)" // Expand to full viewport width minus page padding
                            />
                        </div>
                    )}
                </div>
            ),
            colSpan: 6, // Full width container
            rowSpan: 4,
            mobileColSpan: 2,
            mobileRowSpan: 4,
            landscapeColSpan: 4,
            landscapeRowSpan: 4,
        },
    ];

    return (
        <>
            <Header />
            <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2] overflow-visible">
                <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh] overflow-visible">
                    {items.map((item) => (
                        <div key={item.id} className={`${getGridClasses(item)} overflow-visible`}>
                            {item.content}
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}
