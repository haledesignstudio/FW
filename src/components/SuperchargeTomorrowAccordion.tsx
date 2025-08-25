'use client';

import { useState } from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
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



export default function SuperchargeTomorrowAccordion({ data }: SuperchargeTomorrowProps) {
    const isMobile = useIsMobile();
    const [active, setActive] = useState<Active>('sec2');
    const toggle = (id: Active) => setActive(prev => (prev === id ? 'sec2' : id));
    const [openTab, setOpenTab] = useState<number | null>(null);

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
        return (
            <div className="w-screen -mx-[calc((100vw-100%)/2)] px-0">
                {tabs.map((tab, idx) => {
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
                                    <div className="col-span-1 row-start-1 row-span-1 text-[3vh] font-graphik leading-tight">{tab.number}</div>
                                    <div className="col-span-3 row-start-1 row-span-1 text-right text-[5vh] font-graphik leading-tight truncate">{tab.title}</div>
                                </div>
                            )}
                            {/* Open state: full vertical accordion for tab 1 */}
                            {isOpen && idx === 0 && (
                                <div className="grid grid-cols-4 gap-y-4 auto-rows-[minmax(32px,auto)] px-3 py-2 w-full">
                                    {/* Row 1: col 1: number, col 3-4: title */}
                                    <div className="col-span-1 row-start-1 row-span-1 text-[3vh] font-graphik py-2.5 leading-tight">{tab.number}</div>
                                    <div className="col-start-3 col-span-2 row-start-1 row-span-1 text-right text-[5vh] font-graphik leading-tight">{tab.title}</div>
                                    {/* Row 2: col 3-4: subheading */}
                                    <div className="col-start-3 col-span-2 row-start-2 row-span-1 text-right text-[2vh] font-graphik leading-tight">
                                        <PortableText value={tab.subheading ?? []} />
                                    </div>
                                    {/* Row 3-4: col 1-4: image */}
                                    {tab.image?.asset && (
                                        <div className="col-span-4 row-start-3 row-end-5 flex justify-center items-center">
                                            <img
                                                src={urlFor(tab.image.asset).url()}
                                                alt="Process image"
                                                className="w-full max-h-[160px] h-full object-cover"
                                                style={{ aspectRatio: '16/9' }}
                                            />
                                        </div>
                                    )}
                                    {/* Row 5: empty */}
                                    <div className="col-span-4 row-start-5 row-span-1 h-[1vh]"></div>
                                    {/* Row 6-7: col 1-4: description */}
                                    <div className="col-span-4 row-start-6 row-end-8 text-[2vh] font-roboto leading-tight mt-2 pb-4">
                                        <PortableText value={tab.description ?? []} />
                                    </div>
                                    {/* Row 8: col 1-2: statement 0, col 3-4: statement 1 */}
                                    <div className="col-span-2 row-start-8 row-span-1 text-[2vh] font-roboto leading-tight pr-2">
                                        <PortableText value={tab.statements?.[0]?.body ?? []} />
                                    </div>
                                    <div className="col-span-2 row-start-8 row-span-1 text-[2vh] font-roboto leading-tight pl-2">
                                        <PortableText value={tab.statements?.[1]?.body ?? []} />
                                    </div>
                                    {/* Row 9: empty */}
                                    <div className="col-span-4 row-start-9 row-span-1 h-[1vh]"></div>
                                    {/* Row 10: col 1-2: statement 2, col 3-4: statement 3 */}
                                    <div className="col-span-2 row-start-10 row-span-1 text-[2vh] font-roboto leading-tight pr-2">
                                        <PortableText value={tab.statements?.[2]?.body ?? []} />
                                    </div>
                                    <div className="col-span-2 row-start-10 row-span-1 text-[2vh] font-roboto leading-tight pl-2">
                                        <PortableText value={tab.statements?.[3]?.body ?? []} />
                                    </div>
                                    {/* Row 11: col 1-2: CTA button */}
                                    <div className="col-span-2 row-start-11 row-span-1 flex items-center">
                                        <a
                                            href={`mailto:${tab.email ?? 'info@futureworld.org'}?subject=${encodeURIComponent('I want to apply to the Supercharge Tomorrow programme')}`}
                                            className="transition cursor-pointer font-bold"
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
                                <div className="grid grid-cols-4 gap-y-4 auto-rows-[minmax(32px,auto)] px-3 py-2 w-full">
                                    {/* Row 1: col 1: number, col 3-4: title */}
                                    <div className="col-span-1 row-start-1 row-span-1 text-[3vh] font-graphik py-2.5 leading-tight">2</div>
                                    <div className="col-start-3 col-span-2 row-start-1 row-span-1 text-right text-[5vh] font-graphik leading-tight">{data.accordionSection2.heading}</div>
                                    {/* Row 2: col 3-4: subheading */}
                                    <div className="col-start-3 col-span-2 row-start-2 row-span-1 text-right text-[2vh] font-graphik leading-tight">
                                        <PortableText value={data.accordionSection2.subheading ?? []} />
                                    </div>
                                    {/* Row 3-4: section1.description */}
                                    <div className="col-span-4 row-start-3 row-end-5 text-[2vh] font-roboto leading-tight">
                                        <PortableText value={data.accordionSection2.section1.description ?? []} />
                                    </div>
                                    {/* Row 5: section2.description */}
                                    <div className="col-span-4 row-start-5 row-span-1 text-[2vh] font-roboto leading-tight">
                                        <PortableText value={data.accordionSection2.section2.description ?? []} />
                                    </div>
                                    {/* Row 6: empty */}
                                    <div className="col-span-4 row-start-6 row-span-1 h-[1vh]"></div>
                                    {/* Row 7: col 1-2: section1.statements[0].heading, col 3-4: section1.statements[1].heading */}
                                    <div className="col-span-2 row-start-7 row-span-1 text-[2vh] font-bold font-roboto leading-tight pr-2">
                                        <PortableText value={data.accordionSection2.section1.statements[0].heading ?? []} />
                                    </div>
                                    <div className="col-span-2 row-start-7 row-span-1 text-[2vh] font-bold font-roboto leading-tight pl-2">
                                        <PortableText value={data.accordionSection2.section1.statements[1].heading ?? []} />
                                    </div>
                                    {/* Row 8: col 1-2: section1.statements[0].body, col 3-4: section1.statements[1].body */}
                                    <div className="col-span-2 row-start-8 row-span-1 text-[2vh] font-roboto leading-tight pr-2">
                                        <PortableText value={data.accordionSection2.section1.statements[0].body ?? []} />
                                    </div>
                                    <div className="col-span-2 row-start-8 row-span-1 text-[2vh] font-roboto leading-tight pl-2">
                                        <PortableText value={data.accordionSection2.section1.statements[1].body ?? []} />
                                    </div>
                                    {/* Row 9: col 1-2: section1.statements[2].heading, col 3-4: section2.statements[0].heading */}
                                    <div className="col-span-2 row-start-9 row-span-1 text-[2vh] font-bold font-roboto leading-tight pr-2">
                                        <PortableText value={data.accordionSection2.section1.statements[2].heading ?? []} />
                                    </div>
                                    <div className="col-span-2 row-start-9 row-span-1 text-[2vh] font-bold font-roboto leading-tight pl-2">
                                        <PortableText value={data.accordionSection2.section2.statements[0].heading ?? []} />
                                    </div>
                                    {/* Row 10: col 1-2: section1.statements[2].body, col 3-4: section2.statements[0].body */}
                                    <div className="col-span-2 row-start-10 row-span-1 text-[2vh] font-roboto leading-tight pr-2">
                                        <PortableText value={data.accordionSection2.section1.statements[2].body ?? []} />
                                    </div>
                                    <div className="col-span-2 row-start-10 row-span-1 text-[2vh] font-roboto leading-tight pl-2">
                                        <PortableText value={data.accordionSection2.section2.statements[0].body ?? []} />
                                    </div>
                                    {/* Row 11: col 3-4: section2.statements[1].heading */}
                                    <div className="col-start-3 col-span-2 row-start-11 row-span-1 text-[2vh] font-bold font-roboto leading-tight pl-2">
                                        <PortableText value={data.accordionSection2.section2.statements[1].heading ?? []} />
                                    </div>
                                    {/* Row 12: col 1-2: cta, col 3-4: section2.statements[1].body */}
                                    <div className="col-span-2 row-start-12 row-span-1 flex items-center">
                                        <a
                                            href={`mailto:${data.accordionSection2.email ?? 'info@futureworld.org'}?subject=${encodeURIComponent('I want to apply to the Supercharge Tomorrow programme')}`}
                                            className="transition cursor-pointer font-bold"
                                        >
                                            <UnderlineOnHoverAnimation hasStaticUnderline={true} color="#F9F7F2">
                                                {data.accordionSection2.cta ?? 'Get in Touch'}
                                            </UnderlineOnHoverAnimation>
                                        </a>
                                    </div>
                                    <div className="col-span-2 row-start-12 row-span-1 text-[2vh] font-roboto leading-tight pl-2">
                                        <PortableText value={data.accordionSection2.section2.statements[1].body ?? []} />
                                    </div>
                                </div>
                            )}
                            {/* Open state: full vertical accordion for tab 3 */}
                            {isOpen && idx === 2 && (
                                <div className="grid grid-cols-4 gap-y-4 auto-rows-[minmax(32px,auto)] px-3 py-2 w-full">
                                    {/* Row 1: col 1: number */}
                                    <div className="col-span-1 row-start-1 row-span-1 text-[3vh] font-graphik py-2.5 leading-tight">3</div>
                                    <div className="col-start-3 col-span-2 row-start-1 row-span-1 text-right text-[5vh] font-graphik leading-tight">{data.accordionSection3.heading}</div>
                                    {/* Row 1: col 3-4: subheading (right aligned) */}
                                    <div className="col-start-3 col-span-2 row-start-2 row-span-1 text-right text-[2vh] font-graphik leading-tight">
                                        <PortableText value={data.accordionSection3.subheading ?? []} />
                                    </div>
                                    {/* Row 3-4: col 1-4: image */}
                                    {data.accordionSection3.image?.asset && (
                                        <div className="col-span-4 row-start-3 row-end-5 flex justify-center items-center">
                                            <img
                                                src={urlFor(data.accordionSection3.image.asset).url()}
                                                alt="Process image"
                                                className="w-full max-h-[160px] h-full object-cover"
                                                style={{ aspectRatio: '16/9' }}
                                            />
                                        </div>
                                    )}
                                    {/* Row 5: description */}
                                    <div className="col-span-4 row-start-5 row-span-1 text-[2vh] font-roboto leading-tight">
                                        <PortableText value={data.accordionSection3.description ?? []} />
                                    </div>
                                    {/* Row 6: empty */}
                                    <div className="col-span-4 row-start-6 row-span-1 h-[1vh]"></div>
                                    {/* Row 7: col 1-3: cta */}
                                    <div className="col-span-3 row-start-7 row-span-1 flex items-center">
                                        <a
                                            href={`mailto:${data.accordionSection3.email ?? 'info@futureworld.org'}?subject=${encodeURIComponent('I want to apply to the Supercharge Tomorrow programme')}`}
                                            className="transition cursor-pointer font-bold"
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
                        <img
                            src={urlFor(data.accordionSection1.image.asset).url()}
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
                                    href={`mailto:${data.accordionSection2.email ?? 'info@futureworld.org'}?subject=${encodeURIComponent('I want to apply to the Supercharge Tomorrow programme')}`}
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
                    content: data.accordionSection1.image.asset ? (
                        <img
                            src={urlFor(data.accordionSection3.image.asset).url()}
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
                                    href={`mailto:${data.accordionSection3.email ?? 'info@futureworld.org'}?subject=${encodeURIComponent('I want to apply to the Supercharge Tomorrow programme')}`}
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
                            '',
                        ].join(' ')}
                        onClick={() => {
                            if (clickable) toggle(key as Active);
                        }}
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
                        {showContent && (
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
