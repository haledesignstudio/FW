'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { provocativeScenariosQuery } from '@/sanity/lib/queries';

type ProvocativeScenario = {
  _id: string;
  title: string;
};

export default function ProvocativeScenarios() {
  const [scenarios, setScenarios] = useState<ProvocativeScenario[]>([]);

  useEffect(() => {
    client.fetch<ProvocativeScenario[]>(provocativeScenariosQuery).then(setScenarios);
  }, []);

  return (
    <div className="flex flex-col w-full bg-[#F9F7F2] space-y-[3vh]">
      {scenarios.map((scenario) => (
        <button
          key={scenario._id}
          onClick={() => {
            // Optionally update when slugs are added
            // router.push(`/scenarios/${scenario.slug.current}`)
          }}
          className="flex items-end justify-between w-full text-left font-graphik text-[10vh] leading-[10vh] cursor-pointer group"
        >
          <span>{scenario.title}</span>
          <Image
            src="/accordion-open.png"
            alt="Expand"
            width={24}
            height={24}
          />
        </button>
      ))}
    </div>
  );
}
