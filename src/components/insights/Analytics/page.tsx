'use client';

import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

type GridItem = {
  id: string;
  content: React.ReactNode;
  colSpan: number;
  rowSpan: number;
};

type Props = {
  analytics: {
    title: string;
    subheading?: PortableTextBlock[];
    contentText?: PortableTextBlock[];
    statement1?: PortableTextBlock[];
    statement2?: PortableTextBlock[];
    CTA1?: string;
    Mail1?: string;
    CTA2?: string;
    Mail2?: string;
  };
};

export default function Analytics({ analytics }: Props): GridItem[] {
  return [
    {
      id: 'analytics-1',
      content: (
        <p className="text-[5vh] md:text-[20vh] font-graphik leading-[20vh]">
          {analytics.title}
        </p>
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
        <div className="text-[5vh] md:text-[4vh] leading-tight">
          <PortableText value={analytics.contentText || []} />
        </div>
      ),
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'analytics-4',
      content: (
        <div className="text-[5vh] md:text-[5vh] font-bold leading-tight">
          <PortableText value={analytics.subheading || []} />
        </div>
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
        <div className="text-[5vh] md:text-[1.5vh] leading-tight">
          <PortableText value={analytics.statement1 || []} />
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
    },
    {
      id: 'analytics-7',
      content: (
        <div className="text-[5vh] md:text-[1.5vh] leading-tight">
          <PortableText value={analytics.statement2 || []} />
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
    },
    {
      id: 'analytics-8',
      content: <></>,
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'analytics-9',
      content: <></>,
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'analytics-10',
      content: (
        <a
          href={`mailto:${analytics.Mail1 ?? 'info@futureworld.org'}?subject=${encodeURIComponent(analytics.CTA1 ?? '')}`}
          className="underline text-[5vh] md:text-[2vh] font-graphik leading-[2vh]"
        >
          {analytics.CTA1 ?? 'Get in Touch'}
        </a>
      ),
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'analytics-11',
      content: (
        <a
          href={`mailto:${analytics.Mail2 ?? 'info@futureworld.org'}?subject=${encodeURIComponent(analytics.CTA2 ?? '')}`}
          className="underline text-[5vh] md:text-[2vh] font-graphik leading-[2vh]"
        >
          {analytics.CTA2 ?? 'Get in Touch'}
        </a>
      ),
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'analytics-12',
      content: (
        <iframe
          src="https://fw-demo.evidence.app/"
          width="100%"
          height="800"
          style={{ border: 'none' }}
          title="Futureworld Shareholder Value Analytics"
          allowFullScreen
          loading="lazy"
        />
      ),
      colSpan: 6,
      rowSpan: 5,
    },
  ];
}
