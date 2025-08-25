'use client';

import React, { useCallback } from 'react';
import useIsMobile from '@/hooks/useIsMobile';
import Header from '@/components/header';
import Footer from '@/components/footer';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import { HighlightText } from '@/components/HighlightText';
import SuperchargeTomorrowAccordion from '@/components/SuperchargeTomorrowAccordion';
import { PortableTextBlock } from '@portabletext/types';

/** === Types (copied from your original file so the server file stays server-only) === */
type PT = PortableTextBlock[];

export type AccordionSection1Statement = {
  body: PT;
};

export type AccordionSection1 = {
  heading: string;
  subheading: PT;
  description: PT;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  cta: string;
  email: string;
  statements: [
    AccordionSection1Statement,
    AccordionSection1Statement,
    AccordionSection1Statement,
    AccordionSection1Statement
  ];
};

export type AccordionSection2Item = {
  heading: PT;
  body: PT;
};

export type AccordionSection2_Subsection1 = {
  description: PT;
  statements: [AccordionSection2Item, AccordionSection2Item, AccordionSection2Item];
};

export type AccordionSection2_Subsection2 = {
  description: PT;
  statements: [AccordionSection2Item, AccordionSection2Item];
};

export type AccordionSection2 = {
  heading: string;
  subheading: PT;
  cta: string;
  email: string;
  section1: AccordionSection2_Subsection1;
  section2: AccordionSection2_Subsection2;
};

export type AccordionSection3 = {
  heading: string;
  subheading: PT;
  description: PT;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  cta: string;
  email: string;
};

export type SuperchargeTomorrowPageContent = {
  _id: string;
  title: string;
  heading: string;
  subheading: PT;
  accordionSection1: AccordionSection1;
  accordionSection2: AccordionSection2;
  accordionSection3: AccordionSection3;
};
/** === End types === */

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



export default function SuperchargeTomorrow({ data }: { data: SuperchargeTomorrowPageContent }) {
  const isMobile = useIsMobile();
  // Back to top handler
  const handleBackToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const items: GridItem[] = [
    {
      id: 1,
      content: (
        <MainTitleAnimation
          text={data.title}
          typeSpeed={60}
          delay={500}
          className="dt-h2 text-balance"
        />
      ),
      colSpan: 2,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 2,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
    {
      id: 2,
      content: <></>,
      colSpan: 4,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 2,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
    {
      id: 3,
      content: (
        <FadeInOnVisible>
          <div className="dt-h1">
            {data.heading}
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 5,
      rowSpan: 2,
      mobileColSpan: 2,
      mobileRowSpan: 2,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
    {
      id: 4,
      content: <></>,
      colSpan: 1,
      rowSpan: 2,
      mobileColSpan: 2,
      mobileRowSpan: 2,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
    {
      id: 5,
      content: (
        <FadeInOnVisible>
          <div className="dt-h3">
            <HighlightText value={data.subheading} />
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 3,
      rowSpan: 2,
      mobileColSpan: 2,
      mobileRowSpan: 2,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
    {
      id: 6,
      content: <></>,
      colSpan: 3,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 2,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
  ];

  return (
    <>
      <Header />
      <main className="bg-[#F9F7F2]">
        {isMobile ? (
          <div className="w-full px-0 mx-0">
            <div className="grid grid-cols-4 gap-y-2 auto-rows-[minmax(32px,auto)] px-3 py-2 w-full">
              {/* Row 1: col 1-4: data.title with MainTitleAnimation */}
              <div className="col-span-1 row-start-1 row-span-1">
                <MainTitleAnimation
                  text={data.title}
                  typeSpeed={60}
                  delay={500}
                  className="text-[3.5vh] font-graphik leading-tight"
                />
              </div>
              <div className="col-span-3 row-start-1 row-span-1"></div>
              {/* Row 2: empty */}
              <div className="col-span-4 row-start-2 row-span-1 h-[1vh]"></div>
              {/* Row 3: col 1-4: data.heading with FadeInOnVisible */}
              <div className="col-span-4 row-start-3 row-span-1">
                <FadeInOnVisible>
                  <div className="text-[6vh] font-graphik leading-tight">{data.heading}</div>
                </FadeInOnVisible>
              </div>
              {/* Row 4: empty */}
              <div className="col-span-4 row-start-4 row-span-1 h-[1vh]"></div>
              {/* Row 5: col 1-4: data.subheading with FadeInOnVisible */}
              <div className="col-span-4 row-start-5 row-span-1">
                <FadeInOnVisible>
                  <div className="text-[2vh] font-bold">
                    <HighlightText value={data.subheading} />
                  </div>
                </FadeInOnVisible>
              </div>
              {/* Row 6: empty */}
              <div className="col-span-4 row-start-6 row-span-1 h-[1vh]"></div>
              {/* Row 7: col 1-4: SuperchargeTomorrowAccordion */}
              <div className="col-span-4 row-start-7 row-span-1">
                <FadeInOnVisible>
                  <SuperchargeTomorrowAccordion data={data} />
                </FadeInOnVisible>
              </div>
              {/* After Accordion: Back to top button in col 3-4 */}
              <div className="col-start-3 col-span-2 flex justify-end items-center mt-2 cursor-pointer" onClick={handleBackToTop}>
                <FadeInOnVisible>
                  <span className="underline text-[2vh] flex items-center gap-1 font-bold">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ transform: 'rotate(-45deg)' }}
                    >
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                    Back to top
                  </span>
                </FadeInOnVisible>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:px-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:py-[3.2vh] bg-[#F9F7F2] overflow-visible">
              <div className="grid gap-[2vh] grid-cols-2 auto-rows-[12.5vh] overflow-visible [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[21vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-x-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-y-[3.2vh]">
                {items.map((item) => (
                  <div key={item.id} className={`${getGridClasses(item)} overflow-visible`}>
                    {item.content}
                  </div>
                ))}
              </div>
            </div>
            <FadeInOnVisible>
              <SuperchargeTomorrowAccordion data={data} />
            </FadeInOnVisible>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
