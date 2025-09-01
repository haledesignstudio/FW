'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import type { HomePageContent } from '@/app/home-client';
import { urlFor } from '@/sanity/lib/image';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import FadeInOnVisible from './FadeInOnVisible';
import { client } from '@/sanity/lib/client';
import { caseStudyQuery } from '@/sanity/lib/queries';
import CaseStudiesCarousel, { type CarouselItem } from '@/components/CaseStudiesCarousel';
import type { PortableTextBlock, PortableTextSpan } from '@portabletext/types';

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

// shape returned by your query
type CaseStudyFromQuery = {
    _id: string;
    title: string;
    slug?: string | null;
    image?: { url?: string | null } | null;
    summary?: PortableTextBlock[] | null; // 👈 typed, not unknown
};

function extractSummaryText(summary?: PortableTextBlock[] | null): string {
    if (!summary || summary.length === 0) return '';
    // find the first "block" and its first span with text
    const block = summary.find(b => b._type === 'block');
    if (!block || !Array.isArray(block.children)) return '';
    const firstSpan = block.children.find(
        (c): c is PortableTextSpan => c._type === 'span' && typeof c.text === 'string'
    );
    return firstSpan?.text ?? '';
}



// Custom hook to detect responsive layout
const useResponsiveLayout = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            // Mobile: not tablet landscape and not desktop
            const isTabletLandscape = window.matchMedia('(max-height: 600px) and (max-width: 1080px)').matches;
            const isDesktop = window.matchMedia('(min-width: 1080px) and (min-aspect-ratio: 1/1)').matches;
            setIsMobile(!isTabletLandscape && !isDesktop);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return { isMobile };
};

function getGridClasses(item: GridItem) {
    const base = ['flex', 'flex-col'];
    if (item.mobileColSpan === 0 || item.mobileRowSpan === 0) {
        base.push('block', '[@media(max-width:1080px)]:hidden');
    } else {
        base.push(`col-span-${item.mobileColSpan}`, `row-span-${item.mobileRowSpan}`);
    }
    if (item.landscapeColSpan === 0 || item.landscapeRowSpan === 0) {
        base.push('[@media(max-height:600px)_and_(max-width:1080px)]:hidden');
    } else {
        base.push(`[@media(max-height:600px)_and_(max-width:1080px)]:col-span-${item.landscapeColSpan}`);
        base.push(`[@media(max-height:600px)_and_(max-width:1080px)]:row-span-${item.landscapeRowSpan}`);
    }
    if (item.colSpan === 0 || item.rowSpan === 0) {
        base.push('[@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:hidden');
    } else {
        base.push(`[@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:col-span-${item.colSpan}`);
        base.push(`[@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:row-span-${item.rowSpan}`);
    }
    return base.join(' ');
}

const hoverHintWhenClosed = (isActive: boolean) =>
    !isActive
        ? [
            // smooth + GPU
            "motion-safe:will-change-transform motion-safe:transition-transform motion-safe:duration-300",
            // the hint
            "hover:scale-[1.01] ",
        ].join(" ")
        : "";

