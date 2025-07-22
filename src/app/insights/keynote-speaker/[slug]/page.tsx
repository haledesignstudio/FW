import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import React from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';

interface GridItem {
  id: number;
  content: React.ReactNode;
  colSpan: number;
  rowSpan: number;
  mobileColSpan: number;
  mobileRowSpan: number;
  landscapeColSpan: number;
  landscapeRowSpan: number;
}

const portableTextComponents: PortableTextComponents = {
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 text-base">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 text-base">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
  block: {
    normal: ({ children }) => <p className="mb-2 text-base">{children}</p>,
  },
};
// ...existing code...

const getGridClasses = (item: GridItem) => {
  const baseClasses = ['bg-[#F9F7F2]', 'flex', 'flex-col', 'relative'];
  if (item.mobileColSpan === 0 || item.mobileRowSpan === 0) {
    baseClasses.push('block', '[@media(max-width:767px)]:hidden');
  } else {
    baseClasses.push(`col-span-${item.mobileColSpan || item.colSpan || 1}`);
    if (item.mobileRowSpan && item.mobileRowSpan > 0) {
      baseClasses.push(`row-span-${item.mobileRowSpan}`);
    }
  }
  if (item.landscapeColSpan === 0 || item.landscapeRowSpan === 0) {
    baseClasses.push('[@media(max-height:600px)_and_(max-width:768px)]:hidden');
  } else {
    baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:col-span-${item.landscapeColSpan || item.colSpan || 1}`);
    if (item.landscapeRowSpan && item.landscapeRowSpan > 0) {
      baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:row-span-${item.landscapeRowSpan}`);
    }
  }
  if (item.colSpan === 0 || item.rowSpan === 0) {
    baseClasses.push('[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:hidden');
  } else {
    baseClasses.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-${item.colSpan || 1}`);
    if (item.rowSpan && item.rowSpan > 0) {
      baseClasses.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-${item.rowSpan}`);
    }
  }
  return baseClasses.join(' ');
};

