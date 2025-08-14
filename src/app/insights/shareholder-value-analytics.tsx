// /app/shareholder-value-analytics/shareholder-value-analytics.tsx
'use client';

import FadeInOnVisible from '@/components/FadeInOnVisible';
import { HighlightText } from '@/components/HighlightText';
import { getGridClasses } from '@/components/insights/grid';
import type { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';

type Props = {
  title: string;
  subheading: PortableTextBlock[];
  contentText: string;
  iframeSource: string; // (not used in new layout, but kept for API compatibility)
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
    // iframeSource, // no longer used in the new grid
    IQ_heading,
    IQ_subheading,
    IQ_context,
    CTA1,
    Mail1,
    CTA2,
    Mail2,
  } = props;

  // Align prop names with your desired grid snippet
  const analytics = {
    title,
    subheading,
    contentText,
    IQ_heading,
    IQ_subheading,
    IQ_context,
    CTA1,
    Mail1,
    CTA2,
    Mail2,
  };

  const gridItems = [
    {
      id: 'analytics-1',
      content: (
        <FadeInOnVisible>
          <div className="text-[clamp(8vw,20vh,10vw)] font-graphik leading-[clamp(8vw,20vh,10vw)]">
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
          <div className="text-[clamp(1vw,3.5vh,1.75vw)] leading-tight">
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
          <div className="text-[clamp(1.75vw,5vh,2.5vw)] font-bold leading-tight">
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
            <div className="text-[clamp(0.9vw,2.25vh,1.125vw)] font-graphik leading-[clamp(0.9vw,2.25vh,1.125vw)] ">
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
          <Image
            src="/evidence.png" // ✅ Update if your asset lives elsewhere
            alt="Futureworld Shareholder Value Analytics"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            width={3000}
            height={2000}
            loading="lazy"
          />
        </FadeInOnVisible>
      ),
      colSpan: 6,
      rowSpan: 5,
    },
    {
      id: 'analytics-9',
      content: <></>,
      colSpan: 6,
      rowSpan: 1,
    },
    {
      id: 'analytics-10',
      content: (
        <FadeInOnVisible>
          <div className="text-[clamp(1vw,3.5vh,1.75vw)] leading-tight">
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
          <div className="text-[clamp(1.9vw,4.75vh,2.3vw)] font-bold leading-tight">
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
            <div className="text-[clamp(1vw,2.75vh,1.3vw)] leading-tight">
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
            <div className="text-[clamp(0.9vw,2.25vh,1.125vw)]  font-graphik leading-[clamp(0.9vw,2.25vh,1.125vw)] ">
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
    <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[25vh] mt-[2vh]">
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
