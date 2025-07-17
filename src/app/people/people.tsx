'use client';

import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ResponsiveGridCarousel from '@/components/ResponsiveGridCarousel';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import { urlFor } from '@/sanity/lib/image';

type PeoplePageContent = {
  title: string;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
  };
  pageHeader: {
    mainTitle: string;
    subheading?: string;
    regularText?: string;
  };
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  sections: {
    subheading1?: string;
    leftSection?: {
      heading: string;
      text: string;
    };
    rightSection?: {
      heading: string;
      text: string;
    };
    sideText?: string;
    leftSection2?: {
      heading: string;
      text: string;
    };
    rightSection2?: {
      heading: string;
      text: string;
    };
    whyJoinUsSection?: {
      mainHeading: string;
      reasons: Array<{
        heading: string;
        text: string;
      }>;
    };
    carouselHeading?: string;
    carouselSidebar?: {
      heading: string;
      text: string;
      linkText: string;
    };
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
  const baseClasses = ['bg-[#F9F7F2]', 'flex', 'flex-col'];

  // Mobile (default)
  if (item.mobileColSpan && item.mobileRowSpan) {
    baseClasses.push(`col-span-${item.mobileColSpan}`);
    baseClasses.push(`row-span-${item.mobileRowSpan}`);
  }

  // Landscape (max-height:600px and max-width:768px)
  if (item.landscapeColSpan && item.landscapeRowSpan) {
    baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:col-span-${item.landscapeColSpan}`);
    baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:row-span-${item.landscapeRowSpan}`);
  }

  // Desktop (min-width:768px and min-aspect-ratio:1/1)
  if (item.colSpan && item.rowSpan) {
    baseClasses.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-${item.colSpan}`);
    baseClasses.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-${item.rowSpan}`);
  }

  return baseClasses.join(' ');
};

// Sample carousel data - replace with actual data from CMS
const sampleCarouselItems = [
  {
    id: '1',
    image: '/placeholder-image.png',
    heading: 'Sample Project 1',
    body: 'Description of the first project',
    link: '/project-1'
  },
  {
    id: '2',
    image: '/placeholder-image.png',
    heading: 'Sample Project 2',
    body: 'Description of the second project',
    link: '/project-2'
  },
  {
    id: '3',
    image: '/placeholder-image.png',
    heading: 'Sample Project 3',
    body: 'Description of the third project',
    link: '/project-3'
  }
];

