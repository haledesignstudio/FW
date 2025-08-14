// app/corporate-venturing/page.tsx
import { client } from '@/sanity/lib/client';
import { insightsPageQuery, podcastQuery } from '@/sanity/lib/queries';
import { commonHeader } from '@/components/insights/CommonHeader';
import { getGridClasses } from '@/components/insights/grid';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { notFound } from 'next/navigation';
import type { PortableTextBlock } from '@portabletext/types';
import CorporateSection from './corporate';

type InsightsForCorporate = {
  title: string; // overall "Insights" page title for header
  corporateVenturing: {
    title: string;
    subheading: PortableTextBlock[];
    contentText: string;
    CTA: string;
    Mail: string;
  };
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
  const [insights, podcasts] = await Promise.all([
    client.fetch<InsightsForCorporate | null>(insightsPageQuery),
    client.fetch<Podcast[]>(podcastQuery),
  ]);

  if (!insights) notFound();

  const headerItems = commonHeader(insights.title, 'corporate');

  return (
    <>
      <Header />
      <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
        {/* Header grid */}
        <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[25vh]">
          {headerItems.map((item) => (
            <div key={item.id} className={getGridClasses(item)}>
              {item.content}
            </div>
          ))}
        </div>

        {/* Corporate content (client) */}
        <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[25vh]">
          <CorporateSection
            title={insights.corporateVenturing.title}
            subheading={insights.corporateVenturing.subheading}
            contentText={insights.corporateVenturing.contentText}
            CTA={insights.corporateVenturing.CTA}
            Mail={insights.corporateVenturing.Mail}
            podcasts={podcasts}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
