// app/keynotes/page.tsx
import { client } from '@/sanity/lib/client';
import { keynotesPageQuery, speakersQuery } from '@/sanity/lib/queries';
import CommonHeader from '@/components/insights/CommonHeader';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { notFound } from 'next/navigation';
import type { PortableTextBlock } from '@portabletext/types';
import Keynotes from './keynotes';
import { urlFor } from '@/sanity/lib/image';

type SanityRef = { _ref: string } | { _id: string };
type SanityImage = { asset?: SanityRef; alt?: string };


type KeynotesData = {
    topicSection: {
        topicSectionTitle: string;
        topicSectionSubtitle: PortableTextBlock[];
        topicContentText: string;
        topicCTA1: string;
        topicMail1: string;
        topicCTA2: string;
    };
    speakerSection: {
        speakerSectionTitle: string;
        speakerSectionSubtitle: PortableTextBlock[];
        speakerContentText: string;
        speakerCTA1: string;
        speakerMail1: string;
        speakerCTA2: string;
    };
};

type KeynotesDoc = {
    title: string;
    topicSection: KeynotesData['topicSection'];
    speakerSection: KeynotesData['speakerSection'];
};

type Speaker = {
    _id: string;
    name: string;
    bio: PortableTextBlock[];
    image?: SanityImage;
};


type SpeakerForClient = {
    _id: string;
    name: string;
    bio: PortableTextBlock[];
    image: { asset: string; alt?: string };
};

type SpeakerWithImage = Speaker & { image: SanityImage & { asset: SanityRef } };

const hasImageWithAsset = (s: Speaker): s is SpeakerWithImage =>
    Boolean(s.image?.asset);


export default async function KeynotesPage() {
    const [doc, speakersRaw] = await Promise.all([
        client.fetch<KeynotesDoc | null>(keynotesPageQuery),
        client.fetch<Speaker[]>(speakersQuery),
    ]);

    if (!doc) notFound();

    const speakers: SpeakerForClient[] =
        (speakersRaw ?? [])
            .filter(
                (s): s is SpeakerWithImage =>
                    typeof s.name === 'string' &&
                    Array.isArray(s.bio) &&
                    hasImageWithAsset(s)
            )
            .map((s) => ({
                _id: s._id,
                name: s.name,
                bio: s.bio,
                image: {
                    asset: urlFor(s.image).url(),
                    alt: s.image.alt || '',
                },
            })) || [];


    // const headerItems = commonHeader(doc.title, 'keynotes');

    // Shape the prop expected by the client component
    const keynotes: KeynotesData = {
        topicSection: doc.topicSection,
        speakerSection: doc.speakerSection,
    };

    return (
        <>
            <Header />
            <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
                {/* Header grid */}
                    {/* Desktop: grid items */}
                    {/* {headerItems.map((item) => (
                        <div key={item.id} className={getGridClasses(item)}>
                            {item.content}
                        </div>
                    ))} */}
                    {/* Mobile: client component renders its own grid */}
                    <CommonHeader title={doc.title} active="keynotes" />

                {/* Client-side keynotes content */}
                <Keynotes keynotes={keynotes} speakers={speakers} />
            </main>
            <Footer />
        </>
    );
}
