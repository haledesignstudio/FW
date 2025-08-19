// src/app/mindbullets/page.tsx
import { client } from '@/sanity/lib/client';
import { mindbulletsPageQuery, podcastQuery } from '@/sanity/lib/queries';
import CommonHeader from '@/components/insights/CommonHeader';
import Mindbullets from './mindbullets';
import { notFound } from 'next/navigation';
import type { PortableTextBlock } from '@portabletext/types';
import Header from '@/components/header';
import Footer from '@/components/footer';

type MindbulletsDoc = {
  title: string;
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

export default async function MindbulletsPage() {
  const [doc, podcasts] = await Promise.all([
    client.fetch<MindbulletsDoc | null>(mindbulletsPageQuery),
    client.fetch<Podcast[]>(podcastQuery),
  ]);

  if (!doc) {
    notFound();
  }

  // const headerItems = commonHeader(doc.title, 'mindbullets');

  return (
    <>
      <Header />
      <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
          {/* Desktop: grid items */}
          {/* {headerItems.map((item) => (
            <div key={item.id} className={getGridClasses(item)}>
              {item.content}
            </div>
          ))} */}
          {/* Mobile: client component renders its own grid */}
          <CommonHeader title={doc.title} active="mindbullets" />

        <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[25vh]">
          {/* Client component: render via JSX, not as a function */}
          <Mindbullets
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