export default function HomeAccordion({ data }: HomeAccordionProps) {
    const { isMobile } = useResponsiveLayout();
    const [openTabs, setOpenTabs] = useState<Set<string>>(new Set());

    // Auto-open all tabs on mobile
    useEffect(() => {
        if (isMobile) {
            setOpenTabs(new Set(['benchmark', 'process', 'case-studies']));
        } else {
            setOpenTabs(new Set());
        }
    }, [isMobile]);
    const [caseStudies, setCaseStudies] = useState<CaseStudyFromQuery[]>([]);

    // Fetch case studies on component mount via your GROQ query
    useEffect(() => {
        const load = async () => {
            try {
                const studies = await client.fetch<CaseStudyFromQuery[]>(caseStudyQuery);
                setCaseStudies(studies ?? []);
            } catch (error) {
                console.error('Error loading case studies:', error);
                setCaseStudies([]);
            }
        };
        load();
    }, []);

    // Map Sanity docs -> CarouselItem[]
    const carouselItems: CarouselItem[] = useMemo(() => {
        return (caseStudies || []).map((cs) => {
            // PortableText summary -> quick plain text fallback (first block/child)
            const description = extractSummaryText(cs.summary);


            return {
                src: cs.image?.url ?? '',              // mainImage -> src
                heading: cs.title,                     // title -> heading
                description,                           // summary -> description
                href: cs.slug ? `/case-study/${cs.slug}` : undefined, // slug -> href
            };
        });
    }, [caseStudies]);

    // Helper function to toggle a tab's open state
    const toggleTab = (tabId: string) => {
        setOpenTabs(prevOpenTabs => {
            const next = new Set(prevOpenTabs);
            if (next.has(tabId)) next.delete(tabId);
            else next.add(tabId);
            return next;
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
                        <FadeInOnVisible>
                            <div
                                className="dt-h1 cursor-pointer"
                                onClick={(e) => { e.stopPropagation(); toggleTab('benchmark'); }}
                            >
                                {data.section1.section1Title}
                            </div>
                        </FadeInOnVisible>
                    ),
                },
                items: [
                    {
                        id: 1,
                        content: (
                            <FadeInOnVisible>
                                <div className="dt-h4 text-[#F9F7F2]">
                                    <PortableText value={data.section1.section1Body} />
                                </div>
                            </FadeInOnVisible>
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
                        content: (
                            <iframe
                                src={data.section1.section1URL}
                                className="w-full h-full bg-white"
                                title="Future World Analytics Dashboard"
                                style={{ minHeight: '300px' }}
                            />
                        ),
                        colSpan: 3,
                        rowSpan: 3,
                        mobileColSpan: 2,
                        mobileRowSpan: 1,
                        landscapeColSpan: 3,
                        landscapeRowSpan: 1,
                    },
                    {
                        id: 3,
                        content: <></>,
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
                            <FadeInOnVisible className="h-full flex flex-col justify-center ">
                                <div className="h-full flex flex-col justify-center ">
                                    <div className="dt-btn">
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
                            </FadeInOnVisible>
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
                        <FadeInOnVisible>
                            <div
                                className="dt-h1 cursor-pointer"
                                onClick={(e) => { e.stopPropagation(); toggleTab('process'); }}
                            >
                                {data.section2.section2Title}
                            </div>
                        </FadeInOnVisible>
                    ),
                },
                items: [
                    {
                        id: 1,
                        content: (
                            <FadeInOnVisible className="h-full flex flex-col justify-end mt-[10vh] ">
                                <div className="h-full flex flex-col justify-end ">
                                    <div className="dt-h4 text-[#F9F7F2]">
                                        <PortableText value={data.section2.section2Body} />
                                    </div>
                                </div>
                            </FadeInOnVisible>
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
                        content: data.section2?.section2Image?.asset ? (
                            <div className="w-full h-full relative mt-[10vh]">
                                <Image
                                    src={urlFor(data.section2.section2Image.asset).url()}
                                    alt={data.section2.section2Image.alt || 'Process image'}
                                    className="w-full h-full object-contain object-top object-center"
                                    fill
                                    sizes="(max-width: 1080px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        ) : null,
                        colSpan: 3,
                        rowSpan: 4,
                        mobileColSpan: 2,
                        mobileRowSpan: 1,
                        landscapeColSpan: 3,
                        landscapeRowSpan: 1,
                    },
                    {
                        id: 4,
                        content: (
                            <FadeInOnVisible>
                                <div className="h-full flex flex-col gap-[2.5vh] mt-[20vh]">
                                    <div className="dt-h5">
                                        <PortableText value={data.section2.section2Heading1} />
                                    </div>
                                    <div className="dt-body-sm">
                                        <PortableText value={data.section2.section2Description1} />
                                    </div>
                                </div>
                            </FadeInOnVisible>
                        ),

                        colSpan: 1,
                        rowSpan: 3,
                        mobileColSpan: 2,
                        mobileRowSpan: 1,
                        landscapeColSpan: 3,
                        landscapeRowSpan: 1,
                    },
                    {
                        id: 5,
                        content: (
                            <FadeInOnVisible>
                                <div className="h-full flex flex-col gap-[2.5vh] mt-[20vh]">
                                    <div className="dt-h5">
                                        <PortableText value={data.section2.section2Heading2} />
                                    </div>
                                    <div className="dt-body-sm">
                                        <PortableText value={data.section2.section2Description2} />
                                    </div>
                                </div>
                            </FadeInOnVisible>
                        ),
                        colSpan: 1,
                        rowSpan: 3,
                        mobileColSpan: 2,
                        mobileRowSpan: 1,
                        landscapeColSpan: 3,
                        landscapeRowSpan: 1,
                    },
                    {
                        id: 6,
                        content: (
                            <FadeInOnVisible>
                                <div className="h-full flex flex-col gap-[2.5vh] mt-[20vh]">
                                    <div className="dt-h5">
                                        <PortableText value={data.section2.section2Heading3} />
                                    </div>
                                    <div className="dt-body-sm">
                                        <PortableText value={data.section2.section2Description3} />
                                    </div>
                                </div>
                            </FadeInOnVisible>
                        ),
                        colSpan: 1,
                        rowSpan: 3,
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
                        <FadeInOnVisible>
                            <div
                                className="dt-h1 cursor-pointer"
                                onClick={(e) => { e.stopPropagation(); toggleTab('case-studies'); }}
                            >
                                {data.section3.section3Title}
                            </div>
                        </FadeInOnVisible>
                    ),
                },
                items: [
                    {
                        id: 1,
                        content: (
                            <FadeInOnVisible className="h-full flex flex-col justify-end">
                                <div className="h-full flex flex-col justify-end">
                                    <div className="dt-h4">
                                        <PortableText value={data.section3.section3Body} />
                                    </div>
                                </div>
                            </FadeInOnVisible>
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
                            <div
                                onClick={(e) => e.stopPropagation()}
                                onMouseDown={(e) => e.stopPropagation()}
                                onPointerDown={(e) => e.stopPropagation()}
                            >
                                <CaseStudiesCarousel
                                    items={carouselItems}
                                    imageHeight="25vh"
                                    captionHeight="25vh"
                                    innerRowGap="4vh"
                                    gap="4vh"
                                    mobileImageHeight="25vh"
                                    mobileCaptionHeight="25vh"
                                    mobileInnerRowGap="2vh"
                                    mobileGap="0"
                                    rounded="rounded-2xl"
                                    ariaLabel="Case studies carousel"
                                />
                            </div>
                        ),
                        colSpan: 6,
                        rowSpan: 4,
                        mobileColSpan: 2,
                        mobileRowSpan: 1,
                        landscapeColSpan: 3,
                        landscapeRowSpan: 1,
                    },
                ],
            },
        ];

    // For pulse: find all closed tabs, assign delay by their order
    const closedTabs = tabs.filter(tab => !openTabs.has(tab.id));
    const closedTabDelays: Record<string, number> = {};
    closedTabs.forEach((tab, idx) => {
        closedTabDelays[tab.id] = idx;
    });

    return (
        <div className="">
            {isMobile ? (
                /* Mobile Layout - Individual Tab Containers with Overlap */
                <div className="">
                    {/* Section 1: Benchmark */}
                    <div
                        className="transition-all duration-500 overflow-hidden"
                        style={{
                            backgroundColor: '#1B1B1B',
                            color: '#fff',
                        }}
                        onClick={isMobile ? undefined : () => toggleTab('benchmark')}
                    >
                        <div className={[
                            "overflow-hidden transition-[max-height] duration-500",
                            !openTabs.has('benchmark')
                                ? "max-h-[12vh]"
                                : "max-h-[9999px]"
                        ].join(' ')}>
                            <div className="grid grid-cols-4 gap-y-[4.53vw]" style={{ gridAutoRows: 'minmax(7.701vh, max-content)' }}>
                                {(isMobile || openTabs.has('benchmark')) && (
                                    <>
                                        {/* Row 1-2: Section Title */}
                                        <div
                                            className="py-[2.09vh] col-span-4 row-start-1 row-span-2 px-[4.53vw] bg-[#1B1B1B] text-[#F9F7F2] flex items-start cursor-pointer"
                                            onClick={isMobile ? undefined : (e) => { e.stopPropagation(); toggleTab('benchmark'); }}
                                        >
                                            <h2 className="dt-h1">{data.section1.section1Title}</h2>
                                        </div>

                                        {/* Row 3: Section Body */}
                                        <div className="col-span-4 row-start-3 bg-[#1B1B1B] px-[4.53vw] text-[#F9F7F2]">
                                            <div className="dt-h4">
                                                <PortableText value={data.section1.section1Body} />
                                            </div>
                                        </div>

                                        {/* Row 4: Empty */}
                                        <div className="col-span-4 row-start-4 h-[5vh] px-[4.53vw] bg-[#1B1B1B]"></div>

                                        {/* Row 5: CTA Section */}
                                        <div className="col-span-4 row-start-5 bg-[#1B1B1B] px-[4.53vw] text-[#F9F7F2]">
                                            <a
                                                href={`mailto:${data.section1.section1Email ?? 'info@futureworld.org'}?subject=${encodeURIComponent(data.section1.section1CTA ?? '')}`}
                                                className="transition cursor-pointer dt-btn"
                                            >
                                                <UnderlineOnHoverAnimation hasStaticUnderline color="#fff">
                                                    {data.section1.section1CTA ?? 'Get in Touch'}
                                                </UnderlineOnHoverAnimation>
                                            </a>
                                        </div>




                                        <div className="col-span-4 row-start-6 row-span-4 bg-[#1B1B1B]">
                                            <iframe
                                                src={data.section1.section1URL}
                                                className="w-full h-[100vh] bg-white"
                                                title="Future World Analytics Dashboard"
                                            />
                                        </div>

                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Process */}
                    <div
                        className="transition-all duration-500 overflow-hidden"
                        style={{
                            backgroundColor: '#DC5A50',
                            color: '#fff',
                        }}
                        onClick={isMobile ? undefined : () => toggleTab('process')}
                    >
                        <div className={[
                            "overflow-hidden transition-[max-height] duration-500",
                            !openTabs.has('process')
                                ? "max-h-[12vh]"
                                : "max-h-[9999px]"
                        ].join(' ')}>
                            <div className="grid grid-cols-4 gap-y-[4.53vw] px-[4.53vw]" style={{ gridAutoRows: 'minmax(7.701vh, max-content)' }}>
                                {(isMobile || openTabs.has('process')) && (
                                    <>
                                        {/* Row 1: Section 2 Main Title */}
                                        <div
                                            className="py-[2.09vh] col-span-4 row-start-1 bg-[#DC5A50] text-[#F9F7F2] flex items-center cursor-pointer z-10"
                                            onClick={isMobile ? undefined : (e) => { e.stopPropagation(); toggleTab('process'); }}
                                        >
                                            <h2 className="dt-h1">{data.section2.section2Title}</h2>
                                        </div>

                                        {/* Row 2: Section Body */}
                                        <div className="col-span-4 row-start-2 bg-[#DC5A50] text-[#F9F7F2]">
                                            <div className="dt-h4">
                                                <PortableText value={data.section2.section2Body} />
                                            </div>
                                        </div>

                                        {/* Row 3-7: Section Image (Col 2-4) */}
                                        <div className="col-span-1 row-start-3 row-span-5 bg-[#DC5A50]"></div>
                                        <div className="col-start-2 col-span-3 row-start-3 row-span-5 bg-[#DC5A50] p-4">
                                            {data.section2?.section2Image?.asset && (
                                                <div className="w-full h-[40vh] relative">
                                                    <Image
                                                        src={urlFor(data.section2.section2Image.asset).url()}
                                                        alt={data.section2.section2Image.alt || 'Process image'}
                                                        className="w-full h-full object-contain"
                                                        fill
                                                        sizes="75vw"
                                                    />
                                                </div>
                                            )}
                                        </div>


                                        {/* Row 9: Section Heading1 */}
                                        <div className="col-span-4 row-start-8 bg-[#DC5A50] text-[#F9F7F2] flex flex-col gap-[2vh] pb-[4vh]">
                                            <div className="dt-h5 [&>*]:inline [&>*]:pr-1">
                                                <PortableText value={data.section2.section2Heading1} />
                                            </div>
                                            <div className="dt-body-sm [&>*]:inline [&>*]:pr-1">
                                                <PortableText value={data.section2.section2Description1} />
                                            </div>
                                        </div>


                                        {/* Row 11: Section Heading2 */}
                                        <div className="col-span-4 row-start-9 bg-[#DC5A50] text-[#F9F7F2] flex flex-col gap-[2vh] pb-[4vh]">
                                            <div className="dt-h5 [&>*]:inline [&>*]:pr-1">
                                                <PortableText value={data.section2.section2Heading2} />
                                            </div>
                                            <div className="dt-body-sm [&>*]:inline [&>*]:pr-1">
                                                <PortableText value={data.section2.section2Description2} />
                                            </div>
                                        </div>



                                        {/* Row 13: Section Heading3 */}
                                        <div className="col-span-4 row-start-10 bg-[#DC5A50] text-[#F9F7F2] flex flex-col gap-[2vh]">
                                            <div className="dt-h5 [&>*]:inline [&>*]:pr-1">
                                                <PortableText value={data.section2.section2Heading3} />
                                            </div>
                                            <div className="dt-body-sm [&>*]:inline [&>*]:pr-1">
                                                <PortableText value={data.section2.section2Description3} />
                                            </div>
                                        </div>

                                        <div className="col-span-4 row-start-11 bg-[#DC5A50]"></div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Case Studies */}
                    <div
                        className="transition-all duration-500 overflow-hidden"
                        style={{
                            backgroundColor: '#F9F7F2',
                            color: '#000',
                        }}
                        onClick={isMobile ? undefined : () => toggleTab('case-studies')}
                    >
                        <div className={[
                            "overflow-hidden transition-[max-height] duration-500",
                            !openTabs.has('case-studies')
                                ? "max-h-[12vh]"
                                : "max-h-[9999px]"
                        ].join(' ')}>
                            <div className="grid grid-cols-4 gap-y-[4.53vw] px-[4.53vw]" style={{ gridAutoRows: 'minmax(7.701vh, max-content)' }}>
                                {(isMobile || openTabs.has('case-studies')) && (
                                    <>
                                        {/* Row 1: Main Title */}
                                        <div
                                            className="py-[2.09vh] col-span-4 row-start-1 bg-[#F9F7F2] flex items-center cursor-pointer z-10"
                                            onClick={isMobile ? undefined : (e) => { e.stopPropagation(); toggleTab('case-studies'); }}
                                        >
                                            <h2 className="dt-h1">{data.section3.section3Title}</h2>
                                        </div>

                                        {/* Row 2: Section Body */}
                                        <div className="col-span-4 row-start-2 bg-[#F9F7F2]">
                                            <div className="dt-h4">
                                                <PortableText value={data.section3.section3Body} />
                                            </div>
                                        </div>

                                        {/* Row 3: Keep your existing mobile carousel for now */}
                                        <div className="col-span-4 row-start-3 bg-[#F9F7F2]">
                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                onMouseDown={(e) => e.stopPropagation()}
                                                onPointerDown={(e) => e.stopPropagation()}
                                            >
                                                <CaseStudiesCarousel
                                                    items={carouselItems}
                                                    imageHeight="25vh"
                                                    captionHeight="25vh"
                                                    innerRowGap="4vh"
                                                    gap="4vh"
                                                    mobileImageHeight="25vh"
                                                    mobileCaptionHeight="25vh"
                                                    mobileInnerRowGap="2vh"
                                                    mobileGap="0"
                                                    rounded="rounded-2xl"
                                                    ariaLabel="Case studies carousel"
                                                />
                                            </div>

                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* Desktop/Tablet Layout - Original Grid System */
                tabs.map((tab) => {
                    const isActive = openTabs.has(tab.id);

                    return (
                        <div
                            key={tab.id}
                            role="button"
                            aria-expanded={isActive}
                            tabIndex={0}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleTab(tab.id)}
                            onClick={() => toggleTab(tab.id)}
                            className={[
                                "group relative transition-all duration-500 overflow-hidden", // existing
                                hoverHintWhenClosed(isActive),                                // 👈 new
                            ].join(' ')}
                            style={{
                                backgroundColor: tab.color,
                                color: tab.color === '#F9F7F2' ? '#000' : '#fff',
                            }}
                        >
                            {/* Grid wrapper: collapsed shows exactly one row height */}
                            <div className={[
                                "[@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:px-[1.795vw] [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:py-[3.2vh]",
                                "overflow-hidden transition-[max-height] duration-500",
                                !isActive
                                    ? "max-h-[34vh]"
                                    : "max-h-[9999px]"
                            ].join(' ')}
                            >
                                <div className="grid gap-[2vh] grid-cols-2 auto-rows-[12.5vh] [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:auto-rows-[21vh] [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:gap-x-[1.795vw] [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:gap-y-[3.2vh]">

                                    {/* Title as a grid item with custom spans */}
                                    <div className={`${getGridClasses(tab.titleItem)}`}>
                                        {tab.titleItem.content}
                                    </div>

                                    {/* Rest of items */}
                                    {tab.items.map((item) => (
                                        <div key={item.id} className={`${getGridClasses(item)}`}>
                                            {item.content}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}