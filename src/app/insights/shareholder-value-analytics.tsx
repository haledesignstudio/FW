'use client';

import FadeInOnVisible from '@/components/FadeInOnVisible';
import Link from 'next/link';
import { HighlightText } from '@/components/HighlightText';
import { getGridClasses } from '@/components/insights/grid';
import type { PortableTextBlock } from '@portabletext/types';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import { useCallback } from 'react';
import { useState, useEffect } from 'react';

type Props = {
  title: string;
  subheading: PortableTextBlock[];
  contentText: string;
  iframeSource: string; 
  IQ_heading: PortableTextBlock[];
  IQ_subheading: string;
  IQ_context: string;
  CTA1: string;
  Mail1: string;
  CTA2: string;
  Mail2: string;
};

export default function ShareholderValueAnalytics(props: Props) {
  const {
    title,
    subheading,
    contentText,
    iframeSource,
    IQ_heading,
    IQ_subheading,
    IQ_context,
    CTA1,
    Mail1,
    CTA2,
    Mail2,
  } = props;

  const analytics = {
    title,
    subheading,
    contentText,
    iframeSource,
    IQ_heading,
    IQ_subheading,
    IQ_context,
    CTA1,
    Mail1,
    CTA2,
    Mail2,
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

  const isMobile = useIsMobile();

  const handleBackToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (isMobile) {
    return (
      <main className="p-[2vh] bg-[#F9F7F2]">
        <div className="grid grid-cols-4 gap-y-2 auto-rows-[8vh]">
          {/* Row 1-2: Title */}
          <div className="col-span-4 row-span-2">
            <FadeInOnVisible>
              <div className="text-[5vh] font-bold font-graphik leading-tight text-left">
                {analytics.title}
              </div>
            </FadeInOnVisible>
          </div>
          {/* Row 3: Empty */}
          <div className="col-span-4 row-span-1"></div>
          {/* Row 4: ContentText */}
          <div className="col-span-3 row-span-1">
            <FadeInOnVisible>
              <div className="text-[2.5vh] leading-tight">
                {analytics.contentText}
              </div>
            </FadeInOnVisible>
          </div>
          {/* Row 5: Empty */}
          <div className="col-span-4 row-span-1"></div>
          {/* Row 6-7: Subheading */}
          <div className="col-span-4 row-span-2">
            <FadeInOnVisible>
              <div className="text-[2.5vh] font-bold leading-tight">
                <HighlightText value={analytics.subheading} />
              </div>
            </FadeInOnVisible>
          </div>
          <div className="col-span-4 row-span-1"></div>
          {/* Row 8: CTA1 link */}
          <div className="col-span-4 row-span-1 flex items-center">
            <FadeInOnVisible>
              <a
                href={`mailto:${analytics.Mail1 ?? 'info@futureworld.org'}?subject=${encodeURIComponent(
                  analytics.CTA1 ?? ''
                )}`}
                className="transition font-bold cursor-pointer"
              >
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  {analytics.CTA1 ?? 'Get in Touch'}
                </UnderlineOnHoverAnimation>
              </a>
            </FadeInOnVisible>
          </div>
          {/* Row 9: Empty */}
          <div className="col-span-4 row-span-1"></div>
          {/* Row 10-14: iframe */}
          <div className="col-span-4 row-span-12">
            <FadeInOnVisible>
              <iframe
                src={analytics.iframeSource}
                title="Futureworld Analytics Dashboard"
                style={{ width: '100%', height: '100vh', border: 'none'}}
                loading="lazy"
                allowFullScreen
              />
            </FadeInOnVisible>
          </div>
          {/* Row 15-16: IQ_context */}
          <div className="col-span-3 row-span-2">
            <FadeInOnVisible>
              <div className="text-[2vh] leading-tight">
                {analytics.IQ_context}
              </div>
            </FadeInOnVisible>
          </div>
          {/* Row 17-18: IQ_heading */}
          <div className="col-span-4 row-span-2">
            <FadeInOnVisible>
              <div className="text-[2.3vh] font-bold leading-tight">
                <HighlightText value={analytics.IQ_heading} />
              </div>
            </FadeInOnVisible>
          </div>
          {/* Row 19-20: IQ_subheading */}
          <div className="col-span-4 row-span-2">
            <FadeInOnVisible>
              <div className="text-[1.8vh] leading-tight">
                {analytics.IQ_subheading}
              </div>
            </FadeInOnVisible>
          </div>
          {/* Row 21: CTA2 link */}
          <div className="col-span-2 row-span-1 flex items-center">
            <FadeInOnVisible>
              <a
                href={`mailto:${analytics.Mail2 ?? 'info@futureworld.org'}?subject=${encodeURIComponent(
                  analytics.CTA2 ?? ''
                )}`}
                className="transition font-bold cursor-pointer"
              >
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  {analytics.CTA2 ?? 'Get in Touch'}
                </UnderlineOnHoverAnimation>
              </a>
            </FadeInOnVisible>
          </div>
          {/* Row 22: Empty */}
          <div className="col-span-4 row-span-1"></div>
          {/* Row 22: Mindbullets button col 1-2, Back to top col 4 */}
          <div className="col-span-2 row-span-1">
            <FadeInOnVisible>
              <Link href="/mindbullets" className="transition font-bold cursor-pointer">
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  See Mindbullets: News from the Future
                </UnderlineOnHoverAnimation>
              </Link>
            </FadeInOnVisible>
          </div>
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
        </div>
      </main>
    );
  }
  const gridItems = [
    {
      id: 'analytics-1',
      content: (
        <FadeInOnVisible>
          <div className="dt-h1">
            {analytics.title}
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 5,
      rowSpan: 2,
    },
    {
      id: 'analytics-2',
      content: <></>,
      colSpan: 1,
      rowSpan: 2,
    },
    {
      id: 'analytics-3',
      content: (
        <FadeInOnVisible>
          <div className="dt-h4">
            {analytics.contentText}
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'analytics-4',
      content: (
        <FadeInOnVisible>
          <div className="dt-h3">
            <HighlightText value={analytics.subheading} />
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 4,
      rowSpan: 1,
    },
    {
      id: 'analytics-5',
      content: <></>,
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'analytics-6',
      content: (
        <div className="flex items-center h-full">
          <FadeInOnVisible>
            <div className="dt-btn">
              <a
                href={`mailto:${analytics.Mail1 ?? 'info@futureworld.org'}?subject=${encodeURIComponent(
                  analytics.CTA1 ?? ''
                )}`}
                className="transition cursor-pointer"
              >
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  {analytics.CTA1 ?? 'Get in Touch'}
                </UnderlineOnHoverAnimation>
              </a>
            </div>
          </FadeInOnVisible>
        </div>
      ),
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'analytics-7',
      content: <></>,
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'analytics-8',
      content: (
        <FadeInOnVisible>
          <iframe
            src={analytics.iframeSource}
            title="Futureworld Analytics Dashboard"
            style={{ width: '100%', height: '60vh', border: 'none', minHeight: '801px',}}
            loading="lazy"
            allowFullScreen
          />
        </FadeInOnVisible>
      ),
      colSpan: 6,
      rowSpan: 3,
    },
    {
      id: 'analytics-10',
      content: (
        <FadeInOnVisible>
          <div className="dt-h4">
            {analytics.IQ_context}
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'analytics-11',
      content: (
        <FadeInOnVisible>
          <div className="dt-h3">
            <HighlightText value={analytics.IQ_heading} />
          </div>
        </FadeInOnVisible>
      ),
      colSpan: 3,
      rowSpan: 1,
    },
    {
      id: 'analytics-12',
      content: <></>,
      colSpan: 1,
      rowSpan: 1,
    },
    {
      id: 'analytics-13',
      content: <></>,
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'analytics-14',
      content: (
        <div className="flex items-end h-full">
          <FadeInOnVisible>
            <div className="dt-body-lg">
              {analytics.IQ_subheading}
            </div>
          </FadeInOnVisible>
        </div>
      ),
      colSpan: 3,
      rowSpan: 1,
    },
    {
      id: 'analytics-15',
      content: <></>,
      colSpan: 1,
      rowSpan: 1,
    },
    {
      id: 'analytics-16',
      content: <></>,
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'analytics-21',
      content: (
        <div className="flex items-center h-full">
          <FadeInOnVisible>
            <div className="dt-btn">
              <a
                href={`mailto:${analytics.Mail2 ?? 'info@futureworld.org'}?subject=${encodeURIComponent(
                  analytics.CTA2 ?? ''
                )}`}
                className="transition cursor-pointer"
              >
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  {analytics.CTA2 ?? 'Get in Touch'}
                </UnderlineOnHoverAnimation>
              </a>
            </div>
          </FadeInOnVisible>
        </div>
      ),
      colSpan: 2,
      rowSpan: 1,
    },
  ] as const;

  return (
    <div className="grid grid-cols-6 auto-rows-[21vh] overflow-visible gap-x-[1.795vw] gap-y-[3.2vh]">
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
  );
}
