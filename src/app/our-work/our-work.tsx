'use client';

import React, { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import CountingAnimation from '@/components/countingAnimation';
import VerticalAccordion from '@/components/VerticalAccordion';

type OurWorkContent = {
    title: string;
    mainTitle: string;
    subtitle: string;
    stats: {
        corporatePartners: number;
        gameChangingOpportunities: number;
        valuePropositions: number;
        investmentCases: number;
        newVenturesInCommercialisation: number;
    };
    statLabels: {
        corporatePartnersLabel: string;
        gameChangingOpportunitiesLabel: string;
        valuePropositionsLabel: string;
        investmentCasesLabel: string;
        newVenturesInCommercialisationLabel: string;
    };
    testimonials: {
        quote: string;
        clientName: string;
        clientTitle: string;
        company: string;
    }[];
    partneredBrands: {
        brandName: string;
        brandLogo: {
            asset: {
                _ref: string;
                _type: string;
                url?: string;
            };
            alt: string;
        };
    }[];
    accordion: {
        heading: string;
        text: string;
        image: {
            asset: {
                _ref: string;
                _type: string;
                url?: string;
            };
            alt: string;
        };
        color: string;
    }[];
};

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
    const baseClasses = ['bg-[#F9F7F2]', 'flex', 'flex-col'];

    // Mobile
    if (item.mobileColSpan === 0 || item.mobileRowSpan === 0) {
        baseClasses.push('block', '[@media(max-width:767px)]:hidden');
    } else {
        baseClasses.push(`col-span-${item.mobileColSpan}`);
        baseClasses.push(`row-span-${item.mobileRowSpan}`);
    }

    // Landscape
    if (item.landscapeColSpan === 0 || item.landscapeRowSpan === 0) {
        baseClasses.push('[@media(max-height:600px)_and_(max-width:768px)]:hidden');
    } else {
        baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:col-span-${item.landscapeColSpan}`);
        baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:row-span-${item.landscapeRowSpan}`);
    }

    // Desktop
    if (item.colSpan === 0 || item.rowSpan === 0) {
        baseClasses.push('[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:hidden');
    } else {
        baseClasses.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-${item.colSpan}`);
        baseClasses.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-${item.rowSpan}`);
    }

    return baseClasses.join(' ');
};

