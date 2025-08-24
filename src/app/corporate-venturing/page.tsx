// app/corporate-venturing/page.tsx
import { client } from '@/sanity/lib/client';
import { corporatePageQuery } from '@/sanity/lib/queries';
import CommonHeader from '@/components/insights/CommonHeader';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { notFound } from 'next/navigation';
import type { PortableTextBlock } from '@portabletext/types';
import CorporateSection from './corporate';

type CorporatePageDoc = {
  title: string;
  subheading: PortableTextBlock[];
  contentText: string;
  CTA: string;
  Mail: string;
};

type Podcast = {
  _id: string;
  headline: string;
  subheading?: string;
  description?: string;
  embedLink?: string;
  slug?: { current: string };
  headerImage?: { asset: { url: string }; alt?: string };
};

type Article = {
  _id: string;
  title: string;
  byline?: string;
  slug?: { current: string };
  image?: { asset: { url: string }; alt?: string };
};

export default async function CorporateVenturingPage() {
  const [doc, podcasts, articles] = await Promise.all([
    client.fetch<CorporatePageDoc | null>(corporatePageQuery),
    // Podcasts where Corporate == true
    client.fetch<Podcast[]>(
      `*[_type == "podcast" && coalesce(corporate, Corporate) == true]{
        _id, headline, description, embedLink, slug, 
        headerImage{asset->{url}, alt}
      }`
    ),
    // Articles where Corporate == true
    client.fetch<Article[]>(
      `*[_type == "article" && coalesce(corporate, Corporate) == true]{
        _id, title, byline, slug, 
        image{asset->{url}, alt}
      }`
    ),
  ]);

  if (!doc) notFound();

  return (
    <>
      <Header />
      <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:px-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:py-[3.2vh] bg-[#F9F7F2]">
        <CommonHeader title={doc.title} active="corporate" />
        <div className="grid gap-[2vh] auto-rows-auto [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[21vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-x-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-y-[3.2vh]">
          <CorporateSection
            title={doc.title}
            subheading={doc.subheading}
            contentText={doc.contentText}
            CTA={doc.CTA}
            Mail={doc.Mail}
            podcasts={podcasts}
            articles={articles}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
