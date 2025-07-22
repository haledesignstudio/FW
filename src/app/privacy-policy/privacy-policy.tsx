'use client';

import React, { useState } from 'react';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
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
  const [selectedCategory, setSelectedCategory] = useState(categories[0].key)

  const renderContent = () => {
    const section = privacyData[selectedCategory as keyof PrivacyPolicyData] as PrivacyPolicySection;
    return (
      <div className="prose max-w-none text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] leading-tight">
        <PortableText value={section.content} components={portableTextComponents}/>
      </div>
    );
  }

  const items: GridItem[] = [
    // Category buttons across the first row (columns 1-6)
    ...categories.map((category, index) => ({
        id: index + 1,
        content: (
            <div
    className={`w-full h-full flex flex-col items-start justify-start relative z-50 pointer-events-auto`}
  >
    <button
      onClick={() => setSelectedCategory(category.key)}
      className={`w-full h-auto flex items-start justify-start text-left pointer-events-auto relative z-50 cursor-pointer bg-transparent border-none outline-none font-normal`}
      style={{ padding: 0, margin: 0 }}
    >
      <UnderlineOnHoverAnimation
        className={selectedCategory === category.key ? 'text-black font-normal underline-active' : 'text-gray-600 font-normal'}
      >
        <span
          className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] leading-tight w-full"
        >
          {category.shortLabel}
        </span>
      </UnderlineOnHoverAnimation>
    </button>
  </div>
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
        <h2 className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[4vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[3vh] font-graphik mt-auto">
          {(privacyData[selectedCategory as keyof PrivacyPolicyData] as PrivacyPolicySection).sectionTitle}
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
    // Privacy Policy main header - Right side (columns 5-6, row 2)
    {
      id: 9,
      content: (
        <div className="flex items-center justify-start h-full w-full overflow-hidden">
          <div className="w-full max-w-full">
            <MainTitleAnimation 
              text={privacyData.pageHeader.mainTitle}
              typeSpeed={60}
              delay={500}
              className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[10vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight"
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
  ];

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
