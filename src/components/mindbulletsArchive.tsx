'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { defineQuery } from 'next-sanity';
import { urlFor } from '@/sanity/lib/image';

const PAGE_SIZE = 10 as const;

type SortField = 'publishedAt' | 'dateline';
type SortDirection = 'asc' | 'desc';

type SanityAssetRef = { _ref: string } | { _id: string };
type SanityImage = { asset?: SanityAssetRef; alt?: string };


type Mindbullet = {
  _id: string;
  title: string;
  slug?: string;
  mainImage?: SanityImage;
  publishedAt: string; // stored as string in your schema
  dateline: string;
  byLine?: string;
};

const mindbulletsQuery = defineQuery(`
  *[_type == "mindbullet"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    mainImage {
      asset,
      alt
    },
    publishedAt,
    dateline,
    byLine
  }
`);

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

const MindbulletArchive = () => {
  const [mindbullets, setMindbullets] = useState<Mindbullet[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortField>('publishedAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [hoveredAlt, setHoveredAlt] = useState<string>('Mindbullet image');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const isMobile = useIsMobile();

  // Fetch from Sanity
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const data = await client.fetch<Mindbullet[]>(mindbulletsQuery);
        if (!cancelled) setMindbullets(data ?? []);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  const sorted = useMemo(() => {
    const copy = [...mindbullets];
    copy.sort((a, b) => {
      if (sortBy === 'dateline') {
        const numA = parseInt(String(a.dateline).replace(/\D/g, ''), 10) || 0;
        const numB = parseInt(String(b.dateline).replace(/\D/g, ''), 10) || 0;
        return sortDirection === 'asc' ? numA - numB : numB - numA;
      } else {
        // publishedAt is a string in your schema, so parse to Date
        const dateA = new Date(a.publishedAt);
        const dateB = new Date(b.publishedAt);
        return sortDirection === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }
    });
    return copy;
  }, [mindbullets, sortBy, sortDirection]);

  const displayed = useMemo(
    () => sorted.slice(0, page * PAGE_SIZE),
    [sorted, page]
  );

  return (
    <div className="w-full relative mt-[20vh]">
  {isMobile ? (
        <div className="grid grid-cols-4 gap-2 w-full">
          {/* Row 1: Headings */}
          <div className="col-span-2 text-lg font-bold flex items-end">Mindbullets Archive</div>
          <div className="col-span-1 flex items-end">
            <button onClick={() => handleSort('publishedAt')} className="flex items-center cursor-pointer text-xs font-bold">
              <span
                className={`transition-transform duration-200 ${sortBy === 'publishedAt' && sortDirection === 'asc' ? 'rotate-[-90deg]' : 'rotate-0'}`}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 5v14M12 19l6-6M12 19l-6-6" />
                </svg>
              </span>
              Date Published
            </button>
          </div>
          <div className="col-span-1 flex items-end">
            <button onClick={() => handleSort('dateline')} className="flex items-center cursor-pointer text-xs font-bold">
              <span
                className={`transition-transform duration-200 ${sortBy === 'dateline' && sortDirection === 'asc' ? 'rotate-[-90deg]' : 'rotate-0'}`}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 5v14M12 19l6-6M12 19l-6-6" />
                </svg>
              </span>
              Dateline
            </button>
          </div>

          {/* Rows 2-4: Mindbullets */}
          {loading ? (
            <div className="col-span-4 opacity-60">Loading…</div>
          ) : (
            <>
              {displayed.map((mb) => {
                const imgUrl = mb.mainImage?.asset
                  ? urlFor(mb.mainImage).width(1200).height(675).fit('crop').url()
                  : null;
                return (
                  <React.Fragment key={mb._id}>
                    {/* Title (col 1-2) */}
                    <div className="col-span-2 flex items-center">
                      <Link
                        href={`/mindbullets/${mb.slug}`}
                        className="cursor-pointer font-roboto text-xs leading-tight"
                        onMouseMove={(e) => {
                          setMousePos({ x: e.clientX, y: e.clientY });
                          if (imgUrl) {
                            setHoveredImage(imgUrl);
                            setHoveredAlt(mb.mainImage?.alt || 'Mindbullet image');
                          } else {
                            setHoveredImage(null);
                          }
                        }}
                        onMouseLeave={() => setHoveredImage(null)}
                      >
                        {mb.title} / {mb.byLine}
                      </Link>
                    </div>
                    {/* Date Published (col 3) */}
                    <div className="col-span-1 font-roboto text-xs leading-tight flex items-center">
                      {new Intl.DateTimeFormat('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        timeZone: 'UTC',
                      }).format(new Date(`${mb.publishedAt}T00:00:00Z`))}
                    </div>
                    {/* Dateline (col 4) */}
                    <div className="col-span-1 font-roboto text-xs leading-tight flex items-center">
                      {new Intl.DateTimeFormat('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        timeZone: 'UTC',
                      }).format(new Date(`${mb.dateline}T00:00:00Z`))}
                    </div>
                  </React.Fragment>
                );
              })}
            </>
          )}

          {/* Row 5: Show More button */}
          <div className="col-span-4 mt-2 flex">
            {!loading && displayed.length < sorted.length && (
              <button
                className="text-400 underline font-bold bg-transparent border-none p-0 m-0 hover:text-600 transition-colors duration-150"
                style={{ boxShadow: 'none' }}
                onClick={() => setPage(page + 1)}
              >
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  Show More
                </UnderlineOnHoverAnimation>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 w-full">
          {/* Headings */}
          <div className="col-span-3 text-2xl font-bold flex items-end">
            Mindbullets Archive
          </div>
          <div className="col-start-5 font-bold flex items-end">
            <button onClick={() => handleSort('publishedAt')} className="flex items-center cursor-pointer">
              <span
                className={`transition-transform duration-200 ${sortBy === 'publishedAt' && sortDirection === 'asc'
                  ? 'rotate-[-90deg]'
                  : 'rotate-0'
                  }`}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 5v14M12 19l6-6M12 19l-6-6" />
                </svg>
              </span>
              Date Published
            </button>
          </div>
          <div className="col-start-6 font-bold flex items-end">
            <button onClick={() => handleSort('dateline')} className="flex items-center cursor-pointer ">
              <span
                className={`transition-transform duration-200 ${sortBy === 'dateline' && sortDirection === 'asc'
                  ? 'rotate-[-90deg]'
                  : 'rotate-0'
                  }`}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 5v14M12 19l6-6M12 19l-6-6" />
                </svg>
              </span>
              Dateline
            </button>
          </div>

          {/* Titles */}
          <div className="col-span-3">
            {loading ? (
              <div className="opacity-60">Loading…</div>
            ) : (
              <ul className="space-y-2">
                {displayed.map((mb) => {
                  const imgUrl = mb.mainImage?.asset
                    ? urlFor(mb.mainImage).width(1200).height(675).fit('crop').url()
                    : null;

                  return (
                    <li key={mb._id}>
                      <Link
                        href={`/mindbullets/${mb.slug}`}
                        className="cursor-pointer font-roboto text-[clamp(0.9vw,2.5vh,1.25vw)] leading-tight"
                        onMouseMove={(e) => {
                          setMousePos({ x: e.clientX, y: e.clientY });
                          if (imgUrl) {
                            setHoveredImage(imgUrl);
                            setHoveredAlt(mb.mainImage?.alt || 'Mindbullet image');
                          } else {
                            setHoveredImage(null);
                          }
                        }}
                        onMouseLeave={() => setHoveredImage(null)}
                      >
                        {mb.title} / {mb.byLine}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="col-start-4" />

          {/* Dates */}
          <div className="col-start-5">
            <ul className="space-y-2 font-roboto text-[clamp(0.9vw,2.5vh,1.25vw)] leading-tight">
              {displayed.map((mb) => (
                <li key={mb._id}>
                  {new Intl.DateTimeFormat('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    timeZone: 'UTC',
                  }).format(new Date(`${mb.publishedAt}T00:00:00Z`))}
                </li>
              ))}
            </ul>
          </div>

          {/* Datelines */}
          <div className="col-start-6">
            <ul className="space-y-2 font-roboto text-[clamp(0.9vw,2.5vh,1.25vw)] leading-tight">
              {displayed.map((mb) => (
                <li key={mb._id}>
                  {new Intl.DateTimeFormat('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    timeZone: 'UTC',
                  }).format(new Date(`${mb.dateline}T00:00:00Z`))}
                </li>
              ))}
            </ul>
          </div>

          {/* Show More */}
          <div className="col-span-6 mt-4">
            {!loading && displayed.length < sorted.length && (
              <button
                className="text-400 underline font-bold bg-transparent border-none p-0 m-0 hover:text-600 transition-colors duration-150"
                style={{ boxShadow: 'none' }}
                onClick={() => setPage(page + 1)}
              >
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  Show More
                </UnderlineOnHoverAnimation>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Hover image preview (desktop only) */}
      {!isMobile && hoveredImage && (
        <Image
          src={hoveredImage}
          alt={hoveredAlt}
          width={1920}
          height={1080}
          style={{
            position: 'fixed',
            top: mousePos.y + 10,
            left: mousePos.x + 10,
            height: 'calc(10vw * 9 / 16)',
            width: '10vw',
            objectFit: 'cover',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
          sizes="10vw"
        />
      )}
    </div>
  );
};

export default MindbulletArchive;