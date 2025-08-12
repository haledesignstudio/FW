'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
// import { client } from '@/sanity/lib/client';
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

// Sanity query to get latest pieces from different content types
// const signalsQuery = `
// {
//   "mindbullets": *[_type == "mindbullet"] | order(publishedAt desc)[0] {
//     _id,
//     title,
//     summary,
//     mainImage,
//     publishedAt,
//     "type": "mindbullet",
//     slug
//   },
//   "podcasts": *[_type == "podcast"] | order(publishedAt desc)[0] {
//     _id,
//     title,
//     summary,
//     mainImage,
//     publishedAt,
//     "type": "podcast",
//     slug
//   },
//   "caseStudies": *[_type == "caseStudy"] | order(publishedAt desc)[0] {
//     _id,
//     title,
//     summary,
//     mainImage,
//     publishedAt,
//     "type": "case-study",
//     slug
//   },
//   "articles": *[_type == "article"] | order(publishedAt desc)[0] {
//     _id,
//     title,
//     summary,
//     mainImage,
//     publishedAt,
//     "type": "article",
//     slug
//   },
//   "provocativeScenarios": *[_type == "provocativeScenario"] | order(publishedAt desc)[0] {
//     _id,
//     title,
//     summary,
//     mainImage,
//     publishedAt,
//     "type": "provocative-scenario",
//     slug
//   }
// }`;

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