export default function People({ data }: { data: PeoplePageContent }) {
  const gridItems: GridItem[] = [
    // ROW 1: Header
    {
      id: 1,
      content: (
        <div className="h-full w-full flex items-start justify-start">
          <div className="w-full max-w-full">
            <MainTitleAnimation 
              text={data.pageHeader.mainTitle}
              typeSpeed={60}
              delay={500}
              className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[8vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight"
            />
          </div>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    {
      id: 2,
      content: (
        <div className="h-full w-full flex items-end justify-start">
          <p className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[3.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] font-bold">
            {data.pageHeader.subheading}
          </p>
        </div>
      ),
      colSpan: 3,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    {
      id: 3,
      content: (
        <div className="h-full w-full flex items-start justify-start">
          <p className="text-[1.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh]">
            {data.pageHeader.regularText}
          </p>
        </div>
      ),
      colSpan: 2,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    // ROWS 2-4: Main Image
    {
      id: 4,
      content: (
        <div className="h-full w-full overflow-hidden">
          <img
            src={data.mainImage ? urlFor(data.mainImage.asset).url() : '/placeholder-image.png'}
            alt={data.mainImage?.alt || 'People'}
            className="w-full h-full object-cover"
          />
        </div>
      ),
      colSpan: 6,
      rowSpan: 3,
      mobileColSpan: 2,
      mobileRowSpan: 3,
      landscapeColSpan: 4,
      landscapeRowSpan: 3,
    },
    // ROW 5: Subheading 1
    {
      id: 5,
      content: <div></div>,
      colSpan: 4,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    {
      id: 6,
      content: (
        <div className="h-full w-full flex items-end justify-start">
          <h2 className="text-[2.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-semibold">
            {data.sections.subheading1}
          </h2>
        </div>
      ),
      colSpan: 2,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    // ROW 6: Two sections + side text
    {
      id: 7,
      content: (
        <div className="h-full w-full flex items-start justify-end">
          <h3 className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] font-semibold text-right">
            {data.sections.leftSection?.heading}
          </h3>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    {
      id: 8,
      content: (
        <div className="h-full w-full flex items-start justify-start">
          <p className="text-[1.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh]">
            {data.sections.leftSection?.text}
          </p>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    {
      id: 9,
      content: (
        <div className="h-full w-full flex items-start justify-end">
          <h3 className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] font-semibold text-right">
            {data.sections.rightSection?.heading}
          </h3>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    {
      id: 10,
      content: (
        <div className="h-full w-full flex items-start justify-start">
          <p className="text-[1.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh]">
            {data.sections.rightSection?.text}
          </p>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    {
      id: 11,
      content: <div></div>,
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    {
      id: 12,
      content: (
        <div className="h-full w-full flex items-start justify-start">
          <p className="text-[1.3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.3vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.3vh]">
            {data.sections.sideText}
          </p>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    // ROW 7: Left and Right sections
    {
      id: 13,
      content: (
        <div className="h-full w-full flex items-start justify-end">
          <h3 className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] font-semibold text-right">
            {data.sections.leftSection2?.heading}
          </h3>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    {
      id: 14,
      content: (
        <div className="h-full w-full flex items-start justify-start">
          <p className="text-[1.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh]">
            {data.sections.leftSection2?.text}
          </p>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    {
      id: 15,
      content: (
        <div className="h-full w-full flex items-start justify-end">
          <h3 className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] font-semibold text-right">
            {data.sections.rightSection2?.heading}
          </h3>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    {
      id: 16,
      content: (
        <div className="h-full w-full flex items-start justify-start">
          <p className="text-[1.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh]">
            {data.sections.rightSection2?.text}
          </p>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    {
      id: 17,
      content: <div></div>,
      colSpan: 2,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    // ROW 8: Blank
    {
      id: 18,
      content: <div></div>,
      colSpan: 6,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    // ROW 9: Why Join Us Section
    {
      id: 19,
      content: (
        <div className="h-full w-full flex items-start justify-start">
          <h2 className="text-[2.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-semibold">
            {data.sections.whyJoinUsSection?.mainHeading}
          </h2>
        </div>
      ),
      colSpan: 2,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    // Why Join Us reasons (columns 3-6)
    ...(data.sections.whyJoinUsSection?.reasons?.slice(0, 4).map((reason, index) => ({
      id: 20 + index,
      content: (
        <div className="h-full w-full flex flex-col items-start justify-start">
          <h3 className="text-[1.8vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.8vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] font-semibold mb-2">
            {reason.heading}
          </h3>
          <p className="text-[1.3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.3vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.3vh]">
            {reason.text}
          </p>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    })) || []),
    // ROW 10: Carousel heading
    {
      id: 24,
      content: (
        <div className="h-full w-full flex items-end justify-start">
          <h2 className="text-[2.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-semibold">
            {data.sections.carouselHeading}
          </h2>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    {
      id: 25,
      content: <div></div>,
      colSpan: 5,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    // ROWS 11-14: Carousel
    {
      id: 26,
      content: (
        <div className="h-full w-full">
          <ResponsiveGridCarousel items={sampleCarouselItems} />
        </div>
      ),
      colSpan: 5,
      rowSpan: 4,
      mobileColSpan: 2,
      mobileRowSpan: 4,
      landscapeColSpan: 4,
      landscapeRowSpan: 4,
    },
    // ROW 11: Carousel sidebar
    {
      id: 27,
      content: (
        <div className="h-full w-full flex flex-col items-start justify-start">
          <h3 className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] font-semibold mb-2">
            {data.sections.carouselSidebar?.heading}
          </h3>
          <p className="text-[1.3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.3vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.3vh] mb-4">
            {data.sections.carouselSidebar?.text}
          </p>
          {data.sections.carouselSidebar?.linkText && (
            <a 
              href="mailto:careers@futureworld.org?subject=I want to work at Futureworld"
              className="text-[1.3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.3vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.3vh] underline hover:no-underline"
            >
              {data.sections.carouselSidebar.linkText}
            </a>
          )}
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    // Empty cells for carousel sidebar rows
    ...[28, 29, 30].map(id => ({
      id,
      content: <div></div>,
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    })),
  ];

  return (
    <>
      <Header />
      <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
        <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh]">
          {gridItems.map((item) => (
            <div
              key={item.id}
              className={getGridClasses(item)}
            >
              {item.content}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
