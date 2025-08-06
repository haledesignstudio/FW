'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { topicQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image'; // adjust path if needed



type TopicFromSanity = {
    _id: string;
    topicTitle: string;
    topicHeading: string;
    topicImage: {
        asset: { _ref: string };
        alt?: string;
    };
    topicButtonText: string;
    topicMail: string;
    contents: {
        heading: string;
        description: string;
    }[];
};


export default function ExpandableTopicList() {
    const [openIndices, setOpenIndices] = useState<number[]>([]);
    const [topics, setTopics] = useState<TopicFromSanity[]>([]);

    useEffect(() => {
        client.fetch<TopicFromSanity[]>(topicQuery).then(setTopics);
    }, []);

    return (
        <div className="flex flex-col w-full bg-[#F9F7F2]">
            {topics.map((topic, index) => {
                const isOpen = openIndices.includes(index);

                const imageUrl = topic.topicImage?.asset ? urlFor(topic.topicImage).url() : '';


                return (
                    <div key={topic._id}>
                        <button
                            onClick={() =>
                                setOpenIndices((prev) =>
                                    prev.includes(index)
                                        ? prev.filter((i) => i !== index) // close
                                        : [...prev, index]               // open
                                )
                            }

                            className="flex items-end justify-between w-full text-left font-graphik text-[10vh] leading-[10vh] cursor-pointer"
                        >
                            <span>{topic.topicTitle}</span>
                            <Image
                                src="/accordion-open.png"
                                alt={isOpen ? 'Collapse' : 'Expand'}
                                width={24}
                                height={24}
                                className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                            />
                        </button>


                        <div
                            className={`
                            transition-all duration-500 ease-in-out overflow-hidden
                            ${isOpen ? 'max-h-[200vh] opacity-100 mt-[5vh]' : 'max-h-0 opacity-0 mt-0'}
                        `}
                        >
                            <div onClick={() =>
                                setOpenIndices((prev) =>
                                    prev.includes(index)
                                        ? prev.filter((i) => i !== index) // close
                                        : [...prev, index]               // open
                                )
                            } className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh]">
                                {/* td-1: topicHeading */}
                                <div className="col-span-2 row-span-1 p-[1vh]">
                                    <p className="text-[3vh]">{topic.topicHeading}</p>
                                </div>

                                <div className="col-span-2 row-span-1" />

                                {/* td-3: topicImage */}
                                <div className="col-span-1 row-span-3 p-[1vh]">
                                    {imageUrl && (
                                        <Image
                                            src={imageUrl}
                                            alt={topic.topicImage.alt ?? 'Topic Image'}
                                            width={1920}
                                            height={1080}
                                            className="object-cover w-full h-full"
                                        />
                                    )}
                                </div>

                                <div className="col-span-1 row-span-1" />

                                {/* td-5: contents array */}
                                <div className="col-span-4 row-span-2 grid grid-cols-2 gap-[3vh]">
                                    {/* Left Column */}
                                    <div className="space-y-[3vh]">
                                        {topic.contents?.slice(0, Math.ceil(topic.contents.length / 2)).map((item, i) => (
                                            <div className="space-y-[1vh]" key={`left-${i}`}>
                                                <h4 className="text-[2.5vh] font-graphik">{item.heading}</h4>
                                                <p className="text-[2vh]">{item.description}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-[3vh]">
                                        {topic.contents?.slice(Math.ceil(topic.contents.length / 2)).map((item, i) => (
                                            <div className="space-y-[1vh]" key={`right-${i}`}>
                                                <h4 className="text-[2.5vh] font-bold">{item.heading}</h4>
                                                <p className="text-[2vh]">{item.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-span-1 row-span-1" />

                                {/* td-7: CTA */}
                                <div className="col-span-1 row-span-1 p-[1vh] flex items-end justify-end text-right">
                                    <a
                                        href={`mailto:${topic.topicMail}?subject=${encodeURIComponent(topic.topicButtonText)}`}
                                        className="text-[2vh] font-bold underline"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {topic.topicButtonText}
                                    </a>

                                </div>
                            </div>
                        </div>

                    </div>
                );
            })}
        </div>
    );
}
