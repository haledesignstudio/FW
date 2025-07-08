'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'

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

// Mock data with more FAQs to fill the grid
const mockFAQData: FAQData = {
  pageHeader: {
    mainTitle: "FAQ_"
  },
  faqs: [
    {
      question: "How long has Futureworld been in business?",
      answer: "We've been helping organizations understand, design and create their futures for over 30 years.",
      category: "general",
      order: 1
    },
    {
      question: "What countries does Futureworld operate in?",
      answer: "We are a global strategic advisory and implementation business with clients spanning markets and a network of consultants and partners across six continents.",
      category: "general",
      order: 2
    },
    {
      question: "What kind of organisations do you work with?",
      answer: "We partner with leading organisations across all industries across the globe. Many are large, multinational organisations or government institutions, although our work extends to corporates and businesses of all sizes. We bring an entrepreneurial mindset, internationally, opportunities emerge at the intersect of innovation and change, with risk mitigation and opportunity growth at the fore.",
      category: "services",
      order: 3
    },
    {
      question: "Does Futureworld facilitate strategy events and workshops?",
      answer: "Yes, our network of facilitators and experts deliver strategy sessions, team building, strategic management initiatives and planning sessions at the local and international level.",
      category: "services",
      order: 4
    },
    {
      question: "How does Futureworld add value?",
      answer: "We see more than a strategy partner. Through our proprietary strategy from the future process, we help organisations better understand the future environment in which they seek to operate, and how they can improve their interaction with the future environment.",
      category: "services",
      order: 5
    },
    {
      question: "What makes Futureworld different to other strategy consulting firms?",
      answer: "Our only focus is to help our clients discover, develop and deploy exponential growth strategies, and exponential value creation initiatives through which organizations can experience exponential growth development.",
      category: "services",
      order: 6
    },
    {
      question: "What is an 'exponential growth strategy'?",
      answer: "An exponential growth strategy is not linear growth based on a historic basis but rather provides a unique blueprint for identifying new business opportunities, business model innovation opportunities and devastate incumbents.",
      category: "strategy",
      order: 7
    },
    {
      question: "Does Futureworld provide market analysis?",
      answer: "At Futureworld, we solve very little problems using the same strategies known in the market. Instead, we usually create disruptive approaches that have substantial impact.",
      category: "services",
      order: 8
    },
    {
      question: "What is 'Strategy from the Future'?",
      answer: "Often (frankly, most) the point of departure for conventional strategy planning begins with the question 'where are we today?' This results in sustainable, conventional thinking, the incremental, the benchmarking to growth.",
      category: "strategy",
      order: 9
    },
    {
      question: "What role do futurists play in the Futureworld process?",
      answer: "Our futurists - or gurus, as we call them internally - are an important component in our Strategy from the Future® process. They help our clients tune the business model to the future context and the impact on business, society, and people.",
      category: "process",
      order: 10
    },
    {
      question: "How does Futureworld's co-investment work?",
      answer: "At Futureworld, we help bring the work we do to wide reach of our available co-investment infrastructure, leveraging exponential growth strategies to FutBch, We often take the strategic leadership position.",
      category: "investment",
      order: 11
    }
  ]
}

export default function FAQPage() {
  const [faqData] = useState<FAQData>(mockFAQData)
  const [isLoading] = useState(false)

  // Create grid items for the FAQ layout
  const createGridItems = (): GridItem[] => {
    const items: GridItem[] = []
    let itemId = 1

    // Row 1 - Empty (for spacing)
    for (let col = 1; col <= 6; col++) {
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

    // FAQ Header - Row 2, Column 1
    items.push({
      id: itemId++,
      content: (
        <div className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] flex items-center">
          <h1 className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[8vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[6vh] font-bold leading-tight">
            {faqData.pageHeader.mainTitle}
          </h1>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    })

    const faqs = faqData.faqs
    let faqIndex = 0

    // Column 1: FAQ spanning rows 3-5 (merged rows)
    if (faqIndex < faqs.length) {
      const faq = faqs[faqIndex++]
      items.push({
        id: itemId++,
        content: (
          <div className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[3vh] h-full overflow-y-auto">
            <h3 className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[3vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-bold mb-[2vh] leading-tight">
              {faq.question}
            </h3>
            <p className="text-[2.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight text-gray-700">
              {faq.answer}
            </p>
          </div>
        ),
        colSpan: 1,
        rowSpan: 3, // Spans rows 3-5
        mobileColSpan: 2,
        mobileRowSpan: 3,
        landscapeColSpan: 1,
        landscapeRowSpan: 3,
      })
    } else {
      // Empty merged cell if no FAQ
      items.push({
        id: itemId++,
        content: <></>,
        colSpan: 1,
        rowSpan: 3,
        mobileColSpan: 2,
        mobileRowSpan: 3,
        landscapeColSpan: 1,
        landscapeRowSpan: 3,
      })
    }

    // Columns 2-6: FAQs spanning rows 2-5 (merged rows)
    for (let col = 2; col <= 6; col++) {
      if (faqIndex < faqs.length) {
        const faq = faqs[faqIndex++]
        items.push({
          id: itemId++,
          content: (
            <div className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[3vh] h-full overflow-y-auto">
              <h3 className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[3vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-bold mb-[2vh] leading-tight">
                {faq.question}
              </h3>
              <p className="text-[2.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight text-gray-700">
                {faq.answer}
              </p>
            </div>
          ),
          colSpan: 1,
          rowSpan: 4, // Spans rows 2-5
          mobileColSpan: 2,
          mobileRowSpan: 4,
          landscapeColSpan: 1,
          landscapeRowSpan: 4,
        })
      } else {
        // Empty merged cell if no FAQ
        items.push({
          id: itemId++,
          content: <></>,
          colSpan: 1,
          rowSpan: 4,
          mobileColSpan: 2,
          mobileRowSpan: 4,
          landscapeColSpan: 1,
          landscapeRowSpan: 4,
        })
      }
    }

    return items
  }

  if (isLoading) {
    return null
  }

  const items = createGridItems()

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
