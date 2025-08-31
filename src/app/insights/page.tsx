// /app/shareholder-value-analytics/page.tsx
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { client } from '@/sanity/lib/client';
import { shareholderPageQuery } from '@/sanity/lib/queries';
import CommonHeader from '@/components/insights/CommonHeader';
import ShareholderValueAnalytics from './shareholder-value-analytics';
import type { PortableTextBlock } from '@portabletext/types';

export const revalidate = 60;

type ShareholderPage = {
  title: string;
  subheading: PortableTextBlock[];
  contentText: string;
  CTA1: string;
  Mail1: string;
  iframeSource: string;
  IQ_heading: PortableTextBlock[];
  IQ_subheading: string;
  IQ_context: string;
  CTA2: string;
  Mail2: string;
};

export default async function ShareholderValueAnalyticsPage() {
  const data = await client.fetch<ShareholderPage | null>(shareholderPageQuery);

  if (!data) {
    notFound();
  }

  // Use "analytics" so your header nav highlights the correct section
  // const headerItems = commonHeader(data.title, 'analytics');

  return (
    <>
      <Header />
      <main className="px-[4.53vw] py-[2.09vh] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:px-[1.795vw] [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:py-[3.2vh] bg-[#F9F7F2]">
      
        {/* Header grid */}
        <CommonHeader title={data.title} active="insights" />

        {/* Client component grid content */}
        <ShareholderValueAnalytics
          title={data.title}
          subheading={data.subheading}
          contentText={data.contentText}
          iframeSource={data.iframeSource}
          IQ_heading={data.IQ_heading}
          IQ_subheading={data.IQ_subheading}
          IQ_context={data.IQ_context}
          CTA1={data.CTA1}
          Mail1={data.Mail1}
          CTA2={data.CTA2}
          Mail2={data.Mail2}
        />
      </main>
      <Footer />
    </>
  );
}
