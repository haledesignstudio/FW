'use client';

import React, { useState } from 'react';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';

// Type definitions for the terms & conditions data
interface TermsSection {
  sectionTitle: string
  content: string
}

interface TermsData {
  pageHeader: {
    mainTitle: string
    introText: string
    lastUpdated?: string
  }
  cookiesSection: TermsSection
  licenseSection: TermsSection
  hyperlinksSection: TermsSection
  iframesSection: TermsSection
  contentLiabilitySection: TermsSection
  privacySection: TermsSection
  reservationOfRightsSection: TermsSection
  removalOfLinksSection: TermsSection
  disclaimerSection: TermsSection
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

  const renderContent = () => {
    const section = termsData[selectedCategory as keyof TermsData] as TermsSection
    
    if (!section || typeof section !== 'object' || !('sectionTitle' in section)) return null

    return (
      <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] leading-tight">
        {section.content}
      </p>
    )
  }

  const items: GridItem[] = [
    // Category buttons across the first row (columns 1-6) - Only first 6 categories with additional ones at bottom
    ...topRowCategories.map((category, index) => ({
        id: index + 1,
        content: (
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
                className={
                  `${selectedCategory === category.key ? 'text-black  font-normal underline-active' : 'text-gray-600  font-normal'}`
                }
              >
                <span className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] leading-tight w-full font-normal">
                  {category.shortLabel}
                </span>
              </UnderlineOnHoverAnimation>
            </button>
            {/* Additional categories for first 3 columns - positioned at bottom */}
            {index < 3 && secondRowCategories[index] && (
              <div className="mt-auto">
                <button
                  onClick={() => setSelectedCategory(secondRowCategories[index].key)}
                  className={`text-left w-full h-auto py-2 pointer-events-auto relative z-20 cursor-pointer bg-transparent border-none outline-none font-normal`}
                  style={{ background: 'none' }}
                >
                  <UnderlineOnHoverAnimation
                    className={
                      `${selectedCategory === secondRowCategories[index].key ? 'text-black font-normal underline-active' : 'text-gray-600 font-normal'}`
                    }
                  >
                    <span className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] leading-tight w-full font-normal">
                      {secondRowCategories[index].shortLabel}
                    </span>
                  </UnderlineOnHoverAnimation>
                </button>
              </div>
            )}
          </div>
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
        <h2 className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[4vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[3vh] font-graphik mt-auto">
          {(termsData[selectedCategory as keyof TermsData] as TermsSection).sectionTitle}
        </h2>
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
        <div className="h-[24vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:h-[48vh] [@media(max-height:600px)_and_(max-width:768px)]:h-[30vh] overflow-y-auto pr-[1vh] pointer-events-auto">
          {renderContent()}
        </div>
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
        <div className="h-[24vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:h-[48vh] [@media(max-height:600px)_and_(max-width:768px)]:h-[30vh] overflow-y-auto pr-[1vh] pointer-events-auto">
          <p className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh] leading-tight text-gray-700">
            {termsData.pageHeader.introText}
          </p>
        </div>
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
