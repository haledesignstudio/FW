'use client';

import React, { useEffect, useState } from "react";
import Header from '@/components/header';
import Footer from '@/components/footer';
import { PortableTextBlock } from '@portabletext/types';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import { HighlightText } from '@/components/HighlightText';
import CountingAnimation from '@/components/countingAnimation';
import PartnersMarquee from '@/components/PartnersMarquee';
import OurWorkAccordion from "@/components/OurWorkAccordion";

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

export default function OurWorkClient({ data }: OurWorkClientProps) {
  // Mobile detection with hydration safety
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if mobile
  const isMobileScreen = isClient && window.innerWidth < 768;

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
          className="text-[clamp(4vw,10vh,5vw)] font-graphik leading-tight"
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
          <div className="prose max-w-none text-[clamp(1.75vw,5vh,2.5vw)] font-bold leading-tight">
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
        <div className="h-full flex flex-col mt-[12.5vh] gap-[2vh]">
          <FadeInOnVisible>
            {(inView) => (
              <>
                <div className="text-[clamp(3vw,7vh,3.5vw)] font-graphik leading-tight">
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
        <div className="h-full flex flex-col mt-[12.5vh] gap-[2vh]">
          <FadeInOnVisible>
            {(inView) => (
              <>
                <div className="text-[clamp(3vw,7vh,3.5vw)] font-graphik leading-tight">
                  <CountingAnimation start={inView} target={data.statistics[1].statisticValue} />
                </div>
                <div className="text-[clamp(0.75vw,2vh,1vw)] font-roboto leading-tight text-black">{data.statistics[1].statisticName}</div>
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
      id: 7,
      content: (
        <div className="h-full flex flex-col mt-[12.5vh] gap-[2vh]">
          <FadeInOnVisible>
            {(inView) => (
              <>
                <div className="text-[clamp(3vw,7vh,3.5vw)] font-graphik leading-tight">
                  <CountingAnimation start={inView} target={data.statistics[2].statisticValue} />
                </div>
                <div className="text-[clamp(0.75vw,2vh,1vw)] font-roboto leading-tight text-black">{data.statistics[2].statisticName}</div>
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
      id: 8,
      content: (
        <div className="h-full flex flex-col mt-[12.5vh] gap-[2vh]">
          <FadeInOnVisible>
            {(inView) => (
              <>
                <div className="text-[clamp(3vw,7vh,3.5vw)] font-graphik leading-tight">
                  <CountingAnimation start={inView} target={data.statistics[3].statisticValue} />
                </div>
                <div className="text-[clamp(0.75vw,2vh,1vw)] font-roboto leading-tight text-black">{data.statistics[3].statisticName}</div>
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
      id: 9,
      content: (
        <div className="h-full flex flex-col mt-[12.5vh] gap-[2vh]">
          <FadeInOnVisible>
            {(inView) => (
              <>
                <div className="text-[clamp(3vw,7vh,3.5vw)] font-graphik leading-tight">
                  <CountingAnimation start={inView} target={data.statistics[4].statisticValue} />
                </div>
                <div className="text-[clamp(0.75vw,2vh,1vw)] font-roboto leading-tight text-black">{data.statistics[4].statisticName}</div>
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
      id: 10,
      content: (
        <div className="h-full flex items-center">
          <PartnersMarquee
            partners={data.partners}
            durationSec={40}     // slower loop
            logoHeightVh={8}     // logo height
            gap="5vw"            // spacing between logos
            edgeFadeVw={8}       // edge fade width; set 0 to disable
            fadeBg="#F9F7F2"     // your page background for the fades
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
  ];

  return (
    <>
      <Header />
      <main className="bg-[#F9F7F2]">
        {isMobileScreen ? (
          // MOBILE LAYOUT
          <div className="p-[2vh] bg-[#F9F7F2]">
            <div className="grid grid-cols-4 gap-[2vh] auto-rows-[5vh]">
              {/* Row 1: Main Title (col 1) */}
              <div className="col-span-1 row-span-1 flex items-center">
                <FadeInOnVisible>
                  <MainTitleAnimation
                    text={data.title}
                    typeSpeed={60}
                    delay={500}
                    className="text-[6vw] font-graphik leading-tight"
                  />
                </FadeInOnVisible>
              </div>

              {/* Row 1-3: Subheading (col 3-4) */}
              <div className="col-span-1"></div>
              <div className="col-span-2 row-span-3 flex items-center">
                <FadeInOnVisible>
                  <div className="prose max-w-none text-[4vw] font-bold leading-tight">
                    <HighlightText value={data.subheading} />
                  </div>
                </FadeInOnVisible>
              </div>

              {/* Row 2: Empty (col 1-2) */}
              <div className="col-span-2"></div>

              {/* Row 3-4: Corporate Partners Statistics (col 1-2) */}
              <div className="col-span-2 row-span-2 flex items-end">
                <div className="h-full flex flex-col justify-end gap-[2vh]">
                  <FadeInOnVisible>
                    {(inView) => (
                      <>
                        <div className="text-[8vw] font-graphik leading-tight">
                          <CountingAnimation start={inView} target={data.statistics[0].statisticValue} />
                        </div>
                        <div className="text-[3vw] font-roboto leading-tight text-black">{data.statistics[0].statisticName}</div>
                      </>
                    )}
                  </FadeInOnVisible>
                </div>
              </div>

              {/* Row 4: Empty (col 3-4) */}
              <div className="col-span-2"></div>

              {/* Row 5-6: Game-changing Opportunities (col 1-2) */}
              <div className="col-span-2 row-span-2 flex items-end">
                <div className="h-full flex flex-col justify-end gap-[2vh]">
                  <FadeInOnVisible>
                    {(inView) => (
                      <>
                        <div className="text-[8vw] font-graphik leading-tight">
                          <CountingAnimation start={inView} target={data.statistics[1].statisticValue} />
                        </div>
                        <div className="text-[3vw] font-roboto leading-tight text-black">{data.statistics[1].statisticName}</div>
                      </>
                    )}
                  </FadeInOnVisible>
                </div>
              </div>

              {/* Row 5-6: Value Propositions (col 3-4) */}
              <div className="col-span-2 row-span-2 flex items-end">
                <div className="h-full flex flex-col justify-end gap-[2vh]">
                  <FadeInOnVisible>
                    {(inView) => (
                      <>
                        <div className="text-[8vw] font-graphik leading-tight">
                          <CountingAnimation start={inView} target={data.statistics[2].statisticValue} />
                        </div>
                        <div className="text-[3vw] font-roboto leading-tight text-black">{data.statistics[2].statisticName}</div>
                      </>
                    )}
                  </FadeInOnVisible>
                </div>
              </div>

              {/* Row 7-8: Investment Cases (col 1-2) */}
              <div className="col-span-2 row-span-2 flex items-end">
                <div className="h-full flex flex-col justify-end gap-[2vh]">
                  <FadeInOnVisible>
                    {(inView) => (
                      <>
                        <div className="text-[8vw] font-graphik leading-tight">
                          <CountingAnimation start={inView} target={data.statistics[3].statisticValue} />
                        </div>
                        <div className="text-[3vw] font-roboto leading-tight text-black">{data.statistics[3].statisticName}</div>
                      </>
                    )}
                  </FadeInOnVisible>
                </div>
              </div>

              {/* Row 7-8: New Ventures in Commercialisation (col 3-4) */}
              <div className="col-span-2 row-span-2 flex items-end">
                <div className="h-full flex flex-col justify-end gap-[2vh]">
                  <FadeInOnVisible>
                    {(inView) => (
                      <>
                        <div className="text-[8vw] font-graphik leading-tight">
                          <CountingAnimation start={inView} target={data.statistics[4].statisticValue} />
                        </div>
                        <div className="text-[3vw] font-roboto leading-tight text-black">{data.statistics[4].statisticName}</div>
                      </>
                    )}
                  </FadeInOnVisible>
                </div>
              </div>

              {/* Row 9-11: Testimonials Carousel (placeholder) */}
              <div className="col-span-4 row-span-3 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[3.5vw]">Testimonials carousel - coming soon</p>
                </div>
              </div>

              {/* Row 12: Empty */}
              <div className="col-span-4"></div>

              {/* Row 13: Partners Carousel */}
              <div className="col-span-4 row-span-1 flex items-center">
                <div className="h-full w-full flex items-center">
                  <PartnersMarquee
                    partners={data.partners}
                    durationSec={25} // Faster for mobile performance
                    logoHeightVh={5} // Optimized height for mobile
                    gap="6vw" // Balanced gap for mobile
                    edgeFadeVw={8} // Smaller fade for mobile
                    fadeBg="#F9F7F2"
                    direction="left"
                  />
                </div>
              </div>

              {/* Row 14: Empty */}
              <div className="col-span-4"></div>
            </div>

            {/* Row 15+: Accordion Section (placeholder) */}
            <div className="mt-[4vh]">
              <div className="text-center mb-[4vh]">
                <p className="text-[3.5vw]">Accordion section - coming soon</p>
              </div>
              <FadeInOnVisible>
                <OurWorkAccordion data={data} />
              </FadeInOnVisible>
            </div>

            {/* Back to Top Button */}
            <div className="grid grid-cols-4 gap-[2vh] mt-[4vh]">
              <div className="col-start-4 col-span-1 flex justify-end items-center mt-2 cursor-pointer" onClick={handleBackToTop}>
                <span className="underline text-[2vh] flex items-center gap-1">Back to top
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ) : (
          // DESKTOP LAYOUT (existing)
          <div className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2] overflow-visible">
            <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh] overflow-visible">
              {items.map((item) => (
                <div key={item.id} className={`${getGridClasses(item)} overflow-visible`}>
                  {item.content}
                </div>
              ))}
            </div>
          </div>
        )}
        <FadeInOnVisible>
          <OurWorkAccordion data={data} />
        </FadeInOnVisible>
      </main>
      <Footer />
    </>
  );
}
