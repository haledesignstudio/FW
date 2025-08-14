'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import type { HomePageContent } from '@/app/home-client';
import { urlFor } from '@/sanity/lib/image';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';

type HomeAccordionProps = { data: HomePageContent };

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

export default function HomeAccordion({ data }: HomeAccordionProps) {
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
                            {data.section1.section1Title}
                        </div>
                    ),
                },
                items: [
                    {
                        id: 1,
                        content: (
                            <div className="text-[clamp(1vw,3.5vh,1.75vw)] font-roboto leading-tight text-white">
                                <PortableText value={data.section1.section1Body} />
                            </div>
                        ),
                        colSpan: 3,
                        rowSpan: 1,
                        mobileColSpan: 2,
                        mobileRowSpan: 1,
                        landscapeColSpan: 3,
                        landscapeRowSpan: 1,
                    },
                    {
                        id: 2,
                        content: data.section2?.section2Image?.asset ? (
                            <div className="w-full h-full relative">
                                <Image
                                    src={urlFor(data.section2.section2Image.asset).url()}
                                    alt={data.section2.section2Image.alt || 'Process image'}
                                    className="w-full h-full object-cover rounded"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        ) : null,
                        colSpan: 3,
                        rowSpan: 2,
                        mobileColSpan: 2,
                        mobileRowSpan: 1,
                        landscapeColSpan: 3,
                        landscapeRowSpan: 1,
                    },
                    {
                        id: 3,
                        content:
                            <></>,
                        colSpan: 3,
                        rowSpan: 1,
                        mobileColSpan: 2,
                        mobileRowSpan: 1,
                        landscapeColSpan: 3,
                        landscapeRowSpan: 1,
                    },
                    {
                        id: 4,
                        content: (
                            <div className="h-full flex flex-col justify-end">
                                <div className="text-[clamp(0.9vw,2.25vh,1.125vw)] font-graphik leading-[clamp(0.9vw,2.25vh,1.125vw)]">
                                    <a
                                        href={`mailto:${data.section1.section1Email ?? 'info@futureworld.org'}?subject=${encodeURIComponent(data.section1.section1CTA ?? '')}`}
                                        className="transition cursor-pointer"
                                    >
                                        <UnderlineOnHoverAnimation hasStaticUnderline color="#fff">
                                            {data.section1.section1CTA ?? 'Get in Touch'}
                                        </UnderlineOnHoverAnimation>
                                    </a>
                                </div>
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

            {
                id: 'process',
                color: '#DC5A50',
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
                            {data.section2.section2Title}
                        </div>
                    ),
                },
                items: [
                    {
                        id: 1,
                        content: (
                            <div className="h-full flex flex-col justify-end">
                                <div className="text-[clamp(1vw,3.5vh,1.75vw)] font-roboto leading-tight text-white">
                                    <PortableText value={data.section2.section2Body} />
                                </div>
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
                        id: 3,
                        content: data.section2?.section2Image?.asset ? (
                            <div className="w-full h-full relative">
                                <Image
                                    src={urlFor(data.section2.section2Image.asset).url()}
                                    alt={data.section2.section2Image.alt || 'Process image'}
                                    className="w-full h-full object-contain object-top object-center opacity-50"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
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
                        content: (
                            <div className="h-full flex flex-col gap-[2.5vh] mt-[10vh]">
                                <div className="text-[2vh] font-roboto leading-tight text-white">
                                    <PortableText value={data.section2.section2Heading1} />
                                </div>
                                <div className="text-[1.75vh] font-roboto leading-tight text-white">
                                    <PortableText value={data.section2.section2Description1} />
                                </div>
                            </div>
                        ),

                        colSpan: 1,
                        rowSpan: 2,
                        mobileColSpan: 2,
                        mobileRowSpan: 1,
                        landscapeColSpan: 3,
                        landscapeRowSpan: 1,
                    },
                    {
                        id: 5,
                        content: (
                            <div className="h-full flex flex-col gap-[2.5vh] mt-[10vh]">
                                <div className="text-[2vh] font-roboto leading-tight text-white">
                                    <PortableText value={data.section2.section2Heading2} />
                                </div>
                                <div className="text-[1.75vh] font-roboto leading-tight text-white">
                                    <PortableText value={data.section2.section2Description2} />
                                </div>
                            </div>
                        ),
                        colSpan: 1,
                        rowSpan: 2,
                        mobileColSpan: 2,
                        mobileRowSpan: 1,
                        landscapeColSpan: 3,
                        landscapeRowSpan: 1,
                    },
                    {
                        id: 6,
                        content: (
                            <div className="h-full flex flex-col gap-[2.5vh] mt-[10vh]">
                                <div className="text-[2vh] font-roboto leading-tight text-white">
                                    <PortableText value={data.section2.section2Heading3} />
                                </div>
                                <div className="text-[1.75vh] font-roboto leading-tight text-white">
                                    <PortableText value={data.section2.section2Description3} />
                                </div>
                            </div>
                        ),
                        colSpan: 1,
                        rowSpan: 2,
                        mobileColSpan: 2,
                        mobileRowSpan: 1,
                        landscapeColSpan: 3,
                        landscapeRowSpan: 1,
                    },
                ],
            },

            {
                id: 'case-studies',
                color: '#F9F7F2',
                titleItem: {
                    id: 0,
                    colSpan: 6, rowSpan: 1,
                    mobileColSpan: 2, mobileRowSpan: 1,
                    landscapeColSpan: 6, landscapeRowSpan: 1,
                    content: (
                        <div className="cursor-pointer text-[20vh] font-bold leading-none"
                            onClick={(e) => { e.stopPropagation(); toggleTab('case-studies'); }}>
                            {data.section3.section3Title}
                        </div>
                    ),
                },
                items: [
                    {
                        id: 1,
                        content: (
                            <div className="h-full flex flex-col justify-end">
                                <div className="text-[clamp(1vw,3.5vh,1.75vw)] font-roboto leading-tight text-black">
                                    <PortableText value={data.section3.section3Body} />
                                </div>
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