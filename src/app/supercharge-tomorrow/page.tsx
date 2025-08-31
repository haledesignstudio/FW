import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { superchargeTomorrowQuery } from '@/sanity/lib/queries';
import SuperchargeTomorrow from './supercharge-tomorrow';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Supercharge Tomorrow',
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
