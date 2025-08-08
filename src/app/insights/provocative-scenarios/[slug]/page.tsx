
import { groq } from 'next-sanity';
import PodcastSection from './PodcastSection';
import React from 'react';
import ResponsiveCarousel from '@/components/ResponsiveGridCarousel';
import { HighlightText } from '@/components/HighlightText';

import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';


// Helper to get image URL from Sanity image object
const builder = imageUrlBuilder(client);
function urlFor(source: Record<string, unknown> | undefined) {
  return source ? builder.image(source).url() : '';
}


// Types for carousel/mindbullets items
interface SanityCarouselItem {
  _id?: string;
  _key?: string;
  media?: Record<string, unknown>;
  heading?: string;
  abstract?: string;
  link?: string;
}

interface CarouselItem {
  id: string;
  image: string;
  heading: string;
  body: string;
  link: string;
}

// Mapping function for carousel items
function mapSanityCarouselItems(sanityItems: SanityCarouselItem[] | undefined): CarouselItem[] {
  if (!Array.isArray(sanityItems)) return [];
  return sanityItems.map((item) => ({
    id: item._id || item._key || Math.random().toString(36).substr(2, 9),
    image: item.media ? urlFor(item.media) : '/placeholder-image.png',
    heading: item.heading || '',
    body: item.abstract || '',
    link: item.link || '#',
  }));
}

// Mapping function for mindbullets carousel (if needed)
function mapSanityMindbullets(sanityItems: SanityCarouselItem[] | undefined): CarouselItem[] {
  if (!Array.isArray(sanityItems)) return [];
  return sanityItems.map((item) => ({
    id: item._id || item._key || Math.random().toString(36).substr(2, 9),
    image: item.media ? urlFor(item.media) : '/placeholder-image.png',
    heading: item.heading || '',
    body: item.abstract || '',
    link: item.link || '#',
  }));
}

interface GridItem {
  id: number;
  content: React.ReactNode;
  colSpan: number;
  rowSpan: number;
  mobileColSpan: number;
  mobileRowSpan: number;
  landscapeColSpan: number;
  landscapeRowSpan: number;
}

