import { notFound } from 'next/navigation';
import { defineQuery } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import type { PortableTextBlock } from '@portabletext/types';
import { PortableText } from '@portabletext/react';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import { getGridClasses } from '@/components/insights/grid';
import CommonHeader from '@/components/insights/CommonHeader';
import Header from '@/components/header';
import Footer from '@/components/footer';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import Link from 'next/link';


type SanityImageAsset = { _ref: string }; 
type SanityImage = { asset?: SanityImageAsset; alt?: string };



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
    email?: string;
};


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


type PageProps = { params: Promise<{ slug: string }> };

export default async function KeynoteSpeakerPage({ params }: PageProps) {
    const { slug } = await params;
    const data = await client.fetch<KeynoteSpeaker | null>(speakerBySlugQuery, { slug });
    if (!data) notFound();

    const allSlugs = await client.fetch<string[]>(
        defineQuery(`*[_type == "keynoteSpeaker" && defined(slug.current)]
               | order(name asc)[].slug.current`)
    );

    const idx = allSlugs.indexOf(slug);
    const nextSlug =
        idx >= 0 && allSlugs.length > 1 ? allSlugs[(idx + 1) % allSlugs.length] : null;


    // const headerItems = commonHeader(data.name, 'keynotes');

    const gridItems = [
        {
            id: 'speaker-1',
            content: (
                <div className="h-full flex flex-col justify-between">
                    
                    <FadeInOnVisible>
                        <div className="flex items-start justify-end text-right pr-[calc(2*clamp(6vw,16vh,8vw))]">
                            <h1 className="text-[clamp(6vw,16vh,8vw)] font-graphik leading-[clamp(6vw,16vh,8vw)] -rotate-90 origin-top-right">
                                {data.name}
                            </h1>
                        </div>
                    </FadeInOnVisible>

                    
                    {data.socialLinks ? (
                        <FadeInOnVisible>
                            <div className="w-full flex flex-col items-end gap-[0vh]">
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
                                            className="text-[clamp(0.95vw,2.5vh,1.25vw)] text-right font-graphik"
                                        >
                                            <UnderlineOnHoverAnimation hasStaticUnderline>
                                                {label}
                                            </UnderlineOnHoverAnimation>
                                        </a>
                                    ))}
                            </div>
                        </FadeInOnVisible>
                    ) : null}

                </div>
            ),
            colSpan: 1,
            rowSpan: 4,
        },


        {
            id: 'speaker-2',
            content: data.image?.asset ? (
                <div className="h-full overflow-hidden">
                    <FadeInOnVisible className="h-full w-full">
                        <img
                            src={urlFor(data.image.asset).url()}
                            alt="Process image"
                            className="w-full h-full object-cover"
                        />
                    </FadeInOnVisible>
                </div>

            ) : null,
            colSpan: 1,
            rowSpan: 4,
        },

        
        {
            id: 'speaker-3',
            content: data.domainsOfExcellence?.length ? (
                <FadeInOnVisible>
                    <div className="flex flex-col gap-[5vh]">
                        <div className="text-[clamp(0.95vw,2.5vh,1.25vw)] font-graphik">Domains of excellence</div>
                        <div className="flex flex-col flex-wrap gap-[1vh]">
                            {data.domainsOfExcellence.map((d, i) => (
                                <span
                                    key={`${d}-${i}`}
                                    className="text-[clamp(1.5vw,5vh,2.5vw)] font-graphik leading-[clamp(1.5vw,5vh,2.5vw)]"
                                >
                                    {d}
                                </span>
                            ))}
                        </div>
                    </div>
                </FadeInOnVisible>
            ) : (
                <></>
            ),
            colSpan: 3,
            rowSpan: 4,
        },
        {
            id: 'speaker-4',
            content:
                <FadeInOnVisible>
                    <div className="flex flex-col gap-[5vh]">
                        <div className="text-[clamp(0.95vw,2.5vh,1.25vw)] font-graphik leading-[clamp(0.95vw,2.5vh,1.25vw)]">Bio</div>
                        <div className="flex flex-col flex-wrap gap-[1vh] font-roboto text-[clamp(0.4vw,1.5vh,0.75vw)] leading-tight">
                            <PortableText value={data.bio} />
                        </div>
                    </div>
                </FadeInOnVisible>
            ,
            colSpan: 1,
            rowSpan: 3,
        },
        {
            id: 'speaker-5',
            content: (
                <div className="h-full flex flex-col justify-between">
                    

                    <FadeInOnVisible>
                        <div className="text-[clamp(0.95vw,2.5vh,1.25vw)] font-graphik leading-tight text-balance">
                            <a
                                href={`mailto:${data.email ?? 'info@futureworld.org'}?subject=${encodeURIComponent(data.mailtoSubject ?? '')}`}
                                className="transition cursor-pointer"
                            >
                                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                                    Book {data.name} for a Keynote
                                </UnderlineOnHoverAnimation>
                            </a>
                        </div>
                    </FadeInOnVisible>

                    <FadeInOnVisible>
                        <div className="text-[clamp(0.95vw,2.5vh,1.25vw)] font-graphik leading-tight text-balance">
                            {nextSlug ? (
                                <Link href={`/keynotes/${nextSlug}`} className="inline-block">
                                    <UnderlineOnHoverAnimation hasStaticUnderline>
                                        Next speaker
                                    </UnderlineOnHoverAnimation>
                                </Link>
                            ) : (
                                <span className="opacity-60">Next speaker</span>
                            )}
                        </div>
                    </FadeInOnVisible>


                </div>
            ),
            colSpan: 1,
            rowSpan: 1,
        },
    ];

    return (
        <>
            <Header />
            <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
                <CommonHeader title={data.name} active="keynotes" />

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
            </main>
            <Footer />
        </>
    );
}
