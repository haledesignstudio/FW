'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PortableTextBlock } from '@portabletext/types';
import { PortableText } from '@portabletext/react';


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

export default function ResponsiveGridCarousel({ items }: Props) {
    const [startIndex, setStartIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(1);

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

    const paddedItems = [...items.slice(startIndex, startIndex + visibleCount)];
    if (paddedItems.length < visibleCount) {
        paddedItems.push(...items.slice(0, visibleCount - paddedItems.length));
    }

    const next = () => {
        setStartIndex((prev) => (prev + 1) % items.length);
    };

    return (
        <div className="relative">
            <div
                className="
          grid gap-[2vh] 
          [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] 
          [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh]
          grid-cols-2
          [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4
          [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6
          auto-rows-[20vh]
          [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh]
          [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh]
        "
            >
                {paddedItems.map((item, index) => {
                    const colSpan =
                        index === 0
                            ? '[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-2'
                            : 'col-span-1';

                    return (
                        <React.Fragment key={`carousel-${item.id}-${index}`}>
                            {/* Image */}
                            <div className={`row-start-1 ${colSpan} h-full w-full`}>
                                <img
                                    src={item.image}
                                    alt={item.heading}
                                    className={`w-full h-full object-cover transition duration-300 ${index !== 0 ? 'grayscale' : ''
                                        }`}
                                />
                            </div>

                            {/* Text Content */}
                            <div
                                className={`
          row-start-2 ${colSpan}
          bg-[#F9F7F2] flex flex-col justify-between h-full
        `}
                            >
                                <div className="overflow-hidden min-h-0">
                                    <h3
                                        className={`
              font-roboto leading-[3vh] mb-[3vh]
              ${index === 0 ? 'font-graphik text-[3vh]' : 'text-[2vh]'}
            `}
                                    >
                                        {item.heading}
                                    </h3>
                                    <div
                                        className={`
              text-[2vh] font-roboto overflow-hidden text-ellipsis prose prose-sm max-w-none
              ${index === 0 ? 'line-clamp-5' : 'line-clamp-3'}
            `}
                                    >
                                        {typeof item.body === 'string' ? (
                                            <p>{item.body}</p>
                                        ) : (
                                            <PortableText value={item.body} />
                                        )}
                                    </div>
                                </div>

                                <Link
                                    href={item.link}
                                    className="underline font-graphik self-start mt-2"
                                >
                                    Read more
                                </Link>
                            </div>
                        </React.Fragment>
                    );
                })}


                {/* Arrow Button */}
                <div className="col-span-1 row-start-1 flex items-end justify-end">
                    <button
                        onClick={next}
                        className="text-black text-[5vh] leading-[5vh] flex items-end justify-end cursor-pointer"
                    >
                        <img
                            src="/carousel-arrow.png"
                            alt="Next"
                            className="w-[3vh] h-auto object-contain"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
