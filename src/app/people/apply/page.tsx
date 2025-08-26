// app/people/apply/page.tsx
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import ApplyView from './applyView';

// You can tune revalidate to your content cadence
export const revalidate = 60;

const careersQuery = groq`
  *[_type == "career" && defined(jobTitle)]{
    "title": jobTitle
  } | order(title asc)
`;

export default async function Page() {
  const rows = await client.fetch<{ title: string }[]>(careersQuery);

  // De-dupe + clean
  const jobTitles = Array.from(
    new Set(rows.map(r => (r?.title || '').trim()).filter(Boolean))
  );

  return <ApplyView jobTitles={jobTitles} />;
}
