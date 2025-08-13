'use client';

import { useState } from 'react';
import { PortableText } from '@portabletext/react';
import type { OurWorkContent } from '@/app/our-work/our-work';
import { urlFor } from '@/sanity/lib/image';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import Link from 'next/link';


type OurWorkAccordionProps = { data: OurWorkContent };

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

function getGridClasses(item: GridItem) {
    const base = ['flex', 'flex-col'];
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
}

export default function OurWorkAccordion({ data }: OurWorkAccordionProps) {
    // Changed from single string to Set of strings to track multiple open tabs
    const [openTabs, setOpenTabs] = useState<Set<string>>(new Set());

    // Helper function to toggle a tab's open state
    const toggleTab = (tabId: string) => {
        setOpenTabs(prevOpenTabs => {
            const newOpenTabs = new Set(prevOpenTabs);
            if (newOpenTabs.has(tabId)) {
                newOpenTabs.delete(tabId);
            } else {
                newOpenTabs.add(tabId);
            }
            return newOpenTabs;
        });
    };

    const tabs: {
        id: string;
        color: string;
        titleItem: GridItem;
        items: GridItem[];
    }[] = [
            {
                id: 'benchmark',
                color: '#1B1B1B',
                titleItem: {
                    id: 0,
                    colSpan: 6,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 6,
                    landscapeRowSpan: 1,
                    content: (
                        <div className="cursor-pointer text-[20vh] font-bold leading-none"
                            onClick={(e) => { e.stopPropagation(); toggleTab('benchmark'); }}>
                            {data.accordionSection1.heading}
                        </div>
                    ),
                },
                items: [
                    {
                        id: 1,
                        content: (
                            <div className="text-[clamp(1vw,3.5vh,1.75vw)] font-roboto leading-tight text-white">
                                <PortableText value={data.accordionSection1.body} />
                            </div>
                        ),
                        colSpan: 2,
                        rowSpan: 1,
                        mobileColSpan: 2,
                        mobileRowSpan: 1,
                        landscapeColSpan: 3,
                        landscapeRowSpan: 1,
                    },
                    {
                        id: 2,
                        content: (
                            <></>
                        ),
                        colSpan: 1,
                        rowSpan: 1,
                        mobileColSpan: 2,
                        mobileRowSpan: 1,
                        landscapeColSpan: 3,
                        landscapeRowSpan: 1,
                    },
                    {
                        id: 3,
                        content: data.accordionSection1.mainImage.asset ? (
                            <img
                                src={urlFor(data.accordionSection1.mainImage.asset).url()}
                                alt={'Process image'}
                                className="w-[80vw] h-[120vh] object-contain mt-[-40vh]"
                            />
                        ) : null,
                        colSpan: 3,
                        rowSpan: 3,
                        mobileColSpan: 2,
                        mobileRowSpan: 1,
                        landscapeColSpan: 3,
                        landscapeRowSpan: 1,
                    },
                    {
                        id: 4,
                        content: data.accordionSection1.brandImage.asset ? (
                            <img
                                src={urlFor(data.accordionSection1.brandImage.asset).url()}
                                alt={'Process image'}
                                className="w-[70%] h-auto object-contain"
                            />
                        ) : null,
                        colSpan: 2,
                        rowSpan: 1,
                        mobileColSpan: 2,
                        mobileRowSpan: 1,
                        landscapeColSpan: 3,
                        landscapeRowSpan: 1,
                    },
                    {
                        id: 5,
                        content: (
                            <></>
                        ),
                        colSpan: 1,
                        rowSpan: 1,
                        mobileColSpan: 2,
                        mobileRowSpan: 1,
                        landscapeColSpan: 3,
                        landscapeRowSpan: 1,
                    },
                    {
                        id: 6,
                        content: (

                            <Link href="/supercharge-tomorrow" className="h-full flex flex-col justify-end">
                                <div className="text-[clamp(0.9vw,2.25vh,1.125vw)] font-graphik leading-[clamp(0.9vw,2.25vh,1.125vw)]">

                                        <UnderlineOnHoverAnimation hasStaticUnderline color="#fff">
                                            {data.accordionSection1.cta?? 'Get in Touch'}
                                        </UnderlineOnHoverAnimation>
                                </div>
                            </Link>
                        ),
                        colSpan: 1,
                        rowSpan: 1,
                        mobileColSpan: 2,
                        mobileRowSpan: 1,
                        landscapeColSpan: 3,
                        landscapeRowSpan: 1,
                    },



                ],
            },

            {
                id: 'process',
                color: '#F9F7F2',
                titleItem: {
                    id: 0,
                    colSpan: 6,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 6,
                    landscapeRowSpan: 1,
                    content: (
                        <div className="cursor-pointer text-[20vh] font-bold leading-none"
                            onClick={(e) => { e.stopPropagation(); toggleTab('process'); }}>
                            {data.accordionSection2.heading}
                        </div>
                    ),
                },
                items: [
                    {
                        id: 1,
                        content: (

                                <div className="text-[clamp(1vw,3.5vh,1.75vw)] font-roboto leading-tight text-black">
                                    <PortableText value={data.accordionSection2.body} />
                                </div>
                        ),
                        colSpan: 2,
                        rowSpan: 1,
                        mobileColSpan: 2,
                        mobileRowSpan: 1,
                        landscapeColSpan: 3,
                        landscapeRowSpan: 1,
                    },

                ],
            },


        ];

    return (
        <div className="">
            {tabs.map((tab) => {
                const isActive = openTabs.has(tab.id);

                return (
                    <div
                        key={tab.id}
                        className="transition-all duration-500 overflow-hidden"
                        style={{
                            backgroundColor: tab.color,
                            color: tab.color === '#F9F7F2' ? '#000' : '#fff',
                        }}
                        onClick={() => toggleTab(tab.id)}
                    >
                        {/* Grid wrapper: collapsed shows exactly one row height */}
                        <div className={[
                            "p-[4vh]",
                            "overflow-hidden transition-[max-height] duration-500",
                            !isActive
                                ? "max-h-[35vh]"
                                : "max-h-[9999px]"
                        ].join(' ')}
                        >
                            <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh]">

                                {/* Title as a grid item with custom spans */}
                                <div className={`${getGridClasses(tab.titleItem)} p-4`}>
                                    {tab.titleItem.content}
                                </div>

                                {/* Rest of items */}
                                {tab.items.map((item) => (
                                    <div key={item.id} className={`${getGridClasses(item)} p-4`}>
                                        {item.content}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}