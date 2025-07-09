import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { client } from '@/sanity/lib/client';
import { privacyPolicyQuery } from '@/sanity/lib/queries';
import PrivacyPolicyClient from './privacy-policy';

// Generate metadata
export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await client.fetch(privacyPolicyQuery);
    
    return {
      title: data?.seo?.metaTitle || data?.pageHeader?.mainTitle || 'Privacy Policy',
      description: data?.seo?.metaDescription || 'Our privacy policy and data protection information.',
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Privacy Policy',
      description: 'Our privacy policy and data protection information.',
    };
  }
}

export default async function PrivacyPolicyPage() {
  let privacyData;
  
  try {
    privacyData = await client.fetch(privacyPolicyQuery);
    
    if (!privacyData) {
      throw new Error('No privacy policy data found');
    }
  } catch (error) {
    console.error('Error fetching privacy policy data:', error);
    // Return a basic error state or fallback
    return (
      <>
        <Header />
        <main className="p-[2vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:p-[4vh] bg-[#F9F7F2]">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p>Sorry, we&apos;re having trouble loading the privacy policy. Please try again later.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <PrivacyPolicyClient privacyData={privacyData} />
      <Footer />
    </>
  );
}
