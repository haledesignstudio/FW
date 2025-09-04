'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import type { OurWorkContent } from '@/app/our-work/our-work';
import { urlFor } from '@/sanity/lib/image';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import Link from 'next/link';
import FadeInOnVisible from './FadeInOnVisible';
import type { PortableTextBlock, PortableTextSpan } from '@portabletext/types';
import { client } from '@/sanity/lib/client';
import { caseStudyQuery } from '@/sanity/lib/queries';
import CaseStudiesCarousel, { type CarouselItem } from '@/components/CaseStudiesCarousel';
import { getImageDimensions } from '@sanity/asset-utils';

type OurWorkAccordionProps = { data: OurWorkContent };

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

// shape returned by your caseStudyQuery
type CaseStudyFromQuery = {
  _id: string;
  title: string;
  slug?: string | null;
  image?: { url?: string | null } | null;
  summary?: PortableTextBlock[] | null;
};

function extractSummaryText(summary?: PortableTextBlock[] | null): string {
  if (!summary || summary.length === 0) return '';
  // find the first "block" and its first span with text
  const block = summary.find(b => b._type === 'block');
  if (!block || !Array.isArray(block.children)) return '';
  const firstSpan = block.children.find(
    (c): c is PortableTextSpan => c._type === 'span' && typeof c.text === 'string'
  );
  return firstSpan?.text ?? '';
}


// Custom hook to detect responsive layout
const useResponsiveLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Mobile: not tablet landscape and not desktop
      const isTabletLandscape = window.matchMedia('(max-height: 600px) and (max-width: 1080px)').matches;
      const isDesktop = window.matchMedia('(min-width: 1080px) and (min-aspect-ratio: 1/1)').matches;
      setIsMobile(!isTabletLandscape && !isDesktop);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile };
};

function getGridClasses(item: GridItem) {
  const base = ['flex', 'flex-col'];
  if (item.mobileColSpan === 0 || item.mobileRowSpan === 0) {
    base.push('block', '[@media(max-width:1080px)]:hidden');
  } else {
    base.push(`col-span-${item.mobileColSpan}`, `row-span-${item.mobileRowSpan}`);
  }
  if (item.landscapeColSpan === 0 || item.landscapeRowSpan === 0) {
    base.push('[@media(max-height:600px)_and_(max-width:1080px)]:hidden');
  } else {
    base.push(`[@media(max-height:600px)_and_(max-width:1080px)]:col-span-${item.landscapeColSpan}`);
    base.push(`[@media(max-height:600px)_and_(max-width:1080px)]:row-span-${item.landscapeRowSpan}`);
  }
  if (item.colSpan === 0 || item.rowSpan === 0) {
    base.push('[@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:hidden');
  } else {
    base.push(`[@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:col-span-${item.colSpan}`);
    base.push(`[@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:row-span-${item.rowSpan}`);
  }
  return base.join(' ');
}

const hoverHintWhenClosed = (isActive: boolean) =>
  !isActive
    ? [
      // smooth + GPU
      "motion-safe:will-change-transform motion-safe:transition-transform motion-safe:duration-300",
      // the hint
      "hover:-translate-y-[4px] hover:scale-[1.01] ",
    ].join(" ")
    : "";

