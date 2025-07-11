'use client';

import React, { useState } from 'react';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';

// Type definitions for the privacy policy data
interface PersonalDataSection {
  title: string;
  content: string;
}

interface UsageDataSection {
  title: string;
  content: string;
}

interface TypesOfDataCollected {
  subsectionTitle: string;
  personalData: PersonalDataSection;
  usageData: UsageDataSection;
}

interface CookieTypes {
  browserCookies?: string;
  flashCookies?: string;
  webBeacons?: string;
}

interface CookieCategories {
  essentialCookies?: string;
  acceptanceCookies?: string;
  functionalityCookies?: string;
}

interface TrackingTechnologiesAndCookies {
  subsectionTitle: string;
  introContent: string;
  cookieTypes: CookieTypes;
  cookieCategories: CookieCategories;
}

interface UseOfPersonalData {
  subsectionTitle: string;
  purposes: string;
  sharingScenarios: string;
}

interface RetentionOfPersonalData {
  subsectionTitle: string;
  content: string;
}

interface TransferOfPersonalData {
  subsectionTitle: string;
  content: string;
}

interface DisclosureOfPersonalData {
  subsectionTitle: string;
  businessTransactions?: string;
  lawEnforcement?: string;
  legalRequirements?: string;
}

interface SecurityOfPersonalData {
  subsectionTitle: string;
  content: string;
}

interface CollectingAndUsingDataSection {
  sectionTitle: string;
  typesOfDataCollected: TypesOfDataCollected;
  trackingTechnologiesAndCookies: TrackingTechnologiesAndCookies;
  useOfPersonalData: UseOfPersonalData;
  retentionOfPersonalData: RetentionOfPersonalData;
  transferOfPersonalData: TransferOfPersonalData;
  disclosureOfPersonalData: DisclosureOfPersonalData;
  securityOfPersonalData: SecurityOfPersonalData;
}

interface PrivacyPolicySection {
  sectionTitle: string;
  content?: string;
  interpretationContent?: string;
  definitionsContent?: string;
}

interface PrivacyPolicyData {
  pageHeader: {
    mainTitle: string;
    lastUpdated: string;
    effectiveDate?: string;
  };
  interpretationAndDefinitionsSection: PrivacyPolicySection;
  collectingAndUsingDataSection: CollectingAndUsingDataSection;
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
    shortLabel: 'Interpretation'
  },
  { 
    key: 'collectingAndUsingDataSection', 
    label: 'Collecting and Using Your Personal Data',
    shortLabel: 'Data Collection'
  },
  { 
    key: 'childrensPrivacySection', 
    label: "Children's Privacy",
    shortLabel: "Children's Privacy"
  },
  { 
    key: 'linksToOtherWebsitesSection', 
    label: 'Links to Other Websites',
    shortLabel: 'External Links'
  },
  { 
    key: 'changesToPolicySection', 
    label: 'Changes to this Privacy Policy',
    shortLabel: 'Policy Changes'
  },
  { 
    key: 'contactUsSection', 
    label: 'Contact Us',
    shortLabel: 'Contact'
  }
]

interface PrivacyPolicyClientProps {
  privacyData: PrivacyPolicyData;
}

