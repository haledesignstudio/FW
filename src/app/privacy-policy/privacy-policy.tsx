'use client';

import React, { useState, useEffect } from 'react';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { PortableTextBlock } from 'sanity';

// Type definitions aligned with the actual Sanity query structure
interface PrivacyPolicySection {
  sectionTitle: string;
  content: PortableTextBlock[];
}

interface PrivacyPolicyData {
  pageHeader: {
    mainTitle: string;
    lastUpdated?: string;
    effectiveDate?: string;
  };
  interpretationAndDefinitionsSection: PrivacyPolicySection;
  collectingAndUsingDataSection: PrivacyPolicySection;
  childrensPrivacySection: PrivacyPolicySection;
  linksToOtherWebsitesSection: PrivacyPolicySection;
  changesToPolicySection: PrivacyPolicySection;
  contactUsSection: PrivacyPolicySection;
}

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

const portableTextComponents: PortableTextComponents = {
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 dt-body-sm ">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 dt-body-sm ">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
  block: {
    normal: ({ children }) => <p className="mb-2 dt-body-sm ">{children}</p>,
  },
};

const getGridClasses = (item: GridItem) => {
  const baseClasses = ['bg-[#F9F7F2]', 'flex', 'flex-col', 'items-start', 'relative'];

  // Mobile
  if (item.mobileColSpan === 0 || item.mobileRowSpan === 0) {
    baseClasses.push('block', '[@media(max-width:767px)]:hidden');
  } else {
    baseClasses.push(`col-span-${item.mobileColSpan}`);
    baseClasses.push(`row-span-${item.mobileRowSpan}`);
  }

  // Landscape
  if (item.landscapeColSpan === 0 || item.landscapeRowSpan === 0) {
    baseClasses.push('[@media(max-height:600px)_and_(max-width:768px)]:hidden');
  } else {
    baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:col-span-${item.landscapeColSpan}`);
    baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:row-span-${item.landscapeRowSpan}`);
  }

  // Desktop
  if (item.colSpan === 0 || item.rowSpan === 0) {
    baseClasses.push('[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:hidden');
  } else {
    baseClasses.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-${item.colSpan}`);
    baseClasses.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-${item.rowSpan}`);
  }

  return baseClasses.join(' ');
};

const categories = [
  {
    key: 'interpretationAndDefinitionsSection',
    label: 'Interpretation and Definitions',
    shortLabel: 'Interpretation and Definitions'
  },
  {
    key: 'collectingAndUsingDataSection',
    label: 'Collecting and Using Your Personal Data',
    shortLabel: 'Collecting and Using Your Personal Data'
  },
  {
    key: 'childrensPrivacySection',
    label: "Children's Privacy",
    shortLabel: "Children's Privacy"
  },
  {
    key: 'linksToOtherWebsitesSection',
    label: 'Links to Other Websites',
    shortLabel: 'Links to Other Websites'
  },
  {
    key: 'changesToPolicySection',
    label: 'Changes to this Privacy Policy',
    shortLabel: 'Changes to this Privacy Policy'
  },
  {
    key: 'contactUsSection',
    label: 'Contact Us',
    shortLabel: 'Contact Us'
  }
]

interface PrivacyPolicyClientProps {
  privacyData: PrivacyPolicyData;
}

