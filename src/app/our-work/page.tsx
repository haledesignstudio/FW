import { Suspense } from 'react';
import { client } from '@/sanity/lib/client';
import { ourWorkQuery } from '@/sanity/lib/queries';
import OurWork from './our-work';

export default async function OurWorkPage() {
  const data = await client.fetch(ourWorkQuery);
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OurWork data={data} />
    </Suspense>
  );
}
