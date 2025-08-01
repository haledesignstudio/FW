'use client'

import React, { useState, useEffect } from 'react';
import Header from '@/components/header'
import Footer from '@/components/footer'
import MainTitleAnimation from '@/components/MainTitleAnimation'
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation'

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

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

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

export default function FAQClient({ faqData }: Props) {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null)
  const isMobile = useIsMobile();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleQuestion = (index: number) => {
    setSelectedQuestion(selectedQuestion === index ? null : index)
  }

  if (isMobile) {
    // MOBILE LAYOUT
    return (
      <>
        <Header />
        <main className="p-[2vh] bg-[#F9F7F2]">
          <div className="grid grid-cols-4 gap-y-2 auto-rows-min">
            {/* Row 1: Header (cols 1-4) */}
            <div className="col-span-2 row-span-1">
              <div className="flex items-start justify-start w-full">
                <MainTitleAnimation 
                  text={faqData.pageHeader.mainTitle}
                  typeSpeed={60}
                  delay={500}
                  className="text-[5vh] font-bold leading-tight"
                />
              </div>
            </div>
            {/* Row 2: Empty */}
            <div className="col-span-4 row-span-1"></div>
            {/* Row 3: Main Title (already rendered above) */}
            {/* Row 4: Empty */}
            <div className="col-span-4 row-span-1"></div>
            {/* Row 5+: Questions */}
            {faqData.faqs.map((faq, index) => (
              <React.Fragment key={index}>
                {/* Question row: cols 1-3 (right aligned), arrow in col 4 */}
                <div className="col-span-3 flex justify-end items-center">
                  <button
                    onClick={() => setSelectedQuestion(selectedQuestion === index ? null : index)}
                    className="text-right w-full pointer-events-auto cursor-pointer bg-transparent border-none outline-none font-graphik font-normal"
                    style={{ background: 'none' }}
                  >
                    <UnderlineOnHoverAnimation
                      className="text-black font-graphik font-normal"
                      isActive={selectedQuestion === index}
                    >
                      <span className="text-[2.5vh] leading-tight">
                        {faq.question}
                      </span>
                    </UnderlineOnHoverAnimation>
                  </button>
                </div>
                <div className="col-span-1 flex items-center justify-end">
                  <div
                    className="transition-transform duration-300 ease-in-out"
                    style={{ 
                      transform: selectedQuestion === index ? 'rotate(135deg)' : 'rotate(90deg)',
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </div>
                </div>
                {/* If selected, show answer below, cols 2-4 */}
                {selectedQuestion === index && (
                  <div className="col-start-2 col-span-3 animate-fade-in mb-5 mt-5">
                    <p className="text-[2vh] leading-tight text-gray-700">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </React.Fragment>
            ))}
            {/* Back to top button after last FAQ */}
            <div className="col-start-4 col-span-1 flex justify-end items-center mt-2 cursor-pointer" onClick={handleBackToTop}>
              <span className="underline text-[2vh] flex items-center gap-1">Back to top
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
              </span>
            </div>
            {/* Empty row after back to top */}
            <div className="col-span-4 row-span-1"></div>
          </div>
        </main>
        <Footer />
        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
        `}</style>
      </>
    );
  }

  const items: GridItem[] = [
    // Row 1: Empty cells (columns 1-4) - No questions here
    {
      id: 1,
      content: <div className="text-xs text-gray-400"></div>,
      colSpan: 4,
      rowSpan: 1,
      mobileColSpan: 4,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    // Main Title (column 5-6, row 1)
    {
      id: 2,
      content: (
        <div className="flex items-start justify-start h-full w-full overflow-hidden">
          <div className="w-full max-w-full">
            <MainTitleAnimation 
              text={faqData.pageHeader.mainTitle}
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
    // Merged area for questions (columns 1-4, rows 2-4) - Questions start from row 2
    {
      id: 3,
      content: (
        <div className="w-full h-full flex flex-col justify-start gap-6 pr-4">
          {faqData.faqs.map((faq, index) => (
            <button
              key={index}
              onClick={() => toggleQuestion(index)}
              className="text-right w-full pointer-events-auto cursor-pointer bg-transparent border-none outline-none font-graphik font-normal"
              style={{ background: 'none' }}
            >
              <UnderlineOnHoverAnimation
                className="text-black font-graphik font-normal"
                isActive={selectedQuestion === index}
              >
                <span className="text-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] leading-tight">
                  {faq.question}
                </span>
              </UnderlineOnHoverAnimation>
            </button>
          ))}
        </div>
      ),
      colSpan: 4,
      rowSpan: 3,
      mobileColSpan: 4,
      mobileRowSpan: 3,
      landscapeColSpan: 4,
      landscapeRowSpan: 3,
    },
    // Arrows column (column 5, spans from row 2 downwards)
    {
      id: 4,
      content: (
        <div className="w-full h-full flex flex-col justify-start gap-10">
          {faqData.faqs.map((faq, index) => (
            <div key={index} className="flex items-center h-auto">
              <div
                className="self-start transition-transform duration-300 ease-in-out"
                style={{ 
                  transform: selectedQuestion === index ? 'rotate(45deg)' : 'rotate(90deg)',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      ),
      colSpan: 1,
      rowSpan: 3,
      mobileColSpan: 1,
      mobileRowSpan: 3,
      landscapeColSpan: 1,
      landscapeRowSpan: 3,
    },
    // Answer area (column 6, spans from row 2 downwards)
    {
      id: 5,
      content: (
        <div className="w-full h-full overflow-y-auto pr-[1vh] pointer-events-auto">
          {selectedQuestion !== null && faqData.faqs[selectedQuestion] && (
            <div className="animate-fade-in">
              <p className="text-[2.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.8vh] leading-tight text-gray-700">
                {faqData.faqs[selectedQuestion].answer}
              </p>
            </div>
          )}
        </div>
      ),
      colSpan: 1,
      rowSpan: 3,
      mobileColSpan: 1,
      mobileRowSpan: 3,
      landscapeColSpan: 1,
      landscapeRowSpan: 3,
    },
  ];

  return (
    <>
      <Header />
      <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
        <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh]">
          {items.map((item) => (
            <div key={item.id} className={getGridClasses(item)}>
              {item.content}
            </div>
          ))}
        </div>
      </main>
      <Footer />
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
