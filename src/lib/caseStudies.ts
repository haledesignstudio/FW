import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

// Type for case study data from Sanity
export interface CaseStudy {
  _id: string;
  title: string;
  subheading: string;
  mainImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  slug: {
    current: string;
  };
}

// Type for carousel item
export interface CarouselCaseStudy {
  id: string;
  image: string;
  heading: string;
  body: string;
  link: string;
}

// Query to fetch all case studies
const CASE_STUDIES_QUERY = groq`
  *[_type == "caseStudy"] | order(_createdAt desc) {
    _id,
    title,
    subheading,
    mainImage,
    slug
  }
`;

// Fetch case studies from Sanity
export async function fetchCaseStudies(): Promise<CaseStudy[]> {
  try {
    const caseStudies = await client.fetch(CASE_STUDIES_QUERY);
    return caseStudies || [];
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

// Transform case studies for carousel component
export function transformCaseStudiesForCarousel(caseStudies: CaseStudy[]): CarouselCaseStudy[] {
  return caseStudies.map((caseStudy) => ({
    id: caseStudy._id,
    image: caseStudy.mainImage 
      ? urlFor(caseStudy.mainImage.asset).width(800).height(600).url()
      : '/placeholder-image.png', // fallback image
    heading: caseStudy.title,
    body: caseStudy.subheading || '',
    link: `/case-study/${caseStudy.slug.current}`,
  }));
}

// Combined function to fetch and transform case studies
export async function getCaseStudiesForCarousel(): Promise<CarouselCaseStudy[]> {
  const caseStudies = await fetchCaseStudies();
  return transformCaseStudiesForCarousel(caseStudies);
}
