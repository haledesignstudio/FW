'use client';

import { HighlightText } from '@/components/HighlightText';



type GridItem = {
  id: string;
  content: React.ReactNode;
  colSpan: number;
  rowSpan: number;
};

type Props = {
  keynotes: {
    topicSection: {
      topicSectionTitle: string;
      topicSectionSubtitle: string;
      topicContentText: string;
      topicCTA1: string;
      topicMail1: string;
      topicCTA2: string;
    };
    speakerSection: {
      speakerSectionTitle: string;
      speakerSectionSubtitle: string;
      speakerContentText: string;
      speakerCTA1: string;
      speakerMail1: string;
      speakerCTA2: string;
    };
  };
};

export function KeynoteTop({ keynotes }: Props): GridItem[] {
  const topicSection = keynotes?.topicSection;

  return [
    {
      id: 'keynotes-1',
      content: (
        <h2 className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[20vh] font-graphik leading-[20vh]">
          {topicSection.topicSectionTitle || ''}
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
          <HighlightText text={topicSection.topicContentText} />
        </div>
      ),
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'keynotes-5',
      content: (
        <div className="whitespace-pre-line text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[4.25vh] font-bold leading-tight">
          <HighlightText text={topicSection.topicSectionSubtitle} />
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
  ];
}

export function KeynoteBottom({ keynotes }: Props): GridItem[] {
  const speakerSection = keynotes?.speakerSection;

  return [
    {
      id: 'keynotes-7',
      content: <></>,
      colSpan: 6,
      rowSpan: 1,
    },

    {
      id: 'keynotes-8',
      content: (
        <h2 className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[20vh] font-graphik leading-[20vh]">
          {speakerSection.speakerSectionTitle || ''}
        </h2>
      ),
      colSpan: 5,
      rowSpan: 1,
    },
    {
      id: 'keynotes-9',
      content: <></>,
      colSpan: 1,
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
      content: (
        <div className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[3vh] leading-tight">
          <HighlightText text={speakerSection.speakerContentText} />
        </div>
      ),
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'keynotes-12',
      content: (
        <div className="whitespace-pre-line text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[4.25vh] font-bold leading-tight">
          <HighlightText text={speakerSection.speakerSectionSubtitle} />
        </div>
      ),
      colSpan: 4,
      rowSpan: 1,
    },
    {
      id: 'keynotes-13',
      content: <></>,
      colSpan: 2,
      rowSpan: 1,
    },

    {
      id: 'keynotes-14',
      content: (
        <div className="flex flex-col justify-end h-full">
          <a
            href={`mailto:${speakerSection.speakerMail1 ?? 'info@futureworld.org'}?subject=${encodeURIComponent(speakerSection.speakerCTA1 ?? '')}`}
            className="underline text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] font-graphik leading-[2vh]"
          >
            {speakerSection.speakerCTA1 ?? 'Get in Touch'}
          </a>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
    },
    {
      id: 'keynotes-15',
      content: (
        <div className="flex flex-col justify-end h-full">
          <a
            href="#our-speakers"
            className="underline text-[6vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] font-bold leading-tight"
          >
            {speakerSection.speakerCTA2 || ''}
          </a>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
    },

  ];
}