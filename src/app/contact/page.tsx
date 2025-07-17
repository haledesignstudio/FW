import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { CONTACT_PAGE_QUERY } from '@/sanity/lib/queries';
import Contact from './contact';

type ContactPageData = {
  title: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  pageHeader: {
    mainTitle: string;
  };
  officesSubheading?: string;
  officesAroundTheWorld: Array<{
    name: string;
    email: string;
    image: {
      asset: {
        _ref: string;
        _type: string;
      };
      alt?: string;
    };
  }>;
  keynoteSubheading?: string;
  bookingKeynote?: {
    title: string;
    subtitle?: string;
    text: string;
    link: string;
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch<ContactPageData>(CONTACT_PAGE_QUERY);

  if (!data) {
    return {
      title: 'Contact',
      description: 'Get in touch with Futureworld',
    };
  }

  return {
    title: data.seo?.metaTitle || data.title || 'Contact',
    description: data.seo?.metaDescription || 'Get in touch with Futureworld',
  };
}

export default async function ContactPage() {
  const data = await client.fetch<ContactPageData>(CONTACT_PAGE_QUERY);

  if (!data) {
    notFound();
  }

  return <Contact data={data} />;
}
