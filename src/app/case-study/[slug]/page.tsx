'use client';

import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import React, { useState, useEffect } from 'react';
import { PortableText, PortableTextComponents, PortableTextBlock } from '@portabletext/react';
import FadeInOnVisible from '@/components/FadeInOnVisible';
// Custom PortableText components for better list and block rendering
const portableTextComponents: PortableTextComponents = {
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 text-base">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 text-base">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
  block: {
    normal: ({ children }) => <p className="mb-2 text-base">{children}</p>,
  },
};

// Type for case study data
interface CaseStudyData {
  title: string;
  summary: PortableTextBlock[];
  subheading: string;
  heading: string;
  abstract: string;
  mainImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  concept: PortableTextBlock[];
  methodology: PortableTextBlock[];
  impact: PortableTextBlock[];
  transformation: PortableTextBlock[];
  conclusion: PortableTextBlock[];
}

// Type for grid items
interface GridItem {
  id: number;
  content: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  mobileColSpan?: number;
  mobileRowSpan?: number;
  landscapeColSpan?: number;
  landscapeRowSpan?: number;
}

// Custom hook to detect responsive layout
const useResponsiveLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Mobile: not tablet landscape and not desktop
      const isTabletLandscape = window.matchMedia('(max-height: 600px) and (max-width: 768px)').matches;
      const isDesktop = window.matchMedia('(min-width: 768px) and (min-aspect-ratio: 1/1)').matches;
      setIsMobile(!isTabletLandscape && !isDesktop);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile };
};

