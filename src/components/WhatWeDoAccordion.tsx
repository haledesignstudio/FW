'use client';

import { useState } from 'react';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';
import { PortableTextBlock } from '@portabletext/react';

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

export default function WhatWeDoAccordion({ data }: WhatWeDoAccordionProps) {
    const [active, setActive] = useState<Active>(null);
    const toggle = (id: Active) => setActive(prev => (prev === id ? null : id));

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
                    content: (
                        <div className="text-[clamp(4vw,10vh,5vw)] font-graphik leading-[clamp(4vw,10vh,5vw)] text-balance text-black">
                            {data.accordion.heading}
                        </div>
                    ),
                    colSpan: 2,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 2,
                    content: <></>,
                    colSpan: 2,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 3,
                    content: 
                    <div className="text-[clamp(1vw,3.5vh,1.75vw)] font-roboto leading-tight text-black">
                                    <PortableText value={data.accordion.subheading} />
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
            items: [
                {
                    id: 1,
                    content: (
                        <div>
                        <div className="text-[clamp(4vw,10vh,5vw)] font-graphik leading-tight text-white">
                            1
                        </div>
                        <div className="text-[clamp(0.25vw,1.5vh,0.75vw)] font-roboto leading-tight text-white">
                             <PortableText value={data.accordion.items[0].description} />
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
                    <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-bold leading-tight text-white">
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
                    content: <></>,
                    colSpan: 1,
                    rowSpan: 1,
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
            items: [
                {
                    id: 1,
                    content: (
                        <div className="text-[clamp(1vw,3.5vh,1.75vw)] font-roboto leading-tight text-white">
                            TestText
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
                    content: <div className="text-[clamp(1vw,3.5vh,1.75vw)] font-roboto leading-tight text-white">
                        TestText
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
            items: [
                {
                    id: 1,
                    content: (
                        <div className="text-[clamp(1vw,3.5vh,1.75vw)] font-roboto leading-tight text-white">
                            TestText
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
                    content: <div className="text-[clamp(1vw,3.5vh,1.75vw)] font-roboto leading-tight text-white">
                        TestText
                    </div>,
                    colSpan: 3,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
            ] as GridItem[],
        },
    ];

    return (
        <div className="grid grid-cols-6 gap-[2vh]">
            {sections.map(({ key, clickable, bg, fg, items }) => {
                const pos = placement(key, active);
                if (pos.span === 0) return null; // hide Sec1 when any of 2/3/4 is active

                const isActive = active === key;
                const showContent =
                    (key === 'sec1' && active === null) || // Sec1 content only in initial state
                    (key !== 'sec1' && isActive);          // Other sections only when active

                return (
                    <section
                        key={key}
                        style={{ gridColumn: `${pos.start} / span ${pos.span}`, backgroundColor: bg, color: fg }}
                        className={[
                            'relative overflow-hidden transition-all duration-300',
                            clickable ? 'cursor-pointer' : '',
                            'rounded-lg',
                        ].join(' ')}
                        onClick={() => {
                            if (clickable) toggle(key as Active);
                        }}
                    >
                        {/* Content grid (unique items per tab) */}
                        {showContent && (
                            <div className="p-[4vh]">
                                <div className="grid gap-[4vh]  grid-cols-4 auto-rows-[12.5vh]">
                                    {/* Title as a grid item inside the content */}


                                    {items.map((item) => (
                                        <div key={item.id} className={`${getGridClasses(item)} p-4`}>
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
