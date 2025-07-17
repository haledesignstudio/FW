'use client';

import React, { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';

type ContactPageContent = {
  title: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  pageHeader: {
    mainTitle: string;
  };
  officesSubheading?: string;
  officesAroundTheWorld: Array<{
    name: string;
    email: string;
    image: {
      asset: {
        _ref: string;
        _type: string;
      };
      alt?: string;
    };
  }>;
  keynoteSubheading?: string;
  bookingKeynote?: {
    title: string;
    subtitle?: string;
    text: string;
    link: string;
  };
};

export default function Contact({ data }: { data: ContactPageContent }) {
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
        <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh]">
          
          {/* ROW 1: Header (cols 1-2) + Empty (cols 3-6) */}
          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:768px)]:col-span-4 [@media(max-height:600px)_and_(max-width:768px)]:row-span-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-1 border border-gray-300">
            <div className="h-full w-full flex items-start justify-start">
              <div className="w-full max-w-full">
                <MainTitleAnimation 
                  text={data.pageHeader.mainTitle}
                  typeSpeed={60}
                  delay={500}
                  className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[8vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight"
                />
              </div>
            </div>
          </div>

          {/* ROW 1: Empty (cols 3-6) */}
          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:768px)]:col-span-4 [@media(max-height:600px)_and_(max-width:768px)]:row-span-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-1 border border-gray-300">
            <div></div>
          </div>


          {/* ROW 2: Images and expansion logic */}
          {[0, 1, 2].map((i) => {
            const isHovered = hoveredImageIndex === i;
            // Image expands to cols i+1 and i+2 when hovered
            const gridCol = isHovered ? `${i + 1} / span 2` : `${i + 1} / span 1`;
            return (
              <React.Fragment key={`row2-img-${i}`}>
                <div
                  className={`bg-[#F9F7F2] flex flex-col row-span-1 border border-gray-300 [@media(max-height:600px)_and_(max-width:768px)]:col-span-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-1`}
                  style={{ gridColumn: gridCol }}
                >
                  <div
                    className="h-full w-full relative cursor-pointer"
                    onMouseEnter={() => setHoveredImageIndex(i)}
                    onMouseLeave={() => setHoveredImageIndex(null)}
                  >
                    <img
                      src={data.officesAroundTheWorld[i]?.image ? urlFor(data.officesAroundTheWorld[i].image.asset).url() : '/placeholder-image.png'}
                      alt={data.officesAroundTheWorld[i]?.image?.alt || data.officesAroundTheWorld[i]?.name}
                      className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}
                    />
                  </div>
                </div>
                {/* Info cell for top row images, appears at col i+2 when hovered */}
                {isHovered && (
                  <div
                    className="bg-[#F9F7F2] h-full flex flex-col items-center justify-center p-4 border border-gray-300"
                    style={{ gridRow: 2, gridColumn: i + 2 }}
                  >
                    <h3 className="text-[2vh] font-semibold mb-2 text-center text-black">
                      {data.officesAroundTheWorld[i]?.name}
                    </h3>
                    <a
                      href={`mailto:${data.officesAroundTheWorld[i]?.email}`}
                      className="text-[1.5vh] underline hover:no-underline text-center text-black"
                    >
                      {data.officesAroundTheWorld[i]?.email}
                    </a>
                  </div>
                )}
              </React.Fragment>
            );
          })}
          {/* Extra empty column for spacing between images and subheading (remains for layout, but info cell overlays here) */}
          <div className="bg-[#F9F7F2] row-span-1 border border-gray-300" style={{ gridColumn: 4 }}></div>

          {/* ROW 2: Offices Subheading (cols 5-6) */}
          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:768px)]:col-span-4 [@media(max-height:600px)_and_(max-width:768px)]:row-span-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-1 border border-gray-300">
            <div className="h-full w-full flex items-center justify-start">
              <h2 className="text-[2.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-bold">
                {data.officesSubheading || "Our Offices"}
              </h2>
            </div>
          </div>


          {/* ROW 3: Images and expansion logic */}
          {[3, 4, 5].map((i) => {
            const isHovered = hoveredImageIndex === i;
            // Image expands to cols i-2 and i-1 when hovered
            const gridCol = isHovered ? `${i - 2} / span 2` : `${i - 2} / span 1`;
            return (
              <React.Fragment key={`row3-img-${i}`}>
                <div
                  className={`bg-[#F9F7F2] flex flex-col row-span-1 border border-gray-300 [@media(max-height:600px)_and_(max-width:768px)]:col-span-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-1`}
                  style={{ gridColumn: gridCol }}
                >
                  <div
                    className="h-full w-full relative cursor-pointer"
                    onMouseEnter={() => setHoveredImageIndex(i)}
                    onMouseLeave={() => setHoveredImageIndex(null)}
                  >
                    <img
                      src={data.officesAroundTheWorld[i]?.image ? urlFor(data.officesAroundTheWorld[i].image.asset).url() : '/placeholder-image.png'}
                      alt={data.officesAroundTheWorld[i]?.image?.alt || data.officesAroundTheWorld[i]?.name}
                      className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}
                    />
                  </div>
                </div>
                {/* Info cell for bottom row images, appears at col i-1 in row 1 when hovered */}
                {isHovered && (
                  <div
                    className="bg-[#F9F7F2] h-full flex flex-col items-center justify-center p-4 border border-gray-300"
                    style={{ gridRow: 1, gridColumn: i - 1 }}
                  >
                    <h3 className="text-[2vh] font-semibold mb-2 text-center text-black">
                      {data.officesAroundTheWorld[i]?.name}
                    </h3>
                    <a
                      href={`mailto:${data.officesAroundTheWorld[i]?.email}`}
                      className="text-[1.5vh] underline hover:no-underline text-center text-black"
                    >
                      {data.officesAroundTheWorld[i]?.email}
                    </a>
                  </div>
                )}
              </React.Fragment>
            );
          })}
          {/* Extra empty column for spacing between images and subheading */}
          <div className="bg-[#F9F7F2] row-span-1 border border-gray-300" style={{ gridColumn: 4 }}></div>

          {/* ROW 4: Blank */}
          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:768px)]:col-span-4 [@media(max-height:600px)_and_(max-width:768px)]:row-span-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-6 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-1 border border-gray-300">
            <div></div>
          </div>

          {/* ROW 5: Keynote Title (cols 1-3) */}
          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:768px)]:col-span-4 [@media(max-height:600px)_and_(max-width:768px)]:row-span-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-3 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-1 border border-gray-300">
            <div className="h-full w-full flex items-center justify-start">
              <div className="w-full max-w-full">
                <MainTitleAnimation 
                  text={data.bookingKeynote?.title || "Book a Keynote"}
                  typeSpeed={60}
                  delay={1500}
                  className="text-[4vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[6vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[6vh] font-bold leading-tight"
                />
              </div>
            </div>
          </div>

          {/* ROW 5: Empty (col 4) */}
          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:768px)]:col-span-4 [@media(max-height:600px)_and_(max-width:768px)]:row-span-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-1 border border-gray-300">
            <div></div>
          </div>

          {/* ROW 5: Text + Link (cols 5-6) */}
          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:768px)]:col-span-4 [@media(max-height:600px)_and_(max-width:768px)]:row-span-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-1 border border-gray-300">
            <div className="h-full w-full flex flex-col items-start justify-center">
              <p className="text-[1.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh] mb-4">
                {data.bookingKeynote?.text || "Contact us to book a keynote speaker for your event."}
              </p>
              <Link
                href="/speakers"
                className="text-[1.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[1.5vh] underline hover:no-underline"
              >
                Visit Keynote Speakers Page
              </Link>
            </div>
          </div>

          {/* ROW 6: Keynote Subheading (cols 1-3) */}
          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:768px)]:col-span-4 [@media(max-height:600px)_and_(max-width:768px)]:row-span-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-3 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-1 border border-gray-300">
            <div className="h-full w-full flex items-center justify-start">
              <h2 className="text-[2.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2.5vh] font-bold">
                {data.keynoteSubheading || "Keynote Speakers"}
              </h2>
            </div>
          </div>

          {/* ROW 6: Empty (cols 4-6) */}
          <div className="bg-[#F9F7F2] flex flex-col col-span-2 row-span-1 [@media(max-height:600px)_and_(max-width:768px)]:col-span-4 [@media(max-height:600px)_and_(max-width:768px)]:row-span-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-3 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-1 border border-gray-300">
            <div></div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
