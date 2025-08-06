'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { client } from '@/sanity/lib/client';
import { insightsPageQuery, podcastQuery } from '@/sanity/lib/queries';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import Podcast from '@/components/insights/Podcast/page';
import Mindbullets from '@/components/insights/MindBullets/page';
import Analytics from '@/components/insights/Analytics/page';
import Corporate from '@/components/insights/Corporate/page';
import Edge from '@/components/insights/Edge/page';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import { KeynoteTop, KeynoteBottom } from '@/components/insights/Keynote/page';
import ExpandableTopicList from '@/components/ExpandableTopicList';
import ProvocativeScenarios from '@/components/ProvocativeScenarios';
import { useSearchParams } from 'next/navigation';
import MindbulletArchive from '@/components/mindbulletsArchive';
import CircularTextSlider from '@/components/CircularTextSlider';
import { useRouter, usePathname } from 'next/navigation';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import { PortableTextBlock } from '@portabletext/types';
import { speakersQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';




type insightsPageContent = {
    title: string;
    shareholderValueAnalytics?: {
        title: string;
        subheading: string;
        contentText: string;
        iframeSource: string;
        IQ_heading: string;
        IQ_subheading: string;
        IQ_context: string;
        CTA1: string;
        Mail1: string;
        CTA2: string;
        Mail2: string;
    };
    mindbullets: {
        title: string;
        subheading: string;
    };
    keynotes: {
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
            speakerSectionSubtitle: string;
            speakerContentText: string;
            speakerCTA1: string;
            speakerMail1: string;
            speakerCTA2: string;
        };
    };
    podcast: {
        title: string;
        subheading: string;
    };
    corporateVenturing: {
        title: string;
        subheading: string;
        contentText: string;
        CTA: string;
        Mail: string;
    };
    theEdge: {
        title: string;
        subheading: string;
        contentText: string;
    };
};

