'use client';

import React, { useEffect, useState, Suspense } from "react";
import Header from '@/components/header';
import Footer from '@/components/footer';
import { client } from '@/sanity/lib/client';
import { ourWorkQuery } from '@/sanity/lib/queries';
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

function OurWorkContent() {
  const [data, setData] = useState<OurWorkContent | null>(null);

  useEffect(() => {
    client.fetch<OurWorkContent>(ourWorkQuery).then((res) => {
      setData(res);
    });
  }, []);

  if (!data) return null;

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
        <div className="h-full flex flex-col justify-end gap-[2vh]">
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
        <div className="h-full flex flex-col justify-end gap-[2vh]">
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
        <div className="h-full flex flex-col justify-end gap-[2vh]">
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
        <div className="h-full flex flex-col justify-end gap-[2vh]">
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
        <div className="h-full flex flex-col justify-end gap-[2vh]">
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
          <OurWorkAccordion data={data} />
        </FadeInOnVisible>
      </main>
      <Footer />
    </>
  );
}

export default function OurWorkPage() {
  return (
    <Suspense fallback={null}>
      <OurWorkContent />
    </Suspense>
  );
}
