'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import './accordion-animations.css';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';
import { PortableTextBlock } from '@portabletext/react';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import { HighlightText } from '@/components/HighlightText';

export type WhatWeDoEntry = {
    title: PortableTextBlock[];
    body: PortableTextBlock[];
};

/**
 * Represents each `accordionItem` object inside `items`.
 * Each contains heading, subheading, description, prompt, and entries.
 */
export type WhatWeDoAccordionItem = {
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
    entries: [WhatWeDoEntry, WhatWeDoEntry, WhatWeDoEntry];
};

function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < breakpoint);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, [breakpoint]);
    return isMobile;
}

/**
 * Represents the `accordion` object.
 * Contains heading, subheading, and exactly three accordion items.
 */
export type WhatWeDoAccordion = {
    heading: string;
    subheading: PortableTextBlock[];
    items: [
        WhatWeDoAccordionItem,
        WhatWeDoAccordionItem,
        WhatWeDoAccordionItem
    ];
};

/**
 * Top-level `whatWeDo` document.
 * Matches the Sanity schema exactly.
 */
export type WhatWeDoDocument = {
    /** Sanity system fields (optional) */
    _id?: string;
    _type?: 'whatWeDo';

    /** Intro fieldset */
    heading: string;
    subheading: PortableTextBlock[];

    /** Call to Action (CTA) fieldset */
    cta: string;
    email: string;

    /** Statements fieldset */
    statement1: PortableTextBlock[];
    statement2: PortableTextBlock[];
    statement3: PortableTextBlock[];

    /** Accordion fieldset */
    accordion: WhatWeDoAccordion;
};

export type WhatWeDoAccordionProps = { data: WhatWeDoDocument };

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

type Active = 'sec2' | 'sec3' | 'sec4' | null;

function placement(section: 'sec1' | 'sec2' | 'sec3' | 'sec4', active: Active) {
    // Returns { start, span } for a 6-column grid, implementing the left-expansion rules.
    if (active === null) {
        if (section === 'sec1') return { start: 1, span: 3 };
        if (section === 'sec2') return { start: 4, span: 1 };
        if (section === 'sec3') return { start: 5, span: 1 };
        return { start: 6, span: 1 }; // sec4
    }
    if (active === 'sec2') {
        if (section === 'sec1') return { start: 1, span: 0 };
        if (section === 'sec2') return { start: 1, span: 4 }; // expands left (cols 1-4)
        if (section === 'sec3') return { start: 5, span: 1 };
        return { start: 6, span: 1 };
    }
    if (active === 'sec3') {
        if (section === 'sec1') return { start: 1, span: 0 };
        if (section === 'sec2') return { start: 1, span: 1 };
        if (section === 'sec3') return { start: 2, span: 4 }; // expands left (cols 2-5)
        return { start: 6, span: 1 };
    }
    // active === 'sec4'
    if (section === 'sec1') return { start: 1, span: 0 };
    if (section === 'sec2') return { start: 1, span: 1 };
    if (section === 'sec3') return { start: 2, span: 1 };
    return { start: 3, span: 4 }; // expands left (cols 3-6)
}

// Wrap plain strings so you can style them reliably inside list items/blocks
const wrapStrings = (children: React.ReactNode): React.ReactNode => {
    if (typeof children === 'string') return <span>{children}</span>;
    if (Array.isArray(children)) {
        return children.map((c, i) =>
            typeof c === 'string' ? <span key={i}>{c}</span> : c
        ) as React.ReactNode;
    }
    return children;
};

const ptComponents: PortableTextComponents = {
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li className="mb-1">{wrapStrings(children)}</li>,
        number: ({ children }) => <li className="mb-1">{wrapStrings(children)}</li>,
    },
    block: {
        normal: ({ children }) => <p className="mb-2">{wrapStrings(children)}</p>,
    },
};



