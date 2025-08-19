'use client';

import React, { useState, useEffect } from 'react';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { PortableTextBlock } from 'sanity';

// Type definitions for the terms & conditions data
interface TermsSection {
  sectionTitle: string
  content: PortableTextBlock[];
}

interface TermsData {
  pageHeader: {
    mainTitle: string;
    introText: PortableTextBlock[];
    lastUpdated?: string;
  };
  cookiesSection: TermsSection;
  licenseSection: TermsSection;
  hyperlinksSection: TermsSection;
  iframesSection: TermsSection;
  contentLiabilitySection: TermsSection;
  privacySection: TermsSection;
  reservationOfRightsSection: TermsSection;
  removalOfLinksSection: TermsSection;
  disclaimerSection: TermsSection;
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

const getGridClasses = (item: GridItem) => {
    const baseClasses = ['bg-[#F9F7F2]', 'flex', 'flex-col', 'items-start', 'relative'];

    // Mobile
    if (item.mobileColSpan === 0 || item.mobileRowSpan === 0) {
        baseClasses.push('block', '[@media(max-width:767px)]:hidden');
    } else {
        baseClasses.push(`col-span-${item.mobileColSpan}`);
        if (item.mobileRowSpan && item.mobileRowSpan > 0) {
            baseClasses.push(`row-span-${item.mobileRowSpan}`);
        }
    }

    // Landscape
    if (item.landscapeColSpan === 0 || item.landscapeRowSpan === 0) {
        baseClasses.push('[@media(max-height:600px)_and_(max-width:768px)]:hidden');
    } else {
        baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:col-span-${item.landscapeColSpan}`);
        if (item.landscapeRowSpan && item.landscapeRowSpan > 0) {
            baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:row-span-${item.landscapeRowSpan}`);
        }
    }

    // Desktop
    if (item.colSpan === 0 || item.rowSpan === 0) {
        baseClasses.push('[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:hidden');
    } else {
        baseClasses.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-${item.colSpan}`);
        if (item.rowSpan && item.rowSpan > 0) {
            baseClasses.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-${item.rowSpan}`);
        }
    }

    return baseClasses.join(' ');
};

const categories = [
  { key: 'cookiesSection', label: 'Cookies', shortLabel: 'Cookies' },
  { key: 'licenseSection', label: 'License', shortLabel: 'License' },
  { key: 'disclaimerSection', label: 'Disclaimer', shortLabel: 'Disclaimer' },
  { key: 'iframesSection', label: 'iFrames', shortLabel: 'iFrames' },
  { key: 'contentLiabilitySection', label: 'Content Liability', shortLabel: 'Content Liability' },
  { key: 'privacySection', label: 'Your Privacy', shortLabel: 'Your Privacy' },
  { key: 'reservationOfRightsSection', label: 'Reservation of Rights', shortLabel: 'Reservation of rights' },
  { key: 'removalOfLinksSection', label: 'Removal of links from our website', shortLabel: 'Removal of links from our website'},
  { key: 'hyperlinksSection', label: 'Hyperlinks to our content', shortLabel: 'Hyperlinks to our content'}
]

// Take the first 6 categories for the top row
const topRowCategories = categories.slice(0, 6)
// The remaining categories for the bottom left of first row
const secondRowCategories = categories.slice(6)

interface TermsAndConditionsClientProps {
  termsData: TermsData
}

