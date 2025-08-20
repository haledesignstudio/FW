"use client";

import React from 'react';
import type { PortableTextBlock } from '@portabletext/types';
import { PortableText } from '@portabletext/react';

import FadeInOnVisible from '@/components/FadeInOnVisible';
import { getGridClasses } from '@/components/insights/grid';
import CommonHeader from '@/components/insights/CommonHeader';
import Header from '@/components/header';
import Footer from '@/components/footer';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import { HighlightText } from '@/components/HighlightText';

// ✅ NEW: Carousel
import Carousel, { type CarouselItem } from '@/components/Carousel';

type RichText = PortableTextBlock[];

type ArticleContent = {
    title: string;
    description: RichText;
    image?: { url: string; alt?: string } | null;
};

export type EdgeScenario = {
    _id: string;
    title: string;
    slug?: string;
    subheading: RichText;
    contentText: RichText;
    pdfMobileUrl?: string | null;
    pdfDesktopUrl?: string | null;
    hasAudio: boolean;
    audioDescription?: RichText;
    audioFileUrl?: string | null;
    articleContents: ArticleContent[];
};

interface EdgeViewProps {
    data: EdgeScenario;
    /** Items to render in the bottom carousel (already filtered in server page to exclude the current slug) */
    carouselItems?: CarouselItem[];
}

