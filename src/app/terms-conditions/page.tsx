import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { client } from '@/sanity/lib/client';
import { termsAndConditionsQuery } from '@/sanity/lib/queries';
import TermsAndConditionsClient from './terms-conditions';

export const revalidate = 60;

// Type definition for metadata extraction
interface TermsAndConditionsMetadata {
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  pageHeader?: {
    mainTitle?: string;
  };
}

// Generate metadata
export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await client.fetch(termsAndConditionsQuery) as unknown as TermsAndConditionsMetadata;
    
    return {
      title: data?.seo?.metaTitle || data?.pageHeader?.mainTitle || 'Terms & Conditions',
      description: data?.seo?.metaDescription || 'Our terms and conditions.',
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Terms & Conditions',
      description: 'Our terms and conditions.',
    };
  }
}

export default async function TermsAndConditionsPage() {
  let termsData: unknown;
  
  try {
    termsData = await client.fetch(termsAndConditionsQuery);
    
    if (!termsData) {
      throw new Error('No terms and conditions data found');
    }
  } catch (error) {
    console.error('Error fetching terms and conditions data:', error);
    // Return a basic error state or fallback
    return (
      <>
        <Header />
        <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
            <p>Sorry, we&apos;re having trouble loading the terms and conditions. Please try again later.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <TermsAndConditionsClient termsData={termsData as Parameters<typeof TermsAndConditionsClient>[0]['termsData']} />
      <Footer />
    </>
  );
}
