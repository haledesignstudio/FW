'use client';

import { PortableTextBlock } from '@portabletext/types';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import { HighlightText } from '@/components/HighlightText';
import Carousel from '@/components/Carousel';
import { getGridClasses } from '@/components/insights/grid';
import useIsMobile from '@/hooks/useIsMobile';
import { useCallback } from 'react';
import ProvocativeScenarios from '@/components/ProvocativeScenarios';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';

type ArticleCard = {
  _id: string;
  title: string;
  byline?: string;
  slug?: { current: string } | string;
  image?: { asset?: { url?: string } };
};

type WhatBlewYourMind = {
  embedLink: string;
  cta: string;
  ctaLink: string;
  description: PortableTextBlock[];
};

export default function Edge({
  title,
  subheading,
  contentText,
  whatBlewYourMind,
  articles = [],
}: {
  title: string;
  subheading: PortableTextBlock[];
  contentText: string;
  whatBlewYourMind: WhatBlewYourMind;
  articles?: ArticleCard[];
}) {
  const isMobile = useIsMobile();

  // Build Carousel items from articles
  const carouselItems = (articles ?? []).map((a) => {
    const slugStr = typeof a.slug === 'string' ? a.slug : a.slug?.current;
    return {
      src: a.image?.asset?.url || '/placeholder-image.png',
      heading: a.title,
      description: a.byline ?? '',
      href: slugStr ? `/insights/${slugStr}` : '#',
    };
  });

  const handleBackToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  if (isMobile) {

    return (
      <div className="grid grid-cols-4 gap-y-2 gap-x-2 px-2 w-full">

        <div className="col-span-4 row-span-2 flex items-center">
          <FadeInOnVisible>
            <div className="text-[12vw] font-graphik leading-tight">{title}</div>
          </FadeInOnVisible>
        </div>

        <div className="col-span-4 row-span-6" />

        <div className="col-span-4 row-span-2">
          <FadeInOnVisible>
            <div className="text-[4vw] font-roboto leading-tight">{contentText}</div>
          </FadeInOnVisible>
        </div>

        <div className="col-span-4 row-span-2">
          <FadeInOnVisible>
            <div className="text-[4vw] font-graphik leading-tight">
              <HighlightText value={subheading} />
            </div>
          </FadeInOnVisible>
        </div>

        <div className="col-span-4 row-span-2" />

        <div className="col-span-4 row-end-auto">
          <FadeInOnVisible>
            <Carousel
              items={carouselItems}
              mobileImageHeight="22vh"
              mobileCaptionHeight="22vh"
              mobileInnerRowGap="3vh"
              mobileGap="3vh"
              imageHeight="25vh"
              captionHeight="25vh"
              innerRowGap="4vh"
              gap="4vh"
            />
          </FadeInOnVisible>
        </div>

        <div className="col-span-4 row-start-auto row-end-auto" style={{ minHeight: '12vh' }} />

        <div className="col-span-4 row-end-auto">
          <div className="relative w-full pb-[56.25%]">
            {/* 16:9 = 9/16 = 56.25% */}
            <iframe
              className="absolute inset-0 w-full h-full"
              src={whatBlewYourMind.embedLink}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="mt-[5vh] text-[4vh] font-bold leading-tight">
            <HighlightText value={whatBlewYourMind.description} />
          </div>
          <div className="text-[2vh] font-graphik leading-tight mt-[5vh]">
            <a href={whatBlewYourMind.ctaLink} target="_blank" rel="noopener noreferrer">
              <UnderlineOnHoverAnimation hasStaticUnderline color="#232323">
                {whatBlewYourMind.cta}
              </UnderlineOnHoverAnimation>
            </a>
          </div>
        </div>

        <div className="col-span-4 row-start-auto row-end-auto" style={{ minHeight: '12vh' }} />

        <div className="col-span-4">
          <FadeInOnVisible>
            <ProvocativeScenarios />
          </FadeInOnVisible>
        </div>

        <div
          className="col-span-2 col-start-3 flex justify-end items-center cursor-pointer mt-12"
          onClick={handleBackToTop}
        >
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
      </div>
    );
  }

  // Desktop version
  const gridItems = [
    {
      id: 'edge-1',
      content: (
        <FadeInOnVisible>
          <div className="dt-h1">
            {title}
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 5,
      rowSpan: 3,
    },
    {
      id: 'edge-2',
      content: <></>,
      colSpan: 1,
      rowSpan: 3,
    },
    {
      id: 'edge-3',
      content: (
        <FadeInOnVisible>
          <div className="dt-h4">
            {contentText}
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 2,
    },
    {
      id: 'edge-4',
      content: (
        <FadeInOnVisible>
          <div className="dt-h3">
            <HighlightText value={subheading} />
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 3,
      rowSpan: 2,
    },
    {
      id: 'edge-5',
      content: <></>,
      colSpan: 1,
      rowSpan: 2,
    },
    {
      id: 'edge-7',
      content: (
        <FadeInOnVisible>
          <Carousel
            items={carouselItems}
            imageHeight="25vh"
            captionHeight="25vh"
            innerRowGap="4vh"
            gap="4vh"
          />
        </FadeInOnVisible>
      ),
      colSpan: 6,
      rowSpan: 3,
    },
    {
      id: 'edge-8',
      content: (
        <div className="grid grid-cols-6 gap-[2vh]">

          <div className="col-span-3 grid grid-rows-[1fr_auto] h-full">
            <div className="dt-h3">
              <HighlightText value={whatBlewYourMind.description} />
            </div>


            <div className="dt-btn">
              <a href={whatBlewYourMind.ctaLink} target="_blank" rel="noopener noreferrer">
                <UnderlineOnHoverAnimation hasStaticUnderline color="#232323">
                  {whatBlewYourMind.cta}
                </UnderlineOnHoverAnimation>
              </a>
            </div>
          </div>

          <div className="col-span-3">
            <div className="relative w-full pb-[56.25%]">
              {/* 16:9 = 9/16 = 56.25% */}
              <iframe
                className="absolute inset-0 w-full h-full"
                src={whatBlewYourMind.embedLink}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      ),
      colSpan: 6,
      rowSpan: 2,
    },
  ];

  return (
    <>
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
    </>
  );
}