export default function SignalsFromTheFuture({ isMobile = false }: SignalsFromTheFutureProps) {
  const [signalPieces, setSignalPieces] = useState<SignalPiece[]>([]);
  const [expandedColumn, setExpandedColumn] = useState<number | null>(null);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [mobileAutoplay, setMobileAutoplay] = useState(true);
  const [isClient, setIsClient] = useState(false);

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
        // For now, use dummy data since content types aren't in Sanity yet
        const dummyPieces: SignalPiece[] = [
          {
            _id: '1',
            title: 'AI Revolutionizes Healthcare Diagnostics',
            summary: [
              {
                _type: 'block',
                children: [{ text: 'Revolutionary AI system achieves 95% accuracy in early cancer detection, transforming medical diagnostics and potentially saving millions of lives through earlier intervention.' }]
              } as PortableTextBlock
            ],
            publishedAt: '2025-01-15',
            type: 'mindbullet',
            slug: { current: 'ai-healthcare-diagnostics' },
            mainImage: {
              asset: { _ref: 'dummy-ref-1', _type: 'reference' },
              alt: 'AI Healthcare Technology'
            }
          },
          {
            _id: '2', 
            title: 'The Future of Work: Remote Reality',
            summary: [
              {
                _type: 'block',
                children: [{ text: 'Exploring how virtual reality workspaces are reshaping corporate culture and enabling truly immersive remote collaboration experiences.' }]
              } as PortableTextBlock
            ],
            publishedAt: '2025-01-10',
            type: 'podcast',
            slug: { current: 'future-work-remote-reality' },
            mainImage: {
              asset: { _ref: 'dummy-ref-2', _type: 'reference' },
              alt: 'Virtual Reality Workspace'
            }
          },
          {
            _id: '3',
            title: 'Sustainable Cities: Carbon Neutral by 2030',
            summary: [
              {
                _type: 'block', 
                children: [{ text: 'Case study of Copenhagen\'s ambitious plan to become the world\'s first carbon-neutral capital, featuring innovative green technologies and urban planning strategies.' }]
              } as PortableTextBlock
            ],
            publishedAt: '2025-01-08',
            type: 'case-study',
            slug: { current: 'copenhagen-carbon-neutral-2030' },
            mainImage: {
              asset: { _ref: 'dummy-ref-3', _type: 'reference' },
              alt: 'Sustainable City Architecture'
            }
          },
          {
            _id: '4',
            title: 'Quantum Computing Breakthrough',
            summary: [
              {
                _type: 'block',
                children: [{ text: 'Scientists achieve stable quantum computing at room temperature, potentially revolutionizing everything from drug discovery to climate modeling.' }]
              } as PortableTextBlock
            ],
            publishedAt: '2025-01-05',
            type: 'mindbullet', 
            slug: { current: 'quantum-computing-breakthrough' },
            mainImage: {
              asset: { _ref: 'dummy-ref-4', _type: 'reference' },
              alt: 'Quantum Computer Technology'
            }
          },
          {
            _id: '5',
            title: 'Space Economy: Mining the Moon',
            summary: [
              {
                _type: 'block',
                children: [{ text: 'Interview with industry leaders about the emerging lunar mining industry and its potential to revolutionize rare earth mineral supply chains.' }]
              } as PortableTextBlock
            ],
            publishedAt: '2025-01-03',
            type: 'podcast',
            slug: { current: 'space-economy-lunar-mining' },
            mainImage: {
              asset: { _ref: 'dummy-ref-5', _type: 'reference' },
              alt: 'Lunar Mining Operations'
            }
          }
        ];

        setSignalPieces(dummyPieces);

        // Uncomment this when real data is available in Sanity
        // const data = await client.fetch(signalsQuery);
        // const pieces: SignalPiece[] = [];
        // 
        // if (data.mindbullets) pieces.push(data.mindbullets);
        // if (data.podcasts) pieces.push(data.podcasts);
        // if (data.caseStudies) pieces.push(data.caseStudies);
        // if (data.mindbullets) pieces.push(data.mindbullets);
        // if (data.podcasts) pieces.push(data.podcasts);
        // 
        // setSignalPieces(pieces.slice(0, 5));
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
      'mindbullet': '/insights',
      'podcast': '/insights',
      'case-study': '/our-work',
      'article': '/insights',
      'provocative-scenario': '/insights',
      'corporate-venturing': '/our-work'
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
              className="text-[2vh] font-bold leading-tight"
            />
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
        id: 2,
        content: <div></div>,
        colSpan: 0,
        rowSpan: 0,
        mobileColSpan: 1,
        mobileRowSpan: 1,
        landscapeColSpan: 0,
        landscapeRowSpan: 0,
      },
      {
        id: 3,
        content: (
          <div className="flex items-start justify-start h-full">
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
                  className="text-[2vh] font-normal leading-tight"
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
          <div className="flex items-end justify-start h-full">
            <button
              onClick={() => handleReadMore(0)}
              className="transition cursor-pointer bg-transparent border-none outline-none p-0 m-0 text-left"
            >
              <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                <FutureText
                  text="Read More"
                  delay={1000}
                  className="text-[1.8vh] leading-tight font-bold"
                />
              </UnderlineOnHoverAnimation>
            </button>
          </div>
        ) : <div></div>,
        colSpan: 0,
        rowSpan: 0,
        mobileColSpan: 1,
        mobileRowSpan: 1,
        landscapeColSpan: 0,
        landscapeRowSpan: 0,
      },
      {
        id: 6,
        content: <div></div>,
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
              initial={{ maxHeight: 0, opacity: 0 }}
              animate={{ maxHeight: '25vh', opacity: 1 }}
              exit={{ maxHeight: 0, opacity: 0 }}
              transition={{ 
                maxHeight: { duration: 0.5, ease: [0.42, 0, 0.58, 1] },
                opacity: { duration: 0.3, ease: "easeInOut" }
              }}
              style={{ transformOrigin: 'top' }}
            >
              <div className="pt-1">
                <div className="text-[1.8vh] leading-tight max-h-[23vh] overflow-y-auto pr-1">
                  {currentPiece.summary && currentPiece.summary.map((block, index) => (
                    <div key={index} className="mb-2">
                      <FutureText
                        text={(block as PortableTextBlock & { children?: Array<{ text: string }> }).children?.map((child) => child.text).join('') || ''}
                        delay={300 + (index * 200)}
                        className="text-[1.8vh] leading-tight"
                        speed={5}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ),
          colSpan: 0,
          rowSpan: 0,
          mobileColSpan: 2,
          mobileRowSpan: 3, // Spans both row 2 and 3
          landscapeColSpan: 0,
          landscapeRowSpan: 0,
        },
        // Image (row 3, col 1-2)
        {
          id: 8,
          content: currentPiece.mainImage ? (
            <motion.div 
              className="flex items-center justify-center h-full overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
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
                className="transition cursor-pointer bg-transparent border-none outline-none p-0 m-0 text-left"
              >
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  <span className="text-[1.8vh] leading-tight font-bold">Read Less</span>
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
              <a href={getSlugUrl(currentPiece)} className="transition cursor-pointer">
                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                  <span className="text-[1.8vh] leading-tight font-bold">See Article</span>
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
        <div className="grid gap-[2vh] grid-cols-4 auto-rows-[6.25vh]">
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

  const desktopItems: GridItem[] = [
    // Main title (col 1, row 1)
    {
      id: 1,
      content: (
        <div className="flex items-start justify-start h-full">
          <FutureText
            text="Signals from the Future"
            delay={100}
            className="text-[clamp(1.2vw,2.5vh,1.8vw)] font-bold leading-tight"
          />
        </div>
      ),
      colSpan: 1,
      rowSpan: expandedColumn !== null ? 2 : 1,
      mobileColSpan: 0,
      mobileRowSpan: 0,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    },
  ];

  // Add signal pieces (cols 2-6, row 1)
  signalPieces.slice(0, 5).forEach((piece, index) => {
    const columnIndex = index + 1; // 1-5 for columns 2-6
    const isExpanded = expandedColumn === columnIndex;

    desktopItems.push({
      id: columnIndex + 1,
      content: (
        <div className="flex flex-col h-full">
          {/* Piece title and read more button - always visible */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex items-start justify-start flex-1">
              <FutureText
                text={piece.title}
                delay={800 + (index * 600)}
                className="text-[clamp(1vw,2vh,1.5vw)] font-normal leading-tight text-left"
              />
            </div>
            {!isExpanded && (
              <div className="flex items-end justify-start">
                <button
                  onClick={() => handleReadMore(columnIndex)}
                  className="transition cursor-pointer bg-transparent border-none outline-none p-0 m-0 text-left"
                >
                  <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                    <FutureText
                      text="Read More"
                      delay={1200 + (index * 200)}
                      className="text-[clamp(0.7vw,1.5vh,1vw)] leading-tight font-bold"
                    />
                  </UnderlineOnHoverAnimation>
                </button>
              </div>
            )}
          </div>

          {/* Expanded content - using maxHeight for smooth animation without deformation */}
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div
                className="overflow-hidden"
                initial={{ maxHeight: 0, opacity: 0 }}
                animate={{ maxHeight: '52vh', opacity: 1 }}
                exit={{ maxHeight: 0, opacity: 0 }}
                transition={{ 
                  maxHeight: { duration: 0.6, ease: [0.42, 0, 0.58, 1] },
                  opacity: { duration: 0.4, ease: "easeInOut" }
                }}
                style={{ transformOrigin: 'top' }}
              >
                <div className="pt-[2vh]">
                  {/* Summary */}
                  <motion.div 
                    className="mb-[2vh]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ 
                      opacity: 0, 
                      y: -10,
                      transition: { duration: 0.1, delay: 0, ease: "easeOut" }
                    }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.2, 
                      ease: "easeOut"
                    }}
                  >
                    <div className="text-[clamp(0.8vw,1.8vh,1.2vw)] leading-tight max-h-[24vh] overflow-y-auto pr-2">
                      {piece.summary && piece.summary.map((block, blockIndex) => (
                        <div key={blockIndex} className="mb-2">
                          <FutureText
                            text={(block as PortableTextBlock & { children?: Array<{ text: string }> }).children?.map((child) => child.text).join('') || ''}
                            delay={400 + (blockIndex * 200)}
                            className="text-[clamp(0.8vw,1.8vh,1.2vw)] leading-tight"
                            speed={5}
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Image and buttons */}
                  <motion.div 
                    className="flex flex-col"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                  >
                    {piece.mainImage && (
                      <div className="h-[12.5vh] mb-2">
                        <Image
                          src={piece.mainImage.asset._ref.startsWith('dummy-') 
                            ? '/placeholder-image.png' 
                            : urlFor(piece.mainImage.asset).url()}
                          alt={piece.mainImage.alt || piece.title}
                          width={400}
                          height={200}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <div className="flex items-end justify-between pt-2">
                      <button
                        onClick={() => handleReadMore(columnIndex)}
                        className="transition cursor-pointer bg-transparent border-none outline-none p-0 m-0 text-left"
                      >
                        <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                          <span className="text-[clamp(0.7vw,1.5vh,1vw)] leading-tight font-bold">
                            Read Less
                          </span>
                        </UnderlineOnHoverAnimation>
                      </button>
                      <a href={getSlugUrl(piece)} className="transition cursor-pointer">
                        <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                          <span className="text-[clamp(0.7vw,1.5vh,1vw)] leading-tight font-bold">
                            See Article
                          </span>
                        </UnderlineOnHoverAnimation>
                        </a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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

  return (
    <div className="bg-[#F9F7F2] p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] relative z-10">
      <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[6.25vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[7.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[12.5vh]">
        {desktopItems.map((item) => (
          <div key={item.id} className={getGridClasses(item)}>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}