'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import { AccordionPulse } from './AccordionPulse';
import type { PortableTextBlock } from '@portabletext/react';
import useIsMobile from '@/hooks/useIsMobile';
import './accordion-animations.css';

type PT = PortableTextBlock[];

/** Section 1 */
export type ST_Section1Statement = {
    body: PT;
};

export type ST_AccordionSection1 = {
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
        ST_Section1Statement,
        ST_Section1Statement,
        ST_Section1Statement,
        ST_Section1Statement
    ];
};

/** Section 2 */
export type ST_Section2Statement = {
    heading: PT;
    body: PT;
};

export type ST_AccordionSection2_S1 = {
    description: PT;
    // exactly 3
    statements: [
        ST_Section2Statement,
        ST_Section2Statement,
        ST_Section2Statement
    ];
};

export type ST_AccordionSection2_S2 = {
    description: PT;
    // exactly 2
    statements: [ST_Section2Statement, ST_Section2Statement];
};

export type ST_AccordionSection2 = {
    heading: string;
    subheading: PT;
    cta: string;
    email: string;
    section1: ST_AccordionSection2_S1;
    section2: ST_AccordionSection2_S2;
};

/** Section 3 */
export type ST_AccordionSection3 = {
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
export type SuperchargeTomorrowPage = {
    _id?: string;
    _type?: 'superchargeTomorrowPage';
    title: string;
    heading: string;
    subheading: PT;

    accordionSection1: ST_AccordionSection1;
    accordionSection2: ST_AccordionSection2;
    accordionSection3: ST_AccordionSection3;
};

export type SuperchargeTomorrowProps = { data: SuperchargeTomorrowPage };


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

type Active = 'sec2' | 'sec3' | 'sec4';


function placement(section: 'sec2' | 'sec3' | 'sec4', active: Active) {
    // 6-column grid.
    // No active: 3 equal columns (2 each)
    // Active expands to 4 columns, others 1 column
    if (active === 'sec2') {
        if (section === 'sec2') return { start: 1, span: 4 }; // cols 1-4
        if (section === 'sec3') return { start: 5, span: 1 };
        return { start: 6, span: 1 };
    }
    if (active === 'sec3') {
        if (section === 'sec2') return { start: 1, span: 1 };
        if (section === 'sec3') return { start: 2, span: 4 }; // cols 2-5
        return { start: 6, span: 1 };
    }
    // active === 'sec4'
    if (section === 'sec2') return { start: 1, span: 1 };
    if (section === 'sec3') return { start: 2, span: 1 };
    return { start: 3, span: 4 }; // cols 3-6
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

const hoverHintWhenClosed = (isActive: boolean, isFirstSection = false) =>
    !isActive && !isFirstSection
        ? [
            // smooth + GPU
            "motion-safe:will-change-transform motion-safe:transition-transform motion-safe:duration-300",
            // the hint
            "hover:scale-x-[1.05] origin-right transition-transform",
            // pop above neighbors while hovering
            " ",
        ].join(" ")
        : "";

export default function SuperchargeTomorrowAccordion({ data }: SuperchargeTomorrowProps) {
    const isMobile = useIsMobile();
    const [active, setActive] = useState<Active>('sec2');
    const toggle = (id: Active) => setActive(prev => (prev === id ? 'sec2' : id));
    const [openTabs, setOpenTabs] = useState<number[]>([]);

    // No pulse logic for desktop; only mobile closed tabs will pulse

    // Desktop animation state (matches WhatWeDoAccordion)
    const [animatingSection, setAnimatingSection] = useState<Active | null>(null);
    const [hasInteracted, setHasInteracted] = useState(false);
    const animationTimeout = useRef<NodeJS.Timeout | null>(null);
    const prevActiveRef = useRef<Active | null>(null);
    useEffect(() => {
        if (!isMobile && active && hasInteracted) {
            setAnimatingSection(null);
            if (animationTimeout.current) clearTimeout(animationTimeout.current);
            animationTimeout.current = setTimeout(() => setAnimatingSection(active), 20);
        }
        prevActiveRef.current = active;
        return () => {
            if (animationTimeout.current) clearTimeout(animationTimeout.current);
        };
    }, [active, isMobile, hasInteracted]);
    const handleTabClick = (id: Active, clickable: boolean) => {
        if (clickable) {
            setHasInteracted(true);
            toggle(id);
        }
    };

    if (isMobile) {
        // Mobile vertical accordion layout
        const tabs = [
            {
                number: 1,
                title: data.accordionSection1.heading,
                subheading: data.accordionSection1.subheading,
                image: data.accordionSection1.image,
                description: data.accordionSection1.description,
                statements: data.accordionSection1.statements,
                cta: data.accordionSection1.cta,
                email: data.accordionSection1.email,
            },
            {
                number: 2,
                title: data.accordionSection2.heading,
                // Fill in content later
            },
            {
                number: 3,
                title: data.accordionSection3.heading,
                // Fill in content later
            },
        ];
        // Pulse logic for mobile: pulse closed tabs, staggered by idx
        const closedMobileTabs = tabs.map((_, idx) => !openTabs.includes(idx) ? idx : null).filter(idx => idx !== null) as number[];
        const closedMobileTabDelays: Record<number, number> = {};
        closedMobileTabs.forEach((tabIdx, i) => {
            closedMobileTabDelays[tabIdx] = i;
        });
        return (
            <div className="w-screen -mx-[calc((100vw-100%)/2)] px-0">
                {tabs.map((tab, idx) => {
                    const isOpen = openTabs.includes(idx);
                    // Colors
                    const bg = idx === 0 ? '#232323' : idx === 1 ? '#DC5A50' : '#F9F7F2';
                    const fg = idx === 2 ? '#232323' : '#F9F7F2';
                    return (
                        <div
                            key={idx}
                            className={`w-full px-0 mx-0 transition-all duration-800 overflow-hidden`}
                            style={{ background: bg, color: fg, maxHeight: isOpen ? '9999px' : '12vh' }}
                            onClick={() => setOpenTabs(prev => isOpen ? prev.filter(i => i !== idx) : [...prev, idx])}
                        >
                            {/* Closed state: only row 1 visible, click to open */}
                            {!isOpen && (
                                <AccordionPulse pulse delay={closedMobileTabDelays[idx] ?? 0} paused={openTabs.length > 0}>
                                    <div className="grid grid-cols-4 px-[4.53vw] py-[2.09vh] gap-x-[4.53vw] gap-y-[2.09vh] items-center w-full">
                                        <div className="col-span-1 row-span-1 dt-h1">{tab.number}</div>
                                        <div className="col-span-3 row-span-1 text-right dt-h1 truncate">{tab.title}</div>
                                    </div>
                                </AccordionPulse>
                            )}
                            {/* Open state: full vertical accordion for tab 1 */}
                            {isOpen && idx === 0 && (
                                <div className="py-[2.09vh] px-[4.53vw] grid grid-cols-4 auto-rows-[minmax(7.701vh,auto)] overflow-visible gap-x-[4.53vw] gap-y-[2.09vh] w-full">
                                    {/* Row 1: col 1: number, col 3-4: title */}
                                    <div className="col-span-1 dt-h1">{tab.number}</div>
                                    <div className="col-span-3 text-right flex flex-col gap-[4vh] ">
                                        <div className="text-right dt-h1">{tab.title}</div>
                                        {/* Row 2: col 3-4: subheading */}
                                        <div className="text-right dt-h3 flex flex-col justify-end  text-balance">
                                            <PortableText value={tab.subheading ?? []} />
                                        </div>
                                    </div>
                                    {/* Row 3-4: col 1-4: image */}
                                    {tab.image?.asset && (
                                        <div className="col-span-4 flex justify-center items-center">
                                            <Image
                                                src={urlFor(tab.image.asset).url()}
                                                alt="Process image"
                                                className="w-full max-h-[160px] h-full object-cover"
                                                style={{ aspectRatio: '16/9' }}
                                                width={320}
                                                height={160}
                                                priority={false}
                                            />
                                        </div>
                                    )}
                                    {/* Row 6-7: col 1-4: description */}
                                    <div className="col-span-4 dt-body-lg mt-[2vh]">
                                        <PortableText value={tab.description ?? []} />
                                    </div>
                                    {/* Row 8: col 1-2: statement 0, col 3-4: statement 1 */}
                                    <div className="col-span-2 row-span-1 dt-body-sm mt-[2vh]">
                                        <PortableText value={tab.statements?.[0]?.body ?? []} />
                                    </div>
                                    <div className="col-span-2 row-span-1 dt-body-sm mt-[2vh]">
                                        <PortableText value={tab.statements?.[1]?.body ?? []} />
                                    </div>

                                    {/* Row 10: col 1-2: statement 2, col 3-4: statement 3 */}
                                    <div className="col-span-2 row-span-1 dt-body-sm">
                                        <PortableText value={tab.statements?.[2]?.body ?? []} />
                                    </div>
                                    <div className="col-span-2 row-span-1 dt-body-sm">
                                        <PortableText value={tab.statements?.[3]?.body ?? []} />
                                    </div>
                                    {/* Row 11: col 1-2: CTA button */}
                                    <div className="col-span-2 row-span-1 flex items-center">
                                        <a
                                            href={`mailto:${tab.email ?? 'info@futureworld.org'}?subject=${encodeURIComponent('I want to apply to the Supercharge Tomorrow programme')}`}
                                            className="transition cursor-pointer dt-btn"
                                        >
                                            <UnderlineOnHoverAnimation hasStaticUnderline={true} color="#F9F7F2">
                                                {tab.cta ?? 'Get in Touch'}
                                            </UnderlineOnHoverAnimation>
                                        </a>
                                    </div>
                                </div>
                            )}
                            {/* Open state: full vertical accordion for tab 2 */}
                            {isOpen && idx === 1 && (
                                <div className="py-[2.09vh] px-[4.53vw] grid grid-cols-4 auto-rows-[minmax(7.701vh,auto)] overflow-visible gap-x-[4.53vw] gap-y-[2.09vh] w-full">
                                    {/* Row 1: col 1: number, col 3-4: title */}
                                    <div className="col-span-1 row-start-1 row-span-1 dt-h1">{tab.number}</div>

                                    <div className="col-span-3 text-right flex flex-col gap-[4vh] ">
                                        <div className="text-right dt-h1">{data.accordionSection2.heading}</div>
                                        {/* Row 2: col 3-4: subheading */}
                                        <div className="text-right dt-h3 flex flex-col justify-end text-balance">
                                            <PortableText value={data.accordionSection2.subheading ?? []} />
                                        </div>
                                    </div>
                                    {/* Row 3-4: col 1-4: description */}
                                    <div className="col-span-4 dt-body-lg mt-[2vh]">
                                        <PortableText value={data.accordionSection2.section1.description ?? []} />
                                    </div>
                                    <div className="col-span-4 dt-body-sm mt-[2vh]">
                                        <PortableText value={data.accordionSection2.section2.description ?? []} />
                                    </div>
                                    {/* Row 6: col 1-2: section1.statements[0].heading, col 3-4: section1.statements[1].heading */}
                                    <div className="col-span-2 dt-h5 mt-[6vh]">
                                        <PortableText value={data.accordionSection2.section1.statements[0].heading ?? []} />
                                    </div>
                                    <div className="col-span-2 dt-h5 mt-[6vh]">
                                        <PortableText value={data.accordionSection2.section1.statements[1].heading ?? []} />
                                    </div>
                                    {/* Row 7: col 1-2: section1.statements[0].body, col 3-4: section1.statements[1].body */}
                                    <div className="col-span-2 dt-body-sm">
                                        <PortableText value={data.accordionSection2.section1.statements[0].body ?? []} />
                                    </div>
                                    <div className="col-span-2 dt-body-sm">
                                        <PortableText value={data.accordionSection2.section1.statements[1].body ?? []} />
                                    </div>
                                    {/* Row 8: col 1-2: section1.statements[2].heading, col 3-4: section2.statements[0].heading */}
                                    <div className="col-span-2 dt-h5 mt-[4vh]">
                                        <PortableText value={data.accordionSection2.section1.statements[2].heading ?? []} />
                                    </div>
                                    <div className="col-span-2 dt-h5 mt-[4vh]">
                                        <PortableText value={data.accordionSection2.section2.statements[0].heading ?? []} />
                                    </div>
                                    {/* Row 9: col 1-2: section1.statements[2].body, col 3-4: section2.statements[0].body */}
                                    <div className="col-span-2 dt-body-sm">
                                        <PortableText value={data.accordionSection2.section1.statements[2].body ?? []} />
                                    </div>
                                    <div className="col-span-2 dt-body-sm">
                                        <PortableText value={data.accordionSection2.section2.statements[0].body ?? []} />
                                    </div>
                                    {/* Row 10: col 3-4: section2.statements[1].heading */}
                                    <div className="col-start-3 col-span-2 dt-h5 mt-[4vh]">
                                        <PortableText value={data.accordionSection2.section2.statements[1].heading ?? []} />
                                    </div>
                                    {/* Row 11: col 1-2: cta, col 3-4: section2.statements[1].body */}
                                    <div className="col-span-2 flex items-center">
                                        <a
                                            href={`mailto:${data.accordionSection2.email ?? 'info@futureworld.org'}?subject=${encodeURIComponent('I want to apply to the Supercharge Tomorrow programme')}`}
                                            className="transition cursor-pointer dt-btn"
                                        >
                                            <UnderlineOnHoverAnimation hasStaticUnderline={true} color="#F9F7F2">
                                                {data.accordionSection2.cta ?? 'Get in Touch'}
                                            </UnderlineOnHoverAnimation>
                                        </a>
                                    </div>
                                    <div className="col-span-2 dt-body-sm -mt-[2vh] pb-[4vh]">
                                        <PortableText value={data.accordionSection2.section2.statements[1].body ?? []} />
                                    </div>
                                    
                                </div>
                            )}
                            {/* Open state: full vertical accordion for tab 3 */}
                            {isOpen && idx === 2 && (
                                <div className="py-[2.09vh] px-[4.53vw] grid grid-cols-4 auto-rows-[minmax(7.701vh,auto)] overflow-visible gap-x-[4.53vw] gap-y-[2.09vh] w-full">
                                    {/* Row 1: col 1: number */}
                                    <div className="col-span-1 dt-h1">3</div>
                                    <div className="col-span-3 text-right flex flex-col gap-[4vh]">
                                        <div className="text-right dt-h1">{data.accordionSection3.heading}</div>
                                        {/* Row 2: col 3-4: subheading */}
                                        <div className="text-right dt-h3 flex flex-col justify-end text-balance">
                                            <PortableText value={data.accordionSection3.subheading ?? []} />
                                        </div>
                                    </div>
                                    {/* Row 3-4: col 1-4: image */}
                                    {data.accordionSection3.image?.asset && (
                                        <div className="col-span-4 row-span-2 flex justify-center items-center">
                                            <Image
                                                src={urlFor(data.accordionSection3.image.asset).url()}
                                                alt="Process image"
                                                className="w-full max-h-[160px] h-full object-cover"
                                                style={{ aspectRatio: '16/9' }}
                                                width={320}
                                                height={160}
                                                priority={false}
                                            />
                                        </div>
                                    )}
                                    {/* Row 5: description */}
                                    <div className="col-span-4 dt-body-lg">
                                        <PortableText value={data.accordionSection3.description ?? []} />
                                    </div>
                                    {/* Row 6: empty */}
                                    <div className="col-span-4"></div>
                                    {/* Row 7: col 1-3: cta */}
                                    <div className="col-span-3">
                                        <a
                                            href={`mailto:${data.accordionSection3.email ?? 'info@futureworld.org'}?subject=${encodeURIComponent('I want to apply to the Supercharge Tomorrow programme')}`}
                                            className="transition cursor-pointer dt-btn"
                                        >
                                            <UnderlineOnHoverAnimation hasStaticUnderline={true} color="#232323">
                                                {data.accordionSection3.cta ?? 'Get in Touch'}
                                            </UnderlineOnHoverAnimation>
                                        </a>
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
                        <div className="dt-h2 text-center text-[#F9F7F2]">
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
                                {data.accordionSection1.heading}
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
                        <div className="dt-h2 text-[#F9F7F2]">
                            1
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
                    content: (

                        <div className="dt-h3 text-balance pt-[2vh] text-right text-[#F9F7F2]">
                            <PortableText
                                value={data.accordionSection1.subheading}
                                components={ptComponents}
                            />
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
                    id: 4,
                    content: data.accordionSection1.image.asset ? (
                        <Image
                            src={urlFor(data.accordionSection1.image.asset).url()}
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
                        <div className="dt-body-sm text-[#F9F7F2]">
                            <PortableText value={data.accordionSection1.description} components={ptComponents} />
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
                    content: <></>,
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
                        <div className="dt-body-sm pt-[4vh] text-[#F9F7F2]">
                            <PortableText value={data.accordionSection1.statements[0].body} components={ptComponents} />
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
                        <div className="dt-body-sm pt-[4vh] text-[#F9F7F2]">
                            <PortableText value={data.accordionSection1.statements[1].body} components={ptComponents} />
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
                        <div className="dt-body-sm pt-[4vh] text-[#F9F7F2]">
                            <PortableText value={data.accordionSection1.statements[2].body} components={ptComponents} />
                        </div>,
                    colSpan: 1,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 10,
                    content:
                        <div className="dt-body-sm pt-[4vh] text-[#F9F7F2]">
                            <PortableText value={data.accordionSection1.statements[3].body} components={ptComponents} />
                        </div>,
                    colSpan: 1,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 11,
                    content:
                        <div className="flex items-end h-full">
                            <div className="dt-h1 text-[#F9F7F2]">
                                {data.accordionSection1.heading}
                            </div>
                        </div>,
                    colSpan: 2,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 12,
                    content: <></>,
                    colSpan: 1,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 13,
                    content:
                        <div className="flex items-end h-full justify-end text-right pb-[4vh]">
                            <div className="dt-btn">
                                <a
                                    href={`mailto:${data.accordionSection1.email ?? 'info@futureworld.org'}?subject=${encodeURIComponent('I want to apply to the Supercharge Tomorrow programme')}`}
                                    className="transition cursor-pointer"
                                >
                                    <UnderlineOnHoverAnimation hasStaticUnderline={true} color="#F9F7F2">
                                        {data.accordionSection1.cta ?? 'Get in Touch'}
                                    </UnderlineOnHoverAnimation>
                                </a>
                            </div>
                        </div>,
                    colSpan: 1,
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
                        <div className="dt-h2 text-center text-[#F9F7F2]">
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
                            <div className="dt-btn text-center text-[#F9F7F2]">
                                {data.accordionSection2.heading}
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
                        <div className="dt-h2 text-[#F9F7F2]">
                            2
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
                    id: 2,
                    content: <></>,
                    colSpan: 1,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 3,
                    content: (
                        <div className="dt-h3 text-balance text-right text-[#F9F7F2] pt-[2vh]">
                            <PortableText
                                value={data.accordionSection2.subheading}
                                components={ptComponents}
                            />
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
                    id: 4,
                    content:
                        <div className="dt-body-sm text-[#F9F7F2]">
                            <PortableText value={data.accordionSection2.section1.description} components={ptComponents} />
                        </div>,
                    colSpan: 1,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 5,
                    content:
                        <div className="h-full flex flex-col gap-[1vh]">
                            <div className="dt-h5 text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordionSection2.section1.statements[0].heading} components={ptComponents} />
                            </div>
                            <div className="dt-body-sm text-[#F9F7F2]">
                                <PortableText value={data.accordionSection2.section1.statements[0].body} components={ptComponents} />
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
                        <div className="h-full flex flex-col gap-[1vh]">
                            <div className="dt-h5 text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordionSection2.section1.statements[1].heading} components={ptComponents} />
                            </div>
                            <div className="dt-body-sm text-[#F9F7F2]">
                                <PortableText value={data.accordionSection2.section1.statements[1].body} components={ptComponents} />
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
                    id: 7,
                    content:
                        <div className="h-full flex flex-col gap-[1vh]">
                            <div className="dt-h5 text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordionSection2.section1.statements[2].heading} components={ptComponents} />
                            </div>
                            <div className="dt-body-sm text-[#F9F7F2]">
                                <PortableText value={data.accordionSection2.section1.statements[2].body} components={ptComponents} />
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
                    id: 8,
                    content:
                        <div className="dt-body-sm text-[#F9F7F2]">
                            <PortableText value={data.accordionSection2.section2.description} components={ptComponents} />
                        </div>,
                    colSpan: 1,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 9,
                    content:
                        <div className="h-full flex flex-col gap-[1vh]">
                            <div className="dt-h5 text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordionSection2.section2.statements[0].heading} components={ptComponents} />
                            </div>
                            <div className="dt-body-sm text-[#F9F7F2]">
                                <PortableText value={data.accordionSection2.section2.statements[0].body} components={ptComponents} />
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
                    id: 10,
                    content:
                        <div className="h-full flex flex-col gap-[1vh]">
                            <div className="dt-h5 text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordionSection2.section2.statements[1].heading} components={ptComponents} />
                            </div>
                            <div className="dt-body-sm text-[#F9F7F2]">
                                <PortableText value={data.accordionSection2.section2.statements[1].body} components={ptComponents} />
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
                    id: 11,
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
                    id: 12,
                    content:
                        <div className="flex items-end h-full">
                            <div className="dt-h1 text-[#F9F7F2]">
                                {data.accordionSection2.heading}
                            </div>
                        </div>,
                    colSpan: 3,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 13,
                    content:
                        <div className="flex items-end h-full justify-end text-right pb-[4vh]">
                            <div className="dt-btn">
                                <a
                                    href={`mailto:${data.accordionSection2.email ?? 'info@futureworld.org'}?subject=${encodeURIComponent('I would like to get the full Supercharge Tomorrow agenda')}`}
                                    className="transition cursor-pointer"
                                >
                                    <UnderlineOnHoverAnimation hasStaticUnderline={true} color="#F9F7F2">
                                        {data.accordionSection2.cta ?? 'Get in Touch'}
                                    </UnderlineOnHoverAnimation>
                                </a>
                            </div>
                        </div>,
                    colSpan: 1,
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
                        <div className="dt-h2 text-center text-[#232323]">
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
                            <div className="dt-btn text-center leading-tight text-[#232323]">
                                {data.accordionSection3.heading}
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
                        <div className="dt-h2 text-[#232323]">
                            3
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
                    content: (

                        <div className="dt-h3 text-balance pt-[2vh] text-right text-[#232323]">
                            <PortableText
                                value={data.accordionSection3.subheading}
                                components={ptComponents}
                            />
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
                    id: 4,
                    content: data.accordionSection3.image.asset ? (
                        <Image
                            src={urlFor(data.accordionSection3.image.asset).url()}
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
                        <div className="dt-body-sm text-[#232323]">
                            <PortableText value={data.accordionSection3.description} components={ptComponents} />
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
                    content: <></>,
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
                        <></>,
                    colSpan: 4,
                    rowSpan: 1,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 8,
                    content:
                        <div className="flex items-end h-full">
                            <div className="dt-h1 text-[#232323]">
                                {data.accordionSection3.heading}
                            </div>
                        </div>,
                    colSpan: 2,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 9,
                    content: <></>,
                    colSpan: 1,
                    rowSpan: 2,
                    mobileColSpan: 2,
                    mobileRowSpan: 1,
                    landscapeColSpan: 3,
                    landscapeRowSpan: 1,
                },
                {
                    id: 10,
                    content:
                        <div className="flex items-end h-full justify-end text-right pb-[4vh]">
                            <div className="dt-btn">
                                <a
                                    href={`mailto:${data.accordionSection3.email ?? 'info@futureworld.org'}?subject=${encodeURIComponent('I would like to schedule a team session for the Supercharge Tomorrow programme')}`}
                                    className="transition cursor-pointer"
                                >
                                    <UnderlineOnHoverAnimation hasStaticUnderline={true} color="#232323">
                                        {data.accordionSection3.cta ?? 'Get in Touch'}
                                    </UnderlineOnHoverAnimation>
                                </a>
                            </div>
                        </div>,
                    colSpan: 1,
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
                const isActive = active === key;
                const isCollapsed = !isActive;
                const showContent = isActive;
                return (
                    <section
                        key={key}
                        style={{ gridColumn: `${pos.start} / span ${pos.span}`, backgroundColor: bg, color: fg }}
                        className={[
                            'relative overflow-hidden transition-all duration-300',
                            clickable ? 'cursor-pointer' : '',
                            hoverHintWhenClosed(isActive),
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
                        {/* Animate open tab content for desktop only */}
                        {!isMobile && active === key && (
                            <div className="px-[1.795vw] py-[3.2vh]">
                                <div
                                    className={`grid gap-x-[1.795vw] gap-y-[1.6vh] grid-cols-4 auto-rows-[10.3vh] animate-scale-in-bottom-right ${animatingSection === key ? 'scale-100' : (hasInteracted ? 'scale-0' : 'scale-100')}`}
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
                        {/* Default/initial or mobile content */}
                        {(isMobile || active !== key) && showContent && (
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
                    </section>
                );
            })}
        </div>
    );
}
