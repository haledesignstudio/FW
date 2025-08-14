'use client';

import React from "react";
import Header from '@/components/header';
import Footer from '@/components/footer';
import SignalsFromTheFuture from '@/components/signalsFromTheFuture';
import { PortableText } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import { urlFor } from '@/sanity/lib/image';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import HomeAccordion from '@/components/HomeAccordion';
import { HighlightText } from '@/components/HighlightText';

export type HomePageContent = {
  _id: string;
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

interface HomeClientProps {
  data: HomePageContent;
}

export default function HomeClient({ data }: HomeClientProps) {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mobile Layout - 4 column grid as specified
  const mobileItems: GridItem[] = [
    // Row 1-4, Col 1-4: Headline
    {
      id: 1,
      content: (
        <FadeInOnVisible>
          <div data-sanity={JSON.stringify({ 
            _type: 'homePage', 
            _id: data._id, 
            _path: 'headline'
          })}>
            <MainTitleAnimation
              text={data.headline}
              typeSpeed={40}
              delay={100}
              className="text-[4vh] font-graphik leading-tight"
            />
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 5,
      rowSpan: 2,
      mobileColSpan: 4,
      mobileRowSpan: 4,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
    // Row 5: Empty
    {
      id: 2,
      content: <></>,
      colSpan: 1,
      rowSpan: 2,
      mobileColSpan: 4,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
    // Row 6, Col 1-3: Subheading with HighlightText
    {
      id: 3,
      content: (
        <FadeInOnVisible>
          <div className="prose max-w-none text-[2vh] font-bold leading-tight" data-sanity={JSON.stringify({ 
            _type: 'homePage', 
            _id: data._id, 
            _path: 'subheading'
          })}>
            <HighlightText value={data.subheading} />
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 1,
      mobileColSpan: 3,
      mobileRowSpan: 1,
      landscapeColSpan: 2,
      landscapeRowSpan: 2,
    },
    // Row 6, Col 4: Empty
    {
      id: 4,
      content: <></>,
      colSpan: 2,
      rowSpan: 1,
      mobileColSpan: 1,
      mobileRowSpan: 1,
      landscapeColSpan: 2,
      landscapeRowSpan: 2,
    },
    // Row 7: Empty
    {
      id: 5,
      content: <></>,
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 4,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
    // Row 8-9, Col 2-4: Body text
    {
      id: 6,
      content: <></>,
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 1,
      mobileRowSpan: 2,
      landscapeColSpan: 2,
      landscapeRowSpan: 2,
    },
    {
      id: 7,
      content: (
        <FadeInOnVisible>
          <div className="text-[1.5vh] leading-tight" data-sanity={JSON.stringify({ 
            _type: 'homePage', 
            _id: data._id, 
            _path: 'body'
          })}>
            <PortableText value={data.body} />
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 3,
      mobileRowSpan: 2,
      landscapeColSpan: 2,
      landscapeRowSpan: 2,
    },
    // Row 10, Col 1-2: CTA Button
    {
      id: 8,
      content: (
        <FadeInOnVisible>
          <div className="text-[1.5vh] font-graphik leading-tight" data-sanity={JSON.stringify({ 
            _type: 'homePage', 
            _id: data._id, 
            _path: 'cta'
          })}>
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
    // Row 10, Col 3-4: Empty
    {
      id: 9,
      content: <></>,
      colSpan: 6,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
    // Row 11: Empty
    {
      id: 10,
      content: <></>,
      colSpan: 6,
      rowSpan: 3,
      mobileColSpan: 4,
      mobileRowSpan: 1,
      landscapeColSpan: 3,
      landscapeRowSpan: 2,
    },
    // Row 12, Col 1-4: Image
    {
      id: 11,
      content: data.Image?.asset ? (
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
      mobileColSpan: 4,
      mobileRowSpan: 3,
      landscapeColSpan: 3,
      landscapeRowSpan: 2,
    },
    // Row 13: Empty (so accordion appears in row 14)
    {
      id: 12,
      content: <></>,
      colSpan: 6,
      rowSpan: 1,
      mobileColSpan: 4,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
  ];

  // Desktop items (keep existing logic for desktop)
  const desktopItems: GridItem[] = [
    {
      id: 1,
      content: (
        <FadeInOnVisible>
          <div data-sanity={JSON.stringify({ 
            _type: 'homePage', 
            _id: data._id, 
            _path: 'headline'
          })}>
            <MainTitleAnimation
              text={data.headline}
              typeSpeed={40}
              delay={100}
              className="text-[clamp(4vw,10vh,5vw)] font-graphik leading-tight"
            />
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 5,
      rowSpan: 2,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
    {
      id: 2,
      content: <></>,
      colSpan: 1,
      rowSpan: 2,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
    {
      id: 3,
      content: <></>,
      colSpan: 6,
      rowSpan: 1,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
    {
      id: 4,
      content: (
        <FadeInOnVisible>
          <div className="prose max-w-none text-[clamp(1.75vw,5vh,2.5vw)] font-bold leading-tight" data-sanity={JSON.stringify({ 
            _type: 'homePage', 
            _id: data._id, 
            _path: 'subheading'
          })}>
            <HighlightText value={data.subheading} />
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 1,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 2,
      landscapeRowSpan: 2,
    },
    {
      id: 5,
      content: (
        <FadeInOnVisible>
          <div className="text-[clamp(1vw,3vh,1.5vw)] leading-tight" data-sanity={JSON.stringify({ 
            _type: 'homePage', 
            _id: data._id, 
            _path: 'body'
          })}>
            <PortableText value={data.body} />
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 1,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 2,
      landscapeRowSpan: 2,
    },
    {
      id: 6,
      content: <></>,
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
    {
      id: 7,
      content: (
        <FadeInOnVisible>
          <div className="text-[clamp(0.9vw,2.25vh,1.125vw)] font-graphik leading-[clamp(0.9vw,3vh,1.5vw)]" data-sanity={JSON.stringify({ 
            _type: 'homePage', 
            _id: data._id, 
            _path: 'cta'
          })}>
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
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 2,
      landscapeRowSpan: 2,
    },
    {
      id: 8,
      content: <></>,
      colSpan: 6,
      rowSpan: 1,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
    {
      id: 9,
      content: data.Image?.asset ? (
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
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 3,
      landscapeRowSpan: 2,
    },
  ];

  return (
    <>
      <SignalsFromTheFuture />
      <Header />
      <main className="bg-[#F9F7F2]" data-sanity={JSON.stringify({ _type: 'homePage', _id: data._id })}>
        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="p-[2vh] bg-[#F9F7F2] overflow-visible">
            <div className="grid gap-[2vh] grid-cols-4 auto-rows-[6.25vh] overflow-visible">
              {mobileItems.map((item) => (
                <div key={item.id} className={`${getGridClasses(item)} overflow-visible`}>
                  {item.content}
                </div>
              ))}
            </div>
          </div>
          {/* Vertical Accordion for Mobile */}
          <FadeInOnVisible>
            <HomeAccordion data={data} />
          </FadeInOnVisible>
          {/* Back to Top Button for Mobile */}
          <div className="p-[2vh] bg-[#F9F7F2]">
            <div className="grid gap-[2vh] grid-cols-4 auto-rows-[6.25vh]">
              <div className="col-span-3"></div>
              <div className="col-span-1 flex justify-end items-center cursor-pointer" onClick={handleBackToTop}>
                <FadeInOnVisible>
                  <span className="underline text-[2vh] flex items-center gap-1">Back to top
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                  </span>
                </FadeInOnVisible>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2] overflow-visible">
            <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh] overflow-visible">
              {desktopItems.map((item) => (
                <div key={item.id} className={`${getGridClasses(item)} overflow-visible`}>
                  {item.content}
                </div>
              ))}
            </div>
          </div>
          <FadeInOnVisible>
            <HomeAccordion data={data} />
          </FadeInOnVisible>
        </div>
      </main>
      <Footer />
    </>
  );
}
