'use client';

import { useState, useEffect } from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';
import { PortableTextBlock } from '@portabletext/react';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import FadeInOnVisible from './FadeInOnVisible';
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
    const [openTab, setOpenTab] = useState<number | null>(null);

    const [active, setActive] = useState<Active>(null);
    const toggle = (id: Active) => setActive(prev => (prev === id ? null : id));

    if (isMobile) {
        // Mobile vertical accordion layout
        return (
            <div className="w-screen -mx-[calc((100vw-100%)/2)] px-0">
                {data.accordion.items.map((item, idx) => {
                    const isOpen = openTab === idx;
                    // Colors
                    const bg = idx === 0 ? '#232323' : idx === 1 ? '#DC5A50' : '#F9F7F2';
                    const fg = idx === 2 ? '#232323' : '#F9F7F2';
                    return (
                        <div
                            key={idx}
                            className={`w-full px-0 mx-0`}
                            style={{ background: bg, color: fg }}
                            onClick={() => setOpenTab(isOpen ? null : idx)}
                        >
                            {/* Closed state: only row 1 visible, click to open */}
                            {!isOpen && (
                                <div className="grid grid-cols-4 min-h-[7vh] items-center px-3 py-2 w-full">
                                    <div className="col-span-1 row-start-1 row-span-1 text-[3vh] font-graphik leading-tight">{idx + 1}</div>
                                    <div className="col-span-3 row-start-1 row-span-1 text-right text-[5vh] font-graphik leading-tight truncate">{item.heading}</div>
                                </div>
                            )}
                            {/* Open state: full vertical accordion */}
                            {isOpen && (
                                <div className="grid grid-cols-4 gap-y-1  items-center auto-rows-[minmax(50px,auto)] px-3 py-2 w-full">
                                    
                                    {/* Row 5: col 1: number, col 2-4: subheading (first word in row 5, rest in row 6) */}
                                    <div className="col-span-1 row-start-1 row-span-1 text-[3vh] font-graphik leading-tight">{idx + 1}</div>
                                    {/* Subheading split: first word row 5, rest row 6 */}
                                    {(() => {
                                        const subheading = item.subheading && item.subheading.length > 0 ? item.subheading[0].children?.[0]?.text || '' : '';
                                        const [firstWord, ...rest] = subheading.split(' ');
                                        return <>
                                            <div className="col-span-3 row-start-1 row-span-1 text-right text-[5vh] font-graphik leading-tight">{firstWord}</div>
                                            <div className="col-start-2 row-start-2 row-span-1 col-span-3 text-right text-[2vh] font-graphik leading-tight">{rest.join(' ')}</div>
                                        </>;
                                    })()}
                                    {/* Row 7-8: Image (col 1-4) */}
                                    {item.image?.asset && (
                                        <div className="col-span-4 row-start-3 row-span-2 flex justify-center items-center">
                                            <img
                                                src={urlFor(item.image.asset).url()}
                                                alt="Process image"
                                                className="w-full max-h-[160px] h-full object-cover"
                                                style={{ aspectRatio: '16/9' }}
                                            />
                                        </div>
                                    )}
                                    {/* Row 9-11: Description (col 1-4) */}
                                    <div className="col-span-4 text-[2vh] font-roboto leading-tight mt-2 pb-4">
                                        <PortableText value={item.description} components={ptComponents} />
                                    </div>
                                    {/* Row 12: Empty */}
                                    <div className="col-span-4 h-[1vh]"></div>
                                    {/* Row 13: col 1-2: prompt, col 3-4: entry 0 */}
                                    <div className="col-span-2 text-[2vh] font-bold leading-tight">
                                        <PortableText value={item.prompt} />
                                    </div>
                                    <div className="col-span-2">
                                        <div className="font-bold text-[2vh] pb-4"><PortableText value={item.entries[0].title} /></div>
                                        <div className="text-[1.5vh] pb-4"><PortableText value={item.entries[0].body} /></div>
                                    </div>
                                    {/* Row 15-16: col 3-4: entry 1 */}
                                    <div className="col-start-3 col-span-2">
                                        <div className="font-bold text-[2vh] pb-4"><PortableText value={item.entries[1].title} /></div>
                                        <div className="text-[1.5vh] pb-4"><PortableText value={item.entries[1].body} /></div>
                                    </div>
                                    {/* Row 17-18: col 3-4: entry 2 */}
                                    <div className="col-start-3 col-span-2">
                                        <div className="font-bold text-[2vh] pb-4"><PortableText value={item.entries[2].title} /></div>
                                        <div className="text-[1.5vh] pb-4"><PortableText value={item.entries[2].body} /></div>
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
                        <FadeInOnVisible>
                            <MainTitleAnimation
                                text={data.accordion.heading}
                                typeSpeed={40}
                                delay={500}
                                className="text-[clamp(4vw,10vh,5vw)] font-graphik leading-[clamp(4vw,10vh,5vw)] text-balance text-[#232323]"
                            />
                        </FadeInOnVisible>

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
                        <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-bold leading-tight text-[#232323]">
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
                        <div className="text-[clamp(4vw,10vh,5vw)] font-graphik leading-tight text-[#F9F7F2]">
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
                            <div className="text-[clamp(0.75vw,2.25vh,1.125vw)] font-graphik leading-tight text-[#F9F7F2]">
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
                            <div className="text-[clamp(4vw,10vh,5vw)] font-graphik leading-tight text-[#F9F7F2]">
                                1
                            </div>
                            <div className="text-[clamp(0.25vw,1.5vh,0.75vw)] font-roboto leading-tight text-[#F9F7F2]">
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
                        <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-bold leading-tight text-balance text-right text-[#F9F7F2]">
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
                        <img
                            src={urlFor(data.accordion.items[0].image.asset).url()}
                            alt={'Process image'}
                            className="w-full h-full object-cover"
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
                            <div className="text-[clamp(0.5vw,2vh,1vw)] font-bold leading-tight text-balance text-[#F9F7F2]">
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
                            <div className="text-[clamp(0.5vw,2vh,1vw)] font-bold leading-tight text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordion.items[0].entries[0].title} />
                            </div>
                            <div className="absolute top-[8vh] left-0 text-[clamp(0.25vw,1.5vh,0.75vw)] font-roboto leading-tight text-[#F9F7F2]">
                                <PortableText value={data.accordion.items[0].entries[0].body} />
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
                    id: 7,
                    content:
                        <div className="relative h-full">
                            <div className="text-[clamp(0.5vw,2vh,1vw)] font-bold leading-tight text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordion.items[0].entries[1].title} />
                            </div>
                            <div className="absolute top-[8vh] left-0 text-[clamp(0.25vw,1.5vh,0.75vw)] font-roboto leading-tight text-[#F9F7F2]">
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
                            <div className="text-[clamp(0.5vw,2vh,1vw)] font-bold leading-tight text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordion.items[0].entries[2].title} />
                            </div>
                            <div className="absolute top-[8vh] left-0 text-[clamp(0.25vw,1.5vh,0.75vw)] font-roboto leading-tight text-[#F9F7F2]">
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
                        <div className="text-[clamp(8vw,20vh,10vw)] font-graphik leading-tight text-[#F9F7F2]">
                            {data.accordion.items[0].heading}
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
                content: <div className="text-[20vh] font-bold leading-none">TitleTest</div>,
            },
            collapsedItems: [
                {
                    id: 301,
                    content:
                        <div className="text-[clamp(4vw,10vh,5vw)] font-graphik leading-tight text-[#F9F7F2]">
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
                            <div className="text-[clamp(0.75vw,2.25vh,1.125vw)] font-graphik leading-tight text-[#F9F7F2]">
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
                            <div className="text-[clamp(4vw,10vh,5vw)] font-graphik leading-tight text-[#F9F7F2]">
                                2
                            </div>
                            <div className="text-[clamp(0.25vw,1.5vh,0.75vw)] font-roboto leading-tight text-[#F9F7F2]">
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
                        <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-bold leading-tight text-balance text-right text-[#F9F7F2]">
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
                        <img
                            src={urlFor(data.accordion.items[1].image.asset).url()}
                            alt={'Process image'}
                            className="w-full h-full object-cover"
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
                            <div className="text-[clamp(0.5vw,2vh,1vw)] font-bold leading-tight text-balance text-[#F9F7F2]">
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
                            <div className="text-[clamp(0.5vw,2vh,1vw)] font-bold leading-tight text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordion.items[1].entries[0].title} />
                            </div>
                            <div className="absolute top-[8vh] left-0 text-[clamp(0.25vw,1.5vh,0.75vw)] font-roboto leading-tight text-[#F9F7F2]">
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
                            <div className="text-[clamp(0.5vw,2vh,1vw)] font-bold leading-tight text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordion.items[1].entries[1].title} />
                            </div>
                            <div className="absolute top-[8vh] left-0 text-[clamp(0.25vw,1.5vh,0.75vw)] font-roboto leading-tight text-[#F9F7F2]">
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
                            <div className="text-[clamp(0.5vw,2vh,1vw)] font-bold leading-tight text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordion.items[1].entries[2].title} />
                            </div>
                            <div className="absolute top-[8vh] left-0 text-[clamp(0.25vw,1.5vh,0.75vw)] font-roboto leading-tight text-[#F9F7F2]">
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
                        <div className="text-[clamp(8vw,20vh,10vw)] font-graphik leading-tight text-[#F9F7F2]">
                            {data.accordion.items[1].heading}
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
                        <div className="text-[clamp(4vw,10vh,5vw)] font-graphik leading-tight text-[#232323]">
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
                            <div className="text-[clamp(0.75vw,2.25vh,1.125vw)] font-graphik leading-tight text-[#232323]">
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
                        <div className="h-full flex flex-col  gap-[2vh]">
                            <div className="text-[clamp(4vw,10vh,5vw)] font-graphik leading-tight text-[#232323]">
                                3
                            </div>
                            <div className="text-[clamp(0.25vw,1.5vh,0.75vw)] font-roboto leading-tight text-[#232323]">
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
                        <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-bold leading-tight text-balance text-right text-[#232323]">
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
                        <img
                            src={urlFor(data.accordion.items[2].image.asset).url()}
                            alt={'Process image'}
                            className="w-full h-full object-cover"
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
                            <div className="text-[clamp(0.5vw,2vh,1vw)] font-bold leading-tight text-balance text-[#232323]">
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
                            <div className="text-[clamp(0.5vw,2vh,1vw)] font-bold leading-tight text-balance text-[#232323]">
                                <PortableText value={data.accordion.items[2].entries[0].title} />
                            </div>
                            <div className="absolute top-[8vh] left-0 text-[clamp(0.25vw,1.5vh,0.75vw)] font-roboto leading-tight text-[#232323]">
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
                            <div className="text-[clamp(0.5vw,2vh,1vw)] font-bold leading-tight text-balance text-[#232323]">
                                <PortableText value={data.accordion.items[2].entries[1].title} />
                            </div>
                            <div className="absolute top-[8vh] left-0 text-[clamp(0.25vw,1.5vh,0.75vw)] font-roboto leading-tight text-[#232323]">
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
                            <div className="text-[clamp(0.5vw,2vh,1vw)] font-bold leading-tight text-balance text-[#232323]">
                                <PortableText value={data.accordion.items[2].entries[2].title} />
                            </div>
                            <div className="absolute top-[8vh] left-0 text-[clamp(0.25vw,1.5vh,0.75vw)] font-roboto leading-tight text-[#232323]">
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
                        <div className="text-[clamp(8vw,20vh,10vw)] font-graphik leading-tight text-[#232323]">
                            {data.accordion.items[2].heading}
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
    ];

    return (
        <div className="grid grid-cols-6">
            {sections.map(({ key, clickable, bg, fg, items, collapsedItems }) => {
                const pos = placement(key, active);
                if (pos.span === 0) return null; // hide Sec1 when any of 2/3/4 is active

                const isActive = active === key;
                const isCollapsed = key !== 'sec1' && !isActive;
                const showContent =
                    (key === 'sec1' && active === null) ||
                    (key !== 'sec1' && isActive);

                return (
                    <section
                        key={key}
                        style={{ gridColumn: `${pos.start} / span ${pos.span}`, backgroundColor: bg, color: fg }}
                        className={[
                            'relative overflow-hidden transition-all duration-300',
                            clickable ? 'cursor-pointer' : '',
                            '',
                        ].join(' ')}
                        onClick={() => {
                            if (clickable) toggle(key as Active);
                        }}
                    >
                        {/* Tiny grid when collapsed */}
                        {isCollapsed && (collapsedItems?.length ?? 0) > 0 && (
                            <div className="p-[4vh]">
                                <div className="grid grid-cols-1 gap-[2vh] auto-rows-[12.5vh]">
                                    {collapsedItems!.map((item) => (
                                        <div key={item.id} className={`${getGridClasses(item)}`}>
                                            {item.content}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Full content when active (or sec1 initial) */}
                        {showContent && (
                            <div className="p-[4vh]">
                                <div className="grid gap-[2vh] grid-cols-4 auto-rows-[12.5vh]">
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