const getGridClasses = (item: GridItem) => {
  const baseClasses = ['bg-[#F9F7F2]', 'flex', 'flex-col', 'relative'];
  if (item.mobileColSpan === 0 || item.mobileRowSpan === 0) {
    baseClasses.push('block', '[@media(max-width:767px)]:hidden');
  } else {
    baseClasses.push(`col-span-${item.mobileColSpan || item.colSpan || 1}`);
    if (item.mobileRowSpan && item.mobileRowSpan > 0) {
      baseClasses.push(`row-span-${item.mobileRowSpan}`);
    }
  }
  if (item.landscapeColSpan === 0 || item.landscapeRowSpan === 0) {
    baseClasses.push('[@media(max-height:600px)_and_(max-width:768px)]:hidden');
  } else {
    baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:col-span-${item.landscapeColSpan || item.colSpan || 1}`);
    if (item.landscapeRowSpan && item.landscapeRowSpan > 0) {
      baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:row-span-${item.landscapeRowSpan}`);
    }
  }
  if (item.colSpan === 0 || item.rowSpan === 0) {
    baseClasses.push('[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:hidden');
  } else {
    baseClasses.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:col-span-${item.colSpan || 1}`);
    if (item.rowSpan && item.rowSpan > 0) {
      baseClasses.push(`[@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:row-span-${item.rowSpan}`);
    }
  }
  return baseClasses.join(' ');
};

export default async function ProvocativeScenarioPage({ params }: { params: Promise<{ slug: string }> }) {
  // Fetch data from Sanity (replace with actual fields)
  const awaitedParams = await params;
  const data = await client.fetch(
    groq`*[_type == "provocativeScenario" && slug.current == $slug][0]{
      title,
      subtitle,
      mainText,
      boldText,
      carouselItems,
      podcast,
      mindbullets,
      subheading,
      ...
    }`,
    { slug: awaitedParams.slug }
  );

  // Grid items as per your layout
  const items: GridItem[] = [
    // Row 1: Empty (cols 1-6)
    ...Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      content: <div></div>,
      colSpan: 1, rowSpan: 1, mobileColSpan: 1, mobileRowSpan: 1, landscapeColSpan: 1, landscapeRowSpan: 1,
    })),
    // Row 2-3, Cols 1-5: Main title
    {
      id: 7,
      content: <h1 className="font-bold text-5xl">{data.title}</h1>,
      colSpan: 5, rowSpan: 2, mobileColSpan: 5, mobileRowSpan: 2, landscapeColSpan: 5, landscapeRowSpan: 2,
    },
    // Row 4: Empty (cols 1-6)
    ...Array.from({ length: 6 }, (_, i) => ({
      id: 8 + i,
      content: <div></div>,
      colSpan: 1, rowSpan: 1, mobileColSpan: 1, mobileRowSpan: 1, landscapeColSpan: 1, landscapeRowSpan: 1,
    })),
    // Row 5, Cols 1-2: Text box
    {
      id: 14,
      content: <div className="p-4 bg-white rounded shadow">{data.mainText}</div>,
      colSpan: 2, rowSpan: 1, mobileColSpan: 2, mobileRowSpan: 1, landscapeColSpan: 2, landscapeRowSpan: 1,
    },
    // Row 5, Cols 3-5: Bold text
    {
      id: 15,
      content: <div className="p-4 font-bold text-lg">{data.boldText}</div>,
      colSpan: 3, rowSpan: 1, mobileColSpan: 3, mobileRowSpan: 1, landscapeColSpan: 3, landscapeRowSpan: 1,
    },
    // Row 6: Empty (cols 1-6)
    ...Array.from({ length: 6 }, (_, i) => ({
      id: 16 + i,
      content: <div></div>,
      colSpan: 1, rowSpan: 1, mobileColSpan: 1, mobileRowSpan: 1, landscapeColSpan: 1, landscapeRowSpan: 1,
    })),
    // Row 7-9, Cols 1-5: Responsive carousel
    {
      id: 22,
      content: <ResponsiveCarousel items={mapSanityCarouselItems(data.carouselItems)} />, // Mapped props
      colSpan: 5, rowSpan: 3, mobileColSpan: 5, mobileRowSpan: 3, landscapeColSpan: 5, landscapeRowSpan: 3,
    },
    // Row 7, Col 6: Download buttons
    {
      id: 23,
      content: (
        <div className="flex flex-col space-y-2">
          <button className="btn">Download for Mobile</button>
          <button className="btn">Download for Desktop</button>
        </div>
      ),
      colSpan: 1, rowSpan: 3, mobileColSpan: 1, mobileRowSpan: 3, landscapeColSpan: 1, landscapeRowSpan: 3,
    },
    // Row 10: Podcast section (toggleable)
    {
      id: 24,
      content: (
        <PodcastSection podcast={data.podcast} />
      ),
      colSpan: 6, rowSpan: 2, mobileColSpan: 6, mobileRowSpan: 2, landscapeColSpan: 6, landscapeRowSpan: 2,
    },
    // Row 11, Col 1: Podcast button
    {
      id: 25,
      content: (
        data.podcast ? <button className="btn">Go to Podcast</button> : <div></div>
      ),
      colSpan: 1, rowSpan: 1, mobileColSpan: 1, mobileRowSpan: 1, landscapeColSpan: 1, landscapeRowSpan: 1,
    },
    // Row 12: Empty (cols 1-6)
    ...Array.from({ length: 6 }, (_, i) => ({
      id: 26 + i,
      content: <div></div>,
      colSpan: 1, rowSpan: 1, mobileColSpan: 1, mobileRowSpan: 1, landscapeColSpan: 1, landscapeRowSpan: 1,
    })),
    // Row 13, Cols 1-3: Subheading with highlight
    {
      id: 32,
      content: <h2 className="text-xl font-semibold"><HighlightText value={data.subheading} /></h2>,
      colSpan: 3, rowSpan: 1, mobileColSpan: 3, mobileRowSpan: 1, landscapeColSpan: 3, landscapeRowSpan: 1,
    },
    // Row 13, Cols 5-6: Subscribe field (reuse Footer component or extract)
    {
      id: 33,
      content: (
        <>
          <p className="text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[1.5vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[4vh] leading-tight">
            Subscribe for news from the future
          </p>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your e-mail"
            required
            className="outline-none border-none bg-transparent text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:text-[3vh] [@media(max-height:600px)_and_(max-width:768px)]:text-[4vh] text-base placeholder-gray placeholder:font-bold placeholder:text-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:placeholder:text-[3vh] [@media(max-height:600px)_and_(max-width:768px)]:placeholder:text-[4vh]"
          />
        </>
      ),
      colSpan: 2, rowSpan: 1, mobileColSpan: 2, mobileRowSpan: 1, landscapeColSpan: 2, landscapeRowSpan: 1,
    },
    // Row 14, Col 1: Carousel mindbullets heading
    {
      id: 34,
      content: <h3 className="font-bold text-lg">Carousel Mindbullets</h3>,
      colSpan: 1, rowSpan: 1, mobileColSpan: 1, mobileRowSpan: 1, landscapeColSpan: 1, landscapeRowSpan: 1,
    },
    // Rows 15-17, Cols 1-6: Mindbullets carousel
    {
      id: 35,
      content: <ResponsiveCarousel items={mapSanityMindbullets(data.mindbullets)} />, // Mapped props
      colSpan: 6, rowSpan: 3, mobileColSpan: 6, mobileRowSpan: 3, landscapeColSpan: 6, landscapeRowSpan: 3,
    },
  ];

  return (
    <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh]">
      {items.map((item) => (
        <div key={item.id} className={getGridClasses(item)}>
          {item.content}
        </div>
      ))}
    </div>
  );
}
