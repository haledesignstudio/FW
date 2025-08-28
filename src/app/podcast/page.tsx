// app/insights/podcast/page.tsx
import { client } from '@/sanity/lib/client';
import { podcastPageQuery, podcastQuery } from '@/sanity/lib/queries';
import CommonHeader from '@/components/insights/CommonHeader';
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
  // const headerItems = commonHeader(doc.title, 'podcast');

  return (
    <>
      <Header />
      <main className="px-[4.53vw] py-[2.09vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:px-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:py-[3.2vh] bg-[#F9F7F2]">
        {/* Header grid */}
          {/* Desktop: grid items */}
          {/* {headerItems.map((item) => (
            <div key={item.id} className={getGridClasses(item)}>
              {item.content}
            </div>
          ))} */}
          {/* Mobile: client component renders its own grid */}
          <CommonHeader title={doc.title} active="podcast" />

        {/* Podcast content (client) */}
        <div className="grid grid-cols-4 auto-rows-[minmax(7.701vh,auto)] overflow-visible gap-x-[4.53vw] gap-y-[2.09vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[21vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-x-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-y-[3.2vh]">
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
