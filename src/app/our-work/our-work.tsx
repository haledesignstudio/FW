'use client';

import React from "react";
import useIsMobile from '@/hooks/useIsMobile';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { PortableTextBlock } from '@portabletext/types';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import { HighlightText } from '@/components/HighlightText';
import CountingAnimation from '@/components/countingAnimation';
import PartnersMarquee from '@/components/PartnersMarquee';
import OurWorkAccordion from "@/components/OurWorkAccordion";
import { PortableText } from '@portabletext/react';
import UnderlineOnHoverAnimation from "@/components/underlineOnHoverAnimation";


export type OurWorkContent = {
  _id: string;
  title: string;
  subheading: PortableTextBlock[];

  statistics: Array<{
    statisticName: string;
    statisticValue: string; // switch to number if you change the schema
  }>;

  testimonials: Array<{
    quote: PortableTextBlock[];
    name: string;
    jobTitle: string;
    company: string;
  }>;

  partners: Array<{
    partnerName: string;
    partnerImage: {
      asset: {
        _ref: string;
        _type: string;
      };
      // add `alt?: string;` if you store it on the image field and project it
    };
  }>;

  accordionSection1: {
    heading: string;
    body: PortableTextBlock[];
    mainImage: {
      asset: {
        _ref: string;
        _type: string;
      };
    };
    brandImage: {
      asset: {
        _ref: string;
        _type: string;
      };
    };
    cta: string;
  };

  accordionSection2: {
    heading: string;
    body: PortableTextBlock[];
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

interface OurWorkClientProps {
  data: OurWorkContent;
}


function addLineBreaksAfterPeriods(blocks: PortableTextBlock[]): PortableTextBlock[] {
  return blocks.map(block => {
    if (block._type === 'block' && block.children) {
      return {
        ...block,
        children: block.children.map(child => {
          if (child._type === 'span' && typeof child.text === 'string') {
            return {
              ...child,
              text: child.text.replace(/\./g, '.\n\n')
            };
          }
          return child;
        })
      };
    }
    return block;
  });
}

export default function OurWorkClient({ data }: OurWorkClientProps) {
  const isMobileScreen = useIsMobile();

  // Handle back to top functionality
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const items: GridItem[] = [
    {
      id: 1,
      content: (
        <MainTitleAnimation
          text={data.title}
          typeSpeed={40}
          delay={500}
          className="dt-h2"
        />
      ),
      colSpan: 4,
      rowSpan: 1,
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
      colSpan: 2,
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
          <div id="impact-statistics" className="dt-h3">
            <HighlightText value={data.subheading} />
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 3,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 2,
      landscapeRowSpan: 2,
    },
    {
      id: 4,
      content: (
        <></>
      ),
      colSpan: 3,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 2,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
    {
      id: 5,
      content: (
        <div className="h-full flex flex-col gap-[2vh]">
          <FadeInOnVisible>
            {(inView) => (
              <>
                <div className="text-[clamp(2.8vw,6.6vh,3.3vw)] font-graphik-semibold leading-[clamp(6vw,13.8vh,6.9vw)]">
                  <CountingAnimation start={inView} target={data.statistics[0].statisticValue} />
                </div>
                <div className="text-[clamp(0.75vw,2vh,1vw)] font-roboto leading-tight text-black">{data.statistics[0].statisticName}</div>
              </>
            )}
          </FadeInOnVisible>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 2,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,

    },
    {
      id: 6,
      content: (
        <div className="h-full flex flex-col gap-[2vh]">
          <FadeInOnVisible>
            {(inView) => (
              <>
                <div className="text-[clamp(2.8vw,6.6vh,3.3vw)] font-graphik-semibold leading-[clamp(6vw,13.8vh,6.9vw)]">
                  <CountingAnimation start={inView} target={data.statistics[1].statisticValue} />
                </div>
                <div className="text-[clamp(0.75vw,2vh,1vw)] font-roboto leading-tight text-black">{data.statistics[1].statisticName}</div>
              </>
            )}
          </FadeInOnVisible>
        </div>
      ),
      colSpan: 1,
      rowSpan: 2,
      mobileColSpan: 2,
      mobileRowSpan: 2,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,

    },
    {
      id: 7,
      content: (
        <div className="h-full flex flex-col gap-[2vh]">
          <FadeInOnVisible>
            {(inView) => (
              <>
                <div className="text-[clamp(2.8vw,6.6vh,3.3vw)] font-graphik-semibold leading-[clamp(6vw,13.8vh,6.9vw)]">
                  <CountingAnimation start={inView} target={data.statistics[2].statisticValue} />
                </div>
                <div className="text-[clamp(0.75vw,2vh,1vw)] font-roboto leading-tight text-black">{data.statistics[2].statisticName}</div>
              </>
            )}
          </FadeInOnVisible>
        </div>

      ),
      colSpan: 1,
      rowSpan: 2,
      mobileColSpan: 2,
      mobileRowSpan: 2,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,

    },
    {
      id: 8,
      content: (
        <div className="h-full flex flex-col gap-[2vh]">
          <FadeInOnVisible>
            {(inView) => (
              <>
                <div className="text-[clamp(2.8vw,6.6vh,3.3vw)] font-graphik-semibold leading-[clamp(6vw,13.8vh,6.9vw)]">
                  <CountingAnimation start={inView} target={data.statistics[3].statisticValue} />
                </div>
                <div className="text-[clamp(0.75vw,2vh,1vw)] font-roboto leading-tight text-black">{data.statistics[3].statisticName}</div>
              </>
            )}
          </FadeInOnVisible>
        </div>
      ),
      colSpan: 1,
      rowSpan: 2,
      mobileColSpan: 2,
      mobileRowSpan: 2,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,

    },
    {
      id: 9,
      content: (
        <div className="h-full flex flex-col gap-[2vh]">
          <FadeInOnVisible>
            {(inView) => (
              <>
                <div className="text-[clamp(2.8vw,6.6vh,3.3vw)] font-graphik-semibold leading-[clamp(6vw,13.8vh,6.9vw)]">
                  <CountingAnimation start={inView} target={data.statistics[4].statisticValue} />
                </div>
                <div className="text-[clamp(0.75vw,2vh,1vw)] font-roboto leading-tight text-black">{data.statistics[4].statisticName}</div>
              </>
            )}
          </FadeInOnVisible>
        </div>
      ),
      colSpan: 1,
      rowSpan: 2,
      mobileColSpan: 2,
      mobileRowSpan: 2,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,

    },
    {
      id: 11,
      content: (
        <section id="our-clients" className="h-full flex">
          <div className="w-full grid grid-cols-3 gap-[6vh]">
            {data.testimonials.slice(0, 3).map((t, i) => (
              <div key={i} className="">
                {/* Quote */}
                <div className="dt-h4">
                  <PortableText value={t.quote} />
                </div>

                {/* Author */}
                <div className="mt-[2.5vh] text-black">
                  <div className="dt-h4">
                    &ndash; {t.name}
                  </div>
                  <div className="dt-h4">
                    {t.jobTitle}{t.company ? `, ${t.company}` : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ),
      colSpan: 6,
      rowSpan: 2,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },

    {
      id: 12,
      content: (
        <div className="h-full flex items-center">
          <PartnersMarquee
            partners={data.partners}
            durationSec={100}     // loop time
            logoHeightVh={21}     // logo height
            gap="5.385vw"            // spacing between logos
            edgeFadeVw={1.795}       // edge fade width; set 0 to disable
            fadeBg="#F9F7F2"     // page background for the fades
            direction="left"
          />
        </div>

      ),
      colSpan: 6,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    {
      id: 13,
      content: (
        <div>

        </div>

      ),
      colSpan: 6,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
  ];

  return (
    <>
      <Header />
      <main className="bg-[#F9F7F2]">
        {isMobileScreen ? (
          <>
            {/* MOBILE LAYOUT */}
            <div className="p-[2vh] bg-[#F9F7F2]">
              <div className="grid grid-cols-4 auto-rows-[minmax(7.701vh,auto)] overflow-visible gap-x-[4.53vw] gap-y-[2.09vh]">
                {/* Row 1: Main Title (col 1) */}
                <div className="col-span-2 row-span-2">
                  <FadeInOnVisible>
                    <MainTitleAnimation
                      text={data.title}
                      typeSpeed={60}
                      delay={500}
                      className="dt-h2 text-balance"
                    />
                  </FadeInOnVisible>
                </div>

                {/* Row 1-3: Subheading (col 3-4) */}

                <div className="col-span-2 row-span-4">
                  <FadeInOnVisible>
                    <div className="dt-h3 whitespace-pre-line">
                      <HighlightText value={addLineBreaksAfterPeriods(data.subheading)} />
                    </div>
                  </FadeInOnVisible>
                </div>


                {/* Row 3-4: Corporate Partners Statistics (col 1-2) */}
                <div className="col-span-2 row-span-2">
                  <div className="h-full gap-[2vh]">
                    <FadeInOnVisible>
                      {(inView) => (
                        <>
                          <div className="dt-h2">
                            <CountingAnimation start={inView} target={data.statistics[0].statisticValue} />
                          </div>
                          <div className="dt-body-sm">{data.statistics[0].statisticName}</div>
                        </>
                      )}
                    </FadeInOnVisible>
                  </div>
                </div>


                {/* Row 5-6: Game-changing Opportunities (col 1-2) */}
                <div className="col-span-2 row-span-2">
                  <div className="h-full flex flex-col gap-[2vh]">
                    <FadeInOnVisible>
                      {(inView) => (
                        <>
                          <div className="dt-h2">
                            <CountingAnimation start={inView} target={data.statistics[1].statisticValue} />
                          </div>
                          <div className="dt-body-sm">{data.statistics[1].statisticName}</div>
                        </>
                      )}
                    </FadeInOnVisible>
                  </div>
                </div>

                {/* Row 5-6: Value Propositions (col 3-4) */}
                <div className="col-span-2 row-span-2">
                  <div className="h-full flex flex-col gap-[2vh]">
                    <FadeInOnVisible>
                      {(inView) => (
                        <>
                          <div className="dt-h2">
                            <CountingAnimation start={inView} target={data.statistics[2].statisticValue} />
                          </div>
                          <div className="dt-body-sm">{data.statistics[2].statisticName}</div>
                        </>
                      )}
                    </FadeInOnVisible>
                  </div>
                </div>

                {/* Row 7-8: Investment Cases (col 1-2) */}
                <div className="col-span-2 row-span-2">
                  <div className="h-full flex flex-col gap-[2vh]">
                    <FadeInOnVisible>
                      {(inView) => (
                        <>
                          <div className="dt-h2">
                            <CountingAnimation start={inView} target={data.statistics[3].statisticValue} />
                          </div>
                          <div className="dt-body-sm font-roboto leading-tight text-black">{data.statistics[3].statisticName}</div>
                        </>
                      )}
                    </FadeInOnVisible>
                  </div>
                </div>

                {/* Row 7-8: New Ventures in Commercialisation (col 3-4) */}
                <div className="col-span-2 row-span-2">
                  <div className="h-full flex flex-col gap-[2vh]">
                    <FadeInOnVisible>
                      {(inView) => (
                        <>
                          <div className="dt-h2">
                            <CountingAnimation start={inView} target={data.statistics[4].statisticValue} />
                          </div>
                          <div className="dt-body-sm">{data.statistics[4].statisticName}</div>
                        </>
                      )}
                    </FadeInOnVisible>
                  </div>
                </div>

                {/* Row 9-11: Testimonials Carousel (placeholder) */}
                <div className="col-span-4">
                  <section id="our-clients" className="h-full flex">
                    <div className="w-full grid col-span-4 gap-[9vh]">
                      {data.testimonials.slice(0, 3).map((t, i) => (
                        <div key={i} className="">
                          {/* Quote */}
                          <div className="dt-h4">
                            <PortableText value={t.quote} />
                          </div>

                          {/* Author */}
                          <div className="mt-[1vh] text-black">
                            <div className="dt-h4">
                              &ndash; {t.name}
                            </div>
                            <div className="dt-h4">
                              {t.jobTitle}{t.company ? `, ${t.company}` : ''}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Row 12: Empty */}
                <div className="col-span-4"></div>

                {/* Row 13: Partners Carousel */}
                <div className="col-span-4 row-span-1 flex items-center">
                  <div className="h-full w-full flex items-center">
                    <PartnersMarquee
                      partners={data.partners}
                      durationSec={90} // Faster for mobile performance
                      logoHeightVh={17} // Optimized height for mobile
                      gap="20vw" // Balanced gap for mobile
                      edgeFadeVw={8} // Smaller fade for mobile
                      fadeBg="#F9F7F2"
                      direction="left"
                    />
                  </div>
                </div>

                {/* Row 14: Empty */}
                <div className="col-span-4"></div>
              </div>
            </div>

            {/* Accordion Section - Full Width Edge-to-Edge */}
            <div className="">
              <FadeInOnVisible>
                <OurWorkAccordion data={data} />
              </FadeInOnVisible>
            </div>

            

            {/* Back to Top Button After Accordion */}
            <div className="p-[2vh] bg-[#F9F7F2] mt-[10vh]">
              <div className="grid grid-cols-4 gap-[2vh]">
                <div className="col-start-3 col-span-2 flex justify-end items-center cursor-pointer" onClick={handleBackToTop}>
                  <FadeInOnVisible>
                      <span className="dt-btn flex items-center">
                        <svg
                          width="clamp(3.5vw,2.35vh,4.7vw)"
                          height="clamp(3.5vw,2.35vh,4.7vw)"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          style={{ transform: 'rotate(-45deg)' }}
                        >
                          <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>
                        <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                          Back to top
                        </UnderlineOnHoverAnimation>

                      </span>
                    </FadeInOnVisible>

                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* DESKTOP LAYOUT (existing) */}
            <div className="px-[1.795vw] py-[3.2vh] bg-[#F9F7F2] overflow-visible">
              <div className="grid grid-cols-6 auto-rows-[21vh] overflow-visible gap-x-[1.795vw] gap-y-[3.2vh] overflow-visible">
                {items.map((item) => (
                  <div key={item.id} className={`${getGridClasses(item)} overflow-visible`}>
                    {item.content}
                  </div>
                ))}
              </div>
            </div>

            {/* Accordion Section for Desktop - Full Width Edge-to-Edge */}
            <div id="supercharge-tomorrow" className="h-full flex items-center">
            </div>
            <div id="case-studies" className="h-full flex items-center">
            </div>

            <div className="mt-[4vh]">
              <FadeInOnVisible>
                <OurWorkAccordion data={data} />
              </FadeInOnVisible>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
