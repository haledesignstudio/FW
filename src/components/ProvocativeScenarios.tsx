'use client';

import React, { useEffect, useState } from 'react';
import useIsMobile from '@/hooks/useIsMobile';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { provocativeScenariosQuery } from '@/sanity/lib/queries';

type ProvocativeScenario = {
  _id: string;
  title: string;
  slug: string; 
};

export default function ProvocativeScenarios() {
  const [scenarios, setScenarios] = useState<ProvocativeScenario[]>([]);

  useEffect(() => {
    client.fetch<ProvocativeScenario[]>(provocativeScenariosQuery).then((res) => {
      setScenarios((res ?? []).filter(s => Boolean(s.slug)));
    });
  }, []);

  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="w-full bg-[#F9F7F2] grid grid-cols-4 auto-rows-[minmax(7.701vh,auto)] overflow-visible gap-x-[4.53vw] gap-y-[2.09vh]">
        {scenarios.map((scenario) => (
          <React.Fragment key={scenario._id}>
            <div
              className="col-span-3 flex items-center text-left dt-h2 cursor-pointer "
              onClick={() => window.location.href = `/the-edge/${scenario.slug}`}
              aria-label={`Open ${scenario.title}`}
            >
              {scenario.title}
            </div>
            <div
              className="col-span-1 flex items-end justify-end pr-2 pb-2 cursor-pointer"
              onClick={() => window.location.href = `/the-edge/${scenario.slug}`}
              aria-label={`Open ${scenario.title}`}
            >
              <Image src="/accordion-open.png" alt="" width={24} height={24} aria-hidden className='width-[1vw]' />
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-[#F9F7F2] space-y-[1vh]">
      {scenarios.map((scenario) => (
        <Link
          key={scenario._id}
          href={`/the-edge/${scenario.slug}`}
          className="flex items-end justify-between w-full text-left dt-h2 cursor-pointer group"
          aria-label={`Open ${scenario.title}`}
        >
          <span>{scenario.title}</span>
          <Image src="/accordion-open.png" alt="" width={24} height={24} aria-hidden />
        </Link>
      ))}
    </div>
  );
}