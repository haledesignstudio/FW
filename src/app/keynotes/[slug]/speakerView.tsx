"use client";

import Image from "next/image";
import FadeInOnVisible from "@/components/FadeInOnVisible";
import useIsMobile from "@/hooks/useIsMobile";
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

type SpeakerViewProps = {
  data: {
    name: string;
    image?: { asset?: string | { _ref: string; _type: string }; alt?: string };
    domainsOfExcellence?: string[];
    socialLinks?: { x?: string; linkedin?: string; facebook?: string; instagram?: string; youtube?: string };
    bio: unknown;
    summary: unknown;
    mailtoSubject?: string;
    email?: string;
    slug?: string;
  };
  nextSlug?: string | null;
};

function SpeakerViewMobile({ data, nextSlug }: SpeakerViewProps) {
  const isMobile = useIsMobile();
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  if (!isMobile) return null;

  // Social links as array
  const socialLinksArr = [
    ['X', data.socialLinks?.x],
    ['LinkedIn', data.socialLinks?.linkedin],
    ['Facebook', data.socialLinks?.facebook],
    ['Instagram', data.socialLinks?.instagram],
    ['YouTube', data.socialLinks?.youtube],
  ].filter(([, url]) => !!url);

  return (
    <div className="grid grid-cols-4 auto-rows-min gap-y-[2vh] w-full px-[2vw] pt-[2vh]">
      {/* Name rotated, col 1-2, row 1-6 */}
      <div className="col-span-4 row-span-2"></div>
      <div className="col-span-2 row-span-2 flex items-start justify-start self-start">
        <FadeInOnVisible>
          <div className="flex items-start justify-end text-right h-full">
            {(() => {
              const [firstName, ...rest] = data.name.split(' ');
              const lastName = rest.join(' ');
              return (
                <h1 className="dt-h1" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  {firstName}<br />{lastName}
                </h1>
              );
            })()}
          </div>
        </FadeInOnVisible>
      </div>
      {/* Image col 3-4, row 1-6 */}
      <div className="col-span-2 row-span-6 flex items-start justify-end">
        {data.image?.asset && (
          <Image src={typeof data.image.asset === 'string' ? data.image.asset : urlFor(data.image.asset).url()} alt={data.image.alt || data.name} width={200} height={300} className="object-cover w-full max-h-[40vh]" />
        )}
      </div>
      {/* Row 7: empty */}
      <div className="col-span-4 h-[2vh]" />
      {/* Domains of excellence col 1-3, row 8-10 */}
      <div className="col-span-3 row-span-3 flex flex-col">
        {data.domainsOfExcellence?.length ? (
          <>
            <div className="dt-h5 mb-[0.5vh]">Domains of excellence</div>
            {data.domainsOfExcellence.map((domain: string, i: number) => (
              <span key={i} className="dt-h3">{domain}</span>
            ))}
          </>
        ) : null}
      </div>
      {/* Social links col 4, row 11-12, top right */}
      <div className="col-start-4 row-start-13 col-span-1 row-span-2 flex flex-col font-bold items-end justify-start">
        {socialLinksArr.map(([label, url], i) => (
          <a key={i} href={url as string} target="_blank" rel="noopener noreferrer" className="dt-btn underline">{label}</a>
        ))}
      </div>
      {/* Bio label and content col 1-4, row 13-17 */}
      <div className="col-span-4 row-span-5 flex flex-col items-start mt-[2vh]">
        <div className="dt-h5 mb-[1vh]">Bio</div>
        <div className="dt-body-sm whitespace-pre-line"><PortableText value={data.bio as PortableTextBlock[]} /></div>
      </div>
      {/* Book button col 1-2, row 18 */}
      <div className="col-span-2 flex items-end justify-start mt-[2vh]">
        <a
          href={`mailto:${data.email ?? 'info@futureworld.org'}?subject=${encodeURIComponent(data.mailtoSubject ?? '')}`}
          className="dt-btn font-bold underline"
        >
          Book {data.name}
        </a>
      </div>
      {/* Next speaker button col 3-4, row 18 */}
      <div className="col-span-2 flex items-end justify-end mt-[2vh]">
        {nextSlug ? (
          <Link href={`/keynotes/${nextSlug}`} className="dt-btn font-bold underline">
            Next speaker
          </Link>
        ) : (
          <span className="opacity-60 dt-btn font-bold underline">Next speaker</span>
        )}
      </div>
      {/* Back to top button col 3-4, row 19 */}
      <div className="col-start-3 col-span-2 flex items-end justify-end mt-[2vh]">
        <div className="col-span-2 flex justify-end items-center cursor-pointer" onClick={handleBackToTop}>
          <FadeInOnVisible>
            <span className="underline dt-btn flex items-center gap-1 font-bold">
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
      </div>
    </div>
  );
}

