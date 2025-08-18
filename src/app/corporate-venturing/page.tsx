// app/corporate-venturing/page.tsx
import { client } from '@/sanity/lib/client';
import { corporatePageQuery, podcastQuery } from '@/sanity/lib/queries';
import { commonHeader } from '@/components/insights/CommonHeader';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { notFound } from 'next/navigation';
import type { PortableTextBlock } from '@portabletext/types';
import CorporateSection from './corporate';
import { getGridClasses } from '@/components/insights/grid';

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
  subheading: string;
  description: string;
  embedLink?: string;
  slug?: { current: string };
  headerImage?: { asset: { url: string }; alt?: string };
};

export default async function CorporateVenturingPage() {
  const [doc, podcasts] = await Promise.all([
    client.fetch<CorporatePageDoc | null>(corporatePageQuery),
    client.fetch<Podcast[]>(podcastQuery),
  ]);

  if (!doc) notFound();

   const headerItems = commonHeader(doc.title, 'corporate');

  return (
    <>
      <Header />
      <main className="p-[2vh] md:p-[4vh] bg-[#F9F7F2]">
        <div className="grid gap-[2vh] grid-cols-2 md:grid-cols-6 auto-rows-[25vh]">
          {headerItems.map((item) => (
                      <div key={item.id} className={getGridClasses(item)}>
                        {item.content}
                      </div>
                    ))}
          <CorporateSection
            title={doc.title}
            subheading={doc.subheading}
            contentText={doc.contentText}
            CTA={doc.CTA}
            Mail={doc.Mail}
            podcasts={podcasts}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