export default async function KeynoteSpeakerPage({ params }: { params: Promise<{ slug: string }> }) {
  const awaitedParams = await params;
  const data = await client.fetch(
    groq`*[_type == "keynoteSpeaker" && slug.current == $slug][0]{
      name,
      bio,
      image,
      domainsOfExcellence,
      socialLinks,
      mailtoSubject,
      slug
    }`,
    { slug: awaitedParams.slug }
  );

  // Fetch all speakers for next speaker button
  const allSpeakers = await client.fetch(
    groq`*[_type == "keynoteSpeaker"]|order(name asc){slug, name}`
  );

  if (!data) return <div className="text-red-500">Speaker not found.</div>;

  type Speaker = { slug: { current: string }, name: string };
  const currentIndex = allSpeakers.findIndex((s: Speaker) => s.slug.current === data.slug?.current);
  const nextSpeaker = allSpeakers[(currentIndex + 1) % allSpeakers.length];

  // 5x6 grid, every cell explicitly defined for correct spacing
  const items: GridItem[] = [
    // Row 1 (Blank)
    ...Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        content: <div></div>,
        colSpan: 1,
        rowSpan: 1,
        mobileColSpan: 1,
        mobileRowSpan: 1,
        landscapeColSpan: 1,
        landscapeRowSpan: 1,
    })),
    // Row 2
    {
        id: 7, // Speaker name (Col 1, Rows 2-4)
        content: (
        <div className="flex items-stretch justify-stretch h-full w-full relative">
            <span
              className="font-bold transform origin-top-right text-right leading-none"
              style={{
                position: 'absolute',
                right: 350,
                top: 0,
                width: '20%',
                height: '20%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                whiteSpace: 'pre',
                fontSize: 'calc(100vh / 6)',
                lineHeight: 1,
                zIndex: 1,
                transform: 'rotate(-90deg)',
                transformOrigin: 'top right',
              }}
            >
              {(() => {
                if (!data.name) return null;
                const parts = data.name.trim().split(' ');
                if (parts.length === 1) return data.name;
                const surname = parts.pop();
                const firstname = parts.join(' ');
                return (
                  <>
                    <span style={{ display: 'block', textAlign: 'right', lineHeight: 0.85 }}>{firstname}</span>
                    <span style={{ display: 'block', textAlign: 'right', lineHeight: 0.7 }}>{surname}</span>
                  </>
                );
              })()}
            </span>
        </div>
        ),
        colSpan: 1,
        rowSpan: 3,
        mobileColSpan: 1,
        mobileRowSpan: 3,
        landscapeColSpan: 1,
        landscapeRowSpan: 3,
    },
    {
        id: 8, // Speaker image (Col 2, Rows 2-5)
        content: (
        <div className="absolute inset-0 w-full h-full flex overflow-hidden relative">
            <div className="absolute left-1 top-1 text-xs text-gray-400 z-10">Image</div>
            {data.image && (
            <Image
                src={urlFor(data.image).width(1200).url()}
                alt={data.image.alt || data.name}
                fill
                className="object-cover"
                style={{ objectPosition: 'center' }}
            />
            )}
        </div>
        ),
        colSpan: 1,
        rowSpan: 4,
        mobileColSpan: 1,
        mobileRowSpan: 4,
        landscapeColSpan: 1,
        landscapeRowSpan: 4,
    },
    {
        id: 9, // Domains of Excellence (Cols 3-4, Rows 2-3)
        content: (
        <div className="flex flex-col justify-start items-start h-full relative">
            <h3 className="font-bold mb-2">Domains of Excellence</h3>
            <ul className="list-disc pl-4">
            {data.domainsOfExcellence?.map((domain: string, idx: number) => (
                <li key={idx}>{domain}</li>
            ))}
            </ul>
            <div className="absolute left-1 top-1 text-xs text-gray-400">Domains</div>
        </div>
        ),
        colSpan: 2,
        rowSpan: 2,
        mobileColSpan: 2,
        mobileRowSpan: 2,
        landscapeColSpan: 2,
        landscapeRowSpan: 2,
    },
    // Col 5, Row 2
    { id: 10, content: <div></div>, colSpan: 1, rowSpan: 1, mobileColSpan: 1, mobileRowSpan: 1, landscapeColSpan: 1, landscapeRowSpan: 1 },
    // Col 6, Row 2-4: Speaker bio
    {
        id: 11,
        content: (
        <div className="h-full flex flex-col justify-start items-start max-h-[calc(3*25vh)] overflow-y-auto relative">
            <h3 className="font-bold mb-2">Bio</h3>
            <PortableText value={data.bio} components={portableTextComponents} />
            <div className="absolute left-1 top-1 text-xs text-gray-400">Bio</div>
        </div>
        ),
        colSpan: 1,
        rowSpan: 3,
        mobileColSpan: 1,
        mobileRowSpan: 3,
        landscapeColSpan: 1,
        landscapeRowSpan: 3,
    },
    // Row 3 (Cols 3-4, empty for spacing)
    { id: 12, content: <div></div>, colSpan: 2, rowSpan: 1, mobileColSpan: 2, mobileRowSpan: 1, landscapeColSpan: 2, landscapeRowSpan: 1 },
    // Row 4 (Cols 3-4, empty for spacing)
    { id: 13, content: <div></div>, colSpan: 2, rowSpan: 1, mobileColSpan: 2, mobileRowSpan: 1, landscapeColSpan: 2, landscapeRowSpan: 1 },
    // Row 5
    {
        id: 14, // Social links (Col 1, Row 5)
        content: (
        <div className="flex flex-col items-end justify-end h-full space-y-2 relative">
            <div className="absolute left-1 top-1 text-xs text-gray-400">Social</div>
            {data.socialLinks?.x && <a href={data.socialLinks.x} target="_blank" rel="noopener noreferrer" className="text-right">X</a>}
            {data.socialLinks?.linkedin && <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-right">LinkedIn</a>}
            {data.socialLinks?.facebook && <a href={data.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-right">Facebook</a>}
            {data.socialLinks?.instagram && <a href={data.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-right">Instagram</a>}
            {data.socialLinks?.youtube && <a href={data.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-right">YouTube</a>}
        </div>
        ),
        colSpan: 1,
        rowSpan: 1,
        mobileColSpan: 1,
        mobileRowSpan: 1,
        landscapeColSpan: 1,
        landscapeRowSpan: 1,
    },
    // Cols 2-5, Row 5 (empty for spacing)
    ...Array.from({ length: 4 }, (_, i) => ({
        id: 15 + i,
        content: <div></div>,
        colSpan: 1,
        rowSpan: 1,
        mobileColSpan: 1,
        mobileRowSpan: 1,
        landscapeColSpan: 1,
        landscapeRowSpan: 1,
    })),
    // Col 6, Row 5: Book/Next
    {
        id: 19,
        content: (
        <div className="flex flex-col items-start space-y-2 relative">
            <div className="absolute left-1 top-1 text-xs text-gray-400">Book/Next</div>
            <a
            href={`mailto:info@futureworld.org?subject=${encodeURIComponent(data.mailtoSubject || `Book ${data.name} for a Keynote`)}`}
            className="underline font-bold"
            >
            Book {data.name} for a Keynote
            </a>
            {nextSpeaker && (
            <a
                href={`/insights/keynote-speaker/${nextSpeaker.slug.current}`}
                className="underline"
            >
                Next Speaker
            </a>
            )}
        </div>
        ),
        colSpan: 1,
        rowSpan: 1,
        mobileColSpan: 1,
        mobileRowSpan: 1,
        landscapeColSpan: 1,
        landscapeRowSpan: 1,
    },
    ];

  return (
    <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh]">
      {items.map((item) => (
        <div key={item.id} className={getGridClasses(item)}>
          {item.content}
        </div>
      ))}
    </div>
  );
}