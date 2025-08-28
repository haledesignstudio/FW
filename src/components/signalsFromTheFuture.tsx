'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import { FutureText } from '@/components/FutureText';
import { PortableTextBlock } from 'sanity';

// Type definitions
interface SignalPiece {
  _id: string;
  title: string;
  summary: PortableTextBlock[];
  mainImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  publishedAt: string;
  type: 'mindbullet' | 'podcast' | 'case-study' | 'article' | 'provocative-scenario' | 'corporate-venturing';
  slug: {
    current: string;
  };
}

interface SignalsFromTheFutureProps {
  isMobile?: boolean;
}


// Sanity query to get latest pieces from different content types (only fields that exist in schema)
const signalsQuery = `{
  "mindbullets": *[_type == "mindbullet"] | order(publishedAt desc)[0] {
    _id,
    title,
    mainImage,
    byLine,
    publishedAt,
    "type": "mindbullet",
    slug
  },
  "podcasts": *[_type == "podcast"] | order(publishedAt desc)[0] {
    _id,
    headline,
    description,
    headerImage,
    publishedAt,
    "type": "podcast",
    slug
  },
  "caseStudies": *[_type == "caseStudy"] | order(publishedAt desc)[0] {
    _id,
    title,
    subheading,
    mainImage,
    publishedAt,
    "type": "case-study",
    slug
  },
  "articles": *[_type == "article"] | order(publishedAt desc)[0] {
    _id,
    title,
    image,
    byline,
    publishedAt,
    "type": "article",
    slug
  },
  "provocativeScenarios": *[_type == "provocativeScenario"] | order(publishedAt desc)[0] {
    _id,
    title,
    contentText,
    subheading,
    "mainImage": articleContents[0].image,
    publishedAt,
    "type": "provocative-scenario",
    slug
  }
}`;

type GridItem = {
  id: number;
  content: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  mobileColSpan?: number;
  mobileRowSpan?: number;
  landscapeColSpan?: number;
  landscapeRowSpan?: number;
};

const getGridClasses = (item: GridItem) => {
  const base = ['bg-[#F9F7F2]', 'flex', 'flex-col'];

  if (item.mobileColSpan === 0 || item.mobileRowSpan === 0) {
    base.push('block', '[@media(max-width:767px)]:hidden');
  } else {
    base.push(`col-span-${item.mobileColSpan}`, `row-span-${item.mobileRowSpan}`);

    // Add explicit grid positioning for mobile expanded content
    if (item.id === 7) { // Summary content row 2-3 col 3-4
      base.push('col-start-3', 'row-start-2');
    } else if (item.id === 8) { // Image row 3 col 1-2
      base.push('col-start-1', 'row-start-3');
    } else if (item.id === 9) { // Empty left columns row 4
      base.push('col-start-1', 'row-start-4');
    } else if (item.id === 10) { // Read Less button row 4 col 3
      base.push('col-start-3', 'row-start-4');
    } else if (item.id === 11) { // See Article button row 4 col 4
      base.push('col-start-4', 'row-start-4');
    }
  }

  if (item.landscapeColSpan === 0 || item.landscapeRowSpan === 0) {
    base.push('[@media(max-height:600px)_and_(max-width:768px)]:hidden');
  } else {
    base.push(`[@media(max-height:600px)_and_(max-width:768px)]:col-span-${item.landscapeColSpan}`);
    base.push(`[@media(max-height:600px)_and_(max-width:768px)]:row-span-${item.landscapeRowSpan}`);
  }

  if (item.colSpan === 0 || item.rowSpan === 0) {
    base.push('[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:hidden');
  } else {
    base.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-${item.colSpan}`);
    base.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-${item.rowSpan}`);
  }

  return base.join(' ');
};

const getActionText = (type: string) => {
  const actionTexts: Record<string, string> = {
    'mindbullet': 'See Article',
    'podcast': 'Listen Now',
    'case-study': 'See Case Study',
    'article': 'See Article',
    'provocative-scenario': 'Explore Scenario',
    'corporate-venturing': 'Learn More'
  };
  return actionTexts[type] || 'See Article';
};


