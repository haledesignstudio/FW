// app/mindbullets/page.tsx
import { client } from '@/sanity/lib/client';
import CommonHeader from '@/components/insights/CommonHeader';
import Mindbullets from './mindbullets';
import { notFound } from 'next/navigation';
import type { PortableTextBlock } from '@portabletext/types';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { groq } from 'next-sanity';
import MindbulletArchive from '@/components/mindbulletsArchive';
import FadeInOnVisible from '@/components/FadeInOnVisible';

export const revalidate = 60;

type MindbulletsDoc = {
  title: string;
  titleByline: string;
  subheading: PortableTextBlock[];
};

type MindbulletDoc = {
  _id: string;
  title?: string;
  byLine?:string;
  slug?: { current: string } | string;
  mainImage?: { asset?: { url?: string } };
  bodyPlain?: string; // ⬅️ we’ll fetch this from pt::text(body)
};

export default async function MindbulletsPage() {
  const doc = await client.fetch<MindbulletsDoc | null>(
    groq`*[_type == "mindbulletsPage"][0]{ title, titleByline, subheading }`
  );

  if (!doc) {
    notFound();
  }

  // Mindbullets for the carousel — include body as plain text
  const mindbullets = await client.fetch<MindbulletDoc[]>(
    groq`*[_type == "mindbullet" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      byLine,
      slug,
      mainImage{asset->{url}},
      "bodyPlain": pt::text(body)   // ⬅️ flatten Portable Text body
    }`
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F7F2]">
      <Header />
      <main className="flex-1 px-[4.53vw] py-[2.09vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:px-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:py-[3.2vh] ">
        <CommonHeader title={doc.title} active="mindbullets" />
        <div className="grid gap-[2vh] auto-rows-auto overflow-visible [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[21vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-x-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-y-[3.2vh]">
          <Mindbullets
            title={doc.title}
            titleByline={doc.titleByline}
            subheading={doc.subheading}
            mindbullets={mindbullets}
          />
        </div>
        <FadeInOnVisible>
        <div className="hidden [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:block"><MindbulletArchive /></div>
        </FadeInOnVisible>
      </main>
      <Footer />
    </div>
  );
}
