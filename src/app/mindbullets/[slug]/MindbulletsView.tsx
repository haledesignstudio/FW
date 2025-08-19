"use client";

import React from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import FadeInOnVisible from "@/components/FadeInOnVisible";
import UnderlineOnHoverAnimation from "@/components/underlineOnHoverAnimation";
import { urlFor } from "@/sanity/lib/image";
import CommonHeader from "@/components/insights/CommonHeader";
import { getGridClasses } from "@/components/insights/grid";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { PortableTextBlock } from '@portabletext/types';
import Link from 'next/link';


type RelatedStory = { title: string; link: string };
type Mindbullet = {
  _id: string;
  title: string;
  slug?: string;
  mainImage?: { asset?: { _type: 'reference'; _ref: string }; alt?: string };
  publishedAt: string;
  dateline: string;
  byLine?: string;
  body: PortableTextBlock[];
  RelatedStories?: RelatedStory[];
};

function splitPortableBlocks(blocks: PortableTextBlock[]): [PortableTextBlock[], PortableTextBlock[]] {
  const mid = Math.ceil(blocks.length / 2);
  return [blocks.slice(0, mid), blocks.slice(mid)];
}

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-[1em]">{children}</p>,
  },
};

interface MindbulletsViewProps {
  data: Mindbullet;
}

