'use client';

import { HighlightText } from '@/components/HighlightText';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';


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
        <FadeInOnVisible>
        <div className="text-[20vh] font-graphik leading-[20vh]">
          {topicSection.topicSectionTitle || ''}
        </div>
        </FadeInOnVisible>
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
        <FadeInOnVisible>
        <div className="text-[3.5vh] leading-tight">
          {topicSection.topicContentText}
        </div>
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'keynotes-5',
      content: (
        <FadeInOnVisible>
        <div className="whitespace-pre-line text-[5vh] font-bold leading-tight">
          <HighlightText text={topicSection.topicSectionSubtitle} />
        </div>
        </FadeInOnVisible>
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
        <FadeInOnVisible>
        <div className="text-[20vh] font-graphik leading-[20vh]">
          {speakerSection.speakerSectionTitle || ''}
        </div>
        </FadeInOnVisible>
      ),
      colSpan: 6,
      rowSpan: 1,
    },
    {
      id: 'keynotes-9',
      content: <></>,
      colSpan: 6,
      rowSpan: 1,
    },
    {
      id: 'keynotes-10',
      content: (
        <FadeInOnVisible>
        <div className="text-[3.5vh] leading-tight">
          {speakerSection.speakerContentText}
        </div>
        </FadeInOnVisible>
      ),
      colSpan: 2,
      rowSpan: 2,
    },
    {
      id: 'keynotes-11',
      content: (
        <FadeInOnVisible>
        <div className="whitespace-pre-line text-[5vh] font-bold leading-tight">
          <HighlightText text={speakerSection.speakerSectionSubtitle} />
        </div>
        </FadeInOnVisible>
      ),
      colSpan: 4,
      rowSpan: 2,
    },
    {
      id: 'keynotes-12',
      content: <></>,
      colSpan: 2,
      rowSpan: 1,
    },

    {
        id: 'keynotes-13',
        content: (
          <div className="flex flex-col justify-start h-full">
            <FadeInOnVisible>
            <div className="text-[2.25vh] font-graphik leading-[2.25vh]">
              <a
                href={`mailto:${speakerSection.speakerMail1 ?? 'info@futureworld.org'}?subject=${encodeURIComponent(speakerSection.speakerCTA1 ?? '')}`}
                className="transition cursor-pointer"
              >
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  {speakerSection.speakerCTA1 ?? 'Get in Touch'}
                </UnderlineOnHoverAnimation>
              </a>
            </div>
            </FadeInOnVisible>
          </div>
        ),
        colSpan: 1,
        rowSpan: 1,
      },
      {
        id: 'keynotes-14',
        content: (
          <div className="flex flex-col justify-start h-full">
            <FadeInOnVisible>
            <div className="text-[2.25vh] font-bold leading-[2.25vh]">
              <a 
                href="#our-speakers"
                className="transition cursor-pointer"
              >
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  {speakerSection.speakerCTA2 || ''}
                </UnderlineOnHoverAnimation>
              </a>
            </div>
            </FadeInOnVisible>
          </div>
        ),
        colSpan: 1,
        rowSpan: 1,
      },

  ];
}