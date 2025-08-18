'use client';

import { useEffect, useState } from 'react';
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

  return (
    <div className="flex flex-col w-full bg-[#F9F7F2] space-y-[3vh]">
      {scenarios.map((scenario) => (
        <Link
          key={scenario._id}
          href={`/the-edge/${scenario.slug}`}
          className="flex items-end justify-between w-full text-left font-graphik text-[10vh] leading-[10vh] cursor-pointer group"
          aria-label={`Open ${scenario.title}`}
        >
          <span>{scenario.title}</span>
          <Image src="/accordion-open.png" alt="" width={24} height={24} aria-hidden />
        </Link>
      ))}
    </div>
  );
}
