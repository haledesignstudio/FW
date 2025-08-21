'use client';

import React, { useState, useEffect } from "react";
import Header from '@/components/header';
import Footer from '@/components/footer';
import { PortableText } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import { HighlightText } from '@/components/HighlightText';
import WhatWeDoAccordion from "@/components/WhatWeDoAccordion";

type AccordionEntry = {
    title: PortableTextBlock[];
    body: PortableTextBlock[];
};

type AccordionItem = {
    heading: string;
    subheading: PortableTextBlock[];
    description: PortableTextBlock[];
    image: {
        asset: {
            _ref: string;
            _type: string;
        };
    };
    prompt: PortableTextBlock[];
    entries: [AccordionEntry, AccordionEntry, AccordionEntry]; // exactly 3
};

export type WhatWeDoPageContent = {
    _id: string;
    heading: string;
    subheading: PortableTextBlock[];
    cta: string;
    email: string;
    statement1: PortableTextBlock[];
    statement2: PortableTextBlock[];
    statement3: PortableTextBlock[];
    accordion: {
        heading: string;
        subheading: PortableTextBlock[];
        items: [AccordionItem, AccordionItem, AccordionItem]; // exactly 3
    };
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
    const base = ['bg-[#F9F7F2]', 'flex', 'flex-col'];
    if (item.mobileColSpan === 0 || item.mobileRowSpan === 0) {
        base.push('block', '[@media(max-width:767px)]:hidden');
    } else {
        base.push(`col-span-${item.mobileColSpan}`, `row-span-${item.mobileRowSpan}`);
    }

    if (item.landscapeColSpan === 0 || item.landscapeRowSpan === 0) {
        base.push('[@media(max-height:600px)_and_(max-width:768px)]:hidden');
    } else {
        base.push(`[@media(max-height:600px)_and_(max-width:768px)]:col-span-${item.landscapeColSpan}`);
        base.push(`[@media(max-height:600px)_and_(max-width:768px)]:row-span-${item.landscapeRowSpan}`);
    }

    if (item.colSpan === 0 || item.rowSpan === 0) {
        base.push('[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:hidden');
    } else {
        base.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-${item.colSpan}`);
        base.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-${item.rowSpan}`);
    }

    return base.join(' ');
};

interface WhatWeDoClientProps {
    data: WhatWeDoPageContent;
}

