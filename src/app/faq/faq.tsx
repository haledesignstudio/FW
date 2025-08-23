'use client'

import React, { useState, useEffect } from 'react';
import Header from '@/components/header'
import Footer from '@/components/footer'
import MainTitleAnimation from '@/components/MainTitleAnimation'
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation'
import FadeInOnVisible from '@/components/FadeInOnVisible';
import { motion, AnimatePresence } from 'framer-motion';

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
  const baseClasses = ['bg-[#F9F7F2]', 'flex', 'flex-col', 'items-end', 'relative'];

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
                  className="text-[5vh] font-bold leading-tight text-left"
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
                {/* Question row: spans full width (cols 1-4) */}
                <div className="col-span-4 flex justify-end items-center">
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
            <div className="col-start-3 col-span-2 flex justify-end items-center mt-2 cursor-pointer" onClick={handleBackToTop}>
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
              className="dt-h2"
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
    // Merged area for questions (columns 1-5, rows 2-4) - Expanded to include arrow space
    {
      id: 3,
      content: (
        <FadeInOnVisible>
          <div className="w-full h-full flex flex-col justify-start gap-[4vh]">
            {faqData.faqs.map((faq, index) => (
              <button
                key={index}
                onClick={() => toggleQuestion(index)}
                className="w-full flex items-center justify-end pointer-events-auto cursor-pointer bg-transparent border-none outline-none dt-h4"
                style={{ background: 'none' }}
              >
                <span className="text-[3vh] w-full block text-right">
                  <UnderlineOnHoverAnimation
                    className="dt-h4"
                    isActive={selectedQuestion === index}
                  >
                    {faq.question}
                  </UnderlineOnHoverAnimation>
                </span>
              </button>
            ))}
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 4,
      rowSpan: 3,
      mobileColSpan: 5,
      mobileRowSpan: 3,
      landscapeColSpan: 5,
      landscapeRowSpan: 3,
    },
    {
      id: 4,
      content: (
        <div>

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
          <AnimatePresence mode="wait">
            {selectedQuestion !== null && faqData.faqs[selectedQuestion] && (
              <motion.div
                key={selectedQuestion} // triggers re-animation on question change
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              >
                <p className="dt-body-sm">
                  {faqData.faqs[selectedQuestion].answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
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