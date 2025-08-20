"use client";

import React, { useMemo } from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import FadeInOnVisible from "@/components/FadeInOnVisible";
import UnderlineOnHoverAnimation from "@/components/underlineOnHoverAnimation";
import { urlFor } from "@/sanity/lib/image";
import CommonHeader from "@/components/insights/CommonHeader";
import { getGridClasses } from "@/components/insights/grid";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { PortableTextBlock } from "@portabletext/types";
import Link from "next/link";
import type { PortableTextComponentProps } from "@portabletext/react";
import Carousel from "@/components/Carousel";

type SanityAssetRef = { _type: "reference"; _ref: string };
type SanityImage = { asset?: SanityAssetRef; alt?: string };

// Article data (unchanged)
type Article = {
    _id: string;
    slug?: string;
    title: string;
    byline?: string;
    datePublished?: string;
    image?: SanityImage;
    body?: PortableTextBlock[];
    pdfUrl?: string;

    authorName?: string;
    authorPosition?: string;
    authorBio?: PortableTextBlock[];
    authorImage?: SanityImage;
    authorLinkedin?: string;

    hasLinkedVideo?: boolean;
    linkedVideoTitle?: string;
    linkedVideoSubheading?: string;
    linkedVideoDescription?: PortableTextBlock[];
    linkedVideoImage?: SanityImage;
    linkedVideoLink?: string;
};

// Minimal Mindbullet passed from server for the carousel
type MindbulletCompact = {
    _id: string;
    title: string;
    slug?: string;
    mainImage?: SanityImage;
    body?: PortableTextBlock[];
};

function splitPortableBlocks(blocks: PortableTextBlock[] = []): [PortableTextBlock[], PortableTextBlock[]] {
    const mid = Math.ceil(blocks.length / 2);
    return [blocks.slice(0, mid), blocks.slice(mid)];
}

type ImageBlockValue = {
    _type: "image";
    asset?: SanityAssetRef;
    alt?: string;
};

type EmbedBlockValue = {
    _type: "embed";
    url?: string;
    title?: string;
};

const ptComponents: PortableTextComponents = {
    block: {
        normal: ({ children }) => <p className="mb-[1em]">{children}</p>,
    },
    types: {
        image: ({ value }: PortableTextComponentProps<ImageBlockValue>) =>
            value?.asset ? (
                <img
                    src={urlFor(value).url()}
                    alt={value.alt || "Embedded image"}
                    className="my-4 w-full h-auto object-contain"
                />
            ) : null,

        embed: ({ value }: PortableTextComponentProps<EmbedBlockValue>) => {
            const url = value?.url;
            if (!url) return null;
            return (
                <div className="my-4 aspect-video w-full">
                    <iframe
                        src={url}
                        title={value?.title || "Embedded media"}
                        className="w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        loading="lazy"
                    />
                </div>
            );
        },
    },
};

// tiny helper to plain-text a PT body for the carousel description
function toPlainText(blocks: PortableTextBlock[] = []): string {
    return blocks
        .map((b) => {
            const children = (b.children || []) as Array<{ text?: string }>;
            return children.map((c) => c.text || "").join("");
        })
        .join("\n")
        .replace(/\s+/g, " ")
        .trim();
}

interface ArticleViewProps {
    data: Article;
    mindbullets?: MindbulletCompact[]; // ⬅️ new prop from server
}