export default function PrivacyPolicyClient({ privacyData }: PrivacyPolicyClientProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].key);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Mobile check with hydration safety
  useEffect(() => {
    setIsClient(true);
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

  const renderContent = () => {
    const section = privacyData[selectedCategory as keyof PrivacyPolicyData] as PrivacyPolicySection;
    return (
      <div className="dt-body-sm">
        <PortableText value={section.content} components={portableTextComponents} />
      </div>
    );
  }

  // Desktop grid: row 1 col 1-3 = mainTitle, row 1 col 4-5 = category buttons (vertical), row 2 col 2-3 = category header, row 3-4 col 4-6 = content (scrollable)
  const items: GridItem[] = [
    // Row 1 col 1-3: Main Title
    {
      id: 1,
      content: (
        <FadeInOnVisible>
          <div className="flex items-center h-full w-full overflow-hidden">
            <div className="w-full max-w-full">
              <MainTitleAnimation
                text={privacyData.pageHeader.mainTitle}
                typeSpeed={60}
                delay={500}
                className="dt-h2"
              />
            </div>
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 3,
      rowSpan: 1,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 3,
      landscapeRowSpan: 1,
    },
    // Row 1 col 4-5: Category buttons (vertical stack, left aligned)
    {
      id: 2,
      content: (
        <FadeInOnVisible>
          <div className="flex flex-col items-start justify-start gap-2 h-full w-full">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`transition cursor-pointer bg-transparent border-none outline-none p-0 m-0 text-left w-full`}
              >
                <UnderlineOnHoverAnimation isActive={selectedCategory === category.key}>
                  <span className="dt-body-lg text-left">
                    {category.shortLabel}
                  </span>
                </UnderlineOnHoverAnimation>
              </button>
            ))}
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 1,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 2,
      landscapeRowSpan: 1,
    },
    // Row 1 col 6: Empty cell
    {
      id: 3,
      content: <></>,
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    },
    // Row 2 col 1: Empty cell
    {
      id: 4,
      content: <></>,
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    },
    // Row 2 col 2-3: Category header
    {
      id: 5,
      content: (
        <FadeInOnVisible className="my-auto" key={`header-${selectedCategory}`}>
          <h2 className="dt-h3 mt-auto">
            {(privacyData[selectedCategory as keyof PrivacyPolicyData] as PrivacyPolicySection).sectionTitle}
          </h2>
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 1,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 2,
      landscapeRowSpan: 1,
    },
    // Row 2 col 4-6: Empty cell
    {
      id: 6,
      content: <></>,
      colSpan: 3,
      rowSpan: 1,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 3,
      landscapeRowSpan: 1,
    },
    // Row 3-4 col 1-3: Empty cell
    {
      id: 7,
      content: <></>,
      colSpan: 3,
      rowSpan: 2,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 3,
      landscapeRowSpan: 2,
    },
    // Row 3-4 col 4-6: Content (scrollable, hidden scrollbar)
    {
      id: 8,
      content: (
        <FadeInOnVisible className="scroll-mask-bottom" key={`content-${selectedCategory}`} threshold={0.05}>
          <div className="h-full max-h-[52vh] overflow-y-auto pr-[1vh] pointer-events-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
            {renderContent()}
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 3,
      rowSpan: 2,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 3,
      landscapeRowSpan: 2,
    },
  ];

  // Prevent hydration mismatch by showing loading state until client-side JS loads
  if (!isClient) {
    return (
      <main className="px-[4.53vw] py-[2.09vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:px-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:py-[3.2vh] bg-[#F9F7F2]">
        <div className="grid grid-cols-4 auto-rows-[minmax(7.701vh,auto)] overflow-visible gap-x-[4.53vw] gap-y-[2.09vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[21vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-x-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-y-[3.2vh]">
          {items.map((item) => (
            <div key={item.id} className={getGridClasses(item)}>
              {item.content}
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (isMobile) {
    return (
      <main className="px-[4.53vw] py-[2.09vh] bg-[#F9F7F2]">
        <div className="grid grid-cols-4 auto-rows-[minmax(7.701vh,auto)] overflow-visible gap-x-[4.53vw] gap-y-[2.09vh]">
          {/* Row 1: Main header (cols 1-2) + Category buttons container (cols 3-4) */}
          <div key="mobile-header" className="col-span-2 flex justify-start">
            <FadeInOnVisible>
              <MainTitleAnimation
                text={privacyData.pageHeader.mainTitle}
                typeSpeed={60}
                delay={500}
                className="dt-h2"
              />
            </FadeInOnVisible>
          </div>
          <div key="mobile-buttons" className="col-span-2 flex flex-col gap-[3.5vh] pt-[2vh]">
            {categories.map((category) => (
              <FadeInOnVisible key={`mobile-btn-${category.key}`}>
                <button
                  onClick={() => setSelectedCategory(category.key)}
                  className="transition cursor-pointer bg-transparent border-none outline-none p-0 m-0 text-left w-full"
                >
                  <UnderlineOnHoverAnimation isActive={selectedCategory === category.key}>
                    <span className="dt-body-lg text-left">
                      {category.shortLabel}
                    </span>
                  </UnderlineOnHoverAnimation>
                </button>
              </FadeInOnVisible>
            ))}
          </div>


          {/* Row 6: Category header (cols 1-4, bottom left aligned) */}
          <div key="mobile-category-header" className="col-span-4 row-span-1 flex items-end justify-start">
            <FadeInOnVisible key={`mobile-header-${selectedCategory}`}>
              <h2 className="dt-h3">
                {(privacyData[selectedCategory as keyof PrivacyPolicyData] as PrivacyPolicySection).sectionTitle}
              </h2>
            </FadeInOnVisible>
          </div>
        </div>

        {/* Content section - flexible height outside of grid */}
        <div className="mt-[2vh] mb-[4vh]">
          <div className="flex items-start justify-start">
            <FadeInOnVisible key={`content-${selectedCategory}`} threshold={0.05}>
              <div className="prose leading-relaxed break-words dt-body-sm" style={{ maxWidth: '100%', width: '100%' }}>
                {(() => {
                  const section = privacyData[selectedCategory as keyof PrivacyPolicyData] as PrivacyPolicySection;

                  if (!section || !section.content || section.content.length === 0) {
                    return <div className="text-red-500">No content available for this section.</div>;
                  }

                  return (
                    <PortableText
                      value={section.content}
                      components={{
                        ...portableTextComponents,
                        block: {
                          normal: ({ children }) => <p className="mb-4 leading-relaxed break-words dt-body-sm" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{children}</p>,
                        },
                        marks: {
                          link: ({ children, value }) => (
                            <a
                              href={value?.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline break-words"
                              style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
                            >
                              {children}
                            </a>
                          ),
                        },
                        list: {
                          bullet: ({ children }) => (
                            <ul className="list-disc pl-6 mb-4 break-words dt-body-sm">{children}</ul>
                          ),
                          number: ({ children }) => (
                            <ol className="list-decimal pl-6 mb-4 break-words dt-body-sm">{children}</ol>
                          ),
                        },
                        listItem: {
                          bullet: ({ children }) => <li className="mb-2 break-words dt-body-sm" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{children}</li>,
                          number: ({ children }) => <li className="mb-2 break-words dt-body-sm" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{children}</li>,
                        },
                      }}
                    />
                  );
                })()}
              </div>
            </FadeInOnVisible>
          </div>
        </div>

        {/* Back to top button - always at bottom */}
        <div className="flex justify-end items-center mt-[11vh]">
          <div className="cursor-pointer" onClick={handleBackToTop}>
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
      </main>
    );
  }

  // Desktop layout
  return (
    <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:px-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:py-[3.2vh] bg-[#F9F7F2]">
      <div className="grid grid-cols-4 auto-rows-[minmax(7.701vh,auto)] overflow-visible gap-x-[4.53vw] gap-y-[2.09vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[21vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-x-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-y-[3.2vh]">
        {items.map((item) => (
          <div key={item.id} className={getGridClasses(item)}>
            {item.content}
          </div>
        ))}
      </div>
    </main>
  )
}