export default function SignalsFromTheFuture({ isMobile = false }: SignalsFromTheFutureProps) {
  const [signalPieces, setSignalPieces] = useState<SignalPiece[]>([]);
  const [expandedColumn, setExpandedColumn] = useState<number | null>(null);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [mobileAutoplay, setMobileAutoplay] = useState(true);
  const [isClient, setIsClient] = useState(false);
  // Track if a column was just closed to control reappear delay
  const [justClosedColumn, setJustClosedColumn] = useState<number | null>(null);

  // Mobile detection with hydration safety
  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      // Mobile detection handled by window.innerWidth checks where needed
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch signals data
  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const data = await client.fetch(signalsQuery);
        const pieces: SignalPiece[] = [];
        if (data.mindbullets) pieces.push({
          _id: data.mindbullets._id,
          title: data.mindbullets.title,
          summary: typeof data.mindbullets.byLine === 'string' && data.mindbullets.byLine.trim() !== ''
            ? [{ _type: 'block', _key: Math.random().toString(36).substr(2, 9), children: [{ text: data.mindbullets.byLine }] }]
            : [],
          mainImage: data.mindbullets.mainImage,
          publishedAt: data.mindbullets.publishedAt,
          type: data.mindbullets.type,
          slug: data.mindbullets.slug,
        });
        if (data.podcasts) {
          // Limit podcast description to first 2 sentences for summary
          let podcastSummary: PortableTextBlock[] = [];
          if (Array.isArray(data.podcasts.description)) {
            podcastSummary = data.podcasts.description;
          } else if (typeof data.podcasts.description === 'string' && data.podcasts.description.trim() !== '') {
            // Split into sentences and use only the first one
            const sentences = data.podcasts.description.match(/[^.!?]+[.!?]+/g) || [data.podcasts.description];
            const limited = sentences[0].trim();
            podcastSummary = [{ _type: 'block', _key: Math.random().toString(36).substr(2, 9), children: [{ text: limited }] }];
          }
          pieces.push({
            _id: data.podcasts._id,
            title: data.podcasts.headline,
            summary: podcastSummary,
            mainImage: data.podcasts.headerImage,
            publishedAt: data.podcasts.publishedAt,
            type: data.podcasts.type,
            slug: data.podcasts.slug,
          });
        }
        if (data.caseStudies) pieces.push({
          _id: data.caseStudies._id,
          title: data.caseStudies.title,
          summary: Array.isArray(data.caseStudies.subheading)
            ? data.caseStudies.subheading
            : (typeof data.caseStudies.subheading === 'string' && data.caseStudies.subheading.trim() !== ''
              ? [{ _type: 'block', _key: Math.random().toString(36).substr(2, 9), children: [{ text: data.caseStudies.subheading }] }]
              : []),
          mainImage: data.caseStudies.mainImage,
          publishedAt: data.caseStudies.publishedAt,
          type: data.caseStudies.type,
          slug: data.caseStudies.slug,
        });
        if (data.articles) pieces.push({
          _id: data.articles._id,
          title: data.articles.title,
          summary: typeof data.articles.byline === 'string' && data.articles.byline.trim() !== ''
            ? [{ _type: 'block', _key: Math.random().toString(36).substr(2, 9), children: [{ text: data.articles.byline }] }]
            : [],
          mainImage: data.articles.image,
          publishedAt: data.articles.publishedAt,
          type: data.articles.type,
          slug: data.articles.slug,
        });
        if (data.provocativeScenarios) pieces.push({
          _id: data.provocativeScenarios._id,
          title: data.provocativeScenarios.title,
          summary: Array.isArray(data.provocativeScenarios.subheading)
            ? data.provocativeScenarios.subheading
            : (typeof data.provocativeScenarios.subheading === 'string' && data.provocativeScenarios.subheading.trim() !== ''
              ? [{ _type: 'block', _key: Math.random().toString(36).substr(2, 9), children: [{ text: data.provocativeScenarios.subheading }] }]
              : []),
          mainImage: data.provocativeScenarios.mainImage,
          publishedAt: data.provocativeScenarios.publishedAt,
          type: data.provocativeScenarios.type,
          slug: data.provocativeScenarios.slug,
        });
        setSignalPieces(pieces.slice(0, 5));
      } catch (error) {
        console.error('Error fetching signals:', error);
      }
    };
    fetchSignals();
  }, []);

  // Mobile autoplay effect
  useEffect(() => {
    const isMobileScreen = isClient && window.innerWidth < 768;
    if (!isClient || (!isMobile && !isMobileScreen) || !mobileAutoplay || signalPieces.length === 0) return;

    const interval = setInterval(() => {
      setCurrentMobileIndex((prev) => (prev + 1) % signalPieces.length);
    }, 8000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [isClient, isMobile, mobileAutoplay, signalPieces.length]);

  const handleReadMore = (columnIndex: number) => {
    const isMobileScreen = isClient && window.innerWidth < 768;
    if (isMobile || isMobileScreen) {
      setMobileAutoplay(false); // Stop autoplay when user interacts
    }
    const newExpandedState = expandedColumn === columnIndex ? null : columnIndex;
    // If closing, set justClosedColumn for delay logic
    if (expandedColumn === columnIndex) {
      setJustClosedColumn(columnIndex);
      setTimeout(() => setJustClosedColumn(null), 500); // clear after 0.5s
    }
    setExpandedColumn(newExpandedState);
    // Resume autoplay when closing expanded content on mobile
    if ((isMobile || isMobileScreen) && newExpandedState === null) {
      setMobileAutoplay(true);
    }
  };

  //   const handleReadLess = () => {
  //     setExpandedColumn(null);
  //     const isMobileScreen = isClient && window.innerWidth < 768;
  //     if (isMobile || isMobileScreen) {
  //       setMobileAutoplay(true); // Resume autoplay
  //     }
  //   };

  const getSlugUrl = (piece: SignalPiece) => {
    const typeToPath: Record<string, string> = {
      'mindbullet': '/mindbullets',
      'podcast': '/podcast',
      'case-study': '/case-study',
      'article': '/insights',
      'provocative-scenario': '/the-edge',
      'corporate-venturing': '/corporate-venturing'
    };
    return `${typeToPath[piece.type] || '/insights'}/${piece.slug.current}`;
  };

  // Prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="bg-[#F9F7F2] p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh]">
        <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[6.25vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[7.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[12.5vh]">
          <div className="col-span-6 row-span-1 bg-[#F9F7F2]"></div>
        </div>
      </div>
    );
  }

  if (isMobile || window.innerWidth < 768) {
    // Mobile Layout
    const currentPiece = signalPieces[currentMobileIndex];
    if (!currentPiece) return null;

    const mobileItems: GridItem[] = [
      // Row 1: Main title (col 1) + Empty (col 2) + Piece title (col 3-4)
      {
        id: 1,
        content: (
          <div className="flex items-start justify-start h-full">
            <FutureText
              text="Signals from the Future"
              delay={100}
              className="dt-h5"
            />
          </div>
        ),
        colSpan: 0,
        rowSpan: 0,
        mobileColSpan: 1,
        mobileRowSpan: 1,
        landscapeColSpan: 0,
        landscapeRowSpan: 0,
      },
      {
        id: 2,
        content: (
          <div>
          </div>
        ),
        colSpan: 0,
        rowSpan: 0,
        mobileColSpan: 1,
        mobileRowSpan: 2,
        landscapeColSpan: 0,
        landscapeRowSpan: 0,
      },
      {
        id: 3,
        content: (
          <div className="flex items-start justify-start h-full text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMobileIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <FutureText
                  text={currentPiece.title}
                  delay={200}
                  className={[
                  'dt-body-sm',
                  expandedColumn === 0 ? 'line-clamp-none' : 'line-clamp-1',
                ].join(' ')}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        ),
        colSpan: 0,
        rowSpan: 0,
        mobileColSpan: 2,
        mobileRowSpan: 1,
        landscapeColSpan: 0,
        landscapeRowSpan: 0,
      },
      // Row 2: Empty (col 1-2) + Read More button (col 3) + See Article (col 4)
      {
        id: 4,
        content: <div></div>,
        colSpan: 0,
        rowSpan: 0,
        mobileColSpan: 1,
        mobileRowSpan: 1,
        landscapeColSpan: 0,
        landscapeRowSpan: 0,
      },
      {
        id: 5,
        content: expandedColumn !== 0 ? (
          <motion.div
            className="flex items-end justify-start h-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.4,
              delay: justClosedColumn === 0 ? 0.2 : 0.6,
              ease: "easeOut"
            }}
            key="read-more-btn-mobile"
          >
            <button
              onClick={() => handleReadMore(0)}
              className="dt-btn-secondary transition cursor-pointer bg-transparent border-none outline-none p-0 m-0 text-left"
            >
              <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                <span>Read More</span>
              </UnderlineOnHoverAnimation>
            </button>
          </motion.div>
        ) : <div></div>,
        colSpan: 0,
        rowSpan: 0,
        mobileColSpan: 1,
        mobileRowSpan: 1,
        landscapeColSpan: 0,
        landscapeRowSpan: 0,
      },
    ];

    // Add expanded content if needed
    if (expandedColumn === 0) {
      mobileItems.push(
        // Summary content (row 2, col 3-4) - starts earlier for more space
        {
          id: 7,
          content: (
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              style={{ transformOrigin: 'top' }}
            >
              <div className="pt-1">
                <div className="text-[1.8vh] leading-tight max-h-[23vh] overflow-y-auto mt-2 pr-1">
                  {currentPiece.summary && currentPiece.summary.map((block: PortableTextBlock, index: number) => (
                    <div key={index} className="mb-2">
                      <span className="dt-body-sm">
                        {((block.children || []) as Array<{ text: string }>).map((child: { text: string }) => child.text).join('') || ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ),
          colSpan: 0,
          rowSpan: 0,
          mobileColSpan: 2,
          mobileRowSpan: 2, // Spans both row 2 and 3
          landscapeColSpan: 0,
          landscapeRowSpan: 0,
        },
        // Image (row 3, col 1-2)
        {
          id: 8,
          content: currentPiece.mainImage ? (
            <motion.div
              className="flex items-center justify-center h-[8vh]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
            >
              <Image
                src={currentPiece.mainImage.asset._ref.startsWith('dummy-')
                  ? '/placeholder-image.png'
                  : urlFor(currentPiece.mainImage.asset).url()}
                alt={currentPiece.mainImage.alt || currentPiece.title}
                width={500}
                height={300}
                className="object-cover w-full h-full"
              />
            </motion.div>
          ) : <div></div>,
          colSpan: 0,
          rowSpan: 0,
          mobileColSpan: 2,
          mobileRowSpan: 1,
          landscapeColSpan: 0,
          landscapeRowSpan: 0,
        },
        // Empty left columns for buttons row (row 4, col 1-2)
        {
          id: 9,
          content: <div></div>,
          colSpan: 0,
          rowSpan: 0,
          mobileColSpan: 2,
          mobileRowSpan: 1,
          landscapeColSpan: 0,
          landscapeRowSpan: 0,
        },
        // Read Less button (row 4, col 3)
        {
          id: 10,
          content: (
            <motion.div
              className="flex items-end justify-start h-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
            >
              <button
                onClick={() => handleReadMore(0)}
                className="dt-btn-secondary transition cursor-pointer bg-transparent border-none outline-none p-0 m-0 text-left"
              >
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  <span>Read Less</span>
                </UnderlineOnHoverAnimation>
              </button>
            </motion.div>
          ),
          colSpan: 0,
          rowSpan: 0,
          mobileColSpan: 1,
          mobileRowSpan: 1,
          landscapeColSpan: 0,
          landscapeRowSpan: 0,
        },
        // See Article button (row 4, col 4)
        {
          id: 11,
          content: (
            <motion.div
              className="flex items-end justify-end h-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
            >
              <a href={getSlugUrl(currentPiece)} className="dt-btn-secondary transition cursor-pointer">
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  <span>{getActionText(currentPiece.type)}</span>
                </UnderlineOnHoverAnimation>
              </a>
            </motion.div>
          ),
          colSpan: 0,
          rowSpan: 0,
          mobileColSpan: 1,
          mobileRowSpan: 1,
          landscapeColSpan: 0,
          landscapeRowSpan: 0,
        }
      );
    }

    return (
      <div className="bg-[#F9F7F2] p-[2vh] relative z-10">
        <div className="grid gap-[2vh] grid-cols-4 min-rows-[2vh]">
          {mobileItems.map((item) => (
            <div key={item.id} className={getGridClasses(item)}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop Layout
  if (signalPieces.length === 0) return null;

  const desktopGridItems: GridItem[] = [];
  // Main title always in col 1, row 1
  desktopGridItems.push({
    id: 1,
    content: (
      <div className="flex items-start justify-start h-full">
        <FutureText
          text="Signals from the Future"
          delay={100}
          className="dt-h5"
        />
      </div>
    ),
    colSpan: 1,
    rowSpan: 1,
    mobileColSpan: 0,
    mobileRowSpan: 0,
    landscapeColSpan: 1,
    landscapeRowSpan: 1,
  });
  signalPieces.slice(0, 5).forEach((piece, index) => {
    const columnIndex = index + 1;
    const isExpanded = expandedColumn === columnIndex;
    desktopGridItems.push({
      id: columnIndex + 1,
      content: (
        <div className="flex flex-col h-full gap-[clamp(0.8vw,2vh,1vw)]">
          <div className="flex-1 flex flex-col justify-between gap-[clamp(0.8vw,2vh,1vw)]">
            <div className="flex items-start justify-start flex-1">
              <FutureText
                text={piece.title}
                delay={800 + index * 600}
                className={[
                  'dt-body-sm',
                  isExpanded ? 'line-clamp-none' : 'line-clamp-1',
                ].join(' ')}
              />
            </div>
            {!isExpanded && (
              <motion.div
                className="flex items-end justify-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.4,
                  delay: justClosedColumn === columnIndex ? 0.2 : 0.8 + (index * 0.6),
                  ease: "easeOut"
                }}
              >
                <button
                  onClick={() => handleReadMore(columnIndex)}
                  className="dt-btn-secondary transition cursor-pointer bg-transparent border-none outline-none p-0 m-0 text-left"
                >
                  <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                    <span>Read More</span>
                  </UnderlineOnHoverAnimation>
                </button>
              </motion.div>
            )}
          </div>
          <div style={{ minHeight: 0, height: isExpanded ? 'auto' : 0, transition: 'height 0.5s cubic-bezier(0.42,0,0.58,1)', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <DynamicExpandedContent
                    piece={piece}
                    columnIndex={columnIndex}
                    handleReadMore={handleReadMore}
                    getSlugUrl={getSlugUrl}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ),
      colSpan: 1,
      rowSpan: isExpanded ? 3 : 1,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    });
  });

  // --- DynamicExpandedContent for desktop ---
  // --- Types for DynamicExpandedContent ---
  type DynamicExpandedContentProps = {
    piece: SignalPiece;
    columnIndex: number;
    handleReadMore: (col: number) => void;
    getSlugUrl: (piece: SignalPiece) => string;
  };

  function DynamicExpandedContent({ piece, columnIndex, handleReadMore, getSlugUrl }: DynamicExpandedContentProps) {

    const textRef = React.useRef<HTMLDivElement>(null);
    const imageRef = React.useRef<HTMLDivElement>(null);


    return (
      <motion.div
        className=""
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{
          height: { duration: 0.6, ease: [0.42, 0, 0.58, 1] },
          opacity: { duration: 0.4, ease: "easeInOut" }
        }}
        style={{ overflow: 'hidden', transformOrigin: 'top' }}
      >
        <div className="pt-[0.2vh] flex flex-col">
          {/* Summary (text) at the top */}
          <div
            ref={textRef}
            className="text-[clamp(0.8vw,1.8vh,1.2vw)] leading-tight max-h-none overflow-visible pr-2 flex-1 flex flex-col justify-start"
            style={{ alignItems: 'flex-start' }}
          >
            {piece.summary && piece.summary.map((block: PortableTextBlock, blockIndex: number) => (
              <motion.div
                key={blockIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.2 + blockIndex * 0.15, ease: "easeOut" }}
                className="text-[clamp(0.8vw,1.8vh,1.2vw)] leading-tight"
              >
                {((block.children || []) as Array<{ text: string }>).map((child: { text: string }) => child.text).join('') || ''}
              </motion.div>
            ))}
          </div>
          {/* Image below the summary */}
          {piece.mainImage && (
            <motion.div
              ref={imageRef}
              className="h-[10vh] mb-2 mt-2 flex items-center justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            >
              <Image
                src={piece.mainImage.asset._ref.startsWith('dummy-')
                  ? '/placeholder-image.png'
                  : urlFor(piece.mainImage.asset).url()}
                alt={piece.mainImage.alt || piece.title}
                width={400}
                height={200}
                className="object-cover w-full h-full"
              />
            </motion.div>
          )}
        </div>
        <div className="flex items-end justify-between pt-2">
          <button
            onClick={() => handleReadMore(columnIndex)}
            className="dt-btn-secondary transition cursor-pointer bg-transparent border-none outline-none p-0 m-0 text-left"
          >
            <UnderlineOnHoverAnimation hasStaticUnderline={true}>
              <span>Read Less</span>
            </UnderlineOnHoverAnimation>
          </button>
          <a href={getSlugUrl(piece)} className="dt-btn-secondary transition cursor-pointer">
            <UnderlineOnHoverAnimation hasStaticUnderline={true}>
              <span>{getActionText(piece.type)}</span>
            </UnderlineOnHoverAnimation>
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-[#F9F7F2] p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] relative z-10">
      <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-6 auto-rows-auto">
        {desktopGridItems.map((item) => (
          <div key={item.id} className={getGridClasses(item)}>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}