export default function OurWorkAccordion({ data }: OurWorkAccordionProps) {
  const [openTabs, setOpenTabs] = useState<Set<string>>(new Set());


  // Pulse delay logic for closed tabs (must be after openTabs is initialized)
  const tabOrder = ['supercharge-tomorrow', 'case-studies'];
  const closedTabs = tabOrder.filter(tabId => !openTabs.has(tabId));
  const closedTabDelays: Record<string, number> = {};
  closedTabs.forEach((tabId, idx) => {
    closedTabDelays[tabId] = idx;
  });
  const { isMobile } = useResponsiveLayout();
  // Auto-open all tabs on mobile and keep them open
  useEffect(() => {
    if (isMobile) {
      setOpenTabs(new Set(['supercharge-tomorrow', 'case-studies']));
    }
  }, [isMobile]);

  // ⬇️ Load case studies via GROQ (same as HomeAccordion)
  const [caseStudies, setCaseStudies] = useState<CaseStudyFromQuery[]>([]);
  useEffect(() => {
    const load = async () => {
      try {
        const studies = await client.fetch<CaseStudyFromQuery[]>(caseStudyQuery);
        setCaseStudies(studies ?? []);
      } catch (err) {
        console.error('Error loading case studies:', err);
        setCaseStudies([]);
      }
    };
    load();
  }, []);

  const carouselItems: CarouselItem[] = useMemo(() => {
    return (caseStudies || []).map((cs) => {
      const description = extractSummaryText(cs.summary);


      return {
        src: cs.image?.url ?? '',
        heading: cs.title,
        description,
        href: cs.slug ? `/case-study/${cs.slug}` : undefined,
      };
    });
  }, [caseStudies]);

  // Helper function to toggle a tab's open state
  const toggleTab = (tabId: string) => {
    setOpenTabs(prevOpenTabs => {
      const next = new Set(prevOpenTabs);
      if (next.has(tabId)) next.delete(tabId);
      else next.add(tabId);
      return next;
    });
  };

  const tabs: {
    id: string;
    color: string;
    titleItem: GridItem;
    items: GridItem[];
  }[] = [
      {
        id: 'supercharge-tomorrow',
        color: '#1B1B1B',
        titleItem: {
          id: 0,
          colSpan: 6,
          rowSpan: 2,
          mobileColSpan: 2,
          mobileRowSpan: 1,
          landscapeColSpan: 6,
          landscapeRowSpan: 1,
          content: (
            <FadeInOnVisible>
              <div
                className="dt-h1 cursor-pointer"
                onClick={isMobile ? undefined : (e) => { e.stopPropagation(); toggleTab('supercharge-tomorrow'); }}
              >
                {data.accordionSection1.heading}
              </div>
            </FadeInOnVisible>
          ),
        },
        items: [
          {
            id: 1,
            content: (
              <FadeInOnVisible>
                <div className="dt-h4 text-[#F9F7F2]">
                  <PortableText value={data.accordionSection1.body} />
                </div>
              </FadeInOnVisible>
            ),
            colSpan: 2,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 1,
            landscapeColSpan: 3,
            landscapeRowSpan: 1,
          },
          {
            id: 2,
            content: <></>,
            colSpan: 1,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 1,
            landscapeColSpan: 3,
            landscapeRowSpan: 1,
          },
          {
            id: 3,
            content: data.accordionSection1.mainImage.asset ? (
              <Image
                src={urlFor(data.accordionSection1.mainImage.asset).quality(75).auto('format').url()}
                width={getImageDimensions(data.accordionSection1.mainImage.asset).width}
                height={getImageDimensions(data.accordionSection1.mainImage.asset).height}
                alt={'Process image'}
                className="w-[80vw] h-[100vh] object-contain mt-[-30vh]"
              />
            ) : null,
            colSpan: 3,
            rowSpan: 3,
            mobileColSpan: 2,
            mobileRowSpan: 1,
            landscapeColSpan: 3,
            landscapeRowSpan: 1,
          },
          {
            id: 4,
            content: data.accordionSection1.brandImage.asset ? (
              <FadeInOnVisible className="w-full object-contain">
                <Image
                  src={urlFor(data.accordionSection1.brandImage.asset).quality(75).auto('format').url()}
                  width={getImageDimensions(data.accordionSection1.brandImage.asset).width}
                  height={getImageDimensions(data.accordionSection1.brandImage.asset).height}
                  alt={'Process image'}
                  className="w-[70%] h-auto object-contain"
                />
              </FadeInOnVisible>
            ) : null,
            colSpan: 2,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 1,
            landscapeColSpan: 3,
            landscapeRowSpan: 1,
          },
          {
            id: 5,
            content: <></>,
            colSpan: 1,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 1,
            landscapeColSpan: 3,
            landscapeRowSpan: 1,
          },
          {
            id: 6,
            content: (
              <FadeInOnVisible className="h-full flex flex-col justify-center">
                <Link href="/supercharge-tomorrow" className="h-full flex flex-col justify-center">
                  <div className="dt-btn">
                    <UnderlineOnHoverAnimation hasStaticUnderline color="#fff">
                      {data.accordionSection1.cta ?? 'Get in Touch'}
                    </UnderlineOnHoverAnimation>
                  </div>
                </Link>
              </FadeInOnVisible>
            ),
            colSpan: 1,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 1,
            landscapeColSpan: 3,
            landscapeRowSpan: 1,
          },
        ],
      },

      {
        id: 'case-studies',
        color: '#F9F7F2',
        titleItem: {
          id: 0,
          colSpan: 6, rowSpan: 1,
          mobileColSpan: 2, mobileRowSpan: 1,
          landscapeColSpan: 6, landscapeRowSpan: 1,
          content: (
            <FadeInOnVisible>
              <div
                className="dt-h1 cursor-pointer"
                onClick={isMobile ? undefined : (e) => { e.stopPropagation(); toggleTab('case-studies'); }}
              >
                {data.accordionSection2.heading}
              </div>
            </FadeInOnVisible>
          ),
        },
        items: [
          {
            id: 1,
            content: (
              <FadeInOnVisible className="h-full flex flex-col justify-end">
                <div className="h-full flex flex-col justify-end">
                  <div className="dt-h4">
                    <PortableText value={data.accordionSection2.body} />
                  </div>
                </div>
              </FadeInOnVisible>
            ),
            colSpan: 2,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 1,
            landscapeColSpan: 3,
            landscapeRowSpan: 1,
          },
        ],
      },
    ];

  return (
    <div className="">
      {isMobile ? (
        /* Mobile Layout - Individual Tab Containers with Overlap */
        <div className="">
          {/* Section 1: Supercharge Tomorrow */}
          <div
            className="transition-all duration-500 overflow-hidden"
            style={{
              backgroundColor: '#1B1B1B',
              color: '#fff',
            }}
            onClick={isMobile ? undefined : () => toggleTab('supercharge-tomorrow')}
          >
            <div className={[
              "overflow-hidden transition-[max-height] duration-500",
              !openTabs.has('supercharge-tomorrow')
                ? "max-h-[16vh]"
                : "max-h-[9999px]"
            ].join(' ')}>
              <div className="grid grid-cols-4 gap-x-[4.53vw] gap-y-[2.09vh]" style={{ gridAutoRows: 'minmax(7.701vh, max-content)' }}>
                {(isMobile || openTabs.has('supercharge-tomorrow')) && (
                  <>
                    {/* Row 1-2: Section Title */}
                    <div
                      className="px-[4.53vw] py-[2.09vh] col-span-4 row-start-1 row-span-2 bg-[#1B1B1B] text-[#F9F7F2] flex items-start cursor-pointer z-10"
                      onClick={isMobile ? undefined : (e) => { e.stopPropagation(); toggleTab('supercharge-tomorrow'); }}
                    >
                      <h2 className="dt-h1 leading-none">{data.accordionSection1.heading}</h2>
                    </div>

                    {/* Row 3: Section Body */}
                    <div className="px-[4.53vw] col-span-4 row-start-3 bg-[#1B1B1B] text-[#F9F7F2]">
                      <div className="dt-h4">
                        <PortableText value={data.accordionSection1.body} />
                      </div>
                    </div>

                    {/* Rows 4-8: Container for overlapping content */}
                    <div className="px-[4.53vw] col-span-4 row-start-4 row-span-4 bg-[#1B1B1B] relative">
                      {/* Background Image - Full container */}
                      {data.accordionSection1.mainImage.asset && (
                        <div className="absolute inset-0">
                          <Image
                            src={urlFor(data.accordionSection1.mainImage.asset).quality(75).auto('format').url()}
                            width={getImageDimensions(data.accordionSection1.mainImage.asset).width}
                            height={getImageDimensions(data.accordionSection1.mainImage.asset).height}
                            alt={'Main image'}
                            className="w-[65%] h-full object-cover opacity-50 ml-auto"
                          />
                        </div>
                      )}

                      {/* Content Grid - Overlaid on top */}
                      <div className="relative z-10 grid grid-cols-2 h-full">
                        {/* Top Left: Brand Image */}
                        <div className="flex items-start">
                          {data.accordionSection1.brandImage.asset && (
                            <Image
                              src={urlFor(data.accordionSection1.brandImage.asset).quality(75).auto('format').url()}
                              width={getImageDimensions(data.accordionSection1.brandImage.asset).width}
                              height={getImageDimensions(data.accordionSection1.brandImage.asset).height}
                              alt={'Brand image'}
                              className="w-full h-auto object-contain max-h-[15vh]"
                            />
                          )}
                        </div>


                        {/* Bottom Left (spans 2 cols): CTA Button */}
                        <div className="col-span-2 mb-4 flex items-end justify-start mb-[7vh]">
                          <Link href="/supercharge-tomorrow" className="dt-btn">
                            <UnderlineOnHoverAnimation hasStaticUnderline color="#fff">
                              {data.accordionSection1.cta ?? 'Get in Touch'}
                            </UnderlineOnHoverAnimation>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Case Studies */}
          <div
            className="transition-all duration-500 overflow-hidden"
            style={{
              backgroundColor: '#F9F7F2',
              color: '#000',
            }}
            onClick={isMobile ? undefined : () => toggleTab('case-studies')}
          >
            <div className={[
              "overflow-hidden transition-[max-height] duration-500",
              !openTabs.has('case-studies')
                ? "max-h-[20vh]"
                : "max-h-[9999px]"
            ].join(' ')}>
              <div className="grid grid-cols-4 gap-x-[4.53vw] px-[4.53vw]" style={{ gridAutoRows: 'minmax(7.701vh, max-content)' }}>
                {(isMobile || openTabs.has('case-studies')) && (
                  <>
                    {/* Row 1: Main Title */}
                    <div
                      className="py-[2.09vh] col-span-4 row-start-1 bg-[#F9F7F2] flex items-start cursor-pointer z-10"
                      onClick={isMobile ? undefined : (e) => { e.stopPropagation(); toggleTab('case-studies'); }}
                    >
                      <h2 className="dt-h1 leading-none">{data.accordionSection2.heading}</h2>
                    </div>

                    {/* Row 2: Section Body */}
                    <div className="col-span-4 row-start-2 bg-[#F9F7F2]">
                      <div className="dt-h4">
                        <PortableText value={data.accordionSection2.body} />
                      </div>
                    </div>

                    {/* Row 3: Case studies carousel (mobile) */}
                    <div className="col-span-4 row-start-3 bg-[#F9F7F2] mt-[9vh]">
                      <div
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                      >
                        <CaseStudiesCarousel
                          items={carouselItems}
                          imageHeight="25vh"
                          captionHeight="25vh"
                          innerRowGap="4vh"
                          gap="4vh"
                          mobileImageHeight="25vh"
                          mobileCaptionHeight="25vh"
                          mobileInnerRowGap="2vh"
                          mobileGap="0"
                          rounded="rounded-2xl"
                          ariaLabel="Case studies carousel"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Desktop Layout - Original Grid System */
        tabs.map((tab) => {
          const isActive = openTabs.has(tab.id);

          return (
            <div
              key={tab.id}
              role="button"
              aria-expanded={isActive}
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleTab(tab.id)}
              onClick={() => toggleTab(tab.id)}
              className={[
                "group relative transition-all duration-500 overflow-hidden", // existing
                hoverHintWhenClosed(isActive),                                // 👈 new
              ].join(' ')}
              style={{
                backgroundColor: tab.color,
                color: tab.color === '#F9F7F2' ? '#000' : '#fff',
              }}
            >
              {/* Grid wrapper: collapsed shows exactly one row height */}
              <div className={[
                "px-[1.795vw] py-[3.2vh]",
                "overflow-hidden transition-[max-height] duration-500",
                !isActive
                  ? "max-h-[34.7vh]"
                  : "max-h-[9999px]"
              ].join(' ')}
              >
                <div className="grid grid-cols-6 auto-rows-[21vh] overflow-visible gap-x-[1.795vw] gap-y-[3.2vh]">

                  {/* Title */}
                  <div className={`${getGridClasses(tab.titleItem)}`}>
                    {tab.titleItem.content}
                  </div>

                  {/* Items */}
                  {tab.items.map((item) => (
                    <div key={item.id} className={`${getGridClasses(item)}`}>
                      {item.content}
                    </div>
                  ))}

                  {/* Desktop Case Studies carousel panel */}
                  {tab.id === 'case-studies' && isActive && (
                    <>
                      <div className="col-span-6 row-start-3 row-span-4 bg-[#F9F7F2]">
                        <div
                          onClick={(e) => e.stopPropagation()}
                          onMouseDown={(e) => e.stopPropagation()}
                          onPointerDown={(e) => e.stopPropagation()}
                        >
                          <FadeInOnVisible>
                            <CaseStudiesCarousel
                              items={carouselItems}
                              imageHeight="25vh"
                              captionHeight="25vh"
                              innerRowGap="4vh"
                              gap="4vh"
                              mobileImageHeight="25vh"
                              mobileCaptionHeight="25vh"
                              mobileInnerRowGap="2vh"
                              mobileGap="0"
                              rounded="rounded-2xl"
                              ariaLabel="Case studies carousel"
                            />
                          </FadeInOnVisible>
                        </div>


                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
