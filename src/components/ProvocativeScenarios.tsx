'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { topicQuery } from '@/sanity/lib/queries';

type TopicFromSanity = {
    _id: string;
    topicTitle: string;
    topicHeading: string;
    topicImage: {
        asset: { _ref: string };
        alt?: string;
    };
    slug: { current: string };
};

export default function ProvocativeScenarios() {
    const [topics, setTopics] = useState<TopicFromSanity[]>([]);
    const router = useRouter();

    useEffect(() => {
        client.fetch<TopicFromSanity[]>(topicQuery).then(setTopics);
    }, []);

    return (
        <div className="flex flex-col w-full bg-[#F9F7F2] space-y-[3vh]">
            {topics.map((topic) => {

                return (
                    <button
                        key={topic._id}
                        onClick={() => router.push(`/topics/${topic.slug.current}`)}
                        className="flex items-end justify-between w-full text-left font-graphik text-[10vh] leading-[10vh] cursor-pointer group"
                    >
                        <span>{topic.topicTitle}</span>
                        <Image
                            src="/accordion-open.png"
                            alt={'Expand'}
                            width={24}
                            height={24}
                        />

                    </button>
                );
            })}
        </div>
    );
}