const MindbulletsView: React.FC<MindbulletsViewProps> = ({ data }) => {
  const [leftBlocks, rightBlocks] = splitPortableBlocks(data.body || []);

  // --- MOBILE ---
  const mobile = (
    <div className="block md:hidden min-h-screen flex flex-col">
      <div className="flex-1 grid grid-cols-4 gap-y-5 w-full">
        <div className="col-span-4 row-span-2 text-[5vh] font-graphik leading-tight">
          Mindbullets: News from the Future
        </div>
        {data.mainImage?.asset && (
          <div className="col-span-4 row-span-2">
            <img
              src={urlFor(data.mainImage.asset).url()}
              alt={data.mainImage.alt || "Mindbullet image"}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="col-span-4 row-span-1 font-graphik text-[3vh] leading-tight">
          {data.title}
        </div>
        <div className="col-span-4 row-span-1 text-[2vh] font-graphik leading-tight">
          {data.byLine}
        </div>
        <div className="col-span-2 row-span-1 flex items-center">
          <span className="font-roboto text-[1.5vh] leading-tight">
            {new Intl.DateTimeFormat("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            }).format(new Date(`${data.dateline}T00:00:00Z`))}
          </span>
        </div>
        <div className="col-span-4">
          <PortableText value={leftBlocks} components={ptComponents} />
          <PortableText value={rightBlocks} components={ptComponents} />
        </div>
        <div className="col-span-4 h-4" />
        <div className="col-span-4">
          <p className="text-[3vh] font-bold leading-relaxed text-[#DC5A50]"> Warning: Hazardous thinking at work </p>
          <p className="mt-[2vh] text-[2vh] leading-relaxed text-[#DC5A50]">Despite appearances to the contrary, Futureworld cannot and does not predict the future. Our Mindbullets scenarios are fictitious and designed purely to explore possible futures, challenge and stimulate strategic thinking. Use these at your own risk. Any reference to actual people, entities or events is entirely allegorical. Copyright Futureworld International Limited. Reproduction or distribution permitted only with recognition of Copyright and the inclusion of this disclaimer. </p>
        </div>
        <div className="col-span-2 row-span-1">
          <FadeInOnVisible>
            <Link href="/keynotes" className="transition font-bold cursor-pointer">
              <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                See Keynotes
              </UnderlineOnHoverAnimation>
            </Link>
          </FadeInOnVisible>
        </div>
        <div className="col-start-3 col-span-2 flex justify-end items-center mt-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
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
      id: 'mindbullet-1',
      content: (
        <FadeInOnVisible>
          <h1 className="text-[clamp(8vw,20vh,10vw)] font-graphik leading-[clamp(8vw,20vh,10vw)]">
            Mindbullets: News from the Future
          </h1>
        </FadeInOnVisible>
      ),
      colSpan: 5,
      rowSpan: 3,
    },
    {
      id: 'mindbullet-2',
      content: <></>,
      colSpan: 1,
      rowSpan: 3,
    },
    {
      id: 'mindbullet-3',
      content:
        data.mainImage?.asset ? (
          <img
            src={urlFor(data.mainImage.asset).url()}
            alt={'Process image'}
            className="w-full h-full object-cover"
          />
        ) : null,
      colSpan: 6,
      rowSpan: 3,
    },
    {
      id: 'mindbullet-4',
      content: (
        <FadeInOnVisible>
          <div className="h-full flex flex-col gap-[1vh]">
            <div className="font-graphik text-[10vh] leading-tight text-balance">
              {data.title}
            </div>
            <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-graphik leading-tight">
              {data.byLine}
            </div>
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 6,
      rowSpan: 1,
    },
    {
      id: 'mindbullet-5',
      content: (
        <div className="h-full flex items-center">
          <div className="flex flex-row items-center gap-[2vh]">
            <div className="font-roboto text-[clamp(0.9vw,2.5vh,1.25vw)] leading-tight">Dateline</div>
            <div className="font-roboto text-[clamp(0.9vw,2.5vh,1.25vw)] leading-tight">
              {new Intl.DateTimeFormat('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                timeZone: 'UTC',
              }).format(new Date(`${data.dateline}T00:00:00Z`))}
            </div>
          </div>
        </div>
      ),
      colSpan: 6,
      rowSpan: 1,
    }
  ];

  const desktop = (
    <div className="hidden md:block">
      <CommonHeader title={data.title} active="mindbullets" />
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
      <FadeInOnVisible>
        <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 mt-[4vh]">
          <div className="col-span-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-4">
            <div className="grid grid-cols-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-2 gap-[2vh]">
              <div className="prose max-w-none text-[clamp(0.75vw,2vh,1vw)] leading-relaxed">
                <PortableText value={leftBlocks} components={ptComponents} />
              </div>
              <div className="prose max-w-none text-[clamp(0.75vw,2vh,1vw)] leading-relaxed">
                <PortableText value={rightBlocks} components={ptComponents} />
              </div>
            </div>
          </div>
          <div className="col-span-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-2">
            <div className="h-full flex items-start">
              <div className="max-w-none">
                <p className="text-[clamp(0.95vw,2.25vh,1.125vw)] font-bold leading-relaxed text-[#DC5A50]"> Warning: Hazardous thinking at work </p>
                <p className="mt-[2vh] text-[clamp(0.75vw,2vh,1vw)] leading-relaxed text-[#DC5A50]">Despite appearances to the contrary, Futureworld cannot and does not predict the future. Our Mindbullets scenarios are fictitious and designed purely to explore possible futures, challenge and stimulate strategic thinking. Use these at your own risk. Any reference to actual people, entities or events is entirely allegorical. Copyright Futureworld International Limited. Reproduction or distribution permitted only with recognition of Copyright and the inclusion of this disclaimer. </p>
              </div>
            </div>
          </div>
          <div className="hidden [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:block [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-2" />
        </div>
      </FadeInOnVisible>
      {data.RelatedStories?.length ? (
        <FadeInOnVisible>
          <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 mt-[10vh]">
            <div className="col-span-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-2">
              <p className=" text-[clamp(0.75vw,2vh,1vw)] font-bold leading-relaxed">Links to related stories</p>
              <ul className="list space-y-[0.75vh] mt-[2vh]">
                {data.RelatedStories.map((r: RelatedStory, i: number) => (
                  <li key={`${r.link}-${i}`}>
                    <a
                      href={r.link}
                      className="text-[clamp(0.75vw,2vh,1vw)] leading-relaxed"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <UnderlineOnHoverAnimation hasStaticUnderline={true} color="#232323">{r.title}</UnderlineOnHoverAnimation>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:block [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-4" />
          </div>
        </FadeInOnVisible>
      ) : null}
    </div>
  );

  return (
    <>
      <Header />
      <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
        {mobile}
        {desktop}
      </main>
      <Footer />
    </>
  );
};

export default MindbulletsView;
