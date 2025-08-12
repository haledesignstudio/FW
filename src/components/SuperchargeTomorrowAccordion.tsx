'use client';

import { useState } from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import type { PortableTextBlock } from '@portabletext/react';

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
    const [active, setActive] = useState<Active>('sec2');
    const toggle = (id: Active) => setActive(prev => (prev === id ? 'sec2' : id));


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
                        <div className="text-[clamp(4vw,10vh,5vw)] font-graphik leading-tight text-center text-[#F9F7F2]">
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
                            <div className="text-[clamp(0.75vw,2.25vh,1.125vw)] font-graphik text-center leading-tight text-[#F9F7F2]">
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
                        <div className="text-[clamp(4vw,10vh,5vw)] font-graphik leading-tight text-[#F9F7F2]">
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

                        <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-bold leading-tight text-balance pt-[2vh] text-right text-[#F9F7F2]">
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
                        <div className="text-[clamp(0.75vw,2vh,1vw)] font-roboto leading-tight text-[#F9F7F2]">
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
                        <div className="text-[clamp(0.25vw,1.5vh,0.75vw)] pt-[4vh] font-roboto leading-tight text-[#F9F7F2]">
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
                        <div className="text-[clamp(0.25vw,1.5vh,0.75vw)] pt-[4vh] font-roboto leading-tight text-[#F9F7F2]">
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
                        <div className="text-[clamp(0.25vw,1.5vh,0.75vw)] pt-[4vh] font-roboto leading-tight text-[#F9F7F2]">
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
                        <div className="text-[clamp(0.25vw,1.5vh,0.75vw)] pt-[4vh] font-roboto leading-tight text-[#F9F7F2]">
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
                            <div className="text-[clamp(8vw,20vh,10vw)] font-graphik leading-[clamp(8vw,20vh,10vw)] text-[#F9F7F2]">
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
                            <div className="text-[clamp(0.9vw,2.25vh,1.125vw)] text-[#F9F7F2] font-graphik leading-[clamp(0.9vw,3vh,1.5vw)] ">
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
                        <div className="text-[clamp(4vw,10vh,5vw)] font-graphik leading-tight text-center text-[#F9F7F2]">
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
                            <div className="text-[clamp(0.75vw,2.25vh,1.125vw)] font-graphik text-center leading-tight text-[#F9F7F2]">
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
                        <div className="text-[clamp(4vw,10vh,5vw)] font-graphik leading-tight text-[#F9F7F2]">
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
                        <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-bold leading-tight text-balance text-right text-[#F9F7F2] pt-[2vh]">
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
                        <div className="text-[clamp(0.75vw,2vh,1vw)] font-roboto leading-tight text-[#F9F7F2]">
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
                            <div className="text-[clamp(0.75vw,2vh,1vw)] font-bold leading-tight text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordionSection2.section1.statements[0].heading} components={ptComponents} />
                            </div>
                            <div className="text-[clamp(0.75vw,2vh,1vw)] font-roboto leading-tight text-[#F9F7F2]">
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
                            <div className="text-[clamp(0.75vw,2vh,1vw)] font-bold leading-tight text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordionSection2.section1.statements[1].heading} components={ptComponents} />
                            </div>
                            <div className="text-[clamp(0.75vw,2vh,1vw)] font-roboto leading-tight text-[#F9F7F2]">
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
                            <div className="text-[clamp(0.75vw,2vh,1vw)] font-bold leading-tight text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordionSection2.section1.statements[2].heading} components={ptComponents} />
                            </div>
                            <div className="text-[clamp(0.75vw,2vh,1vw)] font-roboto leading-tight text-[#F9F7F2]">
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
                        <div className="text-[clamp(0.75vw,2vh,1vw)] font-roboto leading-tight text-[#F9F7F2]">
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
                            <div className="text-[clamp(0.75vw,2vh,1vw)] font-bold leading-tight text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordionSection2.section2.statements[0].heading} components={ptComponents} />
                            </div>
                            <div className="text-[clamp(0.75vw,2vh,1vw)] font-roboto leading-tight text-[#F9F7F2]">
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
                            <div className="text-[clamp(0.75vw,2vh,1vw)] font-bold leading-tight text-balance text-[#F9F7F2]">
                                <PortableText value={data.accordionSection2.section2.statements[1].heading} components={ptComponents} />
                            </div>
                            <div className="text-[clamp(0.75vw,2vh,1vw)] font-roboto leading-tight text-[#F9F7F2]">
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
                            <div className="text-[clamp(8vw,20vh,10vw)] font-graphik leading-[clamp(8vw,20vh,10vw)] text-[#F9F7F2]">
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
                            <div className="text-[clamp(0.9vw,2.25vh,1.125vw)] text-[#F9F7F2] font-graphik leading-[clamp(0.9vw,3vh,1.5vw)] ">
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
                        <div className="text-[clamp(4vw,10vh,5vw)] font-graphik leading-tight text-center text-[#232323]">
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
                            <div className="text-[clamp(0.75vw,2.25vh,1.125vw)] font-graphik text-center leading-tight text-[#232323]">
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
                        <div className="text-[clamp(4vw,10vh,5vw)] font-graphik leading-tight text-[#232323]">
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

                        <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-bold leading-tight text-balance pt-[2vh] text-right text-[#232323]">
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
                        <div className="text-[clamp(0.75vw,2vh,1vw)] font-roboto leading-tight text-[#232323]">
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
                            <div className="text-[clamp(8vw,20vh,10vw)] font-graphik leading-[clamp(8vw,20vh,10vw)] text-[#232323]">
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
                            <div className="text-[clamp(0.9vw,2.25vh,1.125vw)] text-[#232323] font-graphik leading-[clamp(0.9vw,3vh,1.5vw)] ">
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
