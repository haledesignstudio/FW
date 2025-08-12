'use client';

import React, { useEffect, useState, Suspense } from "react";
import Header from '@/components/header';
import Footer from '@/components/footer';
import { client } from '@/sanity/lib/client';
import { superchargeTomorrowQuery } from '@/sanity/lib/queries';
import { PortableTextBlock } from '@portabletext/types';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import { HighlightText } from '@/components/HighlightText';
import SuperchargeTomorrowAccordion from "@/components/SuperchargeTomorrowAccordion";



type PT = PortableTextBlock[];

/** Accordion Section 1 */
export type AccordionSection1Statement = {
    body: PT;
};

export type AccordionSection1 = {
    heading: string;
    subheading: PT;
    description: PT;
    image: {
        asset: {
            _ref: string;
            _type: string;
        };
    };
    cta: string;
    email: string;
    // exactly 4
    statements: [
        AccordionSection1Statement,
        AccordionSection1Statement,
        AccordionSection1Statement,
        AccordionSection1Statement
    ];
};

/** Accordion Section 2 */
export type AccordionSection2Item = {
    heading: PT;
    body: PT;
};

export type AccordionSection2_Subsection1 = {
    description: PT;
    // exactly 3
    statements: [
        AccordionSection2Item,
        AccordionSection2Item,
        AccordionSection2Item
    ];
};

export type AccordionSection2_Subsection2 = {
    description: PT;
    // exactly 2
    statements: [AccordionSection2Item, AccordionSection2Item];
};

export type AccordionSection2 = {
    heading: string;
    subheading: PT;
    cta: string;
    email: string;
    section1: AccordionSection2_Subsection1;
    section2: AccordionSection2_Subsection2;
};

/** Accordion Section 3 */
export type AccordionSection3 = {
    heading: string;
    subheading: PT;
    description: PT;
    image: {
        asset: {
            _ref: string;
            _type: string;
        };
    };
    cta: string;
    email: string;
};

/** Top-level document */
export type SuperchargeTomorrowPageContent = {
    _id: string;
    title: string;
    heading: string;
    subheading: PT;

    accordionSection1: AccordionSection1;
    accordionSection2: AccordionSection2;
    accordionSection3: AccordionSection3;
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

function SuperchargeTomorrowContent() {
    const [data, setData] = useState<SuperchargeTomorrowPageContent | null>(null);

    useEffect(() => {
        client.fetch<SuperchargeTomorrowPageContent>(superchargeTomorrowQuery).then((res) => {
            setData(res);
        });
    }, []);

    if (!data) return null;

    const items: GridItem[] = [
        {
            id: 1,
            content: (
                <MainTitleAnimation
                    text={data.title}
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
            colSpan: 4,
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
                    <div className="text-[clamp(8vw,20vh,10vw)] font-graphik leading-[clamp(8vw,20vh,10vw)]">
                        {data.heading}
                    </div>
                </FadeInOnVisible>
            ),
            colSpan: 5,
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
            colSpan: 1,
            rowSpan: 2,
            mobileColSpan: 2,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 5,
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
            id: 6,
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
        

    ];

    return (
        <>
            <Header />
            <main className="bg-[#F9F7F2]">
                <div className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2] overflow-visible">
                    <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh] overflow-visible">
                        {items.map((item) => (
                            <div key={item.id} className={`${getGridClasses(item)} overflow-visible`}>
                                {item.content}
                            </div>
                        ))}
                    </div>
                </div>
                <FadeInOnVisible>
                <SuperchargeTomorrowAccordion data={data} />
                </FadeInOnVisible>
            </main>
            <Footer />
        </>
    );
}

export default function SuperchargeTomorrow() {
    return (
        <Suspense fallback={null}>
            <SuperchargeTomorrowContent />
        </Suspense>
    );
}
