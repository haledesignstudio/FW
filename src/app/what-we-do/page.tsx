import React from 'react';
import { client } from '@/sanity/lib/client';
import { whatWeDoQuery } from '@/sanity/lib/queries';
import WhatWeDo from './what-we-do';

type WhatWeDoContent = {
    heading: string;
    mainline: string;
    cta: string;
    mail: string;
    statement1: string;
    statement2: string;
    statement3: string;
    accordionHeading: string;
    accordionItems: {
        title: string;
        content: string;
        color: string;
    }[];
};

export default async function Page() {
    const data = await client.fetch<WhatWeDoContent>(whatWeDoQuery);
    
    return <WhatWeDo data={data} />;
}
