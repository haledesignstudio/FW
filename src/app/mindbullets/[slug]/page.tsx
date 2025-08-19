import { notFound } from 'next/navigation';
import { defineQuery } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import MindbulletsView from '@/app/mindbullets/[slug]/MindbulletsView';
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

export default async function MindbulletPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await client.fetch<Mindbullet | null>(mindbulletBySlugQuery, { slug });
  if (!data) notFound();
  return <MindbulletsView data={data} />;
}