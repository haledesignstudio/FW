import { notFound } from 'next/navigation';
import { defineQuery } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import type { PortableTextBlock } from '@portabletext/types';
import { PortableText } from '@portabletext/react';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import { getGridClasses } from '@/components/insights/grid';
import { commonHeader } from '@/components/insights/CommonHeader';
import Header from '@/components/header';
import Footer from '@/components/footer';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';

type SanityImageAsset = { _ref: string }; // Sanity asset reference
type SanityImage = { asset?: SanityImageAsset; alt?: string };


// ---- Types ----
type KeynoteSpeaker = {
  _id: string;
  name: string;
  slug?: string;
  bio: PortableTextBlock[];
  image?: SanityImage;
  domainsOfExcellence?: string[];
  socialLinks?: {
    x?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  mailtoSubject?: string;
};


// ---- Queries ----
const speakerBySlugQuery = defineQuery(`
  *[_type == "keynoteSpeaker" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    bio,
    image { asset, alt },
    domainsOfExcellence,
    socialLinks,
    mailtoSubject
  }
`);

export async function generateStaticParams() {
    const slugs = await client.fetch<string[]>(
        defineQuery(`*[_type == "keynoteSpeaker" && defined(slug.current)][].slug.current`)
    );
    return slugs.map((slug) => ({ slug }));
}

export const revalidate = 60;

// Keep this type to avoid the Next.js “sync dynamic APIs” warning you hit earlier
type PageProps = { params: Promise<{ slug: string }> };

// Split PT blocks into two halves (for the two-column flowing bio)
function splitPortableBlocks(blocks: PortableTextBlock[]): [PortableTextBlock[], PortableTextBlock[]] {
  const mid = Math.ceil(blocks.length / 2);
  return [blocks.slice(0, mid), blocks.slice(mid)];
}


export default async function KeynoteSpeakerPage({ params }: PageProps) {
    const { slug } = await params;
    const data = await client.fetch<KeynoteSpeaker | null>(speakerBySlugQuery, { slug });
    if (!data) notFound();

    const headerItems = commonHeader(data.name, 'keynotes');

    // Build top grid items (title, spacer, hero image, domains, socials)
    const gridItems = [
        {
    id: 'speaker-1',
    content: (
        <FadeInOnVisible>
            <div className="h-full flex items-start justify-end">
                <h1 className="text-[clamp(8vw,20vh,10vw)] font-graphik leading-[clamp(8vw,20vh,10vw)] -rotate-90 origin-top-right">
                    {data.name}
                </h1>
            </div>
        </FadeInOnVisible>
    ),
    colSpan: 1,
    rowSpan: 3,
},


        // Hero/headshot (full width)
        {
            id: 'speaker-2',
            content: data.image?.asset ? (
                    <img
                        src={urlFor(data.image.asset).url()}
                        alt={'Process image'}
                        className="w-full h-full object-cover"
                    />
                ) : null,
            colSpan: 1,
            rowSpan: 4,
        },

        // Domains of Excellence (chips)
        {
            id: 'speaker-3',
            content: data.domainsOfExcellence?.length ? (
                <FadeInOnVisible>
                    <div className="flex flex-wrap gap-[1vh]">
                        {data.domainsOfExcellence.map((d, i) => (
                            <span
                                key={`${d}-${i}`}
                                className="px-3 py-1 rounded-full border border-black/15 text-[clamp(0.8vw,2.1vh,1vw)]"
                            >
                                {d}
                            </span>
                        ))}
                    </div>
                </FadeInOnVisible>
            ) : (
                <></>
            ),
            colSpan: 3,
            rowSpan: 4,
        },

        // Social links (inline list)
        {
            id: 'speaker-5',
            content: data.socialLinks ? (
                <FadeInOnVisible>
                    <div className="flex flex-wrap items-center gap-x-[2vh] gap-y-[1vh]">
                        {([
                            ['X', data.socialLinks.x],
                            ['LinkedIn', data.socialLinks.linkedin],
                            ['Facebook', data.socialLinks.facebook],
                            ['Instagram', data.socialLinks.instagram],
                            ['YouTube', data.socialLinks.youtube],
                        ] as const)
                            .filter(([, url]) => !!url)
                            .map(([label, url]) => (
                                <a
                                    key={label}
                                    href={url as string}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[clamp(0.85vw,2.25vh,1.05vw)]"
                                >
                                    <UnderlineOnHoverAnimation hasStaticUnderline>{label}</UnderlineOnHoverAnimation>
                                </a>
                            ))}
                    </div>
                </FadeInOnVisible>
            ) : (
                <></>
            ),
            colSpan: 6,
            rowSpan: 1,
        },
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

                {/* Top speaker grid */}
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

                {/* Bio: columns 1–4; Sidebar CTA: columns 5–6 */}
                <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 mt-[6vh]">
                    {/* Bio (cols 1–4 on desktop, full width on mobile) */}
                    <div className="col-span-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-4">
                        {(() => {
                            const [leftBlocks, rightBlocks] = splitPortableBlocks(data.bio ?? []);
                            return (
                                <FadeInOnVisible>
                                    <div className="grid grid-cols-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-2 gap-[2vh]">
                                        <div className="prose max-w-none text-[clamp(0.75vw,2vh,1vw)] leading-relaxed">
                                            <PortableText value={leftBlocks} />
                                        </div>
                                        <div className="prose max-w-none text-[clamp(0.75vw,2vh,1vw)] leading-relaxed">
                                            <PortableText value={rightBlocks} />
                                        </div>
                                    </div>
                                </FadeInOnVisible>
                            );
                        })()}
                    </div>

                    {/* Sidebar CTA (cols 5–6 on desktop; stacked on mobile) */}
                    <div className="col-span-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-2">
                        <FadeInOnVisible>
                            <div className="h-full flex items-start">
                                <div className="max-w-none">
                                    <p className="text-[clamp(0.95vw,2.25vh,1.125vw)] font-bold leading-relaxed">
                                        Book this keynote
                                    </p>
                                    <p className="mt-[1.25vh] text-[clamp(0.75vw,2vh,1vw)] leading-relaxed">
                                        Ready to bring <strong>{data.name}</strong> to your next event?
                                    </p>
                                    <div className="mt-[2vh] text-[clamp(0.9vw,2.25vh,1.125vw)] font-graphik leading-[clamp(0.9vw,2.25vh,1.125vw)]">
                                        <a
                                            href={`mailto:info@futureworld.org?subject=${encodeURIComponent(
                                                data.mailtoSubject || `Book keynote: ${data.name}`
                                            )}`}
                                            className="transition cursor-pointer"
                                        >
                                            <UnderlineOnHoverAnimation hasStaticUnderline>
                                                Get in touch
                                            </UnderlineOnHoverAnimation>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </FadeInOnVisible>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
