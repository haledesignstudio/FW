import React from 'react';
import { client } from '@/sanity/lib/client';
import { peoplePageQuery } from '@/sanity/lib/queries';
import People from './people';

type PeoplePageContent = {
  title: string;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
  };
  pageHeader: {
    mainTitle: string;
    subheading?: string;
    regularText?: string;
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
      text: string;
    };
    rightSection?: {
      heading: string;
      text: string;
    };
    sideText?: string;
    leftSection2?: {
      heading: string;
      text: string;
    };
    rightSection2?: {
      heading: string;
      text: string;
    };
    whyJoinUsSection?: {
      mainHeading: string;
      reasons: Array<{
        heading: string;
        text: string;
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
