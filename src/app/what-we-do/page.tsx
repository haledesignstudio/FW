import { client } from '@/sanity/lib/client';
import { whatWeDoQuery } from '@/sanity/lib/queries';
import WhatWeDoClient from '@/app/what-we-do/what-we-do';
import type { WhatWeDoPageContent } from '@/app/what-we-do/what-we-do';

export const revalidate = 60;

export default async function WhatWeDo() {
    const data = await client.fetch<WhatWeDoPageContent>(whatWeDoQuery);
    return <WhatWeDoClient data={data} />;
}
