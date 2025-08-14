// app/insights/podcast/page.tsx
import { client } from '@/sanity/lib/client';
import { podcastPageQuery, podcastQuery } from '@/sanity/lib/queries';
import { commonHeader } from '@/components/insights/CommonHeader';
import { getGridClasses } from '@/components/insights/grid';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { notFound } from 'next/navigation';
import type { PortableTextBlock } from '@portabletext/types';
import PodcastSection from './podcast';

type PodcastPageDoc = {
  title: string;              // from podcastPage schema
  subheading: PortableTextBlock[];
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

export default async function PodcastPage() {
  const [doc, podcasts] = await Promise.all([
    client.fetch<PodcastPageDoc | null>(podcastPageQuery),
    client.fetch<Podcast[]>(podcastQuery),
  ]);

  if (!doc) notFound();

  // Use podcastPage.title for the header and mark "podcast" active
  const headerItems = commonHeader(doc.title, 'podcast');

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

        {/* Podcast content (client) */}
        <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[25vh]">
          <PodcastSection
            title={doc.title}
            subheading={doc.subheading}
            podcasts={podcasts}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
