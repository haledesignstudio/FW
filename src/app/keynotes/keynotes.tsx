// app/keynotes/keynotes.tsx
'use client';

import ExpandableTopicList from '@/components/ExpandableTopicList';
import useIsMobile from '@/hooks/useIsMobile';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import { getGridClasses } from '@/components/insights/grid';
import { HighlightText } from '@/components/HighlightText';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import type { PortableTextBlock } from '@portabletext/types';
import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import CircularTextSliderMobile from '@/components/CircularTextSliderMobile';
import Link from 'next/link';


const CircularTextSlider = dynamic(() => import('@/components/CircularTextSlider'), { ssr: false });

type KeynotesData = {
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

type SpeakerForClient = {
  _id: string;
  slug?: { current: string } | string;
  name: string;
  summary: PortableTextBlock[];
  bio: PortableTextBlock[];
  image: { asset: string; alt?: string };
  mailtoSubject?: string;
  email?: string;
};

type Props = { keynotes: KeynotesData };

export type GridItem = {
  id: string;
  content: ReactNode;
  colSpan: number;
  rowSpan: number;
};


export function KeynoteTop({ keynotes }: Props): GridItem[] {
  const topicSection = keynotes?.topicSection;
  const speakerSection = keynotes?.speakerSection;



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
      colSpan: 6,
      rowSpan: 1,
    },
    {
      id: 'keynotes-7',
      content: <></>,
      colSpan: 2,
      rowSpan: 1,
    },
    // Add mailto and scroll buttons at end of topic section
    {
      id: 'keynotes-8',
      content: (
        <div className="flex flex-col justify-start h-full">
          <FadeInOnVisible>
            <div className="text-[clamp(0.9vw,2.25vh,1.125vw)] font-graphik leading-[clamp(0.9vw,2.25vh,1.125vw)]">
              <a
                href={`mailto:${speakerSection?.speakerMail1 ?? 'info@futureworld.org'}?subject=${encodeURIComponent(speakerSection?.speakerCTA1 ?? '')}`}
                className="transition cursor-pointer"
              >
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  {speakerSection?.speakerCTA1 ?? 'Get in Touch'}
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
      id: 'keynotes-9',
      content: (
        <div className="flex flex-col justify-start h-full">
          <FadeInOnVisible>
            <div className="text-[clamp(0.9vw,2.25vh,1.125vw)] font-bold leading-[clamp(0.9vw,2.25vh,1.125vw)]">
              <Link href={'/keynotes#speakers'}
                className="transition cursor-pointer bg-transparent border-none p-0 m-0 text-inherit font-inherit"
                style={{ textAlign: 'left' }}
              >
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  {speakerSection?.speakerCTA2 || 'See Speakers'}
                </UnderlineOnHoverAnimation>
              </Link>
            </div>
          </FadeInOnVisible>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
    },
  ];
}

export function KeynoteBottom({ keynotes }: Props): GridItem[] {
  const speakerSection = keynotes?.speakerSection;

  return [
    {
      id: 'keynotes-10',
      content: <></>,
      colSpan: 6,
      rowSpan: 1,
    },
    {
      id: 'keynotes-11',
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
      id: 'keynotes-12',
      content: <></>,
      colSpan: 6,
      rowSpan: 1,
    },
    {
      id: 'keynotes-13',
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
      id: 'keynotes-14',
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
      id: 'keynotes-15',
      content: <></>,
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 'keynotes-16',
      content: (
        <div className="flex flex-col justify-start h-full">
          <FadeInOnVisible>
            <div className="text-[clamp(0.9vw,2.25vh,1.125vw)]  font-graphik leading-[clamp(0.9vw,2.25vh,1.125vw)]">
              <a
                href={`mailto:${speakerSection.speakerMail1 ?? 'info@futureworld.org'}?subject=${encodeURIComponent(
                  speakerSection.speakerCTA1 ?? ''
                )}`}
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
      id: 'keynotes-17',
      content: (
        <div className="flex flex-col justify-start h-full">
          <FadeInOnVisible>
            <div className="text-[clamp(0.9vw,2.25vh,1.125vw)] font-bold leading-[clamp(0.9vw,2.25vh,1.125vw)]">
              <Link href={'/keynotes#speakers'}
                className="transition cursor-pointer bg-transparent border-none p-0 m-0 text-inherit font-inherit"
                style={{ textAlign: 'left' }}
              >
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  {speakerSection?.speakerCTA2 || 'See Speakers'}
                </UnderlineOnHoverAnimation>
              </Link>
            </div>
          </FadeInOnVisible>
        </div>
      ),
      colSpan: 1,
      rowSpan: 1,
    },
  ];
}

export default function Keynotes({
  keynotes,
  speakers,
}: {
  keynotes: KeynotesData;
  speakers: SpeakerForClient[];
}) {
  const isMobile = useIsMobile();
  const topicSection = keynotes?.topicSection;
  const speakerSection = keynotes?.speakerSection;


  if (isMobile) {
    return (
      <>
        {/* Topic Section */}
        <div className="grid grid-cols-4 gap-y-[2vh] auto-rows-min w-full px-[2vw] pt-[2vh]">
          {/* Row 1-2: Title */}
          <div className="col-span-3 row-span-2 flex items-start justify-start text-left font-graphik text-[12vw] leading-tight">
            {topicSection.topicSectionTitle}
          </div>
          {/* Row 3: Content Text */}
          <div className="col-span-4 text-[3.5vw] leading-tight mt-[1vh]">
            {topicSection.topicContentText}
          </div>
          {/* Row 4: Subtitle */}
          <div className="col-span-4 font-bold text-[4vw] leading-tight mt-[1vh]">
            <HighlightText value={topicSection.topicSectionSubtitle} />
          </div>
          {/* Row 5: CTA buttons */}
          <div className="col-span-2 flex items-end justify-start mt-[2vh]">
            <a
              href={`mailto:${speakerSection.speakerMail1 ?? 'info@futureworld.org'}?subject=${encodeURIComponent(speakerSection.speakerCTA1 ?? '')}`}
              className="text-[3.5vw] font-graphik underline"
            >
              {speakerSection.speakerCTA1 ?? 'Get in Touch'}
            </a>
          </div>
          <div className="col-span-2 flex items-end justify-end mt-[2vh]">
            <Link href={'/keynotes#speakers-mobile'}
              className="text-[3.5vw] font-bold underline"
            >
              {speakerSection.speakerCTA2 || 'See Speakers'}
            </Link>
          </div>
          {/* Empty row */}
          <div className="col-span-4 h-[2vh]" />
        </div>

        {/* Expandable Topic List */}
        <FadeInOnVisible>
          <div className="w-full px-[2vw]">
            <ExpandableTopicList />
          </div>
        </FadeInOnVisible>

        {/* Empty row */}
        <div className="col-span-4 h-[2vh]" />

        {/* Speaker Section */}
        <div className="grid grid-cols-4 gap-y-[2vh] auto-rows-min w-full px-[2vw] pt-[2vh]">
          {/* Row 1-2: Speaker Title */}
          <div className="col-span-3 row-span-2 flex items-start justify-start text-left font-graphik text-[12vw] leading-tight">
            {speakerSection.speakerSectionTitle}
          </div>
          {/* Row 3: Speaker Content Text */}
          <div className="col-span-4 text-[3.5vw] leading-tight mt-[1vh]">
            {speakerSection.speakerContentText}
          </div>
          {/* Row 4: Speaker Subtitle */}
          <div className="col-span-4 font-bold text-[4vw] leading-tight mt-[1vh]">
            <HighlightText value={speakerSection.speakerSectionSubtitle} />
          </div>
          {/* Row 5: CTA buttons */}
          <div className="col-span-2 flex items-end justify-start mt-[2vh]">
            <a
              href={`mailto:${speakerSection.speakerMail1 ?? 'info@futureworld.org'}?subject=${encodeURIComponent(speakerSection.speakerCTA1 ?? '')}`}
              className="text-[3.5vw] font-graphik underline"
            >
              {speakerSection.speakerCTA1 ?? 'Get in Touch'}
            </a>
          </div>
          <div className="col-span-2 flex items-end justify-end mt-[2vh]">
            <Link href={'/keynotes#speakers'}
              className="text-[3.5vw] font-bold underline"
            >
              {speakerSection.speakerCTA2 || 'See Speakers'}
            </Link>
          </div>
          {/* Empty row */}
          <div className="col-span-4 h-[2vh]" />
        </div>

        {/* Circular Text Slider */}
        <FadeInOnVisible>
          <div className="w-full mt-[8vh]" id="speakers-mobile">
            <CircularTextSliderMobile speakers={speakers} />
          </div>
        </FadeInOnVisible>
      </>
    );
  }

  // Desktop view (unchanged)
  const keynoteTop = KeynoteTop({ keynotes });
  const keynoteBottom = KeynoteBottom({ keynotes });
  return (
    <>
      <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[25vh]">
        {keynoteTop.map((item) => (
          <div key={item.id} className={getGridClasses(item)}>
            {item.content}
          </div>
        ))}
      </div>
      <FadeInOnVisible>
        <div className="w-full">
          <ExpandableTopicList />
        </div>
      </FadeInOnVisible>
      <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[25vh]">
        {keynoteBottom.map((item) => (
          <div key={item.id} className={getGridClasses(item)}>
            {item.content}
          </div>
        ))}
      </div>
      <FadeInOnVisible>
        <div id="speakers" className="w-full mt-[20vh]">
          <CircularTextSlider speakers={speakers} />
        </div>
      </FadeInOnVisible>
    </>
  );
}
