// app/insights/edge/page.tsx
import { client } from '@/sanity/lib/client';
import { edgePageQuery, podcastQuery } from '@/sanity/lib/queries';
import { commonHeader } from '@/components/insights/CommonHeader';
import { getGridClasses } from '@/components/insights/grid';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { notFound } from 'next/navigation';
import type { PortableTextBlock } from '@portabletext/types';
import Edge from './edge';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import ProvocativeScenarios from '@/components/ProvocativeScenarios';

type EdgeDoc = {
  title: string;
  subheading: PortableTextBlock[];
  contentText: string;
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

export default async function EdgePage() {
  const [doc, podcasts] = await Promise.all([
    client.fetch<EdgeDoc | null>(edgePageQuery),
    client.fetch<Podcast[]>(podcastQuery),
  ]);

  if (!doc) notFound();

  // Use the Edge page title for the common header and mark "edge" active
  const headerItems = commonHeader(doc.title, 'edge');

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

        {/* Edge content (client) */}
        <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[25vh]">
          <Edge
            title={doc.title}
            subheading={doc.subheading}
            contentText={doc.contentText}
            podcasts={podcasts}
          />
        </div>

        {/* Extra section beneath Edge */}
        <FadeInOnVisible>
          <div className="mt-[15vh]">
            <ProvocativeScenarios />
          </div>
        </FadeInOnVisible>
      </main>
      <Footer />
    </>
  );
}
