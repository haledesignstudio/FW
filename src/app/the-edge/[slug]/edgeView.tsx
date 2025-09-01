
"use client";

import Image from "next/image";

import React from 'react';
import type { PortableTextBlock } from '@portabletext/types';
import { PortableText } from '@portabletext/react';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import AudioVisualiser from '@/components/audioVisualiser';
import { getGridClasses } from '@/components/insights/grid';
import CommonHeader from '@/components/insights/CommonHeader';
import Header from '@/components/header';
import Footer from '@/components/footer';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import { HighlightText } from '@/components/HighlightText';
import Carousel, { type CarouselItem } from '@/components/Carousel';
import { getImageDimensions } from '@sanity/asset-utils';
import { urlFor } from '@/sanity/lib/image';

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
    finalStatement: RichText;
    pdfMobileUrl?: string | null;
    pdfDesktopUrl?: string | null;
    hasAudio: boolean;
    audioDescription?: RichText;
    audioFileUrl?: string | null;
    articleContents: ArticleContent[];
};


interface EdgeViewProps {
    data: EdgeScenario;
    carouselItems?: CarouselItem[];
}

const EdgeView: React.FC<EdgeViewProps> = ({ data, carouselItems = [] }) => {

    const topGrid = [
        {
            id: 'edge-1',
            content: (
                <FadeInOnVisible>
                    <h1 className="dt-h1">
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
                    <div className="dt-h4 text-balance">
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
                    <div className="dt-h3">
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
                            <div className="w-full h-[21vh] overflow-hidden">
                                {data.articleContents?.[0]?.image?.url ? (
                                    <Image
                                        src={urlFor(data.articleContents[0].image.url).quality(75).auto('format').url()}
                                        width={getImageDimensions(data.articleContents[0].image.url).width}
                                        height={getImageDimensions(data.articleContents[0].image.url).height}
                                        alt={
                                            data.articleContents[0].image?.alt ||
                                            data.articleContents[0].title ||
                                            'Article image 1'
                                        }
                                        className="w-full h-full object-cover"
                                    />
                                ) : null}
                            </div>
                            <div className="mt-[1.25vh]">
                                <div className="dt-body-lg">
                                    {data.articleContents?.[0]?.title}
                                </div>
                                <div className="mt-[2.5vh] dt-body-sm">
                                    <PortableText value={data.articleContents?.[0]?.description ?? []} />
                                </div>
                            </div>
                        </div>

                        {/* Article 2 */}
                        <div className="col-span-1">
                            <div className="w-full h-[21vh] overflow-hidden">
                                {data.articleContents?.[1]?.image?.url ? (
                                    <Image
                                        src={urlFor(data.articleContents[1].image.url).quality(75).auto('format').url()}
                                        width={getImageDimensions(data.articleContents[1].image.url).width}
                                        height={getImageDimensions(data.articleContents[1].image.url).height}
                                        alt={
                                            data.articleContents[1].image?.alt ||
                                            data.articleContents[1].title ||
                                            'Article image 1'
                                        }
                                        className="w-full h-full object-cover"
                                    />
                                ) : null}
                            </div>
                            <div className="mt-[1.25vh]">
                                <div className="dt-body-lg">
                                    {data.articleContents?.[1]?.title}
                                </div>
                                <div className="mt-[2.5vh] dt-body-sm">
                                    <PortableText value={data.articleContents?.[1]?.description ?? []} />
                                </div>
                            </div>
                        </div>

                        {/* Article 3 */}
                        <div className="col-span-1">
                            <div className="w-full h-[21vh] overflow-hidden">
                                {data.articleContents?.[2]?.image?.url ? (
                                    <Image
                                        src={urlFor(data.articleContents[2].image.url).quality(75).auto('format').url()}
                                        width={getImageDimensions(data.articleContents[2].image.url).width}
                                        height={getImageDimensions(data.articleContents[2].image.url).height}
                                        alt={
                                            data.articleContents[2].image?.alt ||
                                            data.articleContents[2].title ||
                                            'Article image 1'
                                        }
                                        className="w-full h-full object-cover"
                                    />
                                ) : null}
                            </div>
                            <div className="mt-[1.25vh]">
                                <div className="dt-body-lg">
                                    {data.articleContents?.[2]?.title}
                                </div>
                                <div className="mt-[2.5vh] dt-body-sm">
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
                        <div className="flex flex-col gap-[1vh] dt-btn">
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


    const mobile = (
        <div className="block [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:hidden min-h-screen flex flex-col">
            <CommonHeader title={data.title} active="edge" />
            <div className="grid grid-cols-4 auto-rows-[minmax(7.701vh,auto)] overflow-visible gap-x-[4.53vw] gap-y-[2.09vh]">
                {/* Row 1-2, Col 1-3: Title */}
                <div className="col-span-3 flex items-end">
                    <FadeInOnVisible>
                        <h1 className="dt-h1">{data.title}</h1>
                    </FadeInOnVisible>
                </div>
                {/* Row 3: Empty */}
                <div className="col-span-4 row-span-1" />
                {/* Row 4: ContentText */}
                <div className="col-span-4">
                    <FadeInOnVisible>
                        <div className="dt-h4">
                            <PortableText value={data.contentText} />
                        </div>
                    </FadeInOnVisible>
                </div>
                {/* Row 5-6: Subheading */}
                <div className="col-span-4">
                    <FadeInOnVisible>
                        <div className="dt-h3">
                            <HighlightText value={data.subheading} />
                        </div>
                    </FadeInOnVisible>
                </div>
                {/* Row 7: Empty */}
                <div className="col-span-4 row-span-1" />
                {/* Row 8-11: Article 1 */}
                <div className="col-span-4 row-span-4">
                    <div className="grid grid-cols-4 gap-x-[4.53vw] gap-y-[2.09vh]">
                        <div className="col-span-4">
                            <div className="w-full h-[25vh] overflow-hidden">
                                {data.articleContents?.[0]?.image?.url ? (
                                    <Image
                                        src={urlFor(data.articleContents[0].image.url).quality(75).auto('format').url()}
                                        width={getImageDimensions(data.articleContents[0].image.url).width}
                                        height={getImageDimensions(data.articleContents[0].image.url).height}
                                        alt={
                                            data.articleContents[0].image?.alt ||
                                            data.articleContents[0].title ||
                                            'Article image 1'
                                        }
                                        className="w-full h-full object-cover"
                                    />
                                ) : null}
                            </div>
                            <div className="mt-[2vh]">
                                <div className="dt-h5">
                                    {data.articleContents?.[0]?.title}
                                </div>
                                <div className="mt-[2.5vh] dt-body-sm">
                                    <PortableText value={data.articleContents?.[0]?.description ?? []} />
                                </div>
                            </div>
                        </div>
                        {/* Article 2 */}
                        <div className="col-span-4 mt-[7vh]">
                            <div className="w-full h-[25vh] overflow-hidden">
                                {data.articleContents?.[1]?.image?.url ? (
                                    <Image
                                        src={urlFor(data.articleContents[1].image.url).quality(75).auto('format').url()}
                                        width={getImageDimensions(data.articleContents[1].image.url).width}
                                        height={getImageDimensions(data.articleContents[1].image.url).height}
                                        alt={
                                            data.articleContents[1].image?.alt ||
                                            data.articleContents[1].title ||
                                            'Article image 1'
                                        }
                                        className="w-full h-full object-cover"
                                    />
                                ) : null}
                            </div>
                            <div className="mt-[2vh]">
                                <div className="dt-h5">
                                    {data.articleContents?.[1]?.title}
                                </div>
                                <div className="mt-[2.5vh] dt-body-sm">
                                    <PortableText value={data.articleContents?.[1]?.description ?? []} />
                                </div>
                            </div>
                        </div>
                        {/* Article 3 */}
                        <div className="col-span-4 mt-[7vh]">
                            <div className="w-full h-[25vh] overflow-hidden">
                                {data.articleContents?.[2]?.image?.url ? (
                                    <Image
                                        src={urlFor(data.articleContents[2].image.url).quality(75).auto('format').url()}
                                        width={getImageDimensions(data.articleContents[2].image.url).width}
                                        height={getImageDimensions(data.articleContents[2].image.url).height}
                                        alt={
                                            data.articleContents[2].image?.alt ||
                                            data.articleContents[2].title ||
                                            'Article image 1'
                                        }
                                        className="w-full h-full object-cover"
                                    />
                                ) : null}
                            </div>
                            <div className="mt-[1.25vh]">
                                <div className="dt-h5">
                                    {data.articleContents?.[2]?.title}
                                </div>
                                <div className="mt-[2.5vh] dt-body-sm">
                                    <PortableText value={data.articleContents?.[2]?.description ?? []} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Row 12-19: (Articles already above, so skip extra rows) */}
                {/* Row 20: Download buttons */}
                <div className="col-span-1 row-span-1 flex items-center dt-btn mt-[4vh]">
                    {data.pdfMobileUrl ? (
                        <a href={`/the-edge/${data.slug}/pdf?device=mobile`} target="_blank" rel="noreferrer">
                            <UnderlineOnHoverAnimation hasStaticUnderline>
                                Download mobile
                            </UnderlineOnHoverAnimation>
                        </a>
                    ) : null}
                </div>
                <div className="col-start-4 col-span-1 row-span-1 flex justify-end items-center text-right dt-btn  mt-[4vh]">
                    {data.pdfDesktopUrl ? (
                        <a href={`/the-edge/${data.slug}/pdf?device=desktop`} target="_blank" rel="noreferrer">
                            <UnderlineOnHoverAnimation hasStaticUnderline>
                                Download desktop
                            </UnderlineOnHoverAnimation>
                        </a>
                    ) : null}
                </div>
                <div className="col-span-4 row-span-1" />
                {/* Row 21-24: Audio section if present */}
                {data.audioDescription?.length ? (
                    <div className="col-span-4">
                        <FadeInOnVisible>
                            <div className=" grid grid-cols-4 auto-rows-[minmax(7.701vh,auto)] overflow-visible gap-x-[4.53vw] gap-y-[2.09vh] mt-[5vh]">
                                <div className="col-span-4">
                                    <div className="dt-h3">
                                        <HighlightText value={data.audioDescription} />
                                    </div>
                                </div>
                                <div className="col-span-4 flex row-span-3 items-center justify-center">
                                    {data.audioFileUrl ? (
                                        <AudioVisualiser
                                            audioSrc={data.audioFileUrl}
                                            size={200}
                                            color="#75c8d6ff"
                                            backgroundColor="#000000ff"
                                            className="w-full h-[200px] flex items-center justify-center"
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </FadeInOnVisible>
                    </div>
                ) : null}
                {/* Row 25: Empty */}
                <div className="col-span-4 row-span-1" />
                {/* Row 26: Mindbullets text */}
                <div className="col-span-4 row-span-2">
                    <FadeInOnVisible>
                        <div className="dt-h3">
                            <HighlightText value={data.finalStatement} />
                        </div>
                    </FadeInOnVisible>
                </div>

                {/* Row 21 col 1-2: Mindbullets you may like */}
                <div className="col-span-2 row-span-1 mt-[5vh] dt-h5">
                    Mindbullets you may like
                </div>
                {/* Carousel for mobile */}
                <div className="col-span-4 row-span-1">
                    <Carousel items={carouselItems} />
                </div>
                {/* Back to top button */}
                <div
                    className="col-start-3 col-span-2 flex justify-end items-center mt-[7vh] cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                    <FadeInOnVisible>
                        <span className="dt-btn flex items-center">
                            <svg
                                width="clamp(3.5vw,2.35vh,4.7vw)"
                                height="clamp(3.5vw,2.35vh,4.7vw)"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                style={{ transform: 'rotate(-45deg)' }}
                            >
                                <path d="M12 19V5M5 12l7-7 7 7" />
                            </svg>
                            <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                                Back to top
                            </UnderlineOnHoverAnimation>

                        </span>
                    </FadeInOnVisible>

                </div>
            </div>
        </div>

    );


    const desktop = (
        <div className="hidden [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:block">
            <CommonHeader title={data.title} active="edge" />


            <div className="grid grid-cols-4 auto-rows-[minmax(7.701vh,auto)] overflow-visible gap-x-[4.53vw] gap-y-[2.09vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[21vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-x-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-y-[3.2vh]">
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


            <FadeInOnVisible>
                {data.audioDescription?.length ? (
                    <div className="grid gap-[2vh] grid-cols-6 mt-[24.2vh] h-[45.2vh]">
                        <div className="col-span-3">
                            {data.audioDescription?.length ? (
                                <div className="dt-h3">
                                    <HighlightText value={data.audioDescription} />
                                </div>
                            ) : null}
                        </div>

                        <div className="col-span-3 col-start-4 flex items-center justify-center">
                            {data.audioFileUrl ? (
                                <AudioVisualiser
                                    audioSrc={data.audioFileUrl}
                                    size={300}
                                    color="#75c8d6ff"
                                    backgroundColor="#000000ff"
                                    className="w-fullflex items-center justify-center"
                                />
                            ) : null}
                        </div>
                    </div>
                ) : null}
            </FadeInOnVisible>


            <FadeInOnVisible>
                <div className="grid gap-[2vh] grid-cols-6 mt-[24.2vh]">
                    <div className="col-span-3">
                        <div>
                            <div className="dt-h3">
                                <HighlightText
                                    value={data.finalStatement}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1" />
                </div>
            </FadeInOnVisible>


            {carouselItems.length > 0 && (
                <FadeInOnVisible>
                    <div className="mt-[24.2vh]">
                        <div className="text-[clamp(0.75vw,2vh,1vw)] font-bold leading-relaxed mb-[2vh]">Mindbullets you may like</div>
                        <Carousel
                            items={carouselItems}
                            imageHeight="21vh"
                            captionHeight="21vh"
                            innerRowGap="3.2vh"
                            gap="1.795vw"
                        />
                    </div>
                </FadeInOnVisible>
            )}
        </div>
    );

    return (
        <>
            <Header />
            <main className="px-[4.53vw] py-[2.09vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:px-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:py-[3.2vh] bg-[#F9F7F2]">
                {mobile}
                {desktop}
            </main>
            <Footer />
        </>
    );
};

export default EdgeView;
