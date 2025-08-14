// app/mindbullets/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { defineQuery } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import { getGridClasses } from '@/components/insights/grid';
import { commonHeader } from '@/components/insights/CommonHeader';
import Header from '@/components/header';
import Footer from '@/components/footer';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import type { PortableTextBlock } from '@portabletext/types';


type SanityAssetRef = { _type: 'reference'; _ref: string };
type SanityImage = { asset?: SanityAssetRef; alt?: string };


type Mindbullet = {
  _id: string;
  title: string;
  slug?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  dateline: string;
  byLine?: string;
  body: PortableTextBlock[];
  RelatedStories?: { title: string; link: string }[];
};

const mindbulletBySlugQuery = defineQuery(`
  *[_type == "mindbullet" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    mainImage { asset, alt },
    publishedAt,
    dateline,
    byLine,
    body,
    RelatedStories[] { title, link }
  }
`);

export async function generateStaticParams() {
    const slugs = await client.fetch<string[]>(
        defineQuery(`*[_type == "mindbullet" && defined(slug.current)][].slug.current`)
    );
    return slugs.map((slug) => ({ slug }));
}

export const revalidate = 60;

type PageProps = { params: Promise<{ slug: string }> };

// helper (keep this near the top of the file)
function splitPortableBlocks(blocks: PortableTextBlock[]): [PortableTextBlock[], PortableTextBlock[]] {
  const mid = Math.ceil(blocks.length / 2);
  return [blocks.slice(0, mid), blocks.slice(mid)];
}



export default async function MindbulletPage({ params }: PageProps) {
    const { slug } = await params;
    const data = await client.fetch<Mindbullet | null>(mindbulletBySlugQuery, { slug });

    if (!data) notFound();



    // Build header items just like in KeynotesPage
    const headerItems = commonHeader(data.title, 'mindbullets');

    const gridItems = [
        {
            id: 'mindbullet-1',
            content: (
                <FadeInOnVisible>
                    <h1 className="text-[clamp(8vw,20vh,10vw)] font-graphik leading-[clamp(8vw,20vh,10vw)]">
                        Mindbullets: News from the Future
                    </h1>
                </FadeInOnVisible>
            ),
            colSpan: 5,
            rowSpan: 3,
        },
        {
            id: 'mindbullet-2',
            content: <></>,
            colSpan: 1,
            rowSpan: 3,
        },
        {
            id: 'mindbullet-3',
            content:

                data.mainImage?.asset ? (
                    <img
                        src={urlFor(data.mainImage.asset).url()}
                        alt={'Process image'}
                        className="w-full h-full object-cover"
                    />
                ) : null,
            colSpan: 6,
            rowSpan: 3,
        },
        {
            id: 'mindbullet-4',
            content: (
                <FadeInOnVisible>
                    <div className="h-full flex flex-col gap-[1vh]">
                        <div className="font-graphik text-[10vh] leading-tight text-balance">
                            {data.title}
                        </div>
                        <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-graphik leading-tight">
                            {data.byLine}
                        </div>
                    </div>
                </FadeInOnVisible>
            ),
            colSpan: 6,
            rowSpan: 1,
        },
        {
            id: 'mindbullet-5',
            content: (
                <div className="h-full flex items-center">
                    <div className="flex flex-row items-center gap-[2vh]">
                        <div className="font-roboto text-[clamp(0.9vw,2.5vh,1.25vw)] leading-tight">Dateline</div>
                        <div className="font-roboto text-[clamp(0.9vw,2.5vh,1.25vw)] leading-tight">
                            {new Intl.DateTimeFormat('en-GB', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                timeZone: 'UTC',
                            }).format(new Date(`${data.dateline}T00:00:00Z`))}
                        </div>
                    </div>
                </div>
            ),
            colSpan: 6,
            rowSpan: 1,
        }


    ];

    return (
        <>
            <Header />
            <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
                {/* Common header grid */}
                <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[25vh] mb-[4vh]">
                    {headerItems.map((item) => (
                        <div key={item.id} className={getGridClasses(item)}>
                            {item.content}
                        </div>
                    ))}
                </div>

                {/* Mindbullet content grid */}
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
                        {/* Content area: spans cols 1–4 at desktop, full width on mobile */}
                        <div className="col-span-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-4">
                            {(() => {
                                const [leftBlocks, rightBlocks] = splitPortableBlocks(data.body);
                                return (
                                    <div className="grid grid-cols-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-2 gap-[2vh]">
                                        <div className="prose max-w-none text-[clamp(0.75vw,2vh,1vw)] leading-relaxed">
                                            <PortableText value={leftBlocks} />
                                        </div>
                                        <div className="prose max-w-none text-[clamp(0.75vw,2vh,1vw)] leading-relaxed">
                                            <PortableText value={rightBlocks} />
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                        {/* Side text: full width on mobile, cols 5–6 on desktop */}
                        <div className="col-span-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-2">
                            <div className="h-full flex items-start">
                                <div className="max-w-none">
                                    <p className="text-[clamp(0.95vw,2.25vh,1.125vw)] font-bold leading-relaxed text-[#DC5A50]"> Warning: Hazardous thinking at work </p>

                                    <p className="mt-[2vh] text-[clamp(0.75vw,2vh,1vw)] leading-relaxed text-[#DC5A50]">Despite appearances to the contrary, Futureworld cannot and does not predict the future. Our Mindbullets scenarios are fictitious and designed purely to explore possible futures, challenge and stimulate strategic thinking. Use these at your own risk. Any reference to actual people, entities or events is entirely allegorical. Copyright Futureworld International Limited. Reproduction or distribution permitted only with recognition of Copyright and the inclusion of this disclaimer. </p>
                                </div>
                            </div>
                        </div>

                        {/* Right spacer: reserves columns 5–6 on desktop */}
                        <div className="hidden [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:block [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-2" />
                    </div>
                </FadeInOnVisible>

                {data.RelatedStories?.length ? (
                    <FadeInOnVisible>
                        <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 mt-[10vh]">
                            {/* Content: columns 1–2 (full width on mobile) */}
                            <div className="col-span-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-2">
                             <p className=" text-[clamp(0.75vw,2vh,1vw)] font-bold leading-relaxed">Links to related stories</p>
                                <ul className="list space-y-[0.75vh] mt-[2vh]">
                                    {data.RelatedStories.map((r, i) => (
                                        <li key={`${r.link}-${i}`}>
                                            <a
                                                href={r.link}
                                                className="text-[clamp(0.75vw,2vh,1vw)] leading-relaxed"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                               <UnderlineOnHoverAnimation hasStaticUnderline={true} color="#232323">{r.title}</UnderlineOnHoverAnimation> 
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Spacer: leaves columns 3–6 empty on desktop */}
                            <div className="hidden [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:block [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-4" />
                        </div>
                    </FadeInOnVisible>
                ) : null}



            </main>
            <Footer />
        </>
    );
}
