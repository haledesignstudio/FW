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
      <ul className="list-disc pl-6 mb-4 dt-body-sm">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 dt-body-sm">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
  block: {
    normal: ({ children }) => <p className="mb-2 dt-body-sm">{children}</p>,
  },
};

const getGridClasses = (item: GridItem) => {
  const baseClasses = ['bg-[#F9F7F2]', 'flex', 'flex-col', 'items-start', 'relative', 'h-full'];

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
  { key: 'contentLiabilitySection', label: 'Content liability', shortLabel: 'Content liability' },
  { key: 'privacySection', label: 'Your privacy', shortLabel: 'Your privacy' },
  { key: 'reservationOfRightsSection', label: 'Reservation of Rights', shortLabel: 'Reservation of rights' },
  { key: 'removalOfLinksSection', label: 'Removal of links from our website', shortLabel: 'Removal of links from our website' },
  { key: 'hyperlinksSection', label: 'Hyperlinking to our content', shortLabel: 'Hyperlinking to our content' }
]

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

  // Desktop grid: row 1 col 1-2 = mainTitle, row 1 col 4-5 = category buttons (vertical), row 2 col 4 = category header, row 3-4 col 1-2 = introText (2 columns), row 3-4 col 4-6 = content (scrollable)
  const items: GridItem[] = [
    // Row 1 col 1-2: Main Title
    {
      id: 1,
      content: (
        <FadeInOnVisible>
          <div className="flex items-center h-full w-full overflow-hidden">
            <div className="w-full max-w-full">
              <MainTitleAnimation
                text={termsData.pageHeader.mainTitle}
                typeSpeed={60}
                delay={500}
                className="dt-h2"
              />
            </div>
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 2,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 2,
      landscapeRowSpan: 1,
    },
    // Row 1 col 3: Empty cell
    {
      id: 2,
      content: <></>,
      colSpan: 1,
      rowSpan: 2,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    },
    // Row 1 col 4-5: Category buttons (wrap to next row if needed)
    {
      id: 3,
      content: (

        <div className="h-full w-full flex flex-col justify-between">
          {/* Buttons at the top */}
          <div className="flex flex-wrap items-start content-start">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className="transition cursor-pointer bg-transparent border-none outline-none p-0 m-0 text-left w-full flex-shrink-0"
                style={{ minWidth: '120px', maxWidth: '100%' }}
              >
                <UnderlineOnHoverAnimation isActive={selectedCategory === category.key}>
                  <span className="dt-body-lg text-left">
                    {category.shortLabel}
                  </span>
                </UnderlineOnHoverAnimation>
              </button>
            ))}
          </div>

          {/* Title at the bottom */}
          <FadeInOnVisible>
            <div>
              <h2 className="dt-h3 mb-0 pb-0">
                {(termsData[selectedCategory as keyof TermsData] as TermsSection).sectionTitle}
              </h2>
            </div>
          </FadeInOnVisible>
        </div>

      ),
      colSpan: 2,
      rowSpan: 2,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 2,
      landscapeRowSpan: 1,
    },

    // Row 1 col 6: Empty cell
    {
      id: 4,
      content: <></>,
      colSpan: 1,
      rowSpan: 2,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    },
    // Row 2 col 1-3: Empty cell

    // Row 3-4 col 1-2: Intro text (2 columns)
    {
      id: 8,
      content: (
        <FadeInOnVisible>
          <div className="h-full w-full grid grid-cols-2 gap-4">
            <div className="dt-body-sm break-words">
              <PortableText value={termsData.pageHeader.introText.slice(0, Math.ceil(termsData.pageHeader.introText.length / 2))} components={portableTextComponents} />
            </div>
            <div className="dt-body-sm break-words">
              <PortableText value={termsData.pageHeader.introText.slice(Math.ceil(termsData.pageHeader.introText.length / 2))} components={portableTextComponents} />
            </div>
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 2,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 2,
      landscapeRowSpan: 2,
    },
    // Row 3-4 col 3: Empty cell
    {
      id: 9,
      content: <></>,
      colSpan: 1,
      rowSpan: 2,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 1,
      landscapeRowSpan: 2,
    },
    // Row 3-4 col 4-6: Content (scrollable, hidden scrollbar)
    {
      id: 10,
      content: (
        <FadeInOnVisible className="scroll-mask-bottom" key={`content-${selectedCategory}`} threshold={0.05}>
          <div className="h-full max-h-[52vh] overflow-y-auto pr-[1vh] pointer-events-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } `}</style>
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
          {/* Row 1: Main title (cols 1-3) */}
          <div className="col-span-3 flex items-end justify-start">
            <FadeInOnVisible>
              <MainTitleAnimation
                text={termsData.pageHeader.mainTitle}
                typeSpeed={60}
                delay={500}
                className="dt-h2"
              />
            </FadeInOnVisible>
          </div>
          <div className="col-span-1 "></div>

          {/* Rows 2-10: Intro text (cols 1-4) */}
          <div className="col-span-4 flex items-start justify-start">
            <FadeInOnVisible>
              <div className="prose max-w-full leading-relaxed w-full break-words overflow-y-auto pr-[1vh] h-full dt-body-sm">
                <PortableText
                  value={termsData.pageHeader.introText}
                  components={{
                    ...portableTextComponents,
                    block: {
                      normal: ({ children }) => <p className="mb-4 leading-relaxed break-words dt-body-sm">{children}</p>,
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
                      bullet: ({ children }) => <li className="mb-2 break-words dt-body-sm">{children}</li>,
                      number: ({ children }) => <li className="mb-2 break-words dt-body-sm">{children}</li>,
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
          <div className="col-span-2 flex flex-col justify-start items-start gap-[2.5vh] pt-[3vh]">
            <FadeInOnVisible>
              <div className="flex flex-col gap-[3.5vh] w-full">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className="transition cursor-pointer bg-transparent border-none outline-none p-0 m-0 text-left w-full"
                  >
                    <UnderlineOnHoverAnimation isActive={selectedCategory === category.key} className="">
                      <span className="dt-body-lg text-left">
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
              <h2 className="dt-h3">
                {(termsData[selectedCategory as keyof TermsData] as TermsSection).sectionTitle}
              </h2>
            </FadeInOnVisible>
          </div>
        </div>

        {/* Content section - flexible height outside of grid (from row 17) */}
        <div className="mt-[2vh] mb-[4vh]">
          <div className="flex items-start justify-start">
            <FadeInOnVisible key={`content-${selectedCategory}`} threshold={0.05}>
              <div className="dt-body-sm" style={{ maxWidth: '100%', width: '100%' }}>
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
                          normal: ({ children }) => <p className="dt-body-sm">{children}</p>,
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
                          bullet: ({ children }) => <li className="mb-2 break-words dt-body-sm">{children}</li>,
                          number: ({ children }) => <li className="mb-2 break-words dt-body-sm">{children}</li>,
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
        <div className="flex justify-end items-center mt-[10vh]">
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
    <main className="px-[4.53vw] py-[2.09vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:px-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:py-[3.2vh] bg-[#F9F7F2]">
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