const ArticleView: React.FC<ArticleViewProps> = ({ data, mindbullets = [] }) => {
    const [leftBlocks, rightBlocks] = splitPortableBlocks(data.body);

    // Map Mindbullets to Carousel items
    const carouselItems = useMemo(() => {
        return (mindbullets || [])
            .map((m) => {
                const src =
                    m.mainImage?.asset ? urlFor(m.mainImage.asset).url() : "/placeholder-image.png";
                const description = toPlainText(m.body).slice(0, 400);
                return {
                    src,
                    heading: m.title,
                    description,
                    href: m.slug ? `/mindbullets/${m.slug}` : "#",
                };
            });
    }, [mindbullets]);

    const AuthorBlock = (
        <>
            {(data.authorName ||
                data.authorPosition ||
                data.authorImage?.asset ||
                data.authorBio?.length ||
                data.authorLinkedin) ? (
                <div className="mt-[2vh]">
                    {data.authorImage?.asset ? (
                        <img
                            src={urlFor(data.authorImage.asset).url()}
                            alt={data.authorImage.alt || "Author image"}
                            className="w-full h-auto object-cover rounded-lg mb-[1vh]"
                        />
                    ) : null}

                    {data.authorName ? <div className="font-bold">{data.authorName}</div> : null}
                    {data.authorPosition ? <div className="opacity-80">{data.authorPosition}</div> : null}

                    {data.authorBio?.length ? (
                        <div className="mt-[1vh]">
                            <PortableText value={data.authorBio} components={ptComponents} />
                        </div>
                    ) : null}

                    {data.authorLinkedin ? (
                        <div className="mt-[1vh]">
                            <a
                                href={data.authorLinkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline font-bold"
                            >
                                Connect on LinkedIn
                            </a>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </>
    );

    const LinkedVideoBlock = (
        <>
            {data.hasLinkedVideo && (data.linkedVideoTitle || data.linkedVideoImage?.asset || data.linkedVideoDescription?.length) ? (
                <div className="mt-[2vh]">
                    {data.linkedVideoImage?.asset ? (
                        <img
                            src={urlFor(data.linkedVideoImage.asset).url()}
                            alt={data.linkedVideoImage.alt || "Linked video image"}
                            className="w-full h-auto object-cover rounded-lg mb-[1vh]"
                        />
                    ) : null}
                    {data.linkedVideoTitle ? <div className="font-bold text-lg">{data.linkedVideoTitle}</div> : null}
                    {data.linkedVideoSubheading ? <div className="opacity-80">{data.linkedVideoSubheading}</div> : null}
                    {data.linkedVideoDescription?.length ? (
                        <div className="mt-[1vh]">
                            <PortableText value={data.linkedVideoDescription} components={ptComponents} />
                        </div>
                    ) : null}
                    {data.linkedVideoLink ? (
                        <a
                            href={data.linkedVideoLink}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-[1vh] inline-block underline font-bold"
                        >
                            Watch video
                        </a>
                    ) : null}
                </div>
            ) : null}
        </>
    );

    // --- MOBILE ---
    const mobile = (
        <div className="block md:hidden min-h-screen flex flex-col">
            <div className="flex-1 grid grid-cols-4 gap-y-5 w-full">
                <div className="col-span-4 row-span-2 text-[5vh] font-graphik leading-tight">
                    {data.title}
                </div>

                {data.image?.asset && (
                    <div className="col-span-4 row-span-2">
                        <img
                            src={urlFor(data.image.asset).url()}
                            alt={data.image.alt || "Article image"}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {data.byline ? (
                    <div className="col-span-4 row-span-1 text-[2vh] font-graphik leading-tight">
                        {data.byline}
                    </div>
                ) : null}

                {data.datePublished ? (
                    <div className="col-span-2 row-span-1 flex items-center">
                        <span className="font-roboto text-[1.5vh] leading-tight">
                            {data.datePublished}
                        </span>
                    </div>
                ) : null}

                <div className="col-span-4">
                    <PortableText value={leftBlocks} components={ptComponents} />
                    <PortableText value={rightBlocks} components={ptComponents} />
                </div>

                {data.pdfUrl ? (
                    <div className="col-span-4 mt-[2vh]">
                        <a
                            href={data.pdfUrl}
                            className="inline-block mt-[1vh] underline font-bold"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Download PDF
                        </a>
                    </div>
                ) : null}

                {/* Author & Linked Video (mobile) */}
                <div className="col-span-4">{AuthorBlock}</div>
                <div className="col-span-4">{LinkedVideoBlock}</div>

                {/* Carousel (mobile) */}
                {carouselItems.length > 0 && (
                    <div className="col-span-4 mt-[25vh]">
                        <FadeInOnVisible>
                            <div className="text-[2vh] font-bold leading-relaxed mb-[2vh]">You may also like</div>
                            <Carousel
                                items={carouselItems}
                                imageHeight="25vh"
                                captionHeight="25vh"
                                innerRowGap="4vh"
                                gap="4vh"
                                mobileImageHeight="22vh"
                                mobileCaptionHeight="22vh"
                                mobileInnerRowGap="3vh"
                                mobileGap="3vh"
                            />
                        </FadeInOnVisible>
                    </div>
                )}

                <div className="col-span-2 row-span-1 mt-4">
                    <FadeInOnVisible>
                        <Link href="/keynotes" className="transition font-bold cursor-pointer">
                            <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                                See Keynotes
                            </UnderlineOnHoverAnimation>
                        </Link>
                    </FadeInOnVisible>
                </div>


                <div
                    className="col-start-3 col-span-2 flex justify-end items-center mt-2 cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                    <FadeInOnVisible>
                        <span className="underline text-[2vh] flex items-center gap-1 font-bold">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: "rotate(-45deg)" }}>
                                <path d="M12 19V5M5 12l7-7 7 7" />
                            </svg>
                            Back to top
                        </span>
                    </FadeInOnVisible>
                </div>
            </div>
        </div>
    );

    // --- DESKTOP ---
    const gridItems = [
        {
            id: 'article-1',
            content: data.image?.asset ? (
                <img
                    src={urlFor(data.image.asset).url()}
                    alt={data.image.alt || "Article image"}
                    className="w-full h-full object-cover"
                />
            ) : null,
            colSpan: 6,
            rowSpan: 3,
        },
        {
            id: 'article-2',
            content: <></>,
            colSpan: 6,
            rowSpan: 1,
        },
        {
            id: 'article-3',
            content: (
                <FadeInOnVisible>
                    <div className="h-full flex flex-col gap-[7.5vh]">
                        <div className="font-graphik text-[clamp(4vw,10vh,5vw)] leading-[clamp(4vw,10vh,5vw)] text-balance">
                            {data.title}
                        </div>
                        <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-graphik leading-tight">
                            {data.byline}
                        </div>
                    </div>
                </FadeInOnVisible>
            ),
            colSpan: 5,
            rowSpan: 3,
        },
        {
            id: 'article-4',
            content: (
                <div className="font-roboto text-[clamp(0.9vw,2.5vh,1.25vw)] leading-tight">
                    {data.datePublished}
                </div>
            ),
            colSpan: 6,
            rowSpan: 1,
        },
    ];

    const desktop = (
        <div className="hidden md:block">
            <CommonHeader title={data.title} active="corporate" />
            <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[25vh]">
                {gridItems.map((item) => (
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
                <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 mt-[4vh]">
                    <div className="col-span-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-4">
                        <div className="grid grid-cols-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-2 gap-[2vh]">
                            <div className="prose max-w-none text-[clamp(0.75vw,2vh,1vw)] leading-relaxed">
                                <PortableText value={leftBlocks} components={ptComponents} />
                            </div>
                            <div className="prose max-w-none text-[clamp(0.75vw,2vh,1vw)] leading-relaxed">
                                <PortableText value={rightBlocks} components={ptComponents} />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2">{/* spacer / aux column */}</div>

                    <div className="hidden [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:block [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-2" />
                </div>
            </FadeInOnVisible>

            {/* Linked Video section ... (unchanged) */}
            <FadeInOnVisible>
                <div className="grid gap-[2vh] grid-cols-6 mt-[25vh]">
                    <div className="col-span-3 flex flex-col">
                        <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-graphik leading-tight">
                            {data.linkedVideoTitle}
                        </div>

                        <div className="mt-[5vh] text-[clamp(0.8vw,2vh,1vw)] font-graphik leading-[clamp(0.8vw,2vh,1vw)]">
                            {data.linkedVideoSubheading}
                        </div>

                        <div className="text-[clamp(0.8vw,2vh,1vw)] font-roboto leading-[clamp(0.8vw,2vh,1vw)]">
                            {data.linkedVideoDescription?.length ? (
                                <div className="mt-[1vh]">
                                    <PortableText value={data.linkedVideoDescription} components={ptComponents} />
                                </div>
                            ) : null}
                        </div>

                        <div className="mt-auto text-[clamp(0.8vw,2vh,1vw)] font-graphik leading-[clamp(0.8vw,2vh,1vw)]">
                            <a
                                href={data.linkedVideoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className=""
                            >
                                <UnderlineOnHoverAnimation hasStaticUnderline={true} color="#232323">Watch now</UnderlineOnHoverAnimation>
                            </a>
                        </div>
                    </div>

                    <div className="col-span-3">
                        {data.linkedVideoImage?.asset ? (
                            <img
                                src={urlFor(data.linkedVideoImage.asset).url()}
                                alt={data.linkedVideoImage.alt || "Linked video image"}
                                className="w-full h-auto object-cover rounded-lg mb-[1vh]"
                            />
                        ) : null}
                    </div>

                    <div className="hidden [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:block [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-2" />
                </div>
            </FadeInOnVisible>

            {/* About the Author section ... (unchanged) */}
            <FadeInOnVisible>
                <div className="grid gap-[2vh] grid-cols-6 mt-[25vh]">
                    <div className="col-span-3 flex flex-col">
                        <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-graphik leading-tight">
                            About the Author
                        </div>

                        <div className="mt-[10vh] text-[clamp(0.8vw,2vh,1vw)] font-graphik leading-[clamp(0.8vw,2vh,1vw)]">
                            {data.authorName ?
                                <a href={data.authorLinkedin} target="_blank" rel="noopener noreferrer">
                                    <span className="underline">{data.authorName}</span>
                                </a> : null}
                            {data.authorPosition ? <> , {data.authorPosition}</> : null}
                        </div>

                        <div className="text-[clamp(0.8vw,2vh,1vw)] font-roboto leading-tight">
                            {data.authorBio?.length ? (
                                <div className="mt-[2.5vh]">
                                    <PortableText value={data.authorBio} components={ptComponents} />
                                </div>
                            ) : null}
                        </div>

                        <div className="mt-auto text-[clamp(0.8vw,2vh,1vw)] font-graphik leading-[clamp(0.8vw,2vh,1vw)] flex gap-[2vh] flex-wrap">
                            {data.pdfUrl && data.slug ? (
                                <a
                                    href={`/insights/${data.slug}/pdf`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline font-bold"
                                >
                                    Download PDF
                                </a>
                            ) : null}
                        </div>
                    </div>

                    <div className="col-span-3">
                        {data.authorImage?.asset ? (
                            <img
                                src={urlFor(data.authorImage.asset).url()}
                                alt={data.authorImage.alt || "Author image"}
                                className="w-full h-auto object-cover rounded-lg mb-[1vh]"
                            />
                        ) : null}
                    </div>

                    <div className="hidden [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:block [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-2" />
                </div>
            </FadeInOnVisible>
            {/* --- Mindbullets Carousel at the bottom --- */}
            {carouselItems.length > 0 && (
                <FadeInOnVisible>
                    <div className="mt-[25vh]">
                        <div className="text-[clamp(0.75vw,2vh,1vw)] font-bold leading-relaxed mb-[2vh]">You may also like</div>
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
        </div>
    );

    return (
        <>
            <Header />
            <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
                {mobile}
                {desktop}
            </main>
            <Footer />
        </>
    );
};

export default ArticleView;
