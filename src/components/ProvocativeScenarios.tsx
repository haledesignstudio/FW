'use client';

import { useEffect, useState } from 'react';
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
      <div className="w-full bg-[#F9F7F2] grid grid-cols-4 gap-y-[2vh]">
        {scenarios.map((scenario) => (
          <>
            <div
              key={scenario._id + '-title'}
              className="col-span-3 flex items-center text-left font-graphik text-[4vh] leading-[5vh] cursor-pointer px-2 py-4 border-b border-[#e0ded9]"
              onClick={() => window.location.href = `/the-edge/${scenario.slug}`}
              aria-label={`Open ${scenario.title}`}
            >
              {scenario.title}
            </div>
            <div
              key={scenario._id + '-arrow'}
              className="col-span-1 flex items-end justify-end pr-2 pb-2 cursor-pointer border-b border-[#e0ded9]"
              onClick={() => window.location.href = `/the-edge/${scenario.slug}`}
              aria-label={`Open ${scenario.title}`}
            >
              <Image src="/accordion-open.png" alt="" width={24} height={24} aria-hidden />
            </div>
          </>
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
