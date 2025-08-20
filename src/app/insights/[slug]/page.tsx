import { notFound } from 'next/navigation';
import { defineQuery } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import ArticleView from '@/app/insights/[slug]/ArticleView';
import type { PortableTextBlock } from '@portabletext/types';

type SanityAssetRef = { _type: 'reference'; _ref: string };
type SanityImage = { asset?: SanityAssetRef; alt?: string };

type Article = {
  _id: string;
  title: string;
  slug?: string;
  byline?: string;
  datePublished?: string;
  image?: SanityImage;
  body?: PortableTextBlock[];
  pdfUrl?: string;

  // Author (main section)
  authorName?: string;
  authorPosition?: string;
  authorBio?: PortableTextBlock[];
  authorImage?: SanityImage;
  authorLinkedin?: string;

  // Linked Video
  hasLinkedVideo?: boolean;
  linkedVideoTitle?: string;
  linkedVideoSubheading?: string;
  linkedVideoDescription?: PortableTextBlock[];
  linkedVideoImage?: SanityImage;
  linkedVideoLink?: string;
};

// Minimal Mindbullet shape for the carousel
type MindbulletCompact = {
  _id: string;
  title: string;
  slug?: string;
  mainImage?: SanityImage;
  body?: PortableTextBlock[];
};

// Primary fetch by slug.current
const articleBySlugQuery = defineQuery(`
  *[_type == "article" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    byline,
    datePublished,
    image { asset, alt },
    body[],
    "pdfUrl": pdfUpload.asset->url,

    // Author (main)
    authorName,
    authorPosition,
    authorBio[],
    authorImage { asset, alt },
    authorLinkedin,

    // Linked Video (optional)
    "hasLinkedVideo": hasLinkedVideo,
    linkedVideoTitle,
    linkedVideoSubheading,
    linkedVideoDescription[],
    linkedVideoImage { asset, alt },
    linkedVideoLink
  }
`);

// Fallback fetch by _id (used after title-based match)
const articleByIdQuery = defineQuery(`
  *[_type == "article" && _id == $id][0]{
    _id,
    title,
    "slug": slug.current,
    byline,
    datePublished,
    image { asset, alt },
    body[],
    "pdfUrl": pdfUpload.asset->url,

    // Author (main)
    authorName,
    authorPosition,
    authorBio[],
    authorImage { asset, alt },
    authorLinkedin,

    // Linked Video (optional)
    "hasLinkedVideo": hasLinkedVideo,
    linkedVideoTitle,
    linkedVideoSubheading,
    linkedVideoDescription[],
    linkedVideoImage { asset, alt },
    linkedVideoLink
  }
`);

// Mindbullets for the carousel (grab a handful)
const mindbulletsQuery = defineQuery(`
  *[_type == "mindbullet"] | order(publishedAt desc)[0...12]{
    _id,
    title,
    "slug": slug.current,
    mainImage { asset, alt },
    body[]
  }
`);

function slugifyTitle(t: string) {
  return t.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export async function generateStaticParams() {
  const items = await client.fetch<Array<{ slug?: string; title: string }>>(
    defineQuery(`*[_type == "article" && defined(title)]{ "slug": slug.current, title }`)
  );

  return items.map(({ slug, title }) => ({
    slug: slug ?? slugifyTitle(title),
  }));
}

export const revalidate = 60;

type PageProps = { params: Promise<{ slug: string }> };

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  // 1) Try normal slug lookup
  let data = await client.fetch<Article | null>(articleBySlugQuery, { slug });

  // 2) Fallback by title-derived slug (legacy docs)
  if (!data) {
    const all = await client.fetch<Array<{ _id: string; title: string }>>(
      defineQuery(`*[_type == "article"]{ _id, title }`)
    );
    const match = all.find((d) => slugifyTitle(d.title) === slug);
    if (match) {
      data = await client.fetch<Article | null>(articleByIdQuery, { id: match._id });
    }
  }

  if (!data) notFound();

  // Fetch mindbullets for the carousel
  const mindbullets = await client.fetch<MindbulletCompact[]>(mindbulletsQuery);

  return <ArticleView data={data} mindbullets={mindbullets} />;
}