// Simple testimonial carousel component
const TestimonialCarousel = ({ testimonials }: { testimonials: OurWorkContent['testimonials'] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3));
    };

    const visibleTestimonials = testimonials.slice(currentIndex * 3, (currentIndex + 1) * 3);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                {visibleTestimonials.map((testimonial, index) => (
                    <div key={index} className="flex flex-col justify-between p-4 bg-white/10 rounded-lg">
                        <p className="text-sm mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                        <div className="flex items-center gap-3">
                            <div>
                                <p className="font-bold text-sm">{testimonial.clientName}</p>
                                <p className="text-xs">{testimonial.clientTitle}</p>
                                <p className="text-xs">{testimonial.company}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-2 mt-4">
                <button 
                    onClick={prevSlide}
                    className="px-3 py-1 bg-black/20 rounded hover:bg-black/30"
                >
                    ←
                </button>
                <button 
                    onClick={nextSlide}
                    className="px-3 py-1 bg-black/20 rounded hover:bg-black/30"
                >
                    →
                </button>
            </div>
        </div>
    );
};

// Brand scroll carousel component
const BrandCarousel = ({ brands }: { brands: OurWorkContent['partneredBrands'] }) => {
    return (
        <div className="w-full h-full overflow-hidden">
            <div className="flex animate-scroll">
                {[...brands, ...brands].map((brand, index) => (
                    <div key={index} className="flex-shrink-0 w-32 h-16 mx-4 flex items-center justify-center">
                        <img 
                            src={brand.brandLogo.asset?.url} 
                            alt={brand.brandLogo.alt || brand.brandName}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

interface OurWorkProps {
    data: OurWorkContent;
}

export default function OurWork({ data }: OurWorkProps) {
    const statsData = [
        { number: data.stats.corporatePartners, text: data.statLabels?.corporatePartnersLabel || "Corporate Partners" },
        { number: data.stats.gameChangingOpportunities, text: data.statLabels?.gameChangingOpportunitiesLabel || "Game Changing Opportunities" },
        { number: data.stats.valuePropositions, text: data.statLabels?.valuePropositionsLabel || "Value Propositions" },
        { number: data.stats.investmentCases, text: data.statLabels?.investmentCasesLabel || "Investment Cases" },
        { number: data.stats.newVenturesInCommercialisation, text: data.statLabels?.newVenturesInCommercialisationLabel || "New Ventures in Commercialisation" }
    ];

    // Transform accordion data to match VerticalAccordion component
    const accordionItems = data.accordion.map((item, index) => ({
        id: `accordion-${index}`,
        title: item.heading,
        content: (
            <div className="flex flex-col gap-4">
                {item.image && (
                    <img 
                        src={item.image.asset?.url} 
                        alt={item.image.alt || item.heading}
                        className="w-full h-auto rounded-lg"
                    />
                )}
                <p className="text-lg leading-relaxed">{item.text}</p>
            </div>
        ),
        color: item.color // Add color to accordion items
    }));

    const items: GridItem[] = [
        // Row 1 - Main Title (columns 1-2)
        {
            id: 1,
            content: (
                <div className="flex items-center justify-start h-full">
                    <MainTitleAnimation
                        text={data.mainTitle}
                        className="text-[5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[12vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold leading-tight"
                    />
                </div>
            ),
            colSpan: 2,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 1,
            landscapeColSpan: 4,
            landscapeRowSpan: 1,
        },
        // Row 1 - Empty space (columns 3-6)
        {
            id: 2,
            content: <></>,
            colSpan: 4,
            rowSpan: 1,
            mobileColSpan: 0,
            mobileRowSpan: 0,
            landscapeColSpan: 0,
            landscapeRowSpan: 0,
        },
        // Row 2 - Subtitle (columns 1-3)
        {
            id: 3,
            content: (
                <div className="flex items-center justify-start h-full">
                    <p className="text-[2.5vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[4.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[6vh] leading-tight">
                        {data.subtitle}
                    </p>
                </div>
            ),
            colSpan: 3,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 1,
            landscapeColSpan: 4,
            landscapeRowSpan: 1,
        },
        // Row 2 - Empty space (columns 4-6)
        {
            id: 4,
            content: <></>,
            colSpan: 3,
            rowSpan: 1,
            mobileColSpan: 0,
            mobileRowSpan: 0,
            landscapeColSpan: 0,
            landscapeRowSpan: 0,
        },
        // Row 3 - Stats (columns 1-5)
        ...statsData.map((stat, index) => ({
            id: 5 + index,
            content: (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <CountingAnimation
                        target={stat.number}
                        className="text-[8vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[10vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[8vh] font-bold"
                    />
                    <p className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[2vh] leading-tight mt-2">
                        {stat.text}
                    </p>
                </div>
            ),
            colSpan: 1,
            rowSpan: 1,
            mobileColSpan: index < 3 ? 1 : 0,
            mobileRowSpan: index < 3 ? 1 : 0,
            landscapeColSpan: 1,
            landscapeRowSpan: 1,
        })),
        // Row 3 - Empty space (column 6)
        {
            id: 10,
            content: <></>,
            colSpan: 1,
            rowSpan: 1,
            mobileColSpan: 0,
            mobileRowSpan: 0,
            landscapeColSpan: 0,
            landscapeRowSpan: 0,
        },
        // Row 4 - Blank
        {
            id: 11,
            content: <></>,
            colSpan: 6,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 1,
            landscapeColSpan: 4,
            landscapeRowSpan: 1,
        },
        // Row 5-6 - Testimonials Carousel
        {
            id: 12,
            content: <TestimonialCarousel testimonials={data.testimonials} />,
            colSpan: 6,
            rowSpan: 2,
            mobileColSpan: 2,
            mobileRowSpan: 2,
            landscapeColSpan: 4,
            landscapeRowSpan: 2,
        },
        // Row 7 - Brand Carousel
        {
            id: 13,
            content: <BrandCarousel brands={data.partneredBrands} />,
            colSpan: 6,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 1,
            landscapeColSpan: 4,
            landscapeRowSpan: 1,
        },
        // Row 8 - Blank
        {
            id: 14,
            content: <></>,
            colSpan: 6,
            rowSpan: 1,
            mobileColSpan: 2,
            mobileRowSpan: 1,
            landscapeColSpan: 4,
            landscapeRowSpan: 1,
        },
        // Row 9-13 - Vertical Accordion
        {
            id: 15,
            content: <VerticalAccordion items={accordionItems} />,
            colSpan: 6,
            rowSpan: 5,
            mobileColSpan: 2,
            mobileRowSpan: 5,
            landscapeColSpan: 4,
            landscapeRowSpan: 5,
        },
    ];

    return (
        <>
            <Header />
            <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
                <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh]">
                    {items.map((item) => (
                        <div key={item.id} className={getGridClasses(item)}>
                            {item.content}
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}
