'use client';

import React, { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';

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
  contactInformation?: {
    sectionTitle: string
    contactText: string
    email?: string
    address?: string
  }
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
    const baseClasses = ['bg-[#F9F7F2]', 'flex', 'flex-col'];

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

// Mock data - replace with actual Sanity query
const mockTermsData: TermsData = {
  pageHeader: {
    mainTitle: "Terms & Conditions",
    introText: "These terms and conditions outline the rules and regulations for the use of FutureWorld's Website, located at www.futureworld.co.za. By accessing this website, we assume you accept these terms and conditions. Do not continue to use FutureWorld if you do not agree to take all of the terms and conditions stated on this page.",
    lastUpdated: "2024-01-15"
  },
  cookiesSection: {
    sectionTitle: "Cookies",
    content: "We employ the use of cookies. By accessing FutureWorld, you agreed to use cookies in agreement with the FutureWorld's Privacy Policy. Most interactive websites use cookies to let us retrieve the user's details for each visit."
  },
  licenseSection: {
    sectionTitle: "License",
    content: "Unless otherwise stated, FutureWorld and/or its licensors own the intellectual property rights for all material on FutureWorld. All intellectual property rights are reserved. You may access this from FutureWorld for your own personal use subjected to restrictions set in these terms and conditions."
  },
  hyperlinksSection: {
    sectionTitle: "Hyperlinks to our content",
    content: "The following organizations may link to our Website without prior written approval: Government agencies, Search engines, News organizations, Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses."
  },
  iframesSection: {
    sectionTitle: "iFrames",
    content: "Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website."
  },
  contentLiabilitySection: {
    sectionTitle: "Content Liability",
    content: "We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that are rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights."
  },
  privacySection: {
    sectionTitle: "Your Privacy",
    content: "Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Website, to understand our practices."
  },
  reservationOfRightsSection: {
    sectionTitle: "Reservation of Rights",
    content: "We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time."
  },
  removalOfLinksSection: {
    sectionTitle: "Removal of links from our website",
    content: "If you find any link on our Website that is offensive for any reason, you are free to contact and inform us at any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly."
  },
  disclaimerSection: {
    sectionTitle: "Disclaimer",
    content: "To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will limit or exclude our or your liability for death or personal injury, limit or exclude our or your liability for fraud or fraudulent misrepresentation, limit any of our or your liabilities in any way that is not permitted under applicable law, or exclude any of our or your liabilities that may not be excluded under applicable law."
  }
}

const categories = [
  { key: 'cookiesSection', label: 'Cookies', shortLabel: 'Cookies' },
  { key: 'licenseSection', label: 'License', shortLabel: 'License' },
  { key: 'hyperlinksSection', label: 'Hyperlinks to our content', shortLabel: 'Hyperlinks' },
  { key: 'iframesSection', label: 'iFrames', shortLabel: 'iFrames' },
  { key: 'contentLiabilitySection', label: 'Content Liability', shortLabel: 'Content Liability' },
  { key: 'privacySection', label: 'Your Privacy', shortLabel: 'Privacy' },
  { key: 'reservationOfRightsSection', label: 'Reservation of Rights', shortLabel: 'Rights' },
  { key: 'removalOfLinksSection', label: 'Removal of links from our website', shortLabel: 'Link Removal' },
  { key: 'disclaimerSection', label: 'Disclaimer', shortLabel: 'Disclaimer' }
]

// Take the first 6 categories for the top row
const topRowCategories = categories.slice(0, 6)
// The remaining categories will be shown in the navigation area

export default function TermsAndConditionsPage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].key)
  const [termsData] = useState<TermsData>(mockTermsData)
  const [isLoading] = useState(false)

  const renderContent = () => {
    const section = termsData[selectedCategory as keyof TermsData] as TermsSection
    
    if (!section || typeof section !== 'object' || !('sectionTitle' in section)) return null

    return (
      <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] leading-tight">
        {section.content}
      </p>
    )
  }

  if (isLoading) {
    return null;
  }

  const items: GridItem[] = [
    // Category buttons across the first row (columns 1-6) - First 6 categories
    ...topRowCategories.map((category, index) => ({
      id: index + 1,
      content: (
        <button
          onClick={() => setSelectedCategory(category.key)}
          className={`text-left ${
            selectedCategory === category.key
              ? 'text-black font-bold'
              : 'text-gray-600'
          }`}
        >
          <span className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] leading-tight">
            {category.shortLabel}
          </span>
          {selectedCategory === category.key && (
            <div className="h-[0.5vh] bg-black mt-[1vh]"></div>
          )}
        </button>
      ),
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 1,
      mobileRowSpan: 1,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    })),
    // Category header - Left side (columns 1-2, row 2)
    {
      id: 7,
      content: (
        <div className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh]">
          <h2 className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[8vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[6vh] font-graphik">
            {(termsData[selectedCategory as keyof TermsData] as TermsSection).sectionTitle}
          </h2>
        </div>
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
        <div className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh]">
          <p className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[12vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight">
            Terms & Conditions_
          </p>
          <p className="text-[2.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.8vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh] mt-[2vh] leading-tight">
            Legal guidelines for using our website and services
          </p>
        </div>
      ),
      colSpan: 2, // Spans columns 5-6
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 2,
      landscapeRowSpan: 1,
    },
    // Category content - Scrollable area (columns 1-2, max 2 rows starting row 3)
    {
      id: 10,
      content: (
        <div className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] h-full">
          <div className="h-[24vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:h-[20vh] [@media(max-height:600px)_and_(max-width:768px)]:h-[30vh] overflow-y-auto pr-[1vh]">
            {renderContent()}
          </div>
        </div>
      ),
      colSpan: 2,
      rowSpan: 2, // Exactly 2 rows
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
    // Terms navigation and legal info - Columns 5-6, starting row 3
    {
      id: 12,
      content: (
        <div className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh]">
          <div className="space-y-[3vh]">
            <div>
              <h3 className="text-[4vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[3vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[3vh] font-bold mb-[2vh]">All Categories</h3>
              <div className="space-y-[1vh]">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`block text-left text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.8vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] transition-colors duration-200 ${
                      selectedCategory === category.key
                        ? 'text-black font-bold'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-300 pt-[3vh]">
              <h4 className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-bold mb-[2vh]">Legal Information</h4>
              <div className="space-y-[1vh] text-[2.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh]">
                <div>
                  <p className="font-bold">Governing Law</p>
                  <p>South African Law</p>
                </div>
                <div>
                  <p className="font-bold">Jurisdiction</p>
                  <p>Johannesburg, South Africa</p>
                </div>
                <div>
                  <p className="font-bold">Legal Contact</p>
                  <p>legal@futureworld.co.za</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-[3vh]">
              <div className="text-[2.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh]">
                <p className="font-bold">Agreement</p>
                <p>By using our website, you agree to these terms and conditions</p>
              </div>
            </div>
          </div>
        </div>
      ),
      colSpan: 2, // Spans columns 5-6
      rowSpan: 0, // Let it expand as needed
      mobileColSpan: 2,
      mobileRowSpan: 0,
      landscapeColSpan: 2,
      landscapeRowSpan: 0,
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] overflow-x-hidden">
        <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[10vh] max-w-full">
          {items.map((item) => (
            <div key={item.id} className={getGridClasses(item)}>
              {item.content}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
