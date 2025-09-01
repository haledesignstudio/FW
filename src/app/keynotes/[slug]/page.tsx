import { notFound } from 'next/navigation';
import { defineQuery } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import type { PortableTextBlock } from '@portabletext/types';
import CommonHeader from '@/components/insights/CommonHeader';
import Header from '@/components/header';
import Footer from '@/components/footer';
import SpeakerView from './speakerView'; // Importing SpeakerView component
import type { SanityImageAsset } from '@/../sanity.types';

type SanityImage = { asset?: SanityImageAsset; alt?: string };



type KeynoteSpeaker = {
    _id: string;
    name: string;
    slug?: string;
    summary: PortableTextBlock[];
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
    summary,
    image { asset, alt },
    domainsOfExcellence,
    socialLinks,
    mailtoSubject
  }
`);

// Generate static params for keynote speaker pages
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


    // Convert image prop to match SpeakerView expected type
    function isRefObj(asset: unknown): asset is { _ref: string; _type: string } {
        return (
            typeof asset === 'object' &&
            asset !== null &&
            '_ref' in asset &&
            typeof (asset as { _ref: unknown })._ref === 'string' &&
            '_type' in asset &&
            typeof (asset as { _type: unknown })._type === 'string'
        );
    }
    const speakerViewData = {
        ...data,
        image: data.image
            ? {
                  asset:
                      data.image.asset && isRefObj(data.image.asset)
                          ? { _ref: data.image.asset._ref, _type: data.image.asset._type }
                          : typeof data.image.asset === 'string'
                          ? data.image.asset
                          : undefined,
                  alt: data.image.alt,
              }
            : undefined,
    };
    return (
        <>
            <Header />
            <main className="px-[4.53vw] py-[2.09vh] [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:px-[1.795vw] [@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:py-[3.2vh] bg-[#F9F7F2]">
                <CommonHeader title={data.name} active="keynotes" />
                <SpeakerView data={speakerViewData} nextSlug={nextSlug} />
            </main>
            <Footer />
        </>
    );
}
