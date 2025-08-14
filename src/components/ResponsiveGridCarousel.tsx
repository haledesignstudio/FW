'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortableTextBlock } from '@portabletext/types';
import { PortableText } from '@portabletext/react';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import { useRouter } from 'next/navigation';


type CarouselItem = {
    id: string;
    image: string;
    heading: string;
    body: string | PortableTextBlock[];
    link: string;
};


type Props = {
    items: CarouselItem[];
};

// Custom hook to detect responsive layout
const useResponsiveLayout = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            // Mobile: not tablet landscape and not desktop
            const isTabletLandscape = window.matchMedia('(max-height: 600px) and (max-width: 768px)').matches;
            const isDesktop = window.matchMedia('(min-width: 768px) and (min-aspect-ratio: 1/1)').matches;
            setIsMobile(!isTabletLandscape && !isDesktop);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return { isMobile };
};

export default function ResponsiveGridCarousel({ items }: Props) {
    const { isMobile } = useResponsiveLayout();
    const router = useRouter();
    const [startIndex, setStartIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const updateCount = () => {
            if (window.matchMedia('(min-width: 768px) and (min-aspect-ratio: 1/1)').matches) {
                setVisibleCount(4);
            } else if (window.matchMedia('(max-height: 600px) and (max-width: 768px)').matches) {
                setVisibleCount(3);
            } else {
                setVisibleCount(1);
            }
        };

        updateCount();
        window.addEventListener('resize', updateCount);
        return () => window.removeEventListener('resize', updateCount);
    }, []);


    // Always show 4 items on desktop, wrap around if needed
    let paddedItems: CarouselItem[] = [];
    if (!isMobile && visibleCount === 4 && items.length > 0) {
        for (let i = 0; i < 4; i++) {
            paddedItems.push(items[(startIndex + i) % items.length]);
        }
    } else {
        paddedItems = [...items.slice(startIndex, startIndex + visibleCount)];
        if (paddedItems.length < visibleCount) {
            paddedItems.push(...items.slice(0, visibleCount - paddedItems.length));
        }
    }

    const next = () => {
        if (isTransitioning) return; // Prevent multiple clicks during transition
        setIsTransitioning(true);
        setStartIndex((prev) => (prev + 1) % items.length);
        
        // Reset transition state after animation completes
        setTimeout(() => {
            setIsTransitioning(false);
        }, 800);
    };

    const handleReadMore = (itemId: string) => {
        const item = items.find(i => i.id === itemId);
        if (item && item.link) {
            router.push(item.link);
        }
    };

    const getBodyText = (body: string | PortableTextBlock[]): string => {
        if (typeof body === 'string') {
            return body;
        }
        return body.map(block => 
            (block as PortableTextBlock & { children?: Array<{ text: string }> })
                .children?.map(child => child.text).join('') || ''
        ).join(' ');
    };

    return (
        <div className="relative overflow-hidden">
            {isMobile ? (
                /* Mobile Layout */
                <div 
                    className="grid grid-cols-4"
                    style={{ gridAutoRows: 'minmax(15vh, max-content)' }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`mobile-slide-${paddedItems[0]?.id}`}
                            className="col-span-4 grid grid-cols-4 gap-[2vh]"
                            initial={{ x: '100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '-100%', opacity: 0 }}
                            transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                            style={{ gridAutoRows: 'minmax(15vh, max-content)' }}
                        >
                            {/* Main Image: Row 1-2, Col 1-4 */}
                            <div className="col-span-4 row-span-2 row-start-1 overflow-hidden">
                                <img
                                    src={paddedItems[0]?.image}
                                    alt={paddedItems[0]?.heading}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Text Component: Row 3-5, Col 1-4 */}
                            <div className="col-span-4 row-span-2 row-start-3 bg-[#F9F7F2] relative">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`mobile-content-${paddedItems[0]?.id}`}
                                        className="absolute inset-0 p-4 flex flex-col z-10"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                                    >
                                        <h3 className="font-graphik text-[3vh] leading-[3vh] mb-[1vh] break-words">
                                            {paddedItems[0]?.heading}
                                        </h3>
                                        <div className="text-[2vh] flex-1">
                                            <div className="overflow-hidden text-ellipsis prose max-w-none font-roboto line-clamp-[6]">
                                                {typeof paddedItems[0]?.body === 'string' ? (
                                                    <p>{getBodyText(paddedItems[0]?.body).length > 200 ? getBodyText(paddedItems[0]?.body).substring(0, 200) + '...' : getBodyText(paddedItems[0]?.body)}</p>
                                                ) : (
                                                    <PortableText value={paddedItems[0]?.body} />
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                            {/* Row 6: Read More button (col 1), empty (col 2-3), Next Slide button (col 4) */}
                            <div className="col-span-1 row-start-5 bg-[#F9F7F2] flex items-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`mobile-button-${paddedItems[0]?.id}`}
                                        className="p-2 z-20"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                                    >
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleReadMore(paddedItems[0]?.id || ''); }}
                                            className="transition cursor-pointer bg-transparent border-none outline-none p-0 m-0 text-left hover:opacity-80"
                                        >
                                            <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                                                <span className="font-graphik text-[2vh] leading-tight">
                                                    Read More
                                                </span>
                                            </UnderlineOnHoverAnimation>
                                        </button>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                            <div className="col-span-1 row-start-5 bg-[#F9F7F2]"></div>
                            <div className="col-span-1 row-start-5 bg-[#F9F7F2]"></div>
                            <div className="col-span-1 row-start-5 bg-[#F9F7F2] flex items-center justify-end">
                                <button
                                    onClick={(e) => { e.stopPropagation(); next(); }}
                                    disabled={isTransitioning}
                                    className="text-black flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-[#F9F7F2] rounded-full p-1"
                                >
                                    <img
                                        src="/carousel-arrow.png"
                                        alt="Next"
                                        className="w-[3vh] h-auto object-contain"
                                    />
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    {/* Empty space: Row 1, Col 1-3 */}
                    <div className="col-span-3 row-start-1"></div>
                </div>
            ) : (
                /* Desktop/Tablet Layout */
                <div 
                  className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6"
                  style={{
                    gridAutoRows: 'minmax(20vh, max-content)'
                  }}
                >
                    {paddedItems.map((item, index) => {
                        const colSpan =
                            index === 0
                                ? '[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-2'
                                : 'col-span-1';
                        const bodyText = getBodyText(item.body);
                        const truncatedText = bodyText.length > 150 ? bodyText.substring(0, 150) + '...' : bodyText;

                        return (
                            <React.Fragment key={`carousel-${index}`}>
                                {/* Image Container - stays in position, content crossfades */}
                                <div className={`row-start-1 ${colSpan} h-full w-full`}>
                                    <div className="relative w-full h-full overflow-hidden">
                                        <AnimatePresence>
                                            <motion.img
                                                key={`img-${item.id}`}
                                                src={item.image}
                                                alt={item.heading}
                                                className={`absolute inset-0 w-full h-full object-cover ${index !== 0 ? 'grayscale' : ''}`}
                                            initial={{ 
                                                opacity: 0.2, 
                                                scale: 1, // No scaling for incoming images
                                                x: index === 0 ? '50%' : '30%' // More pronounced slide in from right
                                            }}
                                            animate={{ 
                                                opacity: 1, 
                                                scale: 1,
                                                x: 0
                                            }}
                                            exit={{ 
                                                opacity: 0.4, // More subtle fade
                                                x: index === 0 ? '-50%' : '-30%' // More pronounced slide out to left
                                            }}
                                            transition={{ 
                                                duration: 0.8, // Longer exit duration
                                                ease: [0.42, 0, 0.58, 1]
                                            }}
                                            whileHover={{ scale: 1.02 }}
                                        />
                                    </AnimatePresence>
                                    
                                    {/* Stretching effect for main slide */}
                                    {index === 0 && (
                                        <motion.div
                                            className="absolute inset-0 pointer-events-none"
                                            initial={{ scaleX: 1 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ 
                                                duration: 0.8,
                                                ease: [0.42, 0, 0.58, 1]
                                            }}
                                            style={{ transformOrigin: 'left' }}
                                        />
                                    )}
                                    </div>
                                </div>

                                {/* Text Container - stays in position, content crossfades */}
                                <div className={`row-start-2 row-span-2 ${colSpan} bg-[#F9F7F2] relative`}>
                                    {/* Stretching effect for main slide text */}
                                    {index === 0 && (
                                        <motion.div
                                            className="absolute inset-0 pointer-events-none bg-[#F9F7F2]"
                                            initial={{ scaleX: 1 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ 
                                                duration: 0.8,
                                                ease: [0.42, 0, 0.58, 1]
                                            }}
                                            style={{ transformOrigin: 'left' }}
                                        />
                                    )}
                                    
                                    <AnimatePresence>
                                        <motion.div
                                            key={`content-${item.id}`}
                                            className="absolute inset-0 flex flex-col p-4 z-10"
                                            initial={{ 
                                                opacity: 0 // Start completely transparent
                                            }}
                                            animate={{ 
                                                opacity: 1 // Fade to full opacity
                                            }}
                                            exit={{ 
                                                opacity: 0 // Fade out completely
                                            }}
                                            transition={{ 
                                                duration: 0.8, // Match image animation duration
                                                delay: 0, // Start immediately like images
                                                ease: [0.42, 0, 0.58, 1]
                                            }}
                                        >
                                            <h3 className={`leading-[3vh] mb-[1vh] break-words ${
                                                index === 0 ? 'font-graphik text-[3vh]' : 'text-[2vh]'
                                            }`}>
                                                {item.heading}
                                            </h3>
                                            
                                            <div className="text-[2vh]">
                                                <div className={`overflow-hidden text-ellipsis prose max-w-none font-roboto ${
                                                    index === 0 ? 'line-clamp-[4]' : 'line-clamp-[4]'
                                                }`}>
                                                    {typeof item.body === 'string' ? (
                                                        <p>{truncatedText}</p>
                                                    ) : (
                                                        <PortableText value={item.body} />
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Read More Button Container - positioned in next row */}
                                <div className={`row-start-4 ${colSpan} bg-[#F9F7F2] relative`}>
                                    <AnimatePresence>
                                        <motion.div 
                                            key={`button-${item.id}`}
                                            className="absolute top-0 left-0 p-4 z-20"
                                            initial={{ 
                                                opacity: 0 // Start completely transparent
                                            }}
                                            animate={{ 
                                                opacity: 1 // Fade to full opacity
                                            }}
                                            exit={{ 
                                                opacity: 0 // Fade out completely
                                            }}
                                            transition={{ 
                                                duration: 0.8, // Match text duration
                                                delay: 0, // Start immediately like text
                                                ease: [0.42, 0, 0.58, 1]
                                            }}
                                        >
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleReadMore(item.id); }}
                                                className="transition cursor-pointer bg-transparent border-none outline-none p-0 m-0 text-left hover:opacity-80"
                                            >
                                                <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                                                    <span className="font-graphik text-[2vh] leading-tight">
                                                        Read More
                                                    </span>
                                                </UnderlineOnHoverAnimation>
                                            </button>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </React.Fragment>
                        );
                    })}

                    {/* Arrow Button */}
                    <div className="col-span-1 row-start-1 flex items-end justify-end">
                        <motion.button
                            onClick={(e) => { e.stopPropagation(); next(); }}
                            disabled={isTransitioning}
                            className="text-black text-[5vh] leading-[5vh] flex items-end justify-end cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: isTransitioning ? 1 : 1.1 }}
                            whileTap={{ scale: isTransitioning ? 1 : 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <img
                                src="/carousel-arrow.png"
                                alt="Next"
                                className="w-[3vh] h-auto object-contain"
                            />
                        </motion.button>
                    </div>
                </div>
            )}
        </div>
    );
}
