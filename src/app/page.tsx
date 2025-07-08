'use client';

import React from "react";
import Header from '@/components/header';
import VerticalAccordion from '@/components/VerticalAccordion';
import type { AccordionItem } from '@/components/VerticalAccordion';
import Footer from '@/components/footer';

type GridItem = {
    id: number;
    content: React.ReactNode;
    colSpan?: number;
    rowSpan?: number;
    bgColor?: string;
};

export default function Home() {
  // Sample accordion data based on the design
  const accordionItems: AccordionItem[] = [
    {
      id: 'benchmark',
      title: 'Benchmark your innovation',
      content: (
        <div className="flex gap-8 h-full">
          {/* Left side - Text content */}
          <div className="flex-1">
            <p className="text-[1.5vw] leading-relaxed mb-6">
              Companies that focus on the right growth areas consistently trade above their intrinsic value. We call this the Innovation Quotient, and we help you earn it.
            </p>
            <div className="mt-8">
              <p className="text-[1vw] underline cursor-pointer hover:no-underline">
                Benchmark your organisation with [person]
              </p>
            </div>
          </div>
          
          {/* Right side - Analytics Dashboard */}
          <div className="flex-1 bg-white rounded-lg p-4 min-h-[400px] flex items-center justify-center">
            <img 
              src="/futureworld-analytics-dashboard.png" 
              alt="Futureworld shareholder value analytics dashboard showing world map with data visualization"
              className="max-w-full h-auto rounded-lg"
              style={{ maxHeight: '500px' }}
            />
          </div>
        </div>
      ),
      color: '#232323'
    },
    {
      id: 'process',
      title: 'Our process',
      content: (
        <div className="flex gap-8 h-full">
          {/* Left side - Content */}
          <div className="flex-1">
            <p className="text-[1.5vw] leading-relaxed mb-8 text-white">
              Our process shatters conventional thinking, ignites bold new ambition, and builds the ventures for your organisation&apos;s future.
            </p>
            
            {/* Three columns of content */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {/* Column 1 */}
              <div>
                <h3 className="text-[1vw] font-bold mb-2 text-white">Disruption is inevitable.</h3>
                <h4 className="text-[1vw] font-bold mb-3 text-white">Understand it—and how you can take action.</h4>
                <p className="text-[0.8vw] leading-relaxed text-white mb-4">
                  Most companies are disrupted before they see it coming.
                </p>
                <p className="text-[0.8vw] leading-relaxed text-white mb-4">
                  We help you see it first—and then take action.
                </p>
                <p className="text-[0.8vw] leading-relaxed text-white">
                  The next wave is coming—lead it instead of chasing it.
                </p>
              </div>
              
              {/* Column 2 */}
              <div>
                <h3 className="text-[1vw] font-bold mb-2 text-white">Exponential growth doesn&apos;t happen by accident.</h3>
                <h4 className="text-[1vw] font-bold mb-3 text-white">Design strategies that make it possible.</h4>
                <p className="text-[0.8vw] leading-relaxed text-white mb-4">
                  We help future-focused leaders design bold, high-velocity growth strategies rooted in real-world execution.
                </p>
                <p className="text-[0.8vw] leading-relaxed text-white">
                  Less guesswork and meaningless vision decks. We help you set targets, execute on the fundamentals and use data to build momentum.
                </p>
              </div>
              
              {/* Column 3 */}
              <div>
                <h3 className="text-[1vw] font-bold mb-2 text-white">Growth requires more than just ideas.</h3>
                <h4 className="text-[1vw] font-bold mb-3 text-white">Create businesses that deliver it.</h4>
                <p className="text-[0.8vw] leading-relaxed text-white mb-4">
                  Our team of proven entrepreneurs and operators work with you to build and scale commercially viable ventures that unlock exponential growth.
                </p>
                <p className="text-[0.8vw] leading-relaxed text-white">
                  We co-invest our capital alongside yours to create tomorrow&apos;s business—together.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right side - Astronaut image */}
          <div className="flex-1 flex items-center justify-center">
            <img 
              src="/assets_task_01jxachkw6e1cs91vmr83ng244_1749474241_img_3 1.png" 
              alt="Astronaut representing innovation and exploration"
              className="max-w-full h-auto"
              style={{ maxHeight: '600px' }}
            />
          </div>
        </div>
      ),
      color: '#DC5A50'
    },
    {
      id: 'case-studies',
      title: 'Case studies',
      content: (
        <div className="p-8 bg-white text-black min-h-[1400px]">
          {/* Main headline */}
          <h2 className="text-8xl font-bold mb-8 leading-tight">Case studies</h2>
          
          {/* Subheadline */}
          <p className="text-lg mb-12 max-w-md leading-relaxed">
            Integer interdum, justo pulvinar bibendum molestie, ex enim interdum 
            libero, viverra posuere nulla massa sit amet nisl.
          </p>
          
          {/* Need to add in component carousel with black and white filter */}
        </div>
      ),
      color: '#F9F7F2'
    }
  ];

  const items: GridItem[] = [
    {
        id: 1,
        content: (
            <>
            </>
        ),
        colSpan: 6,
        rowSpan: 1,
        bgColor: '#F9F7F2'
    },
    {
        id: 2,
        content: (
            <>
                <p className="text-[12vh] font-bold leading-tight text-black">We partner with large
                    organisations to build new, future-relevant businesses,
                    and co-invest in these ventures</p>
            </>
        ),
        colSpan: 6,
        rowSpan: 2,
        bgColor: '#F9F7F2'
    },
    {
        id: 3,
        content: (
            <>
            </>
        ),
        colSpan: 6,
        rowSpan: 1,
        bgColor: '#F9F7F2'
    },
    {
        id: 4,
        content: (
            <>
                <h2 className="text-[5vh] font-bold leading-tight text-black">Growth isn&apos;t optional.</h2>
                <div className="w-16 h-2 bg-red-500 mt-3"></div>
            </>
        ),
        colSpan: 2,
        rowSpan: 1,
        bgColor: '#F9F7F2'
    },
    {
        id: 5,
        content: (
            <>
                <p className="text-[2vh] leading-tight text-black">It drives 71% of total shareholder returns and is the key to long-term relevance. We help you unlock this growth by creating business models that transcend traditional boundaries.</p>
            </>
        ),
        colSpan: 2,
        rowSpan: 1,
        bgColor: '#F9F7F2'
    },
    {
        id: 6,
        content: (
            <>
            </>
        ),
        colSpan: 1,
        rowSpan: 1,
        bgColor: '#F9F7F2'
    },
    {
        id: 7,
        content: (
            <>
                <p className="text-[2vh] leading-tight font-bold underline text-black">Explore what this means for your business.</p>
            </>
        ),
        colSpan: 1,
        rowSpan: 1,
        bgColor: '#F9F7F2'
    },
    {
        id: 8,
        content: (
            <>
            </>
        ),
        colSpan: 6,
        rowSpan: 1,
        bgColor: '#F9F7F2'
    },
    {
        id: 9,
        content: (
            <div className="relative w-full h-full">
                <img 
                    src="/sebastian-svenson-xVRwS5fGJJQ-unsplash.png" 
                    alt="Video background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-0 h-0 border-l-[30px] border-l-white border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent ml-2"></div>
                </div>
            </div>
        ),
        colSpan: 6,
        rowSpan: 3,
        bgColor: '#000000'
    },
    {
        id: 10,
        content: (
            <VerticalAccordion 
                items={accordionItems}
                className="w-full h-full"
                tabHeight={300}
                expandedHeight={1500}
            />
        ),
        colSpan: 6,
        rowSpan: 4,
        bgColor: 'transparent'
    },
    {
        id: 11,
        content: (
            <>
            </>
        ),
        colSpan: 6,
        rowSpan: 1,
        bgColor: '#F9F7F2'
    },
  ];

  return (
    <>
      <Header />
      <main className="p-[4vh] bg-[#F9F7F2]">
        <div
          className="grid gap-[4vh]"
          style={{
            gridTemplateColumns: "repeat(6, 1fr)",
            gridAutoRows: "25vh",
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col ${item.id === 10 ? 'relative -mx-[4vh]' : ''}`}
              style={{
                gridColumn: item.colSpan ? `span ${item.colSpan}` : undefined,
                gridRow: item.rowSpan ? `span ${item.rowSpan}` : undefined,
                backgroundColor: item.bgColor || '#F9F7F2',
                ...(item.id === 10 && {
                  width: 'calc(100vw)',
                  marginLeft: 'calc(-4vh)',
                  marginRight: 'calc(-4vh)'
                })
              }}
            >
              {item.content}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}