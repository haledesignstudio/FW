'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import MainTitleAnimation from '@/components/MainTitleAnimation'

// Type definitions for FAQ data
interface FAQ {
  question: string
  answer: string
  category: string
  featured?: boolean
  order?: number
}

interface FAQData {
  pageHeader: {
    mainTitle: string
    subtitle?: string
  }
  faqs: FAQ[]
}

interface Props {
  faqData: FAQData
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

export default function FAQClient({ faqData }: Props) {
  const [isLoading] = useState(false)

  // Create grid items for the FAQ layout
  const createGridItems = (): GridItem[] => {
    const items: GridItem[] = []
    let itemId = 1

    // FAQ Header
    items.push({
      id: itemId++,
      content: (
        <div className="flex items-center justify-start h-full w-full overflow-hidden">
          <div className="w-full max-w-full">
            <MainTitleAnimation 
              text={faqData.pageHeader.mainTitle}
              typeSpeed={60}
              delay={500}
              className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[8vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[6vh] font-bold leading-tight"
            />
          </div>
        </div>
      ),
      colSpan: 3,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 3,
      landscapeRowSpan: 1,
    })

    // Empty cells for header row
    items.push({
      id: itemId++,
      content: <></>,
      colSpan: 3,
      rowSpan: 1,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    })

    // FAQ items
    const faqs = faqData.faqs
    faqs.forEach((faq) => {
      items.push({
        id: itemId++,
        content: (
          <>
            <h3 className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[3vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-bold mb-[2vh] leading-tight">
              {faq.question}
            </h3>
            <p className="text-[2.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight text-gray-700">
              {faq.answer}
            </p>
          </>
        ),
        colSpan: 2,
        rowSpan: 2,
        mobileColSpan: 2,
        mobileRowSpan: 2,
        landscapeColSpan: 2,
        landscapeRowSpan: 2,
      })
    })

    // Fill remaining cells with empty content
    const remainingCells = 12 - items.length
    for (let i = 0; i < remainingCells; i++) {
      items.push({
        id: itemId++,
        content: <></>,
        colSpan: 1,
        rowSpan: 1,
        mobileColSpan: 1,
        mobileRowSpan: 1,
        landscapeColSpan: 1,
        landscapeRowSpan: 1,
      })
    }

    return items
  }

  if (isLoading) {
    return null
  }

  const items = createGridItems()

  return (
    <>
      <Header />
      <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
        <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh] max-w-full">
          {items.map((item) => (
            <div key={item.id} className={getGridClasses(item)}>
              {item.content}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
