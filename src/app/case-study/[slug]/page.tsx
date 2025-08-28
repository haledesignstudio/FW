'use client';

import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import React, { useState, useEffect } from 'react';
import { PortableText, PortableTextComponents, PortableTextBlock } from '@portabletext/react';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';

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
    // FIX: Add row-span for mobile
    if (item.mobileRowSpan && item.mobileRowSpan > 0) {
      baseClasses.push(`row-span-${item.mobileRowSpan}`);
    }
  }

  // Landscape
  if (item.landscapeColSpan === 0 || item.landscapeRowSpan === 0) {
    baseClasses.push('[@media(max-height:600px)_and_(max-width:768px)]:hidden');
  } else {
    baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:col-span-${item.landscapeColSpan || item.colSpan || 1}`);
    // FIX: Add row-span for landscape
    if (item.landscapeRowSpan && item.landscapeRowSpan > 0) {
      baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:row-span-${item.landscapeRowSpan}`);
    }
  }

  // Desktop
  if (item.colSpan === 0 || item.rowSpan === 0) {
    baseClasses.push('[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:hidden');
  } else {
    baseClasses.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-${item.colSpan || 1}`);
    // FIX: Add row-span for desktop
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

  // Modified items array - removing image and content sections (items 6, 12-16, 23)
  const items: GridItem[] = [
    // Row 1: Title (cols 1-4)
    {
      id: 1,
      content: <h1 className="dt-h1">{data.title}</h1>,
      colSpan: 4,
      rowSpan: 2,
      mobileColSpan: 4,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    // Row 1: Subheading (cols 5-6, right aligned)
    {
      id: 2,
      content: <span className="dt-body-lg text-right w-full flex justify-end items-center h-full text-balance">{data.subheading}</span>,
      colSpan: 2,
      rowSpan: 2,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 2,
      landscapeRowSpan: 1,
    },
    // Row 3: Heading (cols 1-3)
    {
      id: 4,
      content: <h2 className="dt-h3">{data.heading}</h2>,
      colSpan: 3,
      rowSpan: 2,
      mobileColSpan: 3,
      mobileRowSpan: 1,
      landscapeColSpan: 3,
      landscapeRowSpan: 1,
    },
    // Row 3: Empty gap (col 4)
    {
      id: 5,
      content: <div></div>,
      colSpan: 1,
      rowSpan: 2,
      mobileColSpan: 1,
      mobileRowSpan: 1,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    },
    // Row 3: Abstract (cols 5-6)
    {
      id: 6,
      content: <p className="dt-body-lg">{data.abstract}</p>,
      colSpan: 2,
      rowSpan: 2,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 2,
      landscapeRowSpan: 1,
    },
  ];

  return (
    <div className="">
      {isMobile ? (
        /* Mobile Layout - Column-based layout */
        <div className="grid grid-cols-4 gap-x-[4.53vw] gap-y-[2.09vh]" style={{ gridAutoRows: 'minmax(7.701vh, max-content)' }}>
          {/* Row 1: Main Title */}
          <div className="col-span-4 row-start-1 bg-[#F9F7F2] flex items-center">
            <FadeInOnVisible>
              <h1 className="dt-h1">{data.title}</h1>
            </FadeInOnVisible>
          </div>

          {/* Row 2: Empty */}
          <div className="col-span-4 row-start-2 bg-[#F9F7F2]"></div>

          {/* Row 3: Subheading (Col 2-4) */}
          <div className="col-span-1 row-start-3 bg-[#F9F7F2]"></div>

          <div className="col-start-2 col-span-3 row-start-3 bg-[#F9F7F2] text-right">
            <FadeInOnVisible>
              <span className="dt-body-lg">{data.subheading}</span>
            </FadeInOnVisible>
          </div>

          {/* Row 4: Empty */}
          <div className="col-span-4 row-start-4 h-[5vh] bg-[#F9F7F2]"></div>

          {/* Row 5: Heading */}
          <div className="col-span-4 row-start-5 bg-[#F9F7F2]">
            <FadeInOnVisible>
              <h2 className="dt-h3">{data.heading}</h2>
            </FadeInOnVisible>
          </div>

          {/* Row 6-9: Abstract (Col 1-4) */}
          <div className="col-span-4 row-start-6 row-span-4 bg-[#F9F7F2]">
            <FadeInOnVisible>
              <p className="dt-body-lg">{data.abstract}</p>
            </FadeInOnVisible>
          </div>

          {/* Row 10: Empty */}
          <div className="col-span-4 row-start-10 h-[5vh] bg-[#F9F7F2]"></div>

          {/* Row 11-12: Main Image (Col 1-4) */}
          {data.mainImage && (
            <div className="col-span-4 row-start-11 row-span-2 bg-[#F9F7F2]">
              <FadeInOnVisible className="w-full h-full flex justify-center items-center">
                <div className="w-full h-full flex justify-center items-center">
                  <Image
                    src={urlFor(data.mainImage).width(2560).url()}
                    alt={data.title}
                    width={2560}
                    height={1440}
                    className="object-cover w-full h-full max-h-[80vh]"
                  />
                </div>
              </FadeInOnVisible>
            </div>
          )}

          {/* Row 13: Empty */}
          <div className="col-span-4 row-start-13 h-[5vh] bg-[#F9F7F2]"></div>

          {/* Row 14+: Section Texts with Headings */}
          <div className="col-span-4 row-start-14 bg-[#F9F7F2]">
            <FadeInOnVisible>
              <h3 className="dt-h5 mb-[2vh]">The Concept</h3>
              <div className="dt-body-sm mb-[2vh]"><PortableText value={data.concept} components={portableTextComponents} /></div>
            </FadeInOnVisible>
          </div>

          <div className="col-span-4 row-start-15 bg-[#F9F7F2]">
            <FadeInOnVisible>
              <h3 className="dt-h5 mb-[2vh]">Methodology and Execution</h3>
              <div className="dt-body-sm mb-[2vh]"><PortableText value={data.methodology} components={portableTextComponents} /></div>
            </FadeInOnVisible>
          </div>

          <div className="col-span-4 row-start-16 bg-[#F9F7F2]">
            <FadeInOnVisible>
              <h3 className="dt-h5 mb-[2vh]">Impact and Outcome</h3>
              <div className="dt-body-sm mb-[2vh]"><PortableText value={data.impact} components={portableTextComponents} /></div>
            </FadeInOnVisible>
          </div>

          <div className="col-span-4 row-start-17 bg-[#F9F7F2]">
            <FadeInOnVisible>
              <h3 className="dt-h5 mb-[2vh]">Transformation Potential</h3>
              <div className="dt-body-sm mb-[2vh]"><PortableText value={data.transformation} components={portableTextComponents} /></div>
            </FadeInOnVisible>
          </div>

          <div className="col-span-4 row-start-18 bg-[#F9F7F2]">
            <FadeInOnVisible>
              <h3 className="dt-h5 mb-[2vh]">Conclusion</h3>
              <div className="dt-body-sm mb-[2vh]"><PortableText value={data.conclusion} components={portableTextComponents} /></div>

            </FadeInOnVisible>
          </div>

          {/* Back to Top Button */}
          <div className="col-start-3 col-span-2 row-start-19 flex justify-end items-center mt-2 cursor-pointer bg-[#F9F7F2] p-4" onClick={handleBackToTop}>
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
      ) : (
        /* Desktop Layout - Grid + Separate Content Sections */
        <>
          <div className="grid gap-[2vh] grid-cols-2 auto-rows-[12.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[21vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-x-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-y-[3.2vh]">
            {items.map((item) => (
              <div key={item.id} className={getGridClasses(item)}>
                <FadeInOnVisible>
                  {item.content}
                </FadeInOnVisible>
              </div>
            ))}
          </div>

          {/* Main Image Section */}
          {data.mainImage?.asset && (
            <div className="bg-[#F9F7F2]">
              <FadeInOnVisible className="w-full h-[50vh]">
                <Image
                  src={urlFor(data.mainImage.asset).url()}
                  alt={data.mainImage.alt || ''}
                  className="object-cover w-full h-full"
                  width={1920}
                  height={800}
                  priority={false}
                />
              </FadeInOnVisible>
            </div>
          )}

          {/* Content Sections */}
          <div className="bg-[#F9F7F2] mt-[3.2vh]">
            <div className="grid grid-cols-6 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-x-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-y-[3.2vh]">
              {/* The Concept */}
              <div className="col-span-1">
                <FadeInOnVisible>
                  <h3 className="dt-h5">The Concept</h3>
                  <div className="dt-body-sm mt-[6.4vh]">
                    <PortableText value={data.concept} components={portableTextComponents} />
                  </div>
                </FadeInOnVisible>
              </div>

              {/* Methodology and execution */}
              <div className="col-span-1">
                <FadeInOnVisible>
                  <h3 className="dt-h5">Methodology and execution</h3>
                  <div className="dt-body-sm mt-[6.4vh]">
                    <PortableText value={data.methodology} components={portableTextComponents} />
                  </div>
                </FadeInOnVisible>
              </div>

              {/* Impact and outcomes */}
              <div className="col-span-1">
                <FadeInOnVisible>
                  <h3 className="dt-h5">Impact and outcomes</h3>
                  <div className="dt-body-sm mt-[6.4vh]">
                    <PortableText value={data.impact} components={portableTextComponents} />
                  </div>
                </FadeInOnVisible>
              </div>

              {/* Transformational potential */}
              <div className="col-span-1">
                <FadeInOnVisible>
                  <h3 className="dt-h5">Transformational potential</h3>
                  <div className="dt-body-sm mt-[6.4vh]">
                    <PortableText value={data.transformation} components={portableTextComponents} />
                  </div>
                </FadeInOnVisible>
              </div>

              {/* Conclusion */}
              <div className="col-span-1">
                <FadeInOnVisible>
                  <h3 className="dt-h5">Conclusion</h3>
                  <div className="dt-body-sm mt-[6.4vh]">
                    <PortableText value={data.conclusion} components={portableTextComponents} />
                  </div>
                </FadeInOnVisible>
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}
