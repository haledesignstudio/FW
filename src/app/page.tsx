'use client';

import React, { useEffect, useState, Suspense } from "react";
import Header from '@/components/header';
import Footer from '@/components/footer';
import { client } from '@/sanity/lib/client';
import { homePageQuery } from '@/sanity/lib/queries';
import { PortableText } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import { urlFor } from '@/sanity/lib/image';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import HomeAccordion from '@/components/HomeAccordion';
import { HighlightText } from '@/components/HighlightText';

export type HomePageContent = {
  headline: string;
  subheading: PortableTextBlock[];
  body: PortableTextBlock[];
  cta: string;
  email: string;
  Image?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  section1: {
    section1Title: string;
    section1Body: PortableTextBlock[];
    section1CTA: string;
    section1Email: string;
  };
  section2: {
    section2Title: string;
    section2Body: PortableTextBlock[];
    section2Heading1: PortableTextBlock[];
    section2Description1: PortableTextBlock[];
    section2Heading2: PortableTextBlock[];
    section2Description2: PortableTextBlock[];
    section2Heading3: PortableTextBlock[];
    section2Description3: PortableTextBlock[];
    section2Image?: {
      asset: {
        _ref: string;
        _type: string;
      };
      alt?: string;
    };
  };
  section3: {
    section3Title: string;
    section3Body: PortableTextBlock[];
  };
};

type GridItem = {
  id: number;
  content: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  mobileColSpan?: number;
  mobileRowSpan?: number;
  landscapeColSpan?: number;
  landscapeRowSpan?: number;
};

const getGridClasses = (item: GridItem) => {
  const base = ['bg-[#F9F7F2]', 'flex', 'flex-col'];
  if (item.mobileColSpan === 0 || item.mobileRowSpan === 0) {
    base.push('block', '[@media(max-width:767px)]:hidden');
  } else {
    base.push(`col-span-${item.mobileColSpan}`, `row-span-${item.mobileRowSpan}`);
  }

  if (item.landscapeColSpan === 0 || item.landscapeRowSpan === 0) {
    base.push('[@media(max-height:600px)_and_(max-width:768px)]:hidden');
  } else {
    base.push(`[@media(max-height:600px)_and_(max-width:768px)]:col-span-${item.landscapeColSpan}`);
    base.push(`[@media(max-height:600px)_and_(max-width:768px)]:row-span-${item.landscapeRowSpan}`);
  }

  if (item.colSpan === 0 || item.rowSpan === 0) {
    base.push('[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:hidden');
  } else {
    base.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-${item.colSpan}`);
    base.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-${item.rowSpan}`);
  }

  return base.join(' ');
};

function HomeContent() {
  const [data, setData] = useState<HomePageContent | null>(null);

  useEffect(() => {
    client.fetch<HomePageContent>(homePageQuery).then((res) => {
      setData(res);
    });
  }, []);

  if (!data) return null;

  const items: GridItem[] = [
    {
      id: 1,
      content: (

        <MainTitleAnimation
          text={data.headline}
          typeSpeed={40}
          delay={500}
          className="text-[clamp(4vw,10vh,5vw)] font-graphik leading-tight"
        />


      ),
      colSpan: 5,
      rowSpan: 2,
      mobileColSpan: 2,
      mobileRowSpan: 2,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
    {
      id: 2,
      content: (
        <></>
      ),
      colSpan: 1,
      rowSpan: 2,
      mobileColSpan: 2,
      mobileRowSpan: 2,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
    {
      id: 3,
      content: (
        <></>
      ),
      colSpan: 6,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 2,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
    {
      id: 4,
      content: (
        <FadeInOnVisible>
          <div className="prose max-w-none text-[clamp(1.75vw,5vh,2.5vw)] font-bold leading-tight">
            <HighlightText value={data.subheading} />
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 2,
      landscapeRowSpan: 2,
    },
    {
      id: 5,
      content: (
        <FadeInOnVisible>
          <div className="text-[clamp(1vw,3vh,1.5vw)] leading-tight">
            <PortableText value={data.body} />
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 2,
      landscapeRowSpan: 2,
    },
    {
      id: 6,
      content: (
        <></>
      ),
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 2,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
    {
      id: 7,
      content: (
        <FadeInOnVisible>
          <div className="text-[clamp(0.9vw,2.25vh,1.125vw)]  font-graphik leading-[clamp(0.9vw,3vh,1.5vw)] ">
            <a
              href={`mailto:${data.email ?? 'info@futureworld.org'}?subject=${encodeURIComponent(data.cta ?? '')}`}
              className="transition cursor-pointer"
            >
              <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                {data.cta ?? 'Get in Touch'}
              </UnderlineOnHoverAnimation>
            </a>
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 2,
      landscapeRowSpan: 2,
    },
    {
      id: 8,
      content: (
        <></>
      ),
      colSpan: 6,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 2,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
    {
      id: 9,
      content:

        data.Image?.asset ? (
          <FadeInOnVisible>
            <img
              src={urlFor(data.Image.asset).url()}
              alt={data.Image.alt || ''}
              className="object-cover w-full h-full"
            />
          </FadeInOnVisible>
        ) : null,
      colSpan: 6,
      rowSpan: 3,
      mobileColSpan: 2,
      mobileRowSpan: 2,
      landscapeColSpan: 3,
      landscapeRowSpan: 2,
    },
  ];

  return (
    <>
      <Header />
      <main className="bg-[#F9F7F2]">
        <div className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2] overflow-visible">
          <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh] overflow-visible">
            {items.map((item) => (
              <div key={item.id} className={`${getGridClasses(item)} overflow-visible`}>
                {item.content}
              </div>
            ))}
          </div>
        </div>
        <FadeInOnVisible>
        <HomeAccordion data={data} />
        </FadeInOnVisible>
      </main>
      <Footer />
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