const EdgeView: React.FC<EdgeViewProps> = ({ data, carouselItems = [] }) => {
    // --- TOP GRID (desktop) ---
    const topGrid = [
        {
            id: 'edge-1',
            content: (
                <FadeInOnVisible>
                    <h1 className="text-[clamp(8vw,20vh,10vw)] font-graphik leading-[clamp(8vw,20vh,10vw)]">
                        {data.title}
                    </h1>
                </FadeInOnVisible>
            ),
            colSpan: 6,
            rowSpan: 2,
        },
        {
            id: 'edge-2',
            content: <></>,
            colSpan: 6,
            rowSpan: 1,
        },
        {
            id: 'edge-3',
            content: (
                <FadeInOnVisible>
                    <div className="text-[clamp(1vw,3.5vh,1.75vw)] font-roboto leading-tight">
                        <PortableText value={data.contentText} />
                    </div>
                </FadeInOnVisible>
            ),
            colSpan: 2,
            rowSpan: 2,
        },
        {
            id: 'edge-4',
            content: (
                <FadeInOnVisible>
                    <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-bold leading-tight">
                        <HighlightText value={data.subheading} />
                    </div>
                </FadeInOnVisible>
            ),
            colSpan: 3,
            rowSpan: 2,
        },
        {
            id: 'edge-5',
            content: (
                <FadeInOnVisible>
                    <div className="grid gap-[2vh] grid-cols-5 items-start">
                        {/* Article 1 */}
                        <div className="col-span-2">
                            <div className="w-full h-[25vh] overflow-hidden">
                                {data.articleContents?.[0]?.image?.url ? (
                                    <img
                                        src={data.articleContents[0].image.url}
                                        alt={data.articleContents[0].image?.alt || data.articleContents[0].title || 'Article image 1'}
                                        className="w-full h-full object-cover"
                                    />
                                ) : null}
                            </div>
                            <div className="mt-[1.25vh]">
                                <div className="text-[clamp(0.9vw,2.25vh,1.125vw)] font-graphik leading-tight">
                                    {data.articleContents?.[0]?.title}
                                </div>
                                <div className="mt-[2.5vh] text-[clamp(0.6vw,1.75vh,0.875vw)] leading-tight">
                                    <PortableText value={data.articleContents?.[0]?.description ?? []} />
                                </div>
                            </div>
                        </div>

                        {/* Article 2 */}
                        <div className="col-span-1">
                            <div className="w-full h-[25vh] overflow-hidden">
                                {data.articleContents?.[1]?.image?.url ? (
                                    <img
                                        src={data.articleContents[1].image.url}
                                        alt={data.articleContents[1].image?.alt || data.articleContents[1].title || 'Article image 2'}
                                        className="w-full h-full object-cover"
                                    />
                                ) : null}
                            </div>
                            <div className="mt-[1.25vh]">
                                <div className="text-[clamp(0.9vw,2.25vh,1.125vw)] font-graphik leading-tight">
                                    {data.articleContents?.[1]?.title}
                                </div>
                                <div className="mt-[2.5vh] text-[clamp(0.6vw,1.75vh,0.875vw)] leading-tight">
                                    <PortableText value={data.articleContents?.[1]?.description ?? []} />
                                </div>
                            </div>
                        </div>

                        {/* Article 3 */}
                        <div className="col-span-1">
                            <div className="w-full h-[25vh] overflow-hidden">
                                {data.articleContents?.[2]?.image?.url ? (
                                    <img
                                        src={data.articleContents[2].image.url}
                                        alt={data.articleContents[2].image?.alt || data.articleContents[2].title || 'Article image 3'}
                                        className="w-full h-full object-cover"
                                    />
                                ) : null}
                            </div>
                            <div className="mt-[1.25vh]">
                                <div className="text-[clamp(0.9vw,2.25vh,1.125vw)] font-graphik leading-tight">
                                    {data.articleContents?.[2]?.title}
                                </div>
                                <div className="mt-[2.5vh] text-[clamp(0.6vw,1.75vh,0.875vw)] leading-tight">
                                    <PortableText value={data.articleContents?.[2]?.description ?? []} />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1 flex items-center justify-center" />
                    </div>
                </FadeInOnVisible>
            ),
            colSpan: 5,
            rowSpan: 2,
        },
        {
            id: 'edge-6',
            content: (
                <FadeInOnVisible className="h-full">
                    <div className="h-full flex flex-col justify-end">
                        <div className="flex flex-col gap-[2vh] text-[clamp(0.9vw,2.25vh,1.125vw)] font-graphik leading-[clamp(0.9vw,2.25vh,1.125vw)]">
                            {data.pdfMobileUrl ? (
                                <a href={`/the-edge/${data.slug}/pdf?device=mobile`} target="_blank" rel="noreferrer">
                                    <UnderlineOnHoverAnimation hasStaticUnderline>
                                        Download for mobile
                                    </UnderlineOnHoverAnimation>
                                </a>
                            ) : null}
                            {data.pdfDesktopUrl ? (
                                <a href={`/the-edge/${data.slug}/pdf?device=desktop`} target="_blank" rel="noreferrer">
                                    <UnderlineOnHoverAnimation hasStaticUnderline>
                                        Download for desktop
                                    </UnderlineOnHoverAnimation>
                                </a>
                            ) : null}
                        </div>
                    </div>
                </FadeInOnVisible>
            ),
            colSpan: 1,
            rowSpan: 1,
        },
    ];

    return (
        <>
            <Header />
            <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
                {/* Common header grid */}
                <CommonHeader title={data.title} active="edge" />

                {/* Top grid */}
                <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[25vh]">
                    {topGrid.map((item) => (
                        <div
                            key={item.id}
                            className={getGridClasses({
                                id: item.id,
                                colSpan: item.colSpan,
                                rowSpan: item.rowSpan,
                            })}
                        >
                            {item.content}
                        </div>
                    ))}
                </div>

                {/* Audio section (if any) */}
                <FadeInOnVisible>
                    {data.audioDescription?.length ? (
                        <div className="grid gap-[2vh] grid-cols-6 mt-[25vh]">
                            <div className="col-span-3">
                                {data.audioDescription?.length ? (
                                    <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-bold leading-tight">
                                        <HighlightText value={data.audioDescription} />
                                    </div>
                                ) : null}
                            </div>

                            <div className="col-span-3">
                                {data.audioDescription?.length ? (
                                    <div>
                                        {/* AUDIO VISUALISER GOES HERE: hook up to data.audioFileUrl if needed */}
                                        AUDIO VIZUALISER GOES HERE:
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ) : null}
                </FadeInOnVisible>

                {/* Subscribe / Mindbullets section + Carousel */}
                <FadeInOnVisible>
                    <div className="grid gap-[2vh] grid-cols-6 mt-[25vh]">
                        <div className="col-span-3">
                            <div>
                                <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-bold leading-tight">
                                    <HighlightText
                                        value={
                                            "Every week, Futureworld produces Mindbullets:  News from the Future – a way to spark strategic thinking about leadership, innovation and digital disruption."
                                        }
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="col-span-1" />

                        <div className="col-span-2">
                            <>
                                <p className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[4vh] leading-tight">
                                    Subscribe for news from the future
                                </p>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    placeholder="Enter your e-mail"
                                    className="outline-none border-none bg-transparent text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[3vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[4vh] text-base placeholder-gray placeholder:font-bold placeholder:text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:placeholder:text-[3vh] [@media(max-height:600px)_and_(max-width:768px)]:placeholder:text-[4vh]"
                                />

                                <div className="text-[2vh] mt-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[4vh] font-bold leading-tight">
                                    <UnderlineOnHoverAnimation hasStaticUnderline>
                                        Submit
                                    </UnderlineOnHoverAnimation>
                                </div>
                            </>
                        </div>
                    </div>
                </FadeInOnVisible>
                {/* Carousel (desktop) */}
                {carouselItems.length > 0 && (
                    <FadeInOnVisible>
                        <div className="mt-[25vh]">
                            <div className="text-[clamp(0.75vw,2vh,1vw)] font-bold leading-relaxed mb-[2vh]">Mindbullets you may like</div>
                            <Carousel
                                items={carouselItems}
                                imageHeight="25vh"
                                captionHeight="25vh"
                                innerRowGap="4vh"
                                gap="4vh"
                            />
                        </div>
                    </FadeInOnVisible>
                )}
            </main>
            <Footer />
        </>
    );
};

export default EdgeView;
