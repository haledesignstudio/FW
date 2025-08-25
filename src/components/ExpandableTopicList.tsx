'use client';

import { useState, useEffect } from 'react';
import useIsMobile from '../hooks/useIsMobile';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { topicQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image'; // adjust path if needed
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';



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

    const isMobile = useIsMobile();

    return (
        <div className="flex flex-col w-full bg-[#F9F7F2]">
            {topics.map((topic, index) => {
                const isOpen = openIndices.includes(index);
                const imageUrl = topic.topicImage?.asset ? urlFor(topic.topicImage).url() : '';

                // MOBILE VIEW
                if (isMobile) {
                    return (
                        <div key={topic._id} className="w-full">
                            {/* Closed state: 4-column grid, title col-span-3, arrow col-4 bottom right */}
                            <div
                                className="grid grid-cols-4 items-end cursor-pointer border-b border-[#e0ded7] py-[2vh]"
                                onClick={() =>
                                    setOpenIndices((prev) =>
                                        prev.includes(index)
                                            ? prev.filter((i) => i !== index)
                                            : [...prev, index]
                                    )
                                }
                            >
                                <span className="col-span-3 text-left dt-h2">{topic.topicTitle}</span>
                                <span className="col-span-1 flex justify-end items-end">
                                    <Image
                                        src="/accordion-open.png"
                                        alt={isOpen ? 'Collapse' : 'Expand'}
                                        width={24}
                                        height={24}
                                        className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                                        style={{ alignSelf: 'flex-end' }}
                                    />
                                </span>
                            </div>
                            {/* Open state: expanded content below title row */}
                            <div
                                className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[200vh] opacity-100 py-[2vh]' : 'max-h-0 opacity-0 py-0'}`}
                            >
                                <div className="grid grid-cols-4 gap-[2vw] auto-rows-min">
                                    {/* Row 2-3: topic image col-span-4 */}
                                    <div className="col-span-4 row-span-2 flex justify-center items-center my-[2vh]">
                                        {imageUrl && (
                                            <Image
                                                src={imageUrl}
                                                alt={topic.topicImage.alt ?? 'Topic Image'}
                                                width={400}
                                                height={200}
                                                className="object-cover w-full max-h-[30vh] rounded"
                                            />
                                        )}
                                    </div>
                                    {/* Row 4: topic heading col-span-4 */}
                                    <div className="col-span-4 mb-[2vh]">
                                        <h3 className="dt-h3">{topic.topicHeading}</h3>
                                    </div>
                                    {/* Row 5: contents array, left col 1-2, right col 3-4 */}
                                    <div className="col-span-2 space-y-[2vh]">
                                        {topic.contents?.slice(0, Math.ceil(topic.contents.length / 2)).map((item, i) => (
                                            <div className="space-y-[1vh]" key={`left-${i}`}>
                                                <h4 className="dt-h5">{item.heading}</h4>
                                                <p className="dt-body-sm">{item.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="col-span-2 space-y-[2vh]">
                                        {topic.contents?.slice(Math.ceil(topic.contents.length / 2)).map((item, i) => (
                                            <div className="space-y-[1vh]" key={`right-${i}`}>
                                                <h4 className="dt-h5">{item.heading}</h4>
                                                <p className="dt-body-sm">{item.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Row 11: CTA col 3-4 */}
                                    <div className="col-start-3 col-span-2 flex items-end justify-end mt-[2vh]">
                                        <a
                                            href={`mailto:${topic.topicMail}?subject=${encodeURIComponent(topic.topicButtonText)}`}
                                            className="dt-btn underline"
                                            onClick={e => e.stopPropagation()}
                                        >
                                            {topic.topicButtonText}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
                // DESKTOP VIEW (unchanged)
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
                            className="flex items-end justify-between w-full text-left dt-h2 cursor-pointer"
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
                                    <p className="dt-h4">{topic.topicHeading}</p>
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
                                                <h4 className="dt-h5">{item.heading}</h4>
                                                <p className="dt-body-sm">{item.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Right Column */}
                                    <div className="space-y-[3vh]">
                                        {topic.contents?.slice(Math.ceil(topic.contents.length / 2)).map((item, i) => (
                                            <div className="space-y-[1vh]" key={`right-${i}`}>
                                                <h4 className="dt-h5">{item.heading}</h4>
                                                <p className="dt-body-sm">{item.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-span-1 row-span-1" />
                                {/* td-7: CTA */}
                                <div className="col-span-1 row-span-1 p-[1vh] flex items-end justify-end text-right">
                                    <a
                                        href={`mailto:${topic.topicMail}?subject=${encodeURIComponent(topic.topicButtonText)}`}
                                        className="dt-btn"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                                            {topic.topicButtonText}
                                        </UnderlineOnHoverAnimation>

                                    </a>
                                </div>
                                <div className="col-span-2 row-span-1" />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