const getGridClasses = (item: GridItem) => {
  const baseClasses = ['bg-[#F9F7F2]', 'flex', 'flex-col', 'relative'];

  // Mobile
  if (item.mobileColSpan === 0 || item.mobileRowSpan === 0) {
    baseClasses.push('block', '[@media(max-width:767px)]:hidden');
  } else {
    baseClasses.push(`col-span-${item.mobileColSpan || item.colSpan || 1}`);
    if (item.mobileRowSpan && item.mobileRowSpan > 0) {
      baseClasses.push(`row-span-${item.mobileRowSpan}`);
    }
  }

  // Landscape
  if (item.landscapeColSpan === 0 || item.landscapeRowSpan === 0) {
    baseClasses.push('[@media(max-height:600px)_and_(max-width:768px)]:hidden');
  } else {
    baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:col-span-${item.landscapeColSpan || item.colSpan || 1}`);
    if (item.landscapeRowSpan && item.landscapeRowSpan > 0) {
      baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:row-span-${item.landscapeRowSpan}`);
    }
  }

  // Desktop
  if (item.colSpan === 0 || item.rowSpan === 0) {
    baseClasses.push('[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:hidden');
  } else {
    baseClasses.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-${item.colSpan || 1}`);
    if (item.rowSpan && item.rowSpan > 0) {
      baseClasses.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-${item.rowSpan}`);
    }
  }

  return baseClasses.join(' ');
};

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { isMobile } = useResponsiveLayout();
  const [data, setData] = useState<CaseStudyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const awaitedParams = await params;
      
      const caseStudyData = await client.fetch(
        groq`*[_type == "caseStudy" && slug.current == $slug][0]{
          title,
          summary,
          subheading,
          heading,
          abstract,
          mainImage,
          concept,
          methodology,
          impact,
          transformation,
          conclusion
        }`,
        { slug: awaitedParams.slug }
      );
      
      setData(caseStudyData);
      setLoading(false);
    };

    fetchData();
  }, [params]);

  // Back to top function
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <div>Loading...</div>;
  if (!data) return <div className="text-red-500">Case study not found.</div>;

  const items: GridItem[] = [
    // Row 1: Title (cols 1-4)
    {
      id: 1,
      content: <h1 className="text-9xl font-bold">{data.title}</h1>,
      colSpan: 4,
      rowSpan: 1,
      mobileColSpan: 4,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    // Row 1: Subheading (cols 5-6, right aligned)
    {
      id: 2,
      content: <span className="text-lg font-medium text-right w-full flex justify-end items-center h-full">{data.subheading}</span>,
      colSpan: 2,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 2,
      landscapeRowSpan: 1,
    },
    // Row 2: Blank (cols 1-6)
    {
      id: 3,
      content: <div></div>,
      colSpan: 6,
      rowSpan: 1,
      mobileColSpan: 6,
      mobileRowSpan: 1,
      landscapeColSpan: 6,
      landscapeRowSpan: 1,
    },
    // Row 3: Heading (cols 1-3)
    {
      id: 4,
      content: <h2 className="text-2xl font-semibold">{data.heading}</h2>,
      colSpan: 3,
      rowSpan: 1,
      mobileColSpan: 3,
      mobileRowSpan: 1,
      landscapeColSpan: 3,
      landscapeRowSpan: 1,
    },
    // Row 3: Empty gap (col 4)
    {
      id: 21,
      content: <div></div>,
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 1,
      mobileRowSpan: 1,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    },
    // Row 3: Abstract (cols 5-6)
    {
      id: 5,
      content: <p className="text-base">{data.abstract}</p>,
      colSpan: 2,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 2,
      landscapeRowSpan: 1,
    },
    // Rows 4-5: Main Image (cols 1-6)
    ...(data.mainImage ? [{
      id: 6,
      content: (
        <div className="w-full h-full flex justify-center items-center">
          <Image
            src={urlFor(data.mainImage).width(2560).url()}
            alt={data.title}
            width={2560}
            height={1440}
            className="object-cover w-full h-full max-h-[40vh]"
          />
        </div>
      ),
      colSpan: 6,
      rowSpan: 2,
      mobileColSpan: 6,
      mobileRowSpan: 2,
      landscapeColSpan: 6,
      landscapeRowSpan: 2,
    }] : []),
    // Row 6: Section Headers (cols 1-5), plus empty col 6
    {
      id: 7,
      content: <h3 className="font-bold mb-2">The Concept</h3>,
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 1,
      mobileRowSpan: 1,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    },
    {
      id: 8,
      content: <h3 className="font-bold mb-2">Methodology and Execution</h3>,
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 1,
      mobileRowSpan: 1,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    },
    {
      id: 9,
      content: <h3 className="font-bold mb-2">Impact and Outcome</h3>,
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 1,
      mobileRowSpan: 1,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    },
    {
      id: 10,
      content: <h3 className="font-bold mb-2">Transformation Potential</h3>,
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 1,
      mobileRowSpan: 1,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    },
    {
      id: 11,
      content: <h3 className="font-bold mb-2">Conclusion</h3>,
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 1,
      mobileRowSpan: 1,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    },
    // Row 6: Empty col 6
    {
      id: 22,
      content: <div></div>,
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 1,
      mobileRowSpan: 1,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    },
    // Rows 7-10: Section Texts (cols 1-5), plus empty col 6
    {
      id: 12,
      content: <PortableText value={data.concept} components={portableTextComponents} />,
      colSpan: 1,
      rowSpan: 4,
      mobileColSpan: 1,
      mobileRowSpan: 4,
      landscapeColSpan: 1,
      landscapeRowSpan: 4,
    },
    {
      id: 13,
      content: <PortableText value={data.methodology} components={portableTextComponents} />,
      colSpan: 1,
      rowSpan: 4,
      mobileColSpan: 1,
      mobileRowSpan: 4,
      landscapeColSpan: 1,
      landscapeRowSpan: 4,
    },
    {
      id: 14,
      content: <PortableText value={data.impact} components={portableTextComponents} />,
      colSpan: 1,
      rowSpan: 4,
      mobileColSpan: 1,
      mobileRowSpan: 4,
      landscapeColSpan: 1,
      landscapeRowSpan: 4,
    },
    {
      id: 15,
      content: <PortableText value={data.transformation} components={portableTextComponents} />,
      colSpan: 1,
      rowSpan: 4,
      mobileColSpan: 1,
      mobileRowSpan: 4,
      landscapeColSpan: 1,
      landscapeRowSpan: 4,
    },
    // Conclusion content under Conclusion heading (column 5, rows 7-10)
    {
      id: 16,
      content: <PortableText value={data.conclusion} components={portableTextComponents} />,
      colSpan: 1,
      rowSpan: 4,
      mobileColSpan: 1,
      mobileRowSpan: 4,
      landscapeColSpan: 1,
      landscapeRowSpan: 4,
    },
    // Rows 7-10: Empty col 6
    {
      id: 23,
      content: <div></div>,
      colSpan: 1,
      rowSpan: 4,
      mobileColSpan: 1,
      mobileRowSpan: 4,
      landscapeColSpan: 1,
      landscapeRowSpan: 4,
    },
  ];

  return (
    <div className="">
      {isMobile ? (
        /* Mobile Layout - Column-based layout */
        <div className="grid grid-cols-4 gap-0" style={{ gridAutoRows: 'minmax(10vh, max-content)' }}>
          {/* Row 1: Main Title */}
          <div className="col-span-4 row-start-1 p-4 bg-[#F9F7F2] flex items-center">
            <FadeInOnVisible>
              <h1 className="text-[8vh] font-bold leading-none">{data.title}</h1>
            </FadeInOnVisible>
          </div>

          {/* Row 2: Empty */}
          <div className="col-span-4 row-start-2 h-[5vh] bg-[#F9F7F2]"></div>

          {/* Row 3: Subheading (Col 2-4) */}
          <div className="col-span-1 row-start-3 bg-[#F9F7F2]"></div>
          <div className="col-start-2 col-span-3 row-start-3 p-4 bg-[#F9F7F2] flex justify-end items-center">
            <FadeInOnVisible>
              <span className="text-lg font-medium text-right w-full">{data.subheading}</span>
            </FadeInOnVisible>
          </div>

          {/* Row 4: Empty */}
          <div className="col-span-4 row-start-4 h-[5vh] bg-[#F9F7F2]"></div>

          {/* Row 5: Heading */}
          <div className="col-span-4 row-start-5 p-4 bg-[#F9F7F2]">
            <FadeInOnVisible>
              <h2 className="text-2xl font-semibold">{data.heading}</h2>
            </FadeInOnVisible>
          </div>

          {/* Row 6-9: Abstract (Col 1-4) */}
          <div className="col-span-4 row-start-6 row-span-4 p-4 bg-[#F9F7F2]">
            <FadeInOnVisible>
              <p className="text-base">{data.abstract}</p>
            </FadeInOnVisible>
          </div>

          {/* Row 10: Empty */}
          <div className="col-span-4 row-start-10 h-[5vh] bg-[#F9F7F2]"></div>

          {/* Row 11-12: Main Image (Col 1-4) */}
          {data.mainImage && (
            <div className="col-span-4 row-start-11 row-span-2 p-4 bg-[#F9F7F2]">
              <FadeInOnVisible>
                <div className="w-full h-full flex justify-center items-center">
                  <Image
                    src={urlFor(data.mainImage).width(2560).url()}
                    alt={data.title}
                    width={2560}
                    height={1440}
                    className="object-cover w-full h-full max-h-[40vh]"
                  />
                </div>
              </FadeInOnVisible>
            </div>
          )}

          {/* Row 13: Empty */}
          <div className="col-span-4 row-start-13 h-[5vh] bg-[#F9F7F2]"></div>

          {/* Row 14+: Section Texts with Headings */}
          <div className="col-span-4 row-start-14 p-4 bg-[#F9F7F2]">
            <FadeInOnVisible>
              <h3 className="font-bold mb-2">The Concept</h3>
              <PortableText value={data.concept} components={portableTextComponents} />
            </FadeInOnVisible>
          </div>

          <div className="col-span-4 row-start-15 p-4 bg-[#F9F7F2]">
            <FadeInOnVisible>
              <h3 className="font-bold mb-2">Methodology and Execution</h3>
              <PortableText value={data.methodology} components={portableTextComponents} />
            </FadeInOnVisible>
          </div>

          <div className="col-span-4 row-start-16 p-4 bg-[#F9F7F2]">
            <FadeInOnVisible>
              <h3 className="font-bold mb-2">Impact and Outcome</h3>
              <PortableText value={data.impact} components={portableTextComponents} />
            </FadeInOnVisible>
          </div>

          <div className="col-span-4 row-start-17 p-4 bg-[#F9F7F2]">
            <FadeInOnVisible>
              <h3 className="font-bold mb-2">Transformation Potential</h3>
              <PortableText value={data.transformation} components={portableTextComponents} />
            </FadeInOnVisible>
          </div>

          <div className="col-span-4 row-start-18 p-4 bg-[#F9F7F2]">
            <FadeInOnVisible>
              <h3 className="font-bold mb-2">Conclusion</h3>
              <PortableText value={data.conclusion} components={portableTextComponents} />
            </FadeInOnVisible>
          </div>

          {/* Back to Top Button */}
          <div className="col-start-3 col-span-2 row-start-19 flex justify-end items-center mt-2 cursor-pointer bg-[#F9F7F2] p-4" onClick={handleBackToTop}>
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
      ) : (
        /* Desktop Layout - Original Grid System with Animations */
        <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh]">
          {items.map((item) => (
            <div key={item.id} className={getGridClasses(item)}>
              <FadeInOnVisible>
                {item.content}
              </FadeInOnVisible>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
