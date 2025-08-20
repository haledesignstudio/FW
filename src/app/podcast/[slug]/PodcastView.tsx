"use client";

import React from "react";
import FadeInOnVisible from "@/components/FadeInOnVisible";
import UnderlineOnHoverAnimation from "@/components/underlineOnHoverAnimation";
import CommonHeader from "@/components/insights/CommonHeader";
import { getGridClasses } from "@/components/insights/grid";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import type { PodcastDoc } from "./page";
import type { PortableTextBlock } from "@portabletext/types";
import { HighlightText } from '@/components/HighlightText';

interface PodcastViewProps {
  data: PodcastDoc;
  pageTitle: string;
  pageSubheading: PortableTextBlock[];
}

const PodcastView: React.FC<PodcastViewProps> = ({ data, pageTitle, pageSubheading }) => {
  // --- MOBILE ---
  const mobile = (
    <div className="block md:hidden min-h-screen flex flex-col">
      <div className="flex-1 grid grid-cols-4 gap-y-5 w-full">
        {/* Brand/section title from main page (was hardcoded "Podcasts") */}
        <div className="col-span-4 row-span-2"></div>
        <div className="col-span-3 row-span-2 flex items-center">
          <FadeInOnVisible>
            <div className="text-[12vw] font-graphik leading-tight">{pageTitle}</div>
          </FadeInOnVisible>
        </div>

        {/* Row 3-4: Subheading (col 1-4) */}
        <div className="col-span-4 row-span-2">
          <FadeInOnVisible>
            <div className="text-[4vw] font-graphik leading-tight">
              <HighlightText value={pageSubheading} />
            </div>
          </FadeInOnVisible>
        </div>

        {/* Player */}
        
        <div className="col-span-4">
          {data.embedLink ? (
            
            <iframe src={data.embedLink} width="100%" height="100%" />
           
          ) : null}
        </div>
        

        {/* CTA */}
        <div className="col-span-2 row-span-1">
          <FadeInOnVisible>
            <Link href="/keynotes" className="transition font-bold cursor-pointer">
              <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                See Keynotes
              </UnderlineOnHoverAnimation>
            </Link>
          </FadeInOnVisible>
        </div>

        <div
          className="col-start-3 col-span-2 flex justify-end items-center mt-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FadeInOnVisible>
            <span className="underline text-[2vh] flex items-center gap-1 font-bold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: "rotate(-45deg)" }}>
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
              Back to top
            </span>
          </FadeInOnVisible>
        </div>
      </div>
    </div>
  );

  // --- DESKTOP ---
  const gridItems = [
    {
      id: 'podcast-1',
      content: (
        <FadeInOnVisible>
          <div className="text-[clamp(8vw,20vh,10vw)] font-graphik leading-[clamp(8vw,20vh,10vw)]">
            {pageTitle}
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 5,
      rowSpan: 1,
    },
    {
      id: 'podcast-2',
      content: <></>,
      colSpan: 1,
      rowSpan: 1,
    },
    {
      id: 'podcast-3',
      content: (
        <FadeInOnVisible>
          <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-graphik leading-tight">
            <HighlightText value={pageSubheading} />
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 4,
      rowSpan: 2,
    },

    {
      id: "podcast-4",
      content: (
        <div className="w-full h-full">
          {data.embedLink ? <iframe src={data.embedLink} width="100%" height="100%" /> : null}
        </div>
      ),
      colSpan: 6,
      rowSpan: 2,
    },
  ];

  const desktop = (
    <div className="hidden md:block">
      {/* Use main-page title in the header bar */}
      <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[25vh]">
        {gridItems.map((item) => (
          <div
            key={item.id}
            className={getGridClasses({
              id: item.id,
              colSpan: item.colSpan,
              rowSpan: item.rowSpan,
            })}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
      <CommonHeader title={pageTitle} active="podcast" />
        {mobile}
        {desktop}
      </main>
      <Footer />
    </>
  );
};

export default PodcastView;
