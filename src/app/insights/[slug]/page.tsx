import { notFound } from 'next/navigation';
import { defineQuery } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import ArticleView from '@/app/insights/[slug]/ArticleView';
import type { PortableTextBlock } from '@portabletext/types';

type SanityAssetRef = { _type: 'reference'; _ref: string };
type SanityImage = { asset?: SanityAssetRef; alt?: string };

type ArticleAuthor = {
  name: string;
  position: string;
  bio?: PortableTextBlock[];
  image?: SanityImage;
  linkedin?: string;
};

type ArticlePdf = { url: string };

type RelatedStory = { title: string; link: string };

type Article = {
  _id: string;
  title: string;
  slug?: string;
  byline?: string;
  datePublished?: string;
  image?: SanityImage;
  body?: PortableTextBlock[];

  hasPdf?: boolean;
  pdf?: ArticlePdf | null;

  hasAuthor?: boolean;
  author?: ArticleAuthor | null;

  hasRelatedStories?: boolean;
  relatedStories?: RelatedStory[];

  video?: boolean;
};


type MindbulletCompact = {
  _id: string;
  title: string;
  slug?: string;
  mainImage?: SanityImage;
  body?: PortableTextBlock[];
};



const articleBySlugQuery = defineQuery(`
  *[_type == "article" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    byline,
    datePublished,
    image { asset, alt },
    body[],

    hasPdf,
    "pdf": select(
      hasPdf == true => { "url": pdfUpload.asset->url },
      true => null
    ),


    hasAuthor,
    "author": select(
      hasAuthor == true => {
        "name": authorName,
        "position": authorPosition,
        "bio": authorBio[],
        "image": { "asset": authorImage.asset, "alt": authorImage.alt },
        "linkedin": authorLinkedin
      },
      true => null
    ),


    hasRelatedStories,
    "relatedStories": select(
      hasRelatedStories == true => relatedStories[]{ title, link },
      true => []
    ),

    video
  }
`);



const articleByIdQuery = defineQuery(`
  *[_type == "article" && _id == $id][0]{
    _id,
    title,
    "slug": slug.current,
    byline,
    datePublished,
    image { asset, alt },
    body[],

    hasPdf,
    "pdf": select(
      hasPdf == true => { "url": pdfUpload.asset->url },
      true => null
    ),

    hasAuthor,
    "author": select(
      hasAuthor == true => {
        "name": authorName,
        "position": authorPosition,
        "bio": authorBio[],
        "image": { "asset": authorImage.asset, "alt": authorImage.alt },
        "linkedin": authorLinkedin
      },
      true => null
    ),

    hasRelatedStories,
    "relatedStories": select(
      hasRelatedStories == true => relatedStories[]{ title, link },
      true => []
    ),

    video
  }
`);


// Mindbullets for the carousel limited to 12
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


  let data = await client.fetch<Article | null>(articleBySlugQuery, { slug });


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

  const mindbullets = await client.fetch<MindbulletCompact[]>(mindbulletsQuery);

  return <ArticleView data={data} mindbullets={mindbullets} />;
}