function SpeakerViewDesktop({ data, nextSlug }: SpeakerViewProps) {
  const isMobile = useIsMobile();
  if (isMobile) return null;

  // Social links as array
  const socialLinksArr = [
    ['X', data.socialLinks?.x],
    ['LinkedIn', data.socialLinks?.linkedin],
    ['Facebook', data.socialLinks?.facebook],
    ['Instagram', data.socialLinks?.instagram],
    ['YouTube', data.socialLinks?.youtube],
  ].filter(([, url]) => !!url);

  return (
    <div className="grid gap-[2vh] grid-cols-2 auto-rows-[25vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[21vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-x-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-y-[3.2vh]">
      {/* Name and social links */}
      <div className="col-span-1 row-span-4 h-full flex flex-col justify-between">
        <FadeInOnVisible>
          <div className="flex items-start justify-end text-right pr-[calc(2*clamp(6vw,16vh,8vw))] h-full">
            {(() => {
              const [firstName, ...rest] = data.name.split(' ');
              const lastName = rest.join(' ');
              return (
                <h1 className="text-[clamp(6vw,16vh,8vw)] font-graphik-semibold leading-[clamp(6vw,16vh,8vw)] -rotate-90 origin-top-right">
                  {firstName}<br />{lastName}
                </h1>
              );
            })()}
          </div>
        </FadeInOnVisible>
        {socialLinksArr.length > 0 && (
          <FadeInOnVisible>
            <div className="w-full flex flex-col items-end gap-[0.5vh]">
              {socialLinksArr.map(([label, url]) => (
                <a
                  key={label}
                  href={url as string}
                  target="_blank"
                  rel="noreferrer"
                  className="dt-btn text-right"
                >
                  <UnderlineOnHoverAnimation hasStaticUnderline>
                    {label}
                  </UnderlineOnHoverAnimation>
                </a>
              ))}
            </div>
          </FadeInOnVisible>
        )}
      </div>
      {/* Image */}
      <div className="col-span-1 row-span-4 h-full overflow-hidden">
        {data.image?.asset && (
          <FadeInOnVisible className="h-full w-full">
            <Image
              src={typeof data.image.asset === 'string' ? data.image.asset : urlFor(data.image.asset).url()}
              alt={data.image.alt || 'Process image'}
              className="w-full h-full object-cover"
              width={400}
              height={600}
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
          </FadeInOnVisible>
        )}
      </div>
  {/* Domains of excellence */}
      <div className="col-span-3 row-span-4">
        {data.domainsOfExcellence?.length ? (
          <FadeInOnVisible>
            <div className="flex flex-col gap-[5vh]">
              <div className="dt-h5">Domains of excellence</div>
              <div className="flex flex-col flex-wrap gap-[1vh]">
                {data.domainsOfExcellence.map((d, i) => (
                  <span
                    key={`${d}-${i}`}
                    className="dt-h3"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </FadeInOnVisible>
        ) : null}
      </div>
      {/* Bio */}
      <div className="col-span-1 row-span-3">
        <FadeInOnVisible>
          <div className="flex flex-col gap-[5vh]">
            <div className="dt-h5">Bio</div>
            <div className="flex flex-col flex-wrap gap-[1vh] dt-body-sm">
              <PortableText value={data.bio as PortableTextBlock[]} />
            </div>
          </div>
        </FadeInOnVisible>
      </div>
      {/* Book and next speaker */}
      <div className="col-span-1 row-span-1 h-full flex flex-col justify-between">
        <FadeInOnVisible>
          <div className="dt-btn text-balance pt-[0vh]">
            <a
              href={`mailto:${data.email ?? 'info@futureworld.org'}?subject=${encodeURIComponent(data.mailtoSubject ?? '')}`}
              className="transition cursor-pointer"
            >
              <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                Book {data.name} for a Keynote
              </UnderlineOnHoverAnimation>
            </a>
          </div>
        </FadeInOnVisible>
        <FadeInOnVisible>
          <div className="dt-btn text-balance">
            {nextSlug ? (
              <Link href={`/keynotes/${nextSlug}`} className="inline-block">
                <UnderlineOnHoverAnimation hasStaticUnderline>
                  Next speaker
                </UnderlineOnHoverAnimation>
              </Link>
            ) : (
              <span className="opacity-60">Next speaker</span>
            )}
          </div>
        </FadeInOnVisible>
      </div>
    </div>
  );
}

export default function SpeakerView(props: SpeakerViewProps) {
  return <>
    <SpeakerViewMobile {...props} />
    <SpeakerViewDesktop {...props} />
  </>;
}