export default function PrivacyPolicyClient({ privacyData }: PrivacyPolicyClientProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].key)

  const renderContent = () => {
    if (selectedCategory === 'interpretationAndDefinitionsSection') {
      const section = privacyData.interpretationAndDefinitionsSection;
      return (
        <>
          <div className="mb-[4vh]">
            <h3 className="text-[4vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[3vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[3vh] font-bold mb-[2vh]">Interpretation</h3>
            <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.8vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] leading-tight">
              {section.interpretationContent}
            </p>
          </div>
          <div>
            <h3 className="text-[4vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[3vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[3vh] font-bold mb-[2vh]">Definitions</h3>
            <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.8vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] leading-tight">
              {section.definitionsContent}
            </p>
          </div>
        </>
      )
    }

    if (selectedCategory === 'collectingAndUsingDataSection') {
      const section = privacyData.collectingAndUsingDataSection;
      return (
        <div className="space-y-[3vh]">
          {/* Types of Data Collected */}
          <div>
            <h3 className="text-[4vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-bold mb-[2vh]">
              {section.typesOfDataCollected.subsectionTitle}
            </h3>
            <div className="space-y-[2vh]">
              <div>
                <h4 className="text-[3.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] font-bold mb-[1vh]">
                  {section.typesOfDataCollected.personalData.title}
                </h4>
                <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight">
                  {section.typesOfDataCollected.personalData.content}
                </p>
              </div>
              <div>
                <h4 className="text-[3.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] font-bold mb-[1vh]">
                  {section.typesOfDataCollected.usageData.title}
                </h4>
                <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight">
                  {section.typesOfDataCollected.usageData.content}
                </p>
              </div>
            </div>
          </div>

          {/* Tracking Technologies and Cookies */}
          <div>
            <h3 className="text-[4vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-bold mb-[2vh]">
              {section.trackingTechnologiesAndCookies.subsectionTitle}
            </h3>
            <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight mb-[2vh]">
              {section.trackingTechnologiesAndCookies.introContent}
            </p>
            
            {/* Cookie Types */}
            <div className="space-y-[1vh] mb-[2vh]">
              {section.trackingTechnologiesAndCookies.cookieTypes.browserCookies && (
                <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight">
                  {section.trackingTechnologiesAndCookies.cookieTypes.browserCookies}
                </p>
              )}
              {section.trackingTechnologiesAndCookies.cookieTypes.flashCookies && (
                <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight">
                  {section.trackingTechnologiesAndCookies.cookieTypes.flashCookies}
                </p>
              )}
              {section.trackingTechnologiesAndCookies.cookieTypes.webBeacons && (
                <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight">
                  {section.trackingTechnologiesAndCookies.cookieTypes.webBeacons}
                </p>
              )}
            </div>

            {/* Cookie Categories */}
            <div className="space-y-[1vh]">
              {section.trackingTechnologiesAndCookies.cookieCategories.essentialCookies && (
                <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight">
                  {section.trackingTechnologiesAndCookies.cookieCategories.essentialCookies}
                </p>
              )}
              {section.trackingTechnologiesAndCookies.cookieCategories.acceptanceCookies && (
                <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight">
                  {section.trackingTechnologiesAndCookies.cookieCategories.acceptanceCookies}
                </p>
              )}
              {section.trackingTechnologiesAndCookies.cookieCategories.functionalityCookies && (
                <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight">
                  {section.trackingTechnologiesAndCookies.cookieCategories.functionalityCookies}
                </p>
              )}
            </div>
          </div>

          {/* Use of Personal Data */}
          <div>
            <h3 className="text-[4vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-bold mb-[2vh]">
              {section.useOfPersonalData.subsectionTitle}
            </h3>
            <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight mb-[1vh]">
              {section.useOfPersonalData.purposes}
            </p>
            <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight">
              {section.useOfPersonalData.sharingScenarios}
            </p>
          </div>

          {/* Other subsections */}
          <div>
            <h3 className="text-[4vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-bold mb-[2vh]">
              {section.retentionOfPersonalData.subsectionTitle}
            </h3>
            <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight">
              {section.retentionOfPersonalData.content}
            </p>
          </div>

          <div>
            <h3 className="text-[4vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-bold mb-[2vh]">
              {section.transferOfPersonalData.subsectionTitle}
            </h3>
            <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight">
              {section.transferOfPersonalData.content}
            </p>
          </div>

          <div>
            <h3 className="text-[4vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-bold mb-[2vh]">
              {section.disclosureOfPersonalData.subsectionTitle}
            </h3>
            <div className="space-y-[1vh]">
              {section.disclosureOfPersonalData.businessTransactions && (
                <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight">
                  <strong>Business Transactions:</strong> {section.disclosureOfPersonalData.businessTransactions}
                </p>
              )}
              {section.disclosureOfPersonalData.lawEnforcement && (
                <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight">
                  <strong>Law Enforcement:</strong> {section.disclosureOfPersonalData.lawEnforcement}
                </p>
              )}
              {section.disclosureOfPersonalData.legalRequirements && (
                <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight">
                  <strong>Legal Requirements:</strong> {section.disclosureOfPersonalData.legalRequirements}
                </p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-[4vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-bold mb-[2vh]">
              {section.securityOfPersonalData.subsectionTitle}
            </h3>
            <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight">
              {section.securityOfPersonalData.content}
            </p>
          </div>
        </div>
      )
    }

    // For other sections, render simple content
    const section = privacyData[selectedCategory as keyof PrivacyPolicyData] as PrivacyPolicySection;
    return (
      <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] leading-tight">
        {section.content}
      </p>
    )
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
