import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import React from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
// Custom PortableText components for better list and block rendering
const portableTextComponents: PortableTextComponents = {
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 text-base">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 text-base">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
  block: {
    normal: ({ children }) => <p className="mb-2 text-base">{children}</p>,
  },
};

// Type for grid items
interface GridItem {
  id: number;
  content: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  mobileColSpan?: number;
  mobileRowSpan?: number;
  landscapeColSpan?: number;
  landscapeRowSpan?: number;
}

const getGridClasses = (item: GridItem) => {
  const baseClasses = ['bg-[#F9F7F2]', 'flex', 'flex-col', 'relative'];

  // Mobile
  if (item.mobileColSpan === 0 || item.mobileRowSpan === 0) {
    baseClasses.push('block', '[@media(max-width:767px)]:hidden');
  } else {
    baseClasses.push(`col-span-${item.mobileColSpan || item.colSpan || 1}`);
    if (item.mobileRowSpan && item.mobileRowSpan > 0) {
      baseClasses.push(`row-span-${item.mobileRowSpan}`);
    }
  }

  // Landscape
  if (item.landscapeColSpan === 0 || item.landscapeRowSpan === 0) {
    baseClasses.push('[@media(max-height:600px)_and_(max-width:768px)]:hidden');
  } else {
    baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:col-span-${item.landscapeColSpan || item.colSpan || 1}`);
    if (item.landscapeRowSpan && item.landscapeRowSpan > 0) {
      baseClasses.push(`[@media(max-height:600px)_and_(max-width:768px)]:row-span-${item.landscapeRowSpan}`);
    }
  }

  // Desktop
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

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const awaitedParams = await params;
  const data = await client.fetch(
    groq`*[_type == "caseStudy" && slug.current == $slug][0]{
      title,
      subheading,
      heading,
      abstract,
      mainImage,
      concept,
      methodology,
      impact,
      transformation,
      conclusion
    }`,
    { slug: awaitedParams.slug }
  );

  if (!data) return <div className="text-red-500">Case study not found.</div>;

  const items: GridItem[] = [
    // Row 1: Title (cols 1-4)
    {
      id: 1,
      content: <h1 className="text-9xl font-bold">{data.title}</h1>,
      colSpan: 4,
      rowSpan: 1,
      mobileColSpan: 4,
      mobileRowSpan: 1,
      landscapeColSpan: 4,
      landscapeRowSpan: 1,
    },
    // Row 1: Subheading (cols 5-6, right aligned)
    {
      id: 2,
      content: <span className="text-lg font-medium text-right w-full flex justify-end">{data.subheading}</span>,
      colSpan: 2,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 2,
      landscapeRowSpan: 1,
    },
    // Row 2: Blank (cols 1-6)
    {
      id: 3,
      content: <div></div>,
      colSpan: 6,
      rowSpan: 1,
      mobileColSpan: 6,
      mobileRowSpan: 1,
      landscapeColSpan: 6,
      landscapeRowSpan: 1,
    },
    // Row 3: Heading (cols 1-3)
    {
      id: 4,
      content: <h2 className="text-2xl font-semibold">{data.heading}</h2>,
      colSpan: 3,
      rowSpan: 1,
      mobileColSpan: 3,
      mobileRowSpan: 1,
      landscapeColSpan: 3,
      landscapeRowSpan: 1,
    },
    // Row 3: Empty gap (col 4)
    {
      id: 21,
      content: <div></div>,
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 1,
      mobileRowSpan: 1,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    },
    // Row 3: Abstract (cols 5-6)
    {
      id: 5,
      content: <p className="text-base">{data.abstract}</p>,
      colSpan: 2,
      rowSpan: 1,
      mobileColSpan: 2,
      mobileRowSpan: 1,
      landscapeColSpan: 2,
      landscapeRowSpan: 1,
    },
    // Rows 4-5: Main Image (cols 1-6)
    data.mainImage && {
      id: 6,
      content: (
        <div className="w-full h-full flex justify-center items-center">
          <Image
            src={data.mainImage ? urlFor(data.mainImage).width(2560).url() : ''}
            alt={data.title}
            width={2560}
            height={1440}
            className="object-cover w-full h-full max-h-[40vh] rounded-lg"
          />
        </div>
      ),
      colSpan: 6,
      rowSpan: 2,
      mobileColSpan: 6,
      mobileRowSpan: 2,
      landscapeColSpan: 6,
      landscapeRowSpan: 2,
    },
    // Row 6: Section Headers (cols 1-5), plus empty col 6
    {
      id: 7,
      content: <h3 className="font-bold mb-2">The Concept</h3>,
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 1,
      mobileRowSpan: 1,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    },
    {
      id: 8,
      content: <h3 className="font-bold mb-2">Methodology and Execution</h3>,
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 1,
      mobileRowSpan: 1,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    },
    {
      id: 9,
      content: <h3 className="font-bold mb-2">Impact and Outcome</h3>,
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 1,
      mobileRowSpan: 1,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    },
    {
      id: 10,
      content: <h3 className="font-bold mb-2">Transformation Potential</h3>,
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 1,
      mobileRowSpan: 1,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    },
    {
      id: 11,
      content: <h3 className="font-bold mb-2">Conclusion</h3>,
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 1,
      mobileRowSpan: 1,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    },
    // Row 6: Empty col 6
    {
      id: 22,
      content: <div></div>,
      colSpan: 1,
      rowSpan: 1,
      mobileColSpan: 1,
      mobileRowSpan: 1,
      landscapeColSpan: 1,
      landscapeRowSpan: 1,
    },
    // Rows 7-10: Section Texts (cols 1-5), plus empty col 6
    {
      id: 12,
      content: <PortableText value={data.concept} components={portableTextComponents} />,
      colSpan: 1,
      rowSpan: 4,
      mobileColSpan: 1,
      mobileRowSpan: 4,
      landscapeColSpan: 1,
      landscapeRowSpan: 4,
    },
    {
      id: 13,
      content: <PortableText value={data.methodology} components={portableTextComponents} />,
      colSpan: 1,
      rowSpan: 4,
      mobileColSpan: 1,
      mobileRowSpan: 4,
      landscapeColSpan: 1,
      landscapeRowSpan: 4,
    },
    {
      id: 14,
      content: <PortableText value={data.impact} components={portableTextComponents} />,
      colSpan: 1,
      rowSpan: 4,
      mobileColSpan: 1,
      mobileRowSpan: 4,
      landscapeColSpan: 1,
      landscapeRowSpan: 4,
    },
    {
      id: 15,
      content: <PortableText value={data.transformation} components={portableTextComponents} />,
      colSpan: 1,
      rowSpan: 4,
      mobileColSpan: 1,
      mobileRowSpan: 4,
      landscapeColSpan: 1,
      landscapeRowSpan: 4,
    },
    // Conclusion content under Conclusion heading (column 5, rows 7-10)
    {
      id: 16,
      content: <PortableText value={data.conclusion} components={portableTextComponents} />,
      colSpan: 1,
      rowSpan: 4,
      mobileColSpan: 1,
      mobileRowSpan: 4,
      landscapeColSpan: 1,
      landscapeRowSpan: 4,
    },
    // Rows 7-10: Empty col 6
    {
      id: 23,
      content: <div></div>,
      colSpan: 1,
      rowSpan: 4,
      mobileColSpan: 1,
      mobileRowSpan: 4,
      landscapeColSpan: 1,
      landscapeRowSpan: 4,
    },
  ].filter(Boolean);

  return (
    <div className="grid gap-[2vh] [@media(max-height:600px)_and_(max-width:768px)]:gap-[3vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:gap-[4vh] grid-cols-2 [@media(max-height:600px)_and_(max-width:768px)]:grid-cols-4 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[12.5vh] [@media(max-height:600px)_and_(max-width:768px)]:auto-rows-[15vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:auto-rows-[25vh]">
      {items.map((item) => (
        <div key={item.id} className={getGridClasses(item)}>
          {item.content}
        </div>
      ))}
    </div>
  );
}
