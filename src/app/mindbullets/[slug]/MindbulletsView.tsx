"use client";

import React, { useMemo } from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import FadeInOnVisible from "@/components/FadeInOnVisible";
import UnderlineOnHoverAnimation from "@/components/underlineOnHoverAnimation";
import { urlFor } from "@/sanity/lib/image";
import CommonHeader from "@/components/insights/CommonHeader";
import { getGridClasses } from "@/components/insights/grid";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { PortableTextBlock } from "@portabletext/types";
import Link from "next/link";
import Carousel from "@/components/Carousel";

type RelatedStory = { title: string; link: string };

type Mindbullet = {
  _id: string;
  title: string;
  slug?: string;
  mainImage?: { asset?: { _type: "reference"; _ref: string }; alt?: string };
  publishedAt: string;
  dateline: string;
  byLine?: string;
  body: PortableTextBlock[];
  RelatedStories?: RelatedStory[];
};

type MoreCard = {
  _id: string;
  title?: string;
  slug?: string;
  imageUrl?: string;
  description?: string; // plain-text body
};

function splitPortableBlocks(
  blocks: PortableTextBlock[]
): [PortableTextBlock[], PortableTextBlock[]] {
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
  more: MoreCard[]; // passed from the server page (already excludes current slug)
}

const MindbulletsView: React.FC<MindbulletsViewProps> = ({ data, more }) => {
  const [leftBlocks, rightBlocks] = splitPortableBlocks(data.body || []);

  // Map 'more' to Carousel items, double-safety exclude current slug
  const carouselItems = useMemo(() => {
    const current = data.slug ?? "";
    return (more || [])
      .filter((mb) => (mb.slug ?? "") !== current)
      .map((mb) => ({
        src:
          mb.imageUrl && mb.imageUrl.length > 0
            ? mb.imageUrl
            : "/placeholder-image.png",
        heading: mb.title ?? "Untitled",
        description: mb.description ?? "",
        href: mb.slug ? `/mindbullets/${mb.slug}` : "#",
      }));
  }, [more, data.slug]);

  // --- MOBILE ---
  const mobile = (
    <div className="block [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:hidden min-h-screen flex flex-col">
      <div className="flex-1 grid grid-cols-4 gap-y-5 w-full">
        <div className="col-span-4 row-span-2 dt-h1">
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

        <div className="col-span-4 row-span-1 dt-h2">
          {data.title}
        </div>

        <div className="col-span-4 row-span-1 dt-h3">
          {data.byLine}
        </div>

        <div className="col-span-2 row-span-1 flex items-center">
          <span className="dt-body-lg">
            {new Intl.DateTimeFormat("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            }).format(new Date(`${data.dateline}T00:00:00Z`))}
          </span>
        </div>

        {/* Body */}
        <div className="col-span-4 dt-body-sm">
          <PortableText value={leftBlocks} components={ptComponents} />
          <PortableText value={rightBlocks} components={ptComponents} />
        </div>

        {/* Disclaimer */}
        <div className="col-span-4 h-4" />
        <div className="col-span-4">
          <p className="dt-h5 text-[#DC5A50]">
            {" "}
            Warning: Hazardous thinking at work{" "}
          </p>
          <p className="mt-[2vh] dt-body-sm text-[#DC5A50]">
            Despite appearances to the contrary, Futureworld cannot and does not
            predict the future. Our Mindbullets scenarios are fictitious and
            designed purely to explore possible futures, challenge and stimulate
            strategic thinking. Use these at your own risk. Any reference to
            actual people, entities or events is entirely allegorical. Copyright
            Futureworld International Limited. Reproduction or distribution
            permitted only with recognition of Copyright and the inclusion of
            this disclaimer.
          </p>
        </div>

        <div className="col-span-4">
          <div className="mt-[6vh]">
            <div className="dt-h5 mb-[2vh]">
              Related stories
            </div>
            <ul className="space-y-[1vh]">
              {data.RelatedStories!.map((r, i) => (
                <li key={`${r.title}-${i}`}>
                  <a
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dt-body-lg"
                  >
                    <UnderlineOnHoverAnimation
                      hasStaticUnderline={true}
                      color="#232323"
                    >
                      {r.title}
                    </UnderlineOnHoverAnimation>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Carousel (mobile) */}
        {carouselItems.length > 0 && (
          <div className="col-span-4 mt-[25vh]">
            <FadeInOnVisible>
              <div className="dt-h5 mb-[2vh]">You may also like</div>
              <Carousel
                items={carouselItems}
                imageHeight="25vh"
                captionHeight="25vh"
                innerRowGap="4vh"
                gap="4vh"
                mobileImageHeight="22vh"
                mobileCaptionHeight="22vh"
                mobileInnerRowGap="3vh"
                mobileGap="3vh"
              />
            </FadeInOnVisible>
          </div>
        )}

        <div className="col-span-2 row-span-1">
          <FadeInOnVisible>
            <Link
              href="/keynotes"
              className="dt-btn font-bold cursor-pointer"
            >
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
            <span className="underline dt-btn flex items-center gap-1 font-bold">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ transform: "rotate(-45deg)" }}
              >
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
      id: "mindbullet-1",
      content: (
        <FadeInOnVisible>
          <h1 className="dt-h1">
            Mindbullets: News from the Future
          </h1>
        </FadeInOnVisible>
      ),
      colSpan: 5,
      rowSpan: 3,
    },
    {
      id: "mindbullet-2",
      content: <></>,
      colSpan: 1,
      rowSpan: 3,
    },
    {
      id: "mindbullet-3",
      content: data.mainImage?.asset ? (
        <img
          src={urlFor(data.mainImage.asset).url()}
          alt={"Process image"}
          className="w-full h-full object-cover"
        />
      ) : null,
      colSpan: 6,
      rowSpan: 3,
    },
    {
      id: "mindbullet-4",
      content: (
        <FadeInOnVisible>
          <div className="h-full flex flex-col gap-[1vh]">
            <div className="dt-h2 text-balance">
              {data.title}
            </div>
            <div className="dt-h3">
              {data.byLine}
            </div>
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 6,
      rowSpan: 1,
    },
    {
      id: "mindbullet-5",
      content: (
        <div className="h-full flex items-center">
          <div className="flex flex-row items-center gap-[2vh]">
            <div className="dt-body-lg">
              Dateline
            </div>
            <div className="dt-body-lg">
              {new Intl.DateTimeFormat("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              }).format(new Date(`${data.dateline}T00:00:00Z`))}
            </div>
          </div>
        </div>
      ),
      colSpan: 6,
      rowSpan: 1,
    },
  ];

  const desktop = (
    <div className="hidden [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:block">
      <CommonHeader title={data.title} active="mindbullets" />

      {/* Top grid */}
      <div className="grid gap-[2vh] grid-cols-2 auto-rows-[25vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[21vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-x-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-y-[3.2vh]">
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



      {/* Body + disclaimer */}
      <FadeInOnVisible>
        <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 mt-[4vh]">
          <div className="col-span-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-4">
            <div className="grid grid-cols-1 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-2 gap-[2vh]">
              <div className="dt-body-sm">
                <PortableText value={leftBlocks} components={ptComponents} />
              </div>
              <div className="dt-body-sm">
                <PortableText value={rightBlocks} components={ptComponents} />
              </div>
            </div>
          </div>

          <div className="col-span-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-2">
            <div className="h-full flex items-start">
              <div className="max-w-none">
                <p className="dt-h5 text-[#DC5A50]">
                  {" "}
                  Warning: Hazardous thinking at work{" "}
                </p>
                <p className="mt-[2vh] dt-body-sm text-[#DC5A50]">
                  Despite appearances to the contrary, Futureworld cannot and
                  does not predict the future. Our Mindbullets scenarios are
                  fictitious and designed purely to explore possible futures,
                  challenge and stimulate strategic thinking. Use these at your
                  own risk. Any reference to actual people, entities or events
                  is entirely allegorical. Copyright Futureworld International
                  Limited. Reproduction or distribution permitted only with
                  recognition of Copyright and the inclusion of this disclaimer.
                </p>
              </div>
            </div>
          </div>

          <div className="hidden [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:block [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-2" />
        </div>
      </FadeInOnVisible>

      {/* Related links */}
      {data.RelatedStories?.length ? (
        <FadeInOnVisible>
          <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 mt-[10vh]">
            <div className="col-span-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-6">
              <p className="dt-h5">
                Links to related stories
              </p>
              <ul className="list space-y-[0.75vh] mt-[2vh]">
                {data.RelatedStories.map((r: RelatedStory, i: number) => (
                  <li key={`${r.link}-${i}`}>
                    <a
                      href={r.link}
                      className="dt-body-lg"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <UnderlineOnHoverAnimation
                        hasStaticUnderline={true}
                        color="#232323"
                      >
                        {r.title}
                      </UnderlineOnHoverAnimation>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:block [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-4" />
          </div>
        </FadeInOnVisible>
      ) : null}

      {/* Carousel (desktop) */}
      {carouselItems.length > 0 && (
        <FadeInOnVisible>
          <div className="mt-[25vh]">
            <div className="text-[clamp(0.75vw,2vh,1vw)] font-bold leading-relaxed mb-[2vh]">You may also like</div>
            <Carousel
              items={carouselItems}
              imageHeight="25vh"
              captionHeight="25vh"
              innerRowGap="4vh"
              gap="4vh"
            />
          </div>
        </FadeInOnVisible>
      )}
    </div>
  );

  return (
    <>
      <Header />
      <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:px-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:py-[3.2vh] bg-[#F9F7F2]">
        {mobile}
        {desktop}
      </main>
      <Footer />
    </>
  );
};

export default MindbulletsView;