export default function TermsAndConditionsClient({ termsData }: TermsAndConditionsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].key)
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
    const section = termsData[selectedCategory as keyof TermsData] as TermsSection;
    if (!section || typeof section !== 'object' || !('sectionTitle' in section)) return null;
    return (
      <div className="prose max-w-none text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] leading-tight">
        <PortableText value={section.content} components={portableTextComponents} />
      </div>
    );
  }

  const items: GridItem[] = [
    // Category buttons across the first row (columns 1-6) - Only first 6 categories with additional ones at bottom
    ...topRowCategories.map((category, index) => ({
        id: index + 1,
        content: (
            <FadeInOnVisible>
              <div
              className={`w-full h-full flex flex-col items-start justify-start relative ${
                  category.key === 'privacySection' ? 'z-50' : 'z-10'
              } pointer-events-auto`}
              >
              <button
                  onClick={() => setSelectedCategory(category.key)}
                  className={`text-left w-full h-auto py-2 pointer-events-auto relative z-50 cursor-pointer bg-transparent border-none outline-none font-normal`}
                  style={{ background: 'none' }}
              >
                <UnderlineOnHoverAnimation
                  isActive={selectedCategory === category.key}
                  className="font-normal text-black"
                >
                  <span className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] leading-tight w-full font-normal text-black">
                    {category.shortLabel}
                  </span>
                </UnderlineOnHoverAnimation>
              </button>
              {/* Additional categories for first 3 columns - positioned at bottom */}
              {index < 3 && secondRowCategories[index] && (
                <div className="mt-[3vh]">
                  <button
                    onClick={() => setSelectedCategory(secondRowCategories[index].key)}
                    className={`text-left w-full h-auto py-2 pointer-events-auto relative z-20 cursor-pointer bg-transparent border-none outline-none font-normal`}
                    style={{ background: 'none' }}
                  >
                    <UnderlineOnHoverAnimation
                      isActive={selectedCategory === secondRowCategories[index].key}
                      className="font-normal text-black"
                    >
                      <span className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] leading-tight w-full font-normal text-black">
                        {secondRowCategories[index].shortLabel}
                      </span>
                    </UnderlineOnHoverAnimation>
                  </button>
                </div>
              )}
            </div>
            </FadeInOnVisible>
        ),
        colSpan: 1,
        rowSpan: 1,
        mobileColSpan: 1,
        mobileRowSpan: 1,
        landscapeColSpan: 1,
        landscapeRowSpan: 1,
    })),
    // Category header - Left side (columns 1-2, row 2) - anchored to bottom left
    {
      id: 7,
      content: (
        <FadeInOnVisible key={`header-${selectedCategory}`}>
          <h2 className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[4vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[3vh] font-graphik mt-auto">
            {(termsData[selectedCategory as keyof TermsData] as TermsSection).sectionTitle}
          </h2>
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 2,
      landscapeRowSpan: 1,
    },
    // Empty spacer columns 3-4 for row 2
    {
      id: 8,
      content: <></>,
      colSpan: 2,
      rowSpan: 1,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 2,
      landscapeRowSpan: 1,
    },
    // Terms & Conditions main header - Right side (columns 5-6, row 2)
    {
      id: 9,
      content: (
        <FadeInOnVisible>
          <div className="flex items-end justify-start h-full w-full overflow-hidden">
            <div className="w-full max-w-full">
              <MainTitleAnimation 
                text={termsData.pageHeader.mainTitle}
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
      landscapeColSpan: 2,
      landscapeRowSpan: 1,
    },
    // Category content - Scrollable area (columns 1-2, rows 3-4)
    {
      id: 10,
      content: (
        <FadeInOnVisible key={`content-${selectedCategory}`} threshold={0.05}>
          <div className="h-[24vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:h-[48vh] [@media(max-height:600px)_and_(max-width:768px)]:h-[30vh] overflow-y-auto pr-[1vh] pointer-events-auto">
            {renderContent()}
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 2,
      mobileColSpan: 2,
      mobileRowSpan: 2,
      landscapeColSpan: 2,
      landscapeRowSpan: 2,
    },
    // Empty spacer columns 3-4 for rows 3-4
    {
      id: 11,
      content: <></>,
      colSpan: 2,
      rowSpan: 2,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 2,
      landscapeRowSpan: 2,
    },
    // Introductory text - Right side underneath main title (columns 5-6, rows 3-4)
    {
      id: 12,
      content: (
        <FadeInOnVisible>
          <div className="h-[24vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:h-[48vh] [@media(max-height:600px)_and_(max-width:768px)]:h-[30vh] overflow-y-auto pr-[1vh] pointer-events-auto">
            <div className="prose max-w-none text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh] leading-tight text-gray-700">
              <PortableText value={termsData.pageHeader.introText} components={portableTextComponents} />
            </div>
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 2,
      mobileColSpan: 2,
      mobileRowSpan: 2,
      landscapeColSpan: 2,
      landscapeRowSpan: 2,
    },
  ];

  // Add this style to the page (or global CSS if preferred):
  if (typeof window !== 'undefined' && !document.getElementById('underline-active-style')) {
    const style = document.createElement('style');
    style.id = 'underline-active-style';
    style.innerHTML = `
      .underline-active.nav-link-ltr::before {
        width: 100% !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Prevent hydration mismatch by showing loading state until client-side JS loads
  if (!isClient) {
    return (
      <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
        <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh]">
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
      <main className="p-[2vh] bg-[#F9F7F2]">
        <div className="grid grid-cols-4 gap-y-2 auto-rows-[12.5vh]">
          {/* Row 1: Main title (cols 1-3) */}
          <div className="col-span-3 row-span-1 flex items-end justify-start">
            <FadeInOnVisible>
              <MainTitleAnimation 
                text={termsData.pageHeader.mainTitle}
                typeSpeed={60}
                delay={500}
                className="text-[4vh] font-bold leading-tight"
              />
            </FadeInOnVisible>
          </div>
          <div className="col-span-1 row-span-1"></div>

          {/* Rows 2-10: Intro text (cols 1-4) */}
          <div className="col-span-4 row-span-8 flex items-start justify-start">
            <FadeInOnVisible>
              <div className="prose max-w-full text-[2.5vh] leading-relaxed w-full break-words overflow-y-auto pr-[1vh] h-full">
                <PortableText 
                  value={termsData.pageHeader.introText} 
                  components={{
                    ...portableTextComponents,
                    block: {
                      normal: ({ children }) => <p className="mb-4 text-[2vh] leading-relaxed break-words">{children}</p>,
                    },
                    list: {
                      bullet: ({ children }) => (
                        <ul className="list-disc pl-6 mb-4 text-[2vh] break-words">{children}</ul>
                      ),
                      number: ({ children }) => (
                        <ol className="list-decimal pl-6 mb-4 text-[2vh] break-words">{children}</ol>
                      ),
                    },
                    listItem: {
                      bullet: ({ children }) => <li className="mb-2 text-[2vh] break-words">{children}</li>,
                      number: ({ children }) => <li className="mb-2 text-[2vh] break-words">{children}</li>,
                    },
                    marks: {
                      strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                      em: ({ children }) => <em className="italic">{children}</em>,
                      link: ({ children, value }) => (
                        <a 
                          href={value?.href} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 underline break-words"
                        >
                          {children}
                        </a>
                      ),
                    },
                  }}
                />
              </div>
            </FadeInOnVisible>
          </div>

          {/* Category buttons section (cols 3-4, multiple rows) */}
          <div className="col-span-2 row-span-1"></div>
          <div className="col-span-2 row-span-5 flex flex-col justify-start items-start gap-[2.5vh] pt-[3vh]">
            <FadeInOnVisible>
              <div className="flex flex-col gap-[3.5vh] w-full">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className="transition cursor-pointer bg-transparent border-none outline-none p-0 m-0 text-left w-full"
                  >
                    <UnderlineOnHoverAnimation isActive={selectedCategory === category.key} className="font-normal text-black">
                      <span className="text-[2.5vh] leading-tight text-black font-normal text-left">
                        {category.shortLabel}
                      </span>
                    </UnderlineOnHoverAnimation>
                  </button>
                ))}
              </div>
            </FadeInOnVisible>
          </div>

          {/* Row 16: Category header (cols 1-4, bottom left aligned) */}
          <div className="col-span-4 row-span-1 flex items-end justify-start">
            <FadeInOnVisible key={`header-${selectedCategory}`}>
              <h2 className="text-[3vh] font-graphik">
                {(termsData[selectedCategory as keyof TermsData] as TermsSection).sectionTitle}
              </h2>
            </FadeInOnVisible>
          </div>
        </div>

        {/* Content section - flexible height outside of grid (from row 17) */}
        <div className="mt-[2vh] mb-[4vh]">
          <div className="flex items-start justify-start">
            <FadeInOnVisible key={`content-${selectedCategory}`} threshold={0.05}>
              <div className="prose text-[2.5vh] leading-relaxed break-words" style={{ maxWidth: '100%', width: '100%' }}>
                {(() => {
                  const section = termsData[selectedCategory as keyof TermsData] as TermsSection;
                  
                  if (!section || !section.content || section.content.length === 0) {
                    return <div className="text-red-500">No content available for this section.</div>;
                  }
                  
                  return (
                    <PortableText 
                      value={section.content} 
                      components={{
                        ...portableTextComponents,
                        block: {
                          normal: ({ children }) => <p className="mb-4 text-[2.5vh] leading-relaxed break-words">{children}</p>,
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
                            <ul className="list-disc pl-6 mb-4 text-[2.5vh] break-words">{children}</ul>
                          ),
                          number: ({ children }) => (
                            <ol className="list-decimal pl-6 mb-4 text-[2.5vh] break-words">{children}</ol>
                          ),
                        },
                        listItem: {
                          bullet: ({ children }) => <li className="mb-2 text-[2.5vh] break-words">{children}</li>,
                          number: ({ children }) => <li className="mb-2 text-[2.5vh] break-words">{children}</li>,
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
        <div className="flex justify-end items-center mt-[4vh] mb-[4vh]">
          <div className="cursor-pointer" onClick={handleBackToTop}>
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
      </main>
    );
  }

  // Desktop layout
  return (
      <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
        <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh]">
          {items.map((item) => (
            <div key={item.id} className={getGridClasses(item)}>
              {item.content}
            </div>
          ))}
        </div>
      </main>
  )
}
