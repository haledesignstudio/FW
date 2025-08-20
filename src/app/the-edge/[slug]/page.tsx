import { notFound } from 'next/navigation';
import { defineQuery, groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import type { PortableTextBlock } from '@portabletext/types';
import EdgeView from '@/app/the-edge/[slug]/edgeView';

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
      "image": { "url": image.asset->url, "alt": image.alt }
    }
  }
`);

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(
    defineQuery(`*[_type == "provocativeScenario" && defined(slug.current)][].slug.current`)
  );
  return slugs.map((slug) => ({ slug }));
}

export const revalidate = 60;

type PageProps = { params: Promise<{ slug: string }> };

export default async function EdgeScenarioPage({ params }: PageProps) {
  const { slug } = await params;

  const data = await client.fetch<EdgeScenario | null>(scenarioBySlugQuery, { slug });
  if (!data) notFound();

  const mindbullets = await client.fetch<Array<{
    title?: string;
    slug?: string;
    imageUrl?: string;
    bodyText?: string;
  }>>(groq`
    *[_type == "mindbullet" && defined(slug.current)]
      | order(publishedAt desc)[0...12]{
      title,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      "bodyText": pt::text(body)
    }
  `);

  const carouselItems = mindbullets.map((mb) => ({
    src: mb.imageUrl || '/placeholder-image.png',
    heading: mb.title ?? 'Untitled',
    description: mb.bodyText ?? '',
    href: mb.slug ? `/mindbullets/${mb.slug}` : '#',
  }));

  return <EdgeView data={data} carouselItems={carouselItems} />;
}
