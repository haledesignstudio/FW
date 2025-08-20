// app/mindbullets/page.tsx
import { client } from '@/sanity/lib/client';
import CommonHeader from '@/components/insights/CommonHeader';
import Mindbullets from './mindbullets';
import { notFound } from 'next/navigation';
import type { PortableTextBlock } from '@portabletext/types';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { groq } from 'next-sanity';

type MindbulletsDoc = {
  title: string;
  subheading: PortableTextBlock[];
};

type MindbulletDoc = {
  _id: string;
  title?: string;
  slug?: { current: string } | string;
  mainImage?: { asset?: { url?: string } };
  bodyPlain?: string; // ⬅️ we’ll fetch this from pt::text(body)
};

export default async function MindbulletsPage() {
  const doc = await client.fetch<MindbulletsDoc | null>(
    groq`*[_type == "mindbulletsPage"][0]{ title, subheading }`
  );

  if (!doc) {
    notFound();
  }

  // Mindbullets for the carousel — include body as plain text
  const mindbullets = await client.fetch<MindbulletDoc[]>(
    groq`*[_type == "mindbullet" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage{asset->{url}},
      "bodyPlain": pt::text(body)   // ⬅️ flatten Portable Text body
    }`
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F7F2]">
      <Header />
      <main className="flex-1 p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh]">
        <CommonHeader title={doc.title} active="mindbullets" />
        <div className="grid gap-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-auto gap-y-25">
          <Mindbullets
            title={doc.title}
            subheading={doc.subheading}
            mindbullets={mindbullets}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
