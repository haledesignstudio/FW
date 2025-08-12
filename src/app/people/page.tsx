import React from 'react';
import { client } from '@/sanity/lib/client';
import { peoplePageQuery } from '@/sanity/lib/queries';
import People from './people';
import { PortableTextBlock } from 'sanity';

type PeoplePageContent = {
  title: string;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
  };
  pageHeader: {
    mainTitle: string;
    subheading?: string;
    regularText?: PortableTextBlock[]; // Changed from string to PortableTextBlock[]
  };
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  sections: {
    subheading1?: string;
    leftSection?: {
      heading: string;
      text: PortableTextBlock[]; // Changed from string to PortableTextBlock[]
    };
    rightSection?: {
      heading: string;
      text: PortableTextBlock[]; // Changed from string to PortableTextBlock[]
    };
    sideText?: PortableTextBlock[]; // Changed from string to PortableTextBlock[]
    leftSection2?: {
      heading: string;
      text: PortableTextBlock[]; // Changed from string to PortableTextBlock[]
    };
    rightSection2?: {
      heading: string;
      text: PortableTextBlock[]; // Changed from string to PortableTextBlock[]
    };
    whyJoinUsSection?: {
      mainHeading: string;
      reasons: Array<{
        heading: string;
        text: PortableTextBlock[]; // Changed from string to PortableTextBlock[]
      }>;
    };
    carouselHeading?: string;
    carouselSidebar?: {
      heading: string;
      text: string;
      linkText: string;
    };
  };
};

export default async function Page() {
  const data = await client.fetch<PeoplePageContent>(peoplePageQuery);
  
  return <People data={data} />;
}
