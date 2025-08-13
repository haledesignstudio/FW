import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { superchargeTomorrowQuery } from '@/sanity/lib/queries';
import SuperchargeTomorrow from './supercharge-tomorrow';

/** Minimal shape for metadata & guard; full typing lives in the client component */
type SuperchargeTomorrowPageData = {
  title?: string;
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch<SuperchargeTomorrowPageData>(superchargeTomorrowQuery);

  return {
    title: data?.title || 'Supercharge Tomorrow',
    description: 'Futureworld — Supercharge Tomorrow',
  };
}

export default async function Page() {
  const data = await client.fetch(superchargeTomorrowQuery);

  if (!data) {
    notFound();
  }

  return <SuperchargeTomorrow data={data} />;
}
