'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { client } from '@/sanity/lib/client';
import { privacyPolicyQuery } from '@/sanity/lib/queries';

// Type definitions for the privacy policy data
interface PrivacyPolicySection {
  sectionTitle: string
  content?: string
  interpretationContent?: string
  definitionsContent?: string
  typesOfDataContent?: string
  personalDataContent?: string
  usageDataContent?: string
  useOfDataContent?: string
  retentionContent?: string
  transferContent?: string
  disclosureContent?: string
  securityContent?: string
  contactDetails?: {
    email?: string
    phone?: string
    address?: string
    website?: string
  }
}

interface PrivacyPolicyData {
  pageHeader: {
    mainTitle: string
    lastUpdated: string
    effectiveDate?: string
  }
  interpretationAndDefinitionsSection: PrivacyPolicySection
  collectingAndUsingDataSection: PrivacyPolicySection
  childrensPrivacySection: PrivacyPolicySection
  linksToOtherWebsitesSection: PrivacyPolicySection
  changesToPolicySection: PrivacyPolicySection
  contactUsSection: PrivacyPolicySection
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
const mockPrivacyData: PrivacyPolicyData = {
  pageHeader: {
    mainTitle: "Privacy Policy",
    lastUpdated: "2024-01-15",
    effectiveDate: "2024-01-01"
  },
  interpretationAndDefinitionsSection: {
    sectionTitle: "Interpretation and Definitions",
    interpretationContent: "The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.",
    definitionsContent: "For the purposes of this Privacy Policy: Account means a unique account created for You to access our Service or parts of our Service. Company (referred to as either 'the Company', 'We', 'Us' or 'Our' in this Agreement) refers to FutureWorld, 30 4th Avenue, Parkhurst, 2193, Johannesburg."
  },
  collectingAndUsingDataSection: {
    sectionTitle: "Collecting and Using Your Personal Data",
    typesOfDataContent: "While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You.",
    personalDataContent: "Personal Data may include, but is not limited to: Email address, First name and last name, Phone number, Address, State, Province, ZIP/Postal code, City, Country",
    usageDataContent: "Usage Data is collected automatically when using the Service. Usage Data may include information such as Your Device's Internet Protocol address, browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.",
    useOfDataContent: "We may use Personal Data for the following purposes: To provide and maintain our Service, including to monitor the usage of our Service. To manage Your Account and to contact You.",
    retentionContent: "We will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy.",
    transferContent: "Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located.",
    disclosureContent: "We may disclose Your Personal Data in the good faith belief that such action is necessary to comply with a legal obligation, protect and defend the rights or property of the Company.",
    securityContent: "The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure."
  },
  childrensPrivacySection: {
    sectionTitle: "Children's Privacy",
    content: "Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us."
  },
  linksToOtherWebsitesSection: {
    sectionTitle: "Links to Other Websites",
    content: "Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit."
  },
  changesToPolicySection: {
    sectionTitle: "Changes to this Privacy Policy",
    content: "We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page. We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the 'Last updated' date at the top of this Privacy Policy."
  },
  contactUsSection: {
    sectionTitle: "Contact Us",
    content: "If you have any questions about this Privacy Policy, You can contact us:",
    contactDetails: {
      email: "privacy@futureworld.co.za",
      phone: "+27 11 123 4567",
      address: "30 4th Avenue, Parkhurst, 2193, Johannesburg, South Africa",
      website: "https://www.futureworld.co.za"
    }
  }
}

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

export default function PrivacyPolicyPage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].key)
  const [privacyData, setPrivacyData] = useState<PrivacyPolicyData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPrivacyData = async () => {
      try {
        const data = await client.fetch(privacyPolicyQuery)
        setPrivacyData(data || mockPrivacyData)
      } catch (error) {
        console.error('Error fetching privacy policy data:', error)
        setPrivacyData(mockPrivacyData)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPrivacyData()
  }, [])

  if (isLoading || !privacyData) {
    return null;
  }

  const renderContent = () => {
    const section = privacyData[selectedCategory as keyof PrivacyPolicyData] as PrivacyPolicySection
    
    if (!section) return null

    if (selectedCategory === 'interpretationAndDefinitionsSection') {
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
      return (
        <div className="space-y-[3vh]">
          <div>
            <h3 className="text-[4vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-bold mb-[2vh]">Types of Data Collected</h3>
            <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight">
              {section.typesOfDataContent}
            </p>
          </div>
          <div>
            <h3 className="text-[4vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-bold mb-[2vh]">Personal Data</h3>
            <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight">
              {section.personalDataContent}
            </p>
          </div>
          <div>
            <h3 className="text-[4vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-bold mb-[2vh]">Usage Data</h3>
            <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight">
              {section.usageDataContent}
            </p>
          </div>
        </div>
      )
    }

    if (selectedCategory === 'contactUsSection') {
      return (
        <div className="space-y-[4vh]">
          <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] leading-tight">
            {section.content}
          </p>
          {section.contactDetails && (
            <div className="space-y-[2vh]">
              <h4 className="text-[4vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-bold">Contact Details</h4>
              <div className="space-y-[1vh]">
                {section.contactDetails.email && (
                  <div>
                    <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.8vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] font-bold">Email</p>
                    <a href={`mailto:${section.contactDetails.email}`} className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh] underline">
                      {section.contactDetails.email}
                    </a>
                  </div>
                )}
                {section.contactDetails.phone && (
                  <div>
                    <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.8vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] font-bold">Phone</p>
                    <a href={`tel:${section.contactDetails.phone}`} className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh] underline">
                      {section.contactDetails.phone}
                    </a>
                  </div>
                )}
                {section.contactDetails.address && (
                  <div>
                    <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.8vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] font-bold">Address</p>
                    <p className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh]">{section.contactDetails.address}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )
    }

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
            {(privacyData[selectedCategory as keyof PrivacyPolicyData] as PrivacyPolicySection).sectionTitle}
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
    // Privacy Policy main header - Right side (columns 5-6, row 2)
    {
      id: 9,
      content: (
        <div className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh]">
          <p className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[12vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight">
            Privacy Policy_
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
    // Privacy policy navigation and contact info - Columns 5-6, starting row 3
    {
      id: 12,
      content: (
        <div className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh]">
          <div className="space-y-[3vh]">
            <div>
              <h3 className="text-[4vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[3vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[3vh] font-bold mb-[2vh]">Quick Navigation</h3>
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
              <h4 className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-bold mb-[2vh]">Contact Information</h4>
              <div className="space-y-[1vh] text-[2.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh]">
                <div>
                  <p className="font-bold">Email</p>
                  <p>privacy@futureworld.co.za</p>
                </div>
                <div>
                  <p className="font-bold">Phone</p>
                  <p>+27 11 123 4567</p>
                </div>
                <div>
                  <p className="font-bold">Address</p>
                  <p>30 4th Avenue<br />Parkhurst, 2193<br />Johannesburg, South Africa</p>
                </div>
              </div>
            </div>

            {privacyData.pageHeader.effectiveDate && (
              <div className="border-t border-gray-300 pt-[3vh]">
                <div className="text-[2.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh]">
                  <p className="font-bold">Effective Date</p>
                  <p>{new Date(privacyData.pageHeader.effectiveDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
              </div>
            )}
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
    <div className="min-h-screen bg-[#F9F7F2] flex flex-col">
      <Header />
      <main className="flex-1 p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh]">
        <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[10vh]">
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
