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
  keynotes?: {
    topicSection?: {
      topicSectionTitle?: string;
      topicSectionSubtitle?: PortableTextBlock[];
      topicContentText?: PortableTextBlock[];
      topicCTA1?: string;
      topicMail1?: string;
      topicCTA2?: string;
    };
    speakerSection?: {
      speakerSectionTitle?: string;
      speakerSectionSubtitle?: string;
      speakerContentText?: PortableTextBlock[];
      speakerCTA1?: string;
      speakerMail1?: string;
      speakerCTA2?: string;
    };
  };
};

export default function Keynote({ keynotes }: Props): GridItem[] {
  // Handle the case where keynotes might be undefined
  const topicSection = keynotes?.topicSection;
  
  return [
    {
      id: 'keynotes-1',
      content: (
        <h2 className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[20vh] font-graphik leading-[20vh]">
          {topicSection?.topicSectionTitle || ''}
        </h2>
      ),
      colSpan: 5,
      rowSpan: 1,
    },
    {
      id: 'keynotes-2',
      content: <></>,
      colSpan: 1,
      rowSpan: 1,
    },
    {
      id: 'keynotes-3',
      content: <></>,
      colSpan: 6,
      rowSpan: 1,
    },
    {
      id: 'keynotes-4',
      content: (
        <div className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[3vh] leading-tight">
          <PortableText value={topicSection?.topicContentText || []} />
        </div>
      ),
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'keynotes-5',
      content: (
        <div className="whitespace-pre-line text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[4.25vh] font-bold leading-tight">
          <PortableText value={topicSection?.topicSectionSubtitle || []} />
        </div>
      ),
      colSpan: 4,
      rowSpan: 1,
    },
    {
      id: 'keynotes-6',
      content: <></>,
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'keynotes-7',
      content: (
        <div className="flex flex-col justify-end h-full">
          <a
            href={`mailto:${topicSection?.topicMail1 ?? 'info@futureworld.org'}?subject=${encodeURIComponent(topicSection?.topicCTA1 ?? '')}`}
            className="underline text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] font-graphik leading-[2vh]"
          >
            {topicSection?.topicCTA1 ?? 'Get in Touch'}
          </a>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
    },
    {
      id: 'keynotes-8',
      content: (
        <div className="flex flex-col justify-end h-full">
          <a
            href="#our-speakers"
            className="underline text-[6vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] font-bold leading-tight"
          >
            {topicSection?.topicCTA2 || ''}
          </a>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
    },
    {
      id: 'keynotes-9',
      content: <></>,
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'keynotes-10',
      content: <></>,
      colSpan: 6,
      rowSpan: 1,
    },
    {
      id: 'keynotes-11',
      content: <div id="our-speakers">{/* additional speaker content if any */}</div>,
      colSpan: 1,
      rowSpan: 1,
    },
  ];
}