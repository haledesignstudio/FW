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
      <main className="px-[4.53vw] py-[2.09vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:px-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:py-[3.2vh] bg-[#F9F7F2]">
        <CommonHeader title={doc.title} active="edge" />
        <div className="grid rid-cols-4 auto-rows-[minmax(7.701vh,auto)] overflow-visible gap-x-[4.53vw] gap-y-[2.09vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[21vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-x-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-y-[3.2vh]">
          <Edge
          title={doc.title}
          titleByline={doc.titleByline}
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
