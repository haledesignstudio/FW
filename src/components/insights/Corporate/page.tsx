// src/components/insights/Corporate.tsx
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
  corporate: {
    title: string;
    subheading?: PortableTextBlock[];
    contentText?: PortableTextBlock[];
    CTA?: string;
    Mail?: string;
  };
};

export default function Corporate({ corporate }: Props): GridItem[] {
  return [
    {
      id: 'corporate-1',
      content: (
        <h2 className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[20vh] font-graphik leading-[20vh]">
          {corporate.title}
        </h2>
      ),
      colSpan: 5,
      rowSpan: 2,
    },
    {
      id: 'corporate-2',
      content: <></>,
      colSpan: 1,
      rowSpan: 2,
    },
    {
      id: 'corporate-3',
      content: (
        <div className="text-[3vh] font-roboto leading-[4vh]">
          <PortableText value={corporate.contentText || []} />
        </div>
      ),
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'corporate-4',
      content: (
        <div className="text-[5vh] font-graphik leading-[6vh]">
          <PortableText value={corporate.subheading || []} />
        </div>
      ),
      colSpan: 3,
      rowSpan: 1,
    },
    {
      id: 'corporate-5',
      content: <></>,
      colSpan: 1,
      rowSpan: 1,
    },
    {
      id: 'corporate-6',
      content: <></>,
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'corporate-7',
      content: (
        <a
          href={`mailto:${corporate.Mail ?? 'info@futureworld.org'}?subject=${encodeURIComponent(corporate.CTA ?? '')}`}
          className="underline text-[2vh] font-graphik leading-[2vh]"
        >
          {corporate.CTA ?? 'Get in Touch'}
        </a>
      ),
      colSpan: 2,
      rowSpan: 1,
    },
  ];
}