export default function WhatWeDoAccordion({ data }: WhatWeDoAccordionProps) {
    const isMobile = useIsMobile();
    const [openTabs, setOpenTabs] = useState<number[]>([]);

    const [active, setActive] = useState<Active>(null);
    const toggle = (id: Active) => setActive(prev => (prev === id ? null : id));

    // Animation state for desktop open content
    const [animatingSection, setAnimatingSection] = useState<Active | null>(null);
    const [hasInteracted, setHasInteracted] = useState(false);
    const animationTimeout = useRef<NodeJS.Timeout | null>(null);

    // Track previous active tab to detect re-opening the same tab
    const prevActiveRef = useRef<Active | null>(null);
    useEffect(() => {
        // Only animate if not mobile, not initial load, and a tab is opened
        if (active && !isMobile && hasInteracted) {
            // Always reset animation, even if opening the same tab again
            setAnimatingSection(null);
            if (animationTimeout.current) clearTimeout(animationTimeout.current);
            animationTimeout.current = setTimeout(() => setAnimatingSection(active), 20);
        }
        prevActiveRef.current = active;
        return () => {
            if (animationTimeout.current) clearTimeout(animationTimeout.current);
        };
    }, [active, isMobile, hasInteracted]);

    // Set hasInteracted to true after first tab click
    const handleTabClick = (id: Active, clickable: boolean) => {
        if (clickable) {
            setHasInteracted(true);
            toggle(id);
        }
    };

    if (isMobile) {
        // Mobile vertical accordion layout with animated max-height
        return (
            <div className="w-screen -mx-[calc((100vw-100%)/2)] px-0">
                {data.accordion.items.map((item, idx) => {
                    const isOpen = openTabs.includes(idx);
                    // Colors
                    const bg = idx === 0 ? '#232323' : idx === 1 ? '#DC5A50' : '#F9F7F2';
                    const fg = idx === 2 ? '#232323' : '#F9F7F2';
                    return (
                        <div
                            key={idx}
                            className={`w-full px-0 mx-0 transition-all duration-800 overflow-hidden`}
                            style={{ background: bg, color: fg, maxHeight: isOpen ? '9999px' : '8vh' }}
                            onClick={() => setOpenTabs(prev => isOpen ? prev.filter(i => i !== idx) : [...prev, idx])}
                        >
                            {/* Closed state: only row 1 visible, click to open */}
                            {!isOpen && (
                                <div className="grid grid-cols-4 min-h-[7vh] items-center px-3 py-2 w-full">
                                    <div className="col-span-1 row-start-1 row-span-1 dt-h2 leading-tight">{idx + 1}</div>
                                    <div className="col-span-3 row-start-1 row-span-1 text-right dt-h1 leading-tight truncate">{item.heading}</div>
                                </div>
                            )}
                            {/* Open state: full vertical accordion */}
                            {isOpen && (
                                <div className="grid grid-cols-4 gap-y-1  items-center auto-rows-[minmax(50px,auto)] px-3 py-2 w-full">
                                    {/* Row 5: col 1: number, col 2-4: subheading (first word in row 5, rest in row 6) */}
                                    <div className="col-span-1 row-start-1 row-span-1 dt-h2 leading-tight">{idx + 1}</div>
                                    {/* Subheading split: first word row 5, rest row 6 */}
                                    {(() => {
                                        const subheading = item.subheading && item.subheading.length > 0 ? item.subheading[0].children?.[0]?.text || '' : '';
                                        const [firstWord, ...rest] = subheading.split(' ');
                                        return <>
                                            <div className="col-span-3 row-start-1 row-span-1 text-right dt-h1 leading-tight">{firstWord}</div>
                                            <div className="col-start-2 row-start-2 row-span-1 col-span-3 text-right dt-h3 leading-tight">{rest.join(' ')}</div>
                                        </>;
                                    })()}
                                    {/* Row 7-8: Image (col 1-4) */}
                                    {item.image?.asset && (
                                        <div className="col-span-4 row-start-3 row-span-2 flex justify-center items-center">
                                            <Image
                                                src={urlFor(item.image.asset).url()}
                                                alt="Process image"
                                                className="w-full max-h-[160px] h-full object-cover"
                                                style={{ aspectRatio: '16/9' }}
                                                width={320}
                                                height={160}
                                                priority={false}
                                            />
                                        </div>
                                    )}
                                    {/* Row 9-11: Description (col 1-4) */}
                                    <div className="col-span-4 dt-h4 mt-2 pb-4">
                                        <PortableText value={item.description} components={ptComponents} />
                                    </div>
                                    {/* Row 12: Empty */}
                                    <div className="col-span-4 h-[1vh]"></div>
                                    {/* Row 13: col 1-2: prompt, col 3-4: entry 0 */}
                                    <div className="col-span-2 dt-h5 leading-tight">
                                        <PortableText value={item.prompt} />
                                    </div>
                                    <div className="col-span-2">
                                        <div className="dt-h5 pb-4"><PortableText value={item.entries[0].title} /></div>
                                        <div className="dt-body-sm pb-4"><PortableText value={item.entries[0].body} /></div>
                                    </div>
                                    {/* Row 15-16: col 3-4: entry 1 */}
                                    <div className="col-start-3 col-span-2">
                                        <div className="dt-h5 pb-4"><PortableText value={item.entries[1].title} /></div>
                                        <div className="dt-body-sm pb-4"><PortableText value={item.entries[1].body} /></div>
                                    </div>
                                    {/* Row 17-18: col 1-2: entry 2 */}
                                    <div className="col-span-2">
                                        <div className="dt-h5 pb-4"><PortableText value={item.entries[2].title} /></div>
                                        <div className="dt-body-sm pb-4"><PortableText value={item.entries[2].body} /></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }

    // ---- Section definitions with unique items per tab ----
    const sections = [
        {
            key: 'sec1' as const,
            clickable: false,
            bg: '#F9F7F2',
            fg: '#000',
            title: 'Section 1',
            titleItem: {
                id: 0,
                colSpan: 0,
                rowSpan: 2,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 6,
                landscapeRowSpan: 1,
                content: <></>,
            },
            items: [
                {
                    id: 1,
                    content: <></>,
                    colSpan: 4,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 2,
                    content: (
                        <MainTitleAnimation
                            text={data.accordion.heading}
                            typeSpeed={40}
                            delay={500}
                            className="dt-h2 text-balance text-[#232323]"
                        />

                    ),
                    colSpan: 2,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 3,
                    content: <></>,
                    colSpan: 2,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 4,
                    content:
                        <div className="dt-h3 text-[#232323]">
                            <HighlightText value={data.accordion.subheading} />
                        </div>
                    ,
                    colSpan: 4,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 5,
                    content: <></>,
                    colSpan: 4,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
            ] as GridItem[],
        },

        // ---- Section 2 (unique items) ----
        {
            key: 'sec2' as const,
            clickable: true,
            bg: '#232323',
            fg: '#FFF',
            title: 'Section 2',
            titleItem: {
                id: 0,
                colSpan: 6,
                rowSpan: 1,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 6,
                landscapeRowSpan: 1,
                content: <></>,
            },
            collapsedItems: [
                {
                    id: 201,
                    content:
                        <div className="dt-h2 text-[#F9F7F2]">
                            1
                        </div>,
                    colSpan: 1,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 202,
                    content:
                        <></>,
                    colSpan: 1, rowSpan: 6,
                    mobileColSpan: 2, mobileRowSpan: 1,
                    landscapeColSpan: 3, landscapeRowSpan: 1,
                },
                {
                    id: 203,
                    content:
                        <div className="h-full flex flex-col justify-end ">
                            <div className="dt-btn text-[#F9F7F2]">
                                {data.accordion.items[0].heading}
                            </div>
                        </div>,
                    colSpan: 1, rowSpan: 1,
                    mobileColSpan: 2, mobileRowSpan: 1,
                    landscapeColSpan: 3, landscapeRowSpan: 1,
                },


            ],
            items: [
                {
                    id: 1,
                    content: (
                        <div className="h-full flex flex-col  gap-[2vh]">
                            <div className="dt-h2 text-[#F9F7F2]">
                                1
                            </div>
                            <div className="dt-body-sm text-[#F9F7F2]">
                                <PortableText value={data.accordion.items[0].description} components={ptComponents} />
                            </div>
                        </div>
                    ),
                    colSpan: 1,
                    rowSpan: 4,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 2,
                    content: <></>,
                    colSpan: 1,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 3,
                    content:
                        <div className="dt-h3 mt-[2vh] text-balance text-right text-[#F9F7F2]">
                            <PortableText value={data.accordion.items[0].subheading} />
                        </div>,
                    colSpan: 2,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 4,
                    content: data.accordion.items[0].image.asset ? (
                        <Image
                            src={urlFor(data.accordion.items[0].image.asset).url()}
                            alt={'Process image'}
                            className="w-full h-full object-cover"
                            width={640}
                            height={360}
                            priority={false}
                        />
                    ) : null,
                    colSpan: 3,
                    rowSpan: 4,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 5,
                    content:
                        <div className="flex h-full pt-[14.5vh]">
                            <div className="dt-h5 text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordion.items[0].prompt} />
                            </div>
                        </div>,
                    colSpan: 1,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 6,
                    content:
                        <div className="relative h-full">
                            <div className="dt-h5 text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordion.items[0].entries[0].title} />
                            </div>
                            <div className="dt-body-sm absolute top-[8vh] left-0 text-[#F9F7F2] text-balance">
                                <PortableText value={data.accordion.items[0].entries[0].body} />
                            </div>
                        </div>,
                    colSpan: 1,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 7,
                    content:
                        <div className="relative h-full">
                            <div className="dt-h5 text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordion.items[0].entries[1].title} />
                            </div>
                            <div className="dt-body-sm absolute top-[8vh] left-0 text-[#F9F7F2] text-balance">
                                <PortableText value={data.accordion.items[0].entries[1].body} />
                            </div>
                        </div>
                    ,
                    colSpan: 1,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 8,
                    content:
                        <div className="relative h-full">
                            <div className="dt-h5 text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordion.items[0].entries[2].title} />
                            </div>
                            <div className="dt-body-sm absolute top-[8vh] left-0 text-[#F9F7F2] text-balance">
                                <PortableText value={data.accordion.items[0].entries[2].body} />
                            </div>
                        </div>,
                    colSpan: 1,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 9,
                    content:
                        <div className="flex items-end h-full">
                            <div className="dt-h1 text-[#F9F7F2]">
                                {data.accordion.items[0].heading}
                            </div>
                        </div>,
                    colSpan: 4,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
            ] as GridItem[],
        },

        // ---- Section 3 (unique items) ----
        {
            key: 'sec3' as const,
            clickable: true,
            bg: '#DC5A50',
            fg: '#fff',
            title: 'Section 3',
            titleItem: {
                id: 0,
                colSpan: 6,
                rowSpan: 1,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 6,
                landscapeRowSpan: 1,
                content: <div className="text-[20vh] font-bold leading-none"></div>,
            },
            collapsedItems: [
                {
                    id: 301,
                    content:
                        <div className="dt-h2 text-[#F9F7F2]">
                            2
                        </div>,
                    colSpan: 1,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 302,
                    content:
                        <></>,
                    colSpan: 1, rowSpan: 6,
                    mobileColSpan: 2, mobileRowSpan: 1,
                    landscapeColSpan: 3, landscapeRowSpan: 1,
                },
                {
                    id: 303,
                    content:
                        <div className="h-full flex flex-col justify-end ">
                            <div className="dt-btn text-[#F9F7F2]">
                                {data.accordion.items[1].heading}
                            </div>
                        </div>,
                    colSpan: 1, rowSpan: 1,
                    mobileColSpan: 2, mobileRowSpan: 1,
                    landscapeColSpan: 3, landscapeRowSpan: 1,
                },


            ],
            items: [
                {
                    id: 1,
                    content: (
                        <div className="h-full flex flex-col  gap-[2vh]">
                            <div className="dt-h2 text-[#F9F7F2]">
                                2
                            </div>
                            <div className="dt-body-sm text-[#F9F7F2]">
                                <PortableText value={data.accordion.items[1].description} components={ptComponents} />
                            </div>
                        </div>
                    ),
                    colSpan: 1,
                    rowSpan: 4,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 2,
                    content: <></>,
                    colSpan: 1,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 3,
                    content:
                        <div className="dt-h3 text-balance text-right text-[#F9F7F2]">
                            <PortableText value={data.accordion.items[1].subheading} />
                        </div>,
                    colSpan: 2,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 4,
                    content: data.accordion.items[1].image.asset ? (
                        <Image
                            src={urlFor(data.accordion.items[1].image.asset).url()}
                            alt={'Process image'}
                            className="w-full h-full object-cover"
                            width={640}
                            height={360}
                            priority={false}
                        />
                    ) : null,
                    colSpan: 3,
                    rowSpan: 4,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 5,
                    content:
                        <div className="flex h-full pt-[14.5vh]">
                            <div className="dt-h5 text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordion.items[1].prompt} />
                            </div>
                        </div>,
                    colSpan: 1,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 6,
                    content:
                        <div className="relative h-full">
                            <div className="dt-h5 text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordion.items[1].entries[0].title} />
                            </div>
                            <div className="dt-body-sm absolute top-[8vh] left-0 text-[#F9F7F2]">
                                <PortableText value={data.accordion.items[1].entries[0].body} />
                            </div>
                        </div>,
                    colSpan: 1,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 7,
                    content:
                        <div className="relative h-full">
                            <div className="dt-h5 text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordion.items[1].entries[1].title} />
                            </div>
                            <div className="dt-body-sm absolute top-[8vh] left-0 text-[#F9F7F2]">
                                <PortableText value={data.accordion.items[1].entries[1].body} />
                            </div>
                        </div>,
                    colSpan: 1,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 8,
                    content:
                        <div className="relative h-full">
                            <div className="dt-h5 text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordion.items[1].entries[2].title} />
                            </div>
                            <div className="dt-body-sm absolute top-[8vh] left-0 text-[#F9F7F2]">
                                <PortableText value={data.accordion.items[1].entries[2].body} />
                            </div>
                        </div>,
                    colSpan: 1,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 9,
                    content:
                        <div className="flex items-end h-full">
                            <div className="dt-h1 text-[#F9F7F2]">
                                {data.accordion.items[1].heading}
                            </div>
                        </div>,
                    colSpan: 4,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
            ] as GridItem[],
        },

        // ---- Section 4 (unique items) ----
        {
            key: 'sec4' as const,
            clickable: true,
            bg: '#F9F7F2',
            fg: '#000',
            title: 'Section 4',
            titleItem: {
                id: 0,
                colSpan: 6,
                rowSpan: 1,
                mobileColSpan: 2,
                mobileRowSpan: 1,
                landscapeColSpan: 6,
                landscapeRowSpan: 1,
                content: <div className="text-[20vh] font-bold leading-none">TitleTest</div>,
            },
            collapsedItems: [
                {
                    id: 401,
                    content:
                        <div className="dt-h2 text-[#232323]">
                            3
                        </div>,
                    colSpan: 1,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 402,
                    content:
                        <></>,
                    colSpan: 1, rowSpan: 6,
                    mobileColSpan: 2, mobileRowSpan: 1,
                    landscapeColSpan: 3, landscapeRowSpan: 1,
                },
                {
                    id: 403,
                    content:
                        <div className="h-full flex flex-col justify-end ">
                            <div className="dt-btn text-[#232323]">
                                {data.accordion.items[2].heading}
                            </div>
                        </div>,
                    colSpan: 1, rowSpan: 1,
                    mobileColSpan: 2, mobileRowSpan: 1,
                    landscapeColSpan: 3, landscapeRowSpan: 1,
                },


            ],
            items: [
                {
                    id: 1,
                    content: (
                        <div className="h-full flex flex-col  gap-[6vh]">
                            <div className="dt-h2 text-[#232323]">
                                3
                            </div>
                            <div className="dt-body-sm text-[#232323]">
                                <PortableText value={data.accordion.items[2].description} components={ptComponents} />
                            </div>
                        </div>
                    ),
                    colSpan: 1,
                    rowSpan: 4,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 2,
                    content: <></>,
                    colSpan: 1,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 3,
                    content:
                        <div className="dt-h3 text-balance text-right text-[#232323]">
                            <PortableText value={data.accordion.items[2].subheading} />
                        </div>,
                    colSpan: 2,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 4,
                    content: data.accordion.items[2].image.asset ? (
                        <Image
                            src={urlFor(data.accordion.items[2].image.asset).url()}
                            alt={'Process image'}
                            className="w-full h-full object-cover"
                            width={640}
                            height={360}
                            priority={false}
                        />
                    ) : null,
                    colSpan: 3,
                    rowSpan: 4,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 5,
                    content:
                        <div className="flex h-full pt-[14.5vh]">
                            <div className="dt-h5 text-balance text-[#232323]">
                                <PortableText value={data.accordion.items[2].prompt} />
                            </div>
                        </div>,
                    colSpan: 1,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 6,
                    content:
                        <div className="relative h-full">
                            <div className="dt-h5 text-balance text-[#232323]">
                                <PortableText value={data.accordion.items[2].entries[0].title} />
                            </div>
                            <div className="dt-body-sm absolute top-[8vh] left-0 text-[#232323]">
                                <PortableText value={data.accordion.items[2].entries[0].body} />
                            </div>
                        </div>,
                    colSpan: 1,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 7,
                    content:
                        <div className="relative h-full">
                            <div className="dt-h5 text-balance text-[#232323]">
                                <PortableText value={data.accordion.items[2].entries[1].title} />
                            </div>
                            <div className="dt-body-sm absolute top-[8vh] left-0 text-[#232323]">
                                <PortableText value={data.accordion.items[2].entries[1].body} />
                            </div>
                        </div>,
                    colSpan: 1,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 8,
                    content:
                        <div className="relative h-full">
                            <div className="dt-h5 text-balance text-[#232323]">
                                <PortableText value={data.accordion.items[2].entries[2].title} />
                            </div>
                            <div className="dt-body-sm absolute top-[8vh] left-0 text-[#232323]">
                                <PortableText value={data.accordion.items[2].entries[2].body} />
                            </div>
                        </div>,
                    colSpan: 1,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 9,
                    content:
                        <div className="flex items-end h-full">
                            <div className="dt-h1 text-[#232323]">
                                {data.accordion.items[2].heading}
                            </div>
                        </div>
                    ,
                    colSpan: 4,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
            ] as GridItem[],
        },
    ];

    return (
        <div className="grid grid-cols-6">
            {sections.map(({ key, clickable, bg, fg, items, collapsedItems }) => {
                const pos = placement(key, active);
                if (pos.span === 0) return null; // hide Sec1 when any of 2/3/4 is active

                const isActive = active === key;
                const isCollapsed = key !== 'sec1' && !isActive;
                // const showContent =
                //     (key === 'sec1' && active === null) ||
                //     (key !== 'sec1' && isActive);

                return (
                    <section
                        key={key}
                        style={{ gridColumn: `${pos.start} / span ${pos.span}`, backgroundColor: bg, color: fg }}
                        className={[
                            'relative overflow-hidden transition-all duration-300',
                            clickable ? 'cursor-pointer' : '',
                            '',
                        ].join(' ')}
                        onClick={() => handleTabClick(key as Active, clickable)}
                    >
                        {/* Tiny grid when collapsed */}
                        {isCollapsed && (collapsedItems?.length ?? 0) > 0 && (
                            <div className="px-[1.795vw] py-[3.2vh]">
                                <div className="grid gap-x-[1.795vw] gap-y-[1.6vh] grid-cols-1 auto-rows-[10.3vh]">
                                    {collapsedItems!.map((item) => (
                                        <div key={item.id} className={`${getGridClasses(item)}`}>
                                            {item.content}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Full content when active (or sec1 initial) */}
                        {/* Always show sec1 content when no tab is open (default text) */}
                        {key === 'sec1' && active === null && (
                            <div className="px-[1.795vw] py-[3.2vh]">
                                <div className="grid gap-x-[1.795vw] gap-y-[1.6vh] grid-cols-4 auto-rows-[10.3vh]">
                                    {items.map((item) => (
                                        <div key={item.id} className={`${getGridClasses(item)} `}>
                                            {item.content}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Animate open tab content only for sec2, sec3, sec4 */}
                        {key !== 'sec1' && active === key && (
                            <div className="px-[1.795vw] py-[3.2vh]">
                                <div
                                    className={`grid gap-x-[1.795vw] gap-y-[1.6vh] grid-cols-4 auto-rows-[10.3vh] animate-scale-in-bottom-right ${animatingSection === key ? 'scale-100' : (hasInteracted ? 'scale-0' : 'scale-100')
                                        }`}
                                    style={{
                                        transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
                                        transformOrigin: 'bottom right',
                                    }}
                                >
                                    {items.map((item) => (
                                        <div key={item.id} className={`${getGridClasses(item)} `}>
                                            {item.content}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                );
            })}

        </div>
    );
}
