import React from 'react';
import { client } from '@/sanity/lib/client';
import { peoplePageQuery } from '@/sanity/lib/queries';
import People from './people';
import type { PortableTextBlock } from '@portabletext/types';

type PeoplePageContent = {
  title: string;
  pageHeader: {
    mainTitle: string;
    subheading?: string;
    regularText?: PortableTextBlock[];
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
      text: PortableTextBlock[];
    };
    rightSection?: {
      heading: string;
      text: PortableTextBlock[];
    };
    sideText?: PortableTextBlock[];
    leftSection2?: {
      heading: string;
      text: PortableTextBlock[];
    };
    rightSection2?: {
      heading: string;
      text: PortableTextBlock[];
    };
    whyJoinUsSection?: {
      mainHeading: string;
      reasons: Array<{
        heading: string;
        text: PortableTextBlock[];
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

// Matches your career schema fields as requested
type CareerDoc = {
  _id: string;
  jobTitle?: string;
  description?: PortableTextBlock[] | string; // could be string or Portable Text
  image?: {
    asset?: { _ref: string; _type: string };
    alt?: string;
  };
};

export default async function Page() {
  const [data, careers] = await Promise.all([
    client.fetch<PeoplePageContent>(peoplePageQuery),
    client.fetch<CareerDoc[]>(
      `*[_type == "career"]|order(_createdAt desc){
    _id,
    jobTitle,
    description,
    image{
      asset,
      alt
    }
  }`
    ),
  ]);

  return <People data={data} careers={careers} />;
}
