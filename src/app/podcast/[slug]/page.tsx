import { notFound } from 'next/navigation';
import { defineQuery } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import PodcastView from './PodcastView';
import type { PortableTextBlock } from '@portabletext/types';

export const runtime = 'edge';

type SanityAssetRef = { _type: 'reference'; _ref: string };
type SanityImage = { asset?: SanityAssetRef; alt?: string | null };

export type PodcastDoc = {
  _id: string;
  headline: string;
  slug?: string; // normalized below
  description?: string | null;
  embedLink?: string | null; // URL
  headerImage?: SanityImage | null;
};

const podcastBySlugQuery = defineQuery(`
  *[_type == "podcast" && slug.current == $slug][0]{
    _id,
    headline,
    "slug": slug.current,
    description,
    embedLink,
    headerImage { asset, alt }
  }
`);

const podcastPageMetaQuery = defineQuery(`
  *[_type == "podcastPage"][0]{
    title,
    subheading
  }
`);

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(
    defineQuery(`*[_type == "podcast" && defined(slug.current)][].slug.current`)
  );
  return slugs.map((slug) => ({ slug }));
}

export const revalidate = 60;

type PageProps = { params: Promise<{ slug: string }> };

export default async function PodcastSlugPage({ params }: PageProps) {
  const { slug } = await params;

  const [data, pageMeta] = await Promise.all([
    client.fetch<PodcastDoc | null>(podcastBySlugQuery, { slug }),
    client.fetch<{ title?: string; subheading?: PortableTextBlock[] } | null>(podcastPageMetaQuery),
  ]);

  if (!data) notFound();

  return (
    <PodcastView
      data={data}
      pageTitle={pageMeta?.title ?? 'Podcast'}
      pageSubheading={pageMeta?.subheading ?? []}
    />
  );
}
