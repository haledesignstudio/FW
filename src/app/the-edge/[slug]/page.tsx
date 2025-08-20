import { notFound } from 'next/navigation';
import { defineQuery } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import type { PortableTextBlock } from '@portabletext/types';


import EdgeScenarioView from './edgeView';



type RichText = PortableTextBlock[];
type ArticleContent = {
        title: string;
        description: RichText;
        image?: { url: string; alt?: string } | null;
};
type EdgeScenario = {
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

const scenarioBySlugQuery = defineQuery(`
    *[_type == "provocativeScenario" && slug.current == $slug][0]{
        _id,
        title,
        "slug": slug.current,
        subheading,
        contentText,
        "pdfMobileUrl": pdfMobile.asset->url,
        "pdfDesktopUrl": pdfDesktop.asset->url,
        "hasAudio": hasAudio == "yes",
        audioDescription,
        "audioFileUrl": audioFile.asset->url,
        "articleContents": articleContents[]{
            title,
            description,
            "image": {
                "url": image.asset->url,
            }
        }
    }
`);

type PageProps = { params: Promise<{ slug: string }> };

export default async function EdgeScenarioPage({ params }: PageProps) {
    const { slug } = await params;
    const data = await client.fetch<EdgeScenario | null>(scenarioBySlugQuery, { slug });
    if (!data) notFound();
    return <EdgeScenarioView data={data} slug={slug} />;
}
