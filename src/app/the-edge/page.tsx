// app/insights/edge/page.tsx
import { client } from '@/sanity/lib/client';
import { edgePageQuery, articlesForEdgeCarouselQuery } from '@/sanity/lib/queries';
import CommonHeader from '@/components/insights/CommonHeader';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Edge from './edge';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import ProvocativeScenarios from '@/components/ProvocativeScenarios';

type ArticleCard = {
  _id: string;
  title: string;
  byline?: string;
  slug?: { current: string } | string;
  image?: { asset?: { url?: string } };
};




export default async function EdgePage() {
  const [doc, articles] = await Promise.all([
    client.fetch(edgePageQuery),
    client.fetch<ArticleCard[]>(articlesForEdgeCarouselQuery),
  ]);

  if (!doc) throw new Error('Edge doc not found'); 

  return (
    <>
      <Header />
      <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
        <CommonHeader title={doc.title} active="edge" />
        <div className="grid gap-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-auto [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh]">
          <Edge
          title={doc.title}
          subheading={doc.subheading}
          contentText={doc.contentText}               
          whatBlewYourMind={doc.whatBlewYourMind}
          articles={articles}                 
        />
        </div>

        <div className="hidden md:block">
          <FadeInOnVisible>
            <div className="mt-[30vh]">
              <ProvocativeScenarios />
            </div>
          </FadeInOnVisible>
        </div>
      </main>
      <Footer />
    </>
  );
}
