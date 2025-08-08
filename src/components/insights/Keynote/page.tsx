'use client';

import { HighlightText } from '@/components/HighlightText';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import { PortableTextBlock } from '@portabletext/types';
import React from 'react';


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
      topicSectionSubtitle: PortableTextBlock[];
      topicContentText: string;
      topicCTA1: string;
      topicMail1: string;
      topicCTA2: string;
    };
    speakerSection: {
      speakerSectionTitle: string;
      speakerSectionSubtitle: PortableTextBlock[];
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
          <div className="text-[clamp(8vw,20vh,10vw)] font-graphik leading-[clamp(8vw,20vh,10vw)]">
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
          <div className="text-[clamp(1vw,3.5vh,1.75vw)] leading-tight">
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
          <div className="prose max-w-none text-[clamp(1.75vw,5vh,2.5vw)] font-bold leading-tight">
            <HighlightText value={topicSection.topicSectionSubtitle} />
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
          <div className="text-[clamp(8vw,20vh,10vw)] font-graphik leading-[clamp(8vw,20vh,10vw)]">
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
          <div className="text-[clamp(1vw,3.5vh,1.75vw)] leading-tight">
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
          <div className="whitespace-pre-line text-[clamp(1.75vw,5vh,2.5vw)] font-bold leading-tight">
            <HighlightText value={speakerSection.speakerSectionSubtitle} />
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
            <div className="text-[clamp(0.9vw,2.25vh,1.125vw)]  font-graphik leading-[clamp(0.9vw,2.25vh,1.125vw)] ">
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
            <div className="text-[clamp(0.9vw,2.25vh,1.125vw)]  font-bold leading-[clamp(0.9vw,2.25vh,1.125vw)] ">
              <a href="#our-speakers" className="transition cursor-pointer">
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
