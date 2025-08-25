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
import { useCallback } from 'react';


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
          <div className="dt-h1">
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
          <div className="dt-body-lg">
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
          <div className="dt-h3">
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
            <div className="dt-btn">
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
            <div className="dt-btn">
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
          <div className="dt-h1">
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
          <div className="dt-h4">
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
          <div className="dt-h3">
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
            <div className="dt-btn">
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
            <div className="dt-btn">
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

  const handleBackToTop = useCallback(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

  if (isMobile) {
    return (
      <>
        {/* Topic Section */}
        <div className="grid grid-cols-4 gap-y-[2vh] auto-rows-[6.25vh] w-full px-[2vw] pt-[2vh]">
          {/* Row 1-2: Title */}
          <div className="col-span-3 row-span-2 flex items-start justify-start text-left dt-h1">
            {topicSection.topicSectionTitle}
          </div>
          {/* Row 3: Content Text */}
          <div className="col-span-4 row-span-2 dt-h4 mt-[1vh]">
            {topicSection.topicContentText}
          </div>
          {/* Row 4: Subtitle */}
          <div className="col-span-4 row-span-2 dt-h3 mt-[1vh]">
            <HighlightText value={topicSection.topicSectionSubtitle} />
          </div>
          {/* Row 5: CTA buttons */}
          <div className="col-span-2 row-span-2 flex items-end justify-start mt-[2vh]">
            <a
              href={`mailto:${speakerSection.speakerMail1 ?? 'info@futureworld.org'}?subject=${encodeURIComponent(speakerSection.speakerCTA1 ?? '')}`}
              className="dt-btn underline"
            >
              {speakerSection.speakerCTA1 ?? 'Get in Touch'}
            </a>
          </div>
          <div className="col-span-2 row-span-2 flex items-end justify-end mt-[2vh]">
            <Link href={'/keynotes#speakers-mobile'}
              className="dt-btn font-bold underline"
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
          <div className="col-span-3 row-span-2 flex items-start justify-start text-left dt-h1">
            {speakerSection.speakerSectionTitle}
          </div>
          {/* Row 3: Speaker Content Text */}
          <div className="col-span-4 dt-h4 mt-[1vh]">
            {speakerSection.speakerContentText}
          </div>
          {/* Row 4: Speaker Subtitle */}
          <div className="col-span-4 dt-h3 mt-[1vh]">
            <HighlightText value={speakerSection.speakerSectionSubtitle} />
          </div>
          {/* Row 5: CTA buttons */}
          <div className="col-span-2 flex items-end justify-start mt-[2vh]">
            <a
              href={`mailto:${speakerSection.speakerMail1 ?? 'info@futureworld.org'}?subject=${encodeURIComponent(speakerSection.speakerCTA1 ?? '')}`}
              className="dt-btn underline"
            >
              {speakerSection.speakerCTA1 ?? 'Get in Touch'}
            </a>
          </div>
          <div className="col-span-2 flex items-end justify-end mt-[2vh]">
            <Link href={'/keynotes#speakers'}
              className="dt-btn font-bold underline"
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

        <div className="col-start-3 col-span-2 flex justify-end items-center mt-2 cursor-pointer" onClick={handleBackToTop}>
            <FadeInOnVisible>
                <span className="underline dt-btn flex items-center gap-1">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ transform: 'rotate(-45deg)' }}
                  >
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                  Back to top
                </span>
              </FadeInOnVisible>
          </div>
      </>
    );
  }

  // Desktop view (unchanged)
  const keynoteTop = KeynoteTop({ keynotes });
  const keynoteBottom = KeynoteBottom({ keynotes });
  return (
    <>
      <div className="grid grid-cols-6 auto-rows-[21vh] overflow-visible gap-x-[1.795vw] gap-y-[3.2vh]">
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
      <div className="grid grid-cols-6 auto-rows-[21vh] overflow-visible gap-x-[1.795vw] gap-y-[3.2vh]">
        {keynoteBottom.map((item) => (
          <div key={item.id} className={getGridClasses(item)}>
            {item.content}
          </div>
        ))}
      </div>
      <FadeInOnVisible>
        <div id="speakers" className="w-full mt-[35vh]">
          <CircularTextSlider speakers={speakers} />
        </div>
      </FadeInOnVisible>
    </>
  );
}