export default function WhatWeDoClient({ data }: WhatWeDoClientProps) {
    // Mobile detection with hydration safety
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Check if mobile
    const isMobileScreen = isClient && window.innerWidth < 768;

    // Handle back to top functionality
    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const items: GridItem[] = [
        {
            id: 1,
            content: (
                <MainTitleAnimation
                    text={data.heading}
                    typeSpeed={60}
                    delay={500}
                    className="text-[clamp(4vw,10vh,5vw)] font-graphik leading-tight text-balance"
                />
            ),
            colSpan: 2,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 2,
            content: (
                <></>
            ),
            colSpan: 1,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 3,
            content: (
                <FadeInOnVisible>
                    <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-bold leading-tight">
                        <HighlightText value={data.subheading} />
                    </div>
                </FadeInOnVisible>
            ),
            colSpan: 3,
            rowSpan: 2,
            mobileColSpan: 2,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 4,
            content: (
                <></>
            ),
            colSpan: 3,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 5,
            content: (
                <FadeInOnVisible>
                    <div className="text-[clamp(0.9vw,2.25vh,1.125vw)]  font-graphik leading-[clamp(0.9vw,3vh,1.5vw)] ">
                        <a
                            href={`mailto:${data.email ?? 'info@futureworld.org'}?subject=${encodeURIComponent(data.cta ?? '')}`}
                            className="transition cursor-pointer"
                        >
                            <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                                {data.cta ?? 'Get in Touch'}
                            </UnderlineOnHoverAnimation>
                        </a>
                    </div>
                </FadeInOnVisible>
            ),
            colSpan: 1,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 2,
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
            mobileColSpan: 2,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 7,
            content: (
                <FadeInOnVisible>
                    <div className="text-[clamp(0.75vw,2vh,1vw)] leading-tight">
                        <PortableText value={data.statement1} />
                    </div>
                </FadeInOnVisible>
            ),
            colSpan: 1,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 8,
            content: (
                <FadeInOnVisible>
                    <div className="text-[clamp(0.75vw,2vh,1vw)] leading-tight">
                        <PortableText value={data.statement2} />
                    </div>
                </FadeInOnVisible>
            ),
            colSpan: 1,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 9,
            content: (
                <FadeInOnVisible>
                    <div className="text-[clamp(0.75vw,2vh,1vw)] leading-tight">
                        <PortableText value={data.statement3} />
                    </div>
                </FadeInOnVisible>
            ),
            colSpan: 1,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 10,
            content: (
                <FadeInOnVisible>
                    <div id="how-we-do-it" className="text-[clamp(0.75vw,2vh,1vw)] leading-tight">
                        <WhatWeDoAccordion data={data} />
                    </div>
                </FadeInOnVisible>
            ),
            colSpan: 6,
            rowSpan: 4,
            mobileColSpan: 2,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },

    ];

    return (
        <>
            <Header />
            <main className="bg-[#F9F7F2]">
                {isMobileScreen ? (
                    // MOBILE LAYOUT
                    <div className="p-[2vh] bg-[#F9F7F2]">
                        <div className="grid grid-cols-4 gap-[2vh] auto-rows-[5vh]">
                            {/* Row 1: Heading (col 1-3) */}
                            <div className="col-span-3 row-span-1 flex items-center">
                                <FadeInOnVisible>
                                    <MainTitleAnimation
                                        text={data.heading}
                                        typeSpeed={60}
                                        delay={500}
                                        className="text-[6vw] font-graphik leading-tight text-balance"
                                    />
                                </FadeInOnVisible>
                            </div>
                            <div className="col-span-1"></div>

                            {/* Row 2: Empty */}
                            <div className="col-span-4"></div>

                            {/* Row 3-4: Subheading (col 1-4) */}
                            <div className="col-span-4 row-span-2 flex items-center">
                                <FadeInOnVisible>
                                    <div className="text-[4vw] font-bold leading-tight">
                                        <HighlightText value={data.subheading} />
                                    </div>
                                </FadeInOnVisible>
                            </div>

                            {/* Row 5: Empty */}
                            <div className="col-span-4"></div>

                            {/* Row 6: Statement 1 (col 1-4) */}
                            <div className="col-span-4 row-span-1 flex items-center">
                                <FadeInOnVisible>
                                    <div className="text-[3.5vw] leading-tight">
                                        <PortableText value={data.statement1} />
                                    </div>
                                </FadeInOnVisible>
                            </div>

                            {/* Row 7: Statement 2 (col 1-4) */}
                            <div className="col-span-4 row-span-1 flex items-center">
                                <FadeInOnVisible>
                                    <div className="text-[3.5vw] leading-tight">
                                        <PortableText value={data.statement2} />
                                    </div>
                                </FadeInOnVisible>
                            </div>

                            {/* Row 8: Statement 3 (col 1-4) */}
                            <div className="col-span-4 row-span-1 flex items-center">
                                <FadeInOnVisible>
                                    <div className="text-[3.5vw] leading-tight">
                                        <PortableText value={data.statement3} />
                                    </div>
                                </FadeInOnVisible>
                            </div>

                            {/* Row 9: CTA Button (col 3-4, right aligned) */}
                            <div className="col-span-2"></div>
                            <div className="col-span-2 row-span-1 flex items-center justify-end">
                                <FadeInOnVisible>
                                    <div className="text-[3vw] font-graphik leading-tight">
                                        <a
                                            href={`mailto:${data.email ?? 'info@futureworld.org'}?subject=${encodeURIComponent(data.cta ?? '')}`}
                                            className="transition cursor-pointer"
                                        >
                                            <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                                                {data.cta ?? 'Get in Touch'}
                                            </UnderlineOnHoverAnimation>
                                        </a>
                                    </div>
                                </FadeInOnVisible>
                            </div>

                            {/* Row 10: Accordion Heading (col 1-3) */}
                            <div className="col-span-3 row-span-1 flex items-center">
                                <FadeInOnVisible>
                                    <MainTitleAnimation
                                        text={data.accordion.heading}
                                        typeSpeed={60}
                                        delay={500}
                                        className="text-[6vw] font-graphik leading-tight text-balance"
                                    />
                                </FadeInOnVisible>
                            </div>
                            <div className="col-span-1"></div>

                            {/* Row 11: Empty */}
                            <div className="col-span-4"></div>

                            {/* Row 12-13: Accordion Subheading (col 1-4) */}
                            <div className="col-span-4 row-span-2 flex items-center">
                                <FadeInOnVisible>
                                    <div className="text-[4vw] font-bold leading-tight">
                                        <HighlightText value={data.accordion.subheading} />
                                    </div>
                                </FadeInOnVisible>
                            </div>
                        </div>

                        {/* Row 14+: Vertical Accordion Component */}
                        <div className="mt-[4vh]">
                            <WhatWeDoAccordion data={data} />
                        </div>

                        {/* Back to Top Button */}
                        <div className="grid grid-cols-4 gap-[2vh] mt-[4vh]">
                            <div className="col-start-3 col-span-2 flex justify-end items-center mt-2 cursor-pointer" onClick={handleBackToTop}>
                                <FadeInOnVisible>
                                    <span className="underline text-[2vh] flex items-center gap-1 font-bold">
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            style={{ transform: 'rotate(-45deg)' }}
                                        >
                                            <path d="M12 19V5M5 12l7-7 7 7" />
                                        </svg>
                                        Back to top
                                    </span>
                                </FadeInOnVisible>
                            </div>
                        </div>
                    </div>
                ) : (
                    // DESKTOP LAYOUT (existing)
                    <>
                        <div className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2] overflow-visible">
                            <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh] overflow-visible">
                                {items.map((item) => (
                                    <div key={item.id} className={`${getGridClasses(item)} overflow-visible`}>
                                        {item.content}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* <div className="w-full">
                            <WhatWeDoAccordion data={data} />
                        </div> */}
                    </>
                )}
            </main>
            <Footer />
        </>
    );
}
