'use client';

import type { PortableTextBlock } from '@portabletext/types';
import { PortableText } from '@portabletext/react';

type GridItem = {
    id: string;
    content: React.ReactNode;
    colSpan: number;
    rowSpan: number;
};

type Props = {
  title?: string;
  subheading?: PortableTextBlock[];
};

export default function Mindbullets({ title, subheading}: Props): GridItem[] {
  return [
    {
      id: 'mindbullets-1',
      content: (
        <h2 className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[20vh] font-graphik leading-[20vh]">
          {title}
        </h2>
      ),
      colSpan: 5,
      rowSpan: 3,
    },
    {
      id: 'mindbullets-2',
      content: <></>,
      colSpan: 1,
      rowSpan: 3,
    },
    {
      id: 'mindbullets-3',
      content: (
        <div className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[6vh] font-graphik leading-[7vh]">
          <PortableText value={subheading || []} />
        </div>
      ),
      colSpan: 4,
      rowSpan: 1,
    },
    {
      id: 'mindbullets-4',
      content: <></>,
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'mindbullets-5',
      content: <></>,
      colSpan: 6,
      rowSpan: 1,
    },
    {
      id: 'mindbullets-6',
      content: <></>,
      colSpan: 6,
      rowSpan: 2,
    },
  ];
}
