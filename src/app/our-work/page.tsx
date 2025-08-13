import { client } from '@/sanity/lib/client';
import { ourWorkQuery } from '@/sanity/lib/queries';
import OurWorkClient from './our-work';
import type { OurWorkContent } from './our-work';

export default async function OurWorkPage() {
  const data = await client.fetch<OurWorkContent>(ourWorkQuery);
  return <OurWorkClient data={data} />;
}
