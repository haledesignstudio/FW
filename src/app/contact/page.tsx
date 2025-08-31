import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { CONTACT_PAGE_QUERY } from '@/sanity/lib/queries';
import Contact from './contact';

export const revalidate = 60;

type ContactPageData = {
  title: string;
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


export default async function ContactPage() {
  const data = await client.fetch<ContactPageData>(CONTACT_PAGE_QUERY);

  if (!data) {
    notFound();
  }

  return <Contact data={data} />;
}
