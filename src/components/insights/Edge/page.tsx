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
  edge: {
    title: string;
    subheading?: PortableTextBlock[];
    contentText?: PortableTextBlock[];
  };
};

export default function Edge({ edge }: Props): GridItem[] {
  return [
    {
      id: 'edge-1',
      content: (
        <h2 className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[20vh] font-graphik leading-[20vh]">
          {edge.title}
        </h2>
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
        <div className="text-[3vh] font-roboto leading-[4vh]">
          <PortableText value={edge.contentText || []} />
        </div>
      ),
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'edge-4',
      content: (
        <div className="text-[5vh] font-graphik leading-[6vh]">
          <PortableText value={edge.subheading || []} />
        </div>
      ),
      colSpan: 3,
      rowSpan: 1,
    },
  ];
}
