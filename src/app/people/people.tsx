'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ResponsiveGridCarousel from '@/components/ResponsiveGridCarousel';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';
import { PortableTextBlock } from 'sanity';

type PeoplePageContent = {
  title: string;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
  };
  pageHeader: {
    mainTitle: string;
    subheading?: string;
    regularText?: PortableTextBlock[]; // Changed to any for portable text
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
      text: PortableTextBlock[]; // Changed from string to PortableTextBlock[]
    };
    rightSection?: {
      heading: string;
      text: PortableTextBlock[]; // Changed from string to PortableTextBlock[]
    };
    sideText?: PortableTextBlock[]; // Changed to any for portable text
    leftSection2?: {
      heading: string;
      text: PortableTextBlock[]; // Changed from string to PortableTextBlock[]
    };
    rightSection2?: {
      heading: string;
      text: PortableTextBlock[]; // Changed from string to PortableTextBlock[]
    };
    whyJoinUsSection?: {
      mainHeading: string;
      reasons: Array<{
        heading: string;
        text: PortableTextBlock[]; // Changed to PortableTextBlock[] for portable text
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

// Portable text components for styling
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-inherit leading-tight">{children}</p>,
    h1: ({ children }) => <h1 className="text-inherit font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="text-inherit font-bold">{children}</h2>,
    h3: ({ children }) => <h3 className="text-inherit font-bold">{children}</h3>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <u className="underline">{children}</u>,
    link: ({ children, value }) => (
      <a href={value?.href} className="underline hover:no-underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-4">{children}</ol>,
  },
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
  const [isMobile, setIsMobile] = useState(false);

  // Mobile check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isMobile) {
    return (
      <>
        <Header />
        <main className="p-[2vh] bg-[#F9F7F2]">
          <div className="grid grid-cols-4 gap-y-2 auto-rows-[12.5vh]">
            {/* Row 1: Main heading (cols 1-2) */}
            <div className="col-span-2 row-span-1 flex items-end justify-start">
              <FadeInOnVisible>
                <MainTitleAnimation 
                  text={data.pageHeader.mainTitle}
                  typeSpeed={60}
                  delay={500}
                  className="text-[4vh] font-bold leading-tight"
                />
              </FadeInOnVisible>
            </div>
            <div className="col-span-2 row-span-1"></div>

            {/* Row 2: Sub heading (cols 3-4) */}
            <div className="col-span-2 row-span-1"></div>
            <div className="col-span-2 row-span-1 flex items-end justify-start">
              <FadeInOnVisible>
                <h2 className="text-[2.5vh] font-bold leading-tight">
                  {data.pageHeader.subheading}
                </h2>
              </FadeInOnVisible>
            </div>

            {/* Row 3-4: Image (cols 1-4) */}
            <div className="col-span-4 row-span-2 flex items-center justify-center">
              <FadeInOnVisible>
                <img
                  src={data.mainImage ? urlFor(data.mainImage.asset).url() : '/placeholder-image.png'}
                  alt={data.mainImage?.alt || 'People'}
                  className="w-full h-full object-cover"
                />
              </FadeInOnVisible>
            </div>

            {/* Row 5-8: Regular text (cols 1-4) */}
            <div className="col-span-4 row-span-4 flex items-start justify-start">
              <FadeInOnVisible>
                <div className="text-[2vh] leading-tight text-gray-700">
                  {data.pageHeader.regularText && (
                    <PortableText value={data.pageHeader.regularText} components={portableTextComponents} />
                  )}
                </div>
              </FadeInOnVisible>
            </div>

            {/* Row 9-12: Subheading 1 + Side text (cols 2-4) */}
            <div className="col-span-1 row-span-4"></div>
            <div className="col-span-3 row-span-4 flex flex-col items-start justify-start gap-[2vh]">
              <FadeInOnVisible>
                <h3 className="text-[2.5vh] font-bold leading-tight">
                  {data.sections.subheading1}
                </h3>
              </FadeInOnVisible>
              <FadeInOnVisible>
                <div className="text-[1.8vh] leading-tight text-gray-700">
                  {data.sections.sideText && (
                    <PortableText value={data.sections.sideText} components={portableTextComponents} />
                  )}
                </div>
              </FadeInOnVisible>
            </div>

            {/* Row 13-15: Left section from row 7 (cols 1-4) */}
            <div className="col-span-4 row-span-3 flex flex-col items-start justify-start gap-[1vh]">
              <FadeInOnVisible>
                <h4 className="text-[2vh] font-bold leading-tight mb-[1.5vh]">
                  {data.sections.leftSection?.heading}
                </h4>
                <p className="text-[1.6vh] leading-tight text-gray-700">
                  {data.sections.leftSection?.text && (
                    <PortableText value={data.sections.leftSection.text} components={portableTextComponents} />
                  )}
                </p>
              </FadeInOnVisible>
            </div>

            {/* Row 16-18: Right section from row 7 (cols 1-4) */}
            <div className="col-span-4 row-span-3 flex flex-col items-start justify-start gap-[1vh]">
              <FadeInOnVisible>
                <h4 className="text-[2vh] font-bold leading-tight mb-[1.5vh]">
                  {data.sections.rightSection?.heading}
                </h4>
                <p className="text-[1.6vh] leading-tight text-gray-700">
                  {data.sections.rightSection?.text && (
                    <PortableText value={data.sections.rightSection.text} components={portableTextComponents} />
                  )}
                </p>
              </FadeInOnVisible>
            </div>

            {/* Row 19-21: Left section 2 from row 8 (cols 1-4) */}
            <div className="col-span-4 row-span-3 flex flex-col items-start justify-start gap-[1vh]">
              <FadeInOnVisible>
                <h4 className="text-[2vh] font-bold leading-tight mb-[1.5vh]">
                  {data.sections.leftSection2?.heading}
                </h4>
                <p className="text-[1.6vh] leading-tight text-gray-700">
                  {data.sections.leftSection2?.text && (
                    <PortableText value={data.sections.leftSection2.text} components={portableTextComponents} />
                  )}
                </p>
              </FadeInOnVisible>
            </div>

            {/* Row 19-21: right section 2 from row 8 (cols 1-4) */}
            <div className="col-span-4 row-span-3 flex flex-col items-start justify-start gap-[1vh]">
              <FadeInOnVisible>
                <h4 className="text-[2vh] font-bold leading-tight mb-[1.5vh]">
                  {data.sections.rightSection2?.heading}
                </h4>
                <p className="text-[1.6vh] leading-tight text-gray-700">
                  {data.sections.rightSection2?.text && (
                    <PortableText value={data.sections.rightSection2.text} components={portableTextComponents} />
                  )}
                </p>
              </FadeInOnVisible>
            </div>

            {/* Row 22: Empty */}
            <div className="col-span-4 row-span-1"></div>

            {/* Row 23: Why join us main heading (cols 1-4) */}
            <div className="col-span-2 row-span-1 flex items-end justify-start">
              <FadeInOnVisible>
                <MainTitleAnimation 
                  text={data.sections.whyJoinUsSection?.mainHeading || "Why Join Us"}
                  typeSpeed={60}
                  delay={1500}
                  className="text-[4vh] font-bold leading-tight"
                />
              </FadeInOnVisible>
            </div>

            {/* Row 24: Empty */}
            <div className="col-span-4 row-span-1"></div>

            {/* Row 25-26: Reason 1 (cols 2-4) */}
            <div className="col-span-1 row-span-2"></div>
            <div className="col-span-3 row-span-2 flex flex-col items-start justify-start gap-[1vh]">
              <FadeInOnVisible>
                <h5 className="text-[2vh] font-bold leading-tight mb-[1.5vh]">
                  {data.sections.whyJoinUsSection?.reasons[0]?.heading}
                </h5>
                <div className="text-[1.6vh] leading-tight text-gray-700">
                  {data.sections.whyJoinUsSection?.reasons[0]?.text && (
                    <PortableText value={data.sections.whyJoinUsSection.reasons[0].text} components={portableTextComponents} />
                  )}
                </div>
              </FadeInOnVisible>
            </div>

            {/* Row 27-28: Reason 2 (cols 2-4) */}
            <div className="col-span-1 row-span-2"></div>
            <div className="col-span-3 row-span-2 flex flex-col items-start justify-start gap-[1vh]">
              <FadeInOnVisible>
                <h5 className="text-[2vh] font-bold leading-tight mb-[1.5vh]">
                  {data.sections.whyJoinUsSection?.reasons[1]?.heading}
                </h5>
                <div className="text-[1.6vh] leading-tight text-gray-700">
                  {data.sections.whyJoinUsSection?.reasons[1]?.text && (
                    <PortableText value={data.sections.whyJoinUsSection.reasons[1].text} components={portableTextComponents} />
                  )}
                </div>
              </FadeInOnVisible>
            </div>

            {/* Row 29-30: Reason 3 (cols 2-4) */}
            <div className="col-span-1 row-span-2"></div>
            <div className="col-span-3 row-span-2 flex flex-col items-start justify-start gap-[1vh]">
              <FadeInOnVisible>
                <h5 className="text-[2vh] font-bold leading-tight mb-[1.5vh]">
                  {data.sections.whyJoinUsSection?.reasons[2]?.heading}
                </h5>
                <div className="text-[1.6vh] leading-tight text-gray-700">
                  {data.sections.whyJoinUsSection?.reasons[2]?.text && (
                    <PortableText value={data.sections.whyJoinUsSection.reasons[2].text} components={portableTextComponents} />
                  )}
                </div>
              </FadeInOnVisible>
            </div>

            {/* Row 31-32: Reason 4 (cols 2-4) */}
            <div className="col-span-1 row-span-2"></div>
            <div className="col-span-3 row-span-2 flex flex-col items-start justify-start gap-[1vh]">
              <FadeInOnVisible>
                <h5 className="text-[2vh] font-bold leading-tight mb-[1.5vh]">
                  {data.sections.whyJoinUsSection?.reasons[3]?.heading}
                </h5>
                <div className="text-[1.6vh] leading-tight text-gray-700">
                  {data.sections.whyJoinUsSection?.reasons[3]?.text && (
                    <PortableText value={data.sections.whyJoinUsSection.reasons[3].text} components={portableTextComponents} />
                  )}
                </div>
              </FadeInOnVisible>
            </div>

            {/* Row 33: Empty */}
            <div className="col-span-4 row-span-1"></div>

            {/* Row 34: Carousel heading (col 1) */}
            <div className="col-span-1 row-span-1 flex items-end justify-start">
              <FadeInOnVisible>
                <h3 className="text-[2vh] font-bold leading-tight">
                  {data.sections.carouselHeading}
                </h3>
              </FadeInOnVisible>
            </div>
            <div className="col-span-3 row-span-1"></div>

            {/* Row 35-46: Carousel (cols 1-4) */}
            <div className="col-span-4 row-span-12 flex flex-col items-start justify-start gap-[2vh]">
              <FadeInOnVisible>
                <div className="w-full h-3/4">
                  <ResponsiveGridCarousel items={sampleCarouselItems} />
                </div>
                {/* Carousel sidebar */}
                <div className="w-full h-1/4 flex flex-col justify-start">
                  <h6 className="text-[1.8vh] font-bold leading-tight mb-[1vh]">
                    {data.sections.carouselSidebar?.heading}
                  </h6>
                  <p className="text-[1.5vh] leading-tight text-gray-700 mb-[1vh]">
                    {data.sections.carouselSidebar?.text}
                  </p>
                  {data.sections.carouselSidebar?.linkText && (
                    <a 
                      href="mailto:careers@futureworld.org?subject=I want to work at Futureworld"
                      className="text-[1.5vh] underline hover:no-underline"
                    >
                      {data.sections.carouselSidebar.linkText}
                    </a>
                  )}
                </div>
              </FadeInOnVisible>
            </div>

            {/* Row 47: Back to top button (col 4) */}
            <div className="col-span-3 row-span-1"></div>
            <div className="col-span-1 row-span-1 flex justify-end items-center cursor-pointer" onClick={handleBackToTop}>
              <FadeInOnVisible>
                <span className="underline text-[2vh] flex items-center gap-1">Back to top
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                </span>
              </FadeInOnVisible>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Desktop layout (existing code with PortableText updates)
  const gridItems: GridItem[] = [
    // ROW 1: Header
    {
      id: 1,
      content: (
        <FadeInOnVisible>
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
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    {
      id: 2,
      content: (
        <FadeInOnVisible>
          <div className="h-full w-full flex items-end justify-start">
            <p className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[3.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] font-bold">
              {data.pageHeader.subheading}
            </p>
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    {
      id: 3,
      content: (
        <FadeInOnVisible>
          <div className="h-full w-full flex items-start justify-start">
            <div className="text-[1.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh]">
              {data.pageHeader.regularText && (
                <PortableText value={data.pageHeader.regularText} components={portableTextComponents} />
              )}
            </div>
          </div>
        </FadeInOnVisible>
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
        <FadeInOnVisible>
          <div className="h-full w-full overflow-hidden">
            <img
              src={data.mainImage ? urlFor(data.mainImage.asset).url() : '/placeholder-image.png'}
              alt={data.mainImage?.alt || 'People'}
              className="w-full h-full object-cover"
            />
          </div>
        </FadeInOnVisible>
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
        <FadeInOnVisible>
          <div className="h-full w-full flex items-end justify-start">
            <h2 className="text-[2.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-semibold">
              {data.sections.subheading1}
            </h2>
          </div>
        </FadeInOnVisible>
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
        <FadeInOnVisible>
          <div className="h-full w-full flex items-start justify-end">
            <h3 className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] font-semibold text-right">
              {data.sections.leftSection?.heading}
            </h3>
          </div>
        </FadeInOnVisible>
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
        <FadeInOnVisible>
          <div className="h-full w-full flex items-start justify-start">
            <div className="text-[1.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh]">
              {data.sections.leftSection?.text && (
                <PortableText value={data.sections.leftSection.text} components={portableTextComponents} />
              )}
            </div>
          </div>
        </FadeInOnVisible>
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
        <FadeInOnVisible>
          <div className="h-full w-full flex items-start justify-end">
            <h3 className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] font-semibold text-right">
              {data.sections.rightSection?.heading}
            </h3>
          </div>
        </FadeInOnVisible>
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
        <FadeInOnVisible>
          <div className="h-full w-full flex items-start justify-start">
            <div className="text-[1.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh]">
              {data.sections.rightSection?.text && (
                <PortableText value={data.sections.rightSection.text} components={portableTextComponents} />
              )}
            </div>
          </div>
        </FadeInOnVisible>
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
        <FadeInOnVisible>
          <div className="h-full w-full flex items-start justify-start">
            <div className="text-[1.3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.3vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.3vh]">
              {data.sections.sideText && (
                <PortableText value={data.sections.sideText} components={portableTextComponents} />
              )}
            </div>
          </div>
        </FadeInOnVisible>
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
        <FadeInOnVisible>
          <div className="h-full w-full flex items-start justify-end">
            <h3 className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] font-semibold text-right">
              {data.sections.leftSection2?.heading}
            </h3>
          </div>
        </FadeInOnVisible>
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
        <FadeInOnVisible>
          <div className="h-full w-full flex items-start justify-start">
            <div className="text-[1.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh]">
              {data.sections.leftSection2?.text && (
                <PortableText value={data.sections.leftSection2.text} components={portableTextComponents} />
              )}
            </div>
          </div>
        </FadeInOnVisible>
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
        <FadeInOnVisible>
          <div className="h-full w-full flex items-start justify-end">
            <h3 className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] font-semibold text-right">
              {data.sections.rightSection2?.heading}
            </h3>
          </div>
        </FadeInOnVisible>
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
        <FadeInOnVisible>
          <div className="h-full w-full flex items-start justify-start">
            <div className="text-[1.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh]">
              {data.sections.rightSection2?.text && (
                <PortableText value={data.sections.rightSection2.text} components={portableTextComponents} />
              )}
            </div>
          </div>
        </FadeInOnVisible>
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
        <FadeInOnVisible>
          <div className="h-full w-full flex items-start justify-start">
            <h2 className="text-[2.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-semibold">
              {data.sections.whyJoinUsSection?.mainHeading}
            </h2>
          </div>
        </FadeInOnVisible>
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
        <FadeInOnVisible>
          <div className="h-full w-full flex flex-col items-start justify-start">
            <h3 className="text-[1.8vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.8vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] font-semibold mb-2">
              {reason.heading}
            </h3>
            <div className="text-[1.3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.3vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.3vh]">
              {reason.text && (
                <PortableText value={reason.text} components={portableTextComponents} />
              )}
            </div>
          </div>
        </FadeInOnVisible>
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
        <FadeInOnVisible>
          <div className="h-full w-full flex items-end justify-start">
            <h2 className="text-[2.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-semibold">
              {data.sections.carouselHeading}
            </h2>
          </div>
        </FadeInOnVisible>
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
        <FadeInOnVisible>
          <div className="h-full w-full">
            <ResponsiveGridCarousel items={sampleCarouselItems} />
          </div>
        </FadeInOnVisible>
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
        <FadeInOnVisible>
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
        </FadeInOnVisible>
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