type GridItem = {
    id: string;
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

function PageContent() {
    const router = useRouter();
    const pathname = usePathname();


    const searchParams = useSearchParams();
    const sectionFromURL = searchParams?.get('section');

    const [loading, setLoading] = useState(true);
    const [activePage, setActivePage] = useState(sectionFromURL || 'analytics');

    const [data, setData] = useState<{
        insights: insightsPageContent;
        podcasts: {
            _id: string;
            headline: string;
            subheading: string;
            description: string;
            embedLink?: string;
            slug?: { current: string };
            headerImage?: {
                asset: {
                    url: string;
                };
                alt?: string;
            };
        }[];
    } | null>(null);

    const categories = [
        { key: 'analytics', label: 'Shareholder Value Analytics' },
        { key: 'mindbullets', label: 'Mindbullets: News From the Future' },
        { key: 'keynotes', label: 'Keynotes' },
        { key: 'podcast', label: 'Podcast' },
        { key: 'corporate', label: 'Corporate Venturing' },
        { key: 'edge', label: 'The Edge: Insights Driven by Disruption' },
    ];

    const [speakers, setSpeakers] = useState<{
        _id: string;
        name: string;
        bio: PortableTextBlock[];
        image: {
            asset: string;
            alt?: string;
        };
    }[]>([]);



    useEffect(() => {
        Promise.all([
            client.fetch<insightsPageContent>(insightsPageQuery),
            client.fetch(podcastQuery),
            client.fetch(speakersQuery), // 🔥 add this
        ]).then(([insightsResult, podcastResults, speakerResults]) => {
            setData({
                insights: insightsResult,
                podcasts: podcastResults,
            });
            setSpeakers(
                speakerResults
                    .filter(
                        (s) =>
                            typeof s.name === 'string' &&
                            Array.isArray(s.bio) &&
                            s.image !== null &&
                            s.image.asset !== null
                    )
                    .map((s) => ({
                        _id: s._id,
                        name: s.name!,
                        bio: (Array.isArray(s.bio) ? s.bio : []) as PortableTextBlock[],
                        image: {
                            asset: urlFor(s.image!).url(), // image is now guaranteed non-null
                            alt: s.image?.alt || '',
                        },
                    }))
            );


            setLoading(false);
        });
    }, []);


    useEffect(() => {
        if (sectionFromURL) {
            setActivePage(sectionFromURL);
        }
    }, [sectionFromURL]);

    if (loading || !data) return null;

    const keynoteTop = KeynoteTop({ keynotes: data.insights.keynotes });
    const keynoteBottom = KeynoteBottom({ keynotes: data.insights.keynotes });

    const commonItems: GridItem[] = [
        {
            id: 'title',
            content: (
                <MainTitleAnimation
                    text={data.insights.title}
                    typeSpeed={60}
                    delay={500}
                    className="text-[10vh] font-bold leading-tight"
                />
            ),
            colSpan: 4,
            rowSpan: 2,
            mobileColSpan: 1,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        {
            id: 'categories',
            content: (
                <>  <FadeInOnVisible>
                    <span className="text-[2.5vh] font-bold cursor-pointer mt-[2.5vh]">Categories</span>
                </FadeInOnVisible>
                    <br />
                    <ul className="text-[2.5vh] leading-[2vh] space-y-[1.75vh]">
                        {categories.map((cat) => {
                            const isDisabled = cat.key === 'podcast' || cat.key === 'corporate';

                            return (
                                <li key={cat.key}>
                                    {isDisabled ? (
                                        <FadeInOnVisible>
                                            <div className="group flex items-center gap-[1vh]">
                                                {/* Underline Animation always visible */}
                                                <UnderlineOnHoverAnimation>
                                                    <span className="text-black">{cat.label}</span>
                                                </UnderlineOnHoverAnimation>

                                                {/* COMING SOON slides in from bottom */}
                                                <div className="overflow-hidden h-[2.5vh] relative w-fit flex items-center">
                                                    <span
                                                        className="block text-[2vh] text-black/50 transform translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"
                                                    >
                                                        (Coming Soon)
                                                    </span>
                                                </div>
                                            </div>
                                        </FadeInOnVisible>
                                    ) : (
                                        <FadeInOnVisible>
                                            <button
                                                onClick={() => {
                                                    setActivePage(cat.key);
                                                    router.push(`${pathname}?section=${cat.key}`, { scroll: false });

                                                }}
                                                className="transition cursor-pointer"
                                            >
                                                <UnderlineOnHoverAnimation isActive={activePage === cat.key}>
                                                    {cat.label}
                                                </UnderlineOnHoverAnimation>
                                            </button>
                                        </FadeInOnVisible>

                                    )}
                                </li>
                            );
                        })}
                    </ul>

                </>
            ),

            colSpan: 2,
            rowSpan: 2,
            mobileColSpan: 1,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
    ];

    const pageItemSets: Record<string, GridItem[]> = {
        analytics: data.insights.shareholderValueAnalytics
            ? Analytics({ analytics: data.insights.shareholderValueAnalytics })
            : [],
        mindbullets: Mindbullets({
            title: data.insights.mindbullets.title,
            subheading: data.insights.mindbullets.subheading,
            podcasts: data.podcasts,
        }),
        edge: Edge({
            title: data.insights.theEdge.title,
            subheading: data.insights.theEdge.subheading,
            contentText: data.insights.theEdge.contentText,
            podcasts: data.podcasts,
        }),
        podcast: Podcast({
            title: data.insights.podcast.title,
            subheading: data.insights.podcast.subheading,
            podcasts: data.podcasts,
        }),
        corporate: Corporate({
            title: data.insights.corporateVenturing.title,
            subheading: data.insights.corporateVenturing.subheading,
            contentText: data.insights.corporateVenturing.contentText,
            CTA: data.insights.corporateVenturing.CTA,
            Mail: data.insights.corporateVenturing.Mail,
            podcasts: data.podcasts,
        }),
    };

    return (
        <>
            <Header />
            <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
                {activePage === 'keynotes' ? (
                    <>
                        <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[25vh]">
                            {[...commonItems, ...keynoteTop].map((item) => (
                                <div key={item.id} className={getGridClasses(item)}>
                                    {item.content}
                                </div>
                            ))}
                        </div>
                        <FadeInOnVisible>
                            <div className="w-full">
                                <ExpandableTopicList />
                            </div>
                        </FadeInOnVisible>
                        <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[25vh]">
                            {keynoteBottom.map((item) => (
                                <div key={item.id} className={getGridClasses(item)}>
                                    {item.content}
                                </div>
                            ))}
                        </div>
                        <FadeInOnVisible>
                            <div className="w-full mt-[20vh]">
                                <CircularTextSlider speakers={speakers} />
                            </div>
                        </FadeInOnVisible>

                    </>
                ) : (
                    <>
                        <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[25vh]">
                            {[...commonItems, ...(pageItemSets[activePage] || [])].map((item) => (
                                <div key={item.id} className={getGridClasses(item)}>
                                    {item.content}
                                </div>
                            ))}
                        </div>
                        {activePage === 'edge' && (
                            <FadeInOnVisible>
                                <div className="mt-[15vh]">
                                    <ProvocativeScenarios />
                                </div>
                            </FadeInOnVisible>
                        )}

                        {activePage === 'mindbullets' && (
                            <FadeInOnVisible>
                                <div className="">
                                    <MindbulletArchive />
                                </div>
                            </FadeInOnVisible>
                        )}


                    </>
                )}
            </main>
            <Footer />
        </>
    );
}

export default function InsightsPage() {
    return (
        <Suspense fallback={null}>
            <PageContent />
        </Suspense>
    );
}
