'use client';

import Link from 'next/link';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import { getGridClasses, GridItem } from '@/components/insights/grid';
import React, { useState, useEffect } from 'react';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

const categories = [
  { href: '/insights',  label: 'Shareholder Value Analytics' },
  { href: '/mindbullets', label: 'Mindbullets: News From the Future' },
  { href: '/keynotes',    label: 'Keynotes' },
  { href: '/podcast',     label: 'Podcast' },
  { href: '/corporate-venturing',   label: 'Corporate Venturing', comingSoon: false}, //  { href: '/corporate-venturing',   label: 'Corporate Venturing', comingSoon: true },
  { href: '/the-edge',        label: 'The Edge: Insights Driven by Disruption' },
];

type CommonHeaderProps = {
  title: string;
  active: string;
};

export default function CommonHeader({ active }: CommonHeaderProps) {
  const isMobile = useIsMobile();
  if (isMobile) {
    // MOBILE LAYOUT
    return (
      <div className="grid grid-cols-4 auto-rows-[5vh] gap-x-[4.53vw] gap-y-[2.09vh]  w-full">
        {/* Row 1: Title (cols 1-2) */}
        <div className="col-span-2 row-span-2">
          <MainTitleAnimation
            text="Insights"
            typeSpeed={60}
            delay={500}
            className="dt-h2 leading-tight"
          />
        </div>
        {/* Row 2: Categories header (cols 2-4) */}
        {/* <div className="col-start-3 col-span-2 row-span-2">
          <FadeInOnVisible>
            <span className="text-[2.5vh] font-bold block">Categories</span>
          </FadeInOnVisible>
        </div> */}
        {/* Each category: new row, cols 2-3 */}
        {categories.map((cat) => (
          <div key={cat.href} className="col-start-2 col-span-3 row-span-1 mt-[-2vh]">
            {cat.comingSoon ? (
              <FadeInOnVisible>
                <div className="group flex items-center">
                  <UnderlineOnHoverAnimation>
                    <span className="">{cat.label}</span>
                  </UnderlineOnHoverAnimation>
                  <div className="overflow-hidden h-[2.5vh] relative w-fit flex items-center">
                    <span className="block text-[2vh] text-black/50 transform translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                      (Coming Soon)
                    </span>
                  </div>
                </div>
              </FadeInOnVisible>
            ) : (
              <FadeInOnVisible>
                <Link href={cat.href} className="transition dt-body-lg">
                  <UnderlineOnHoverAnimation isActive={cat.href.endsWith(active)}>
                    {cat.label}
                  </UnderlineOnHoverAnimation>
                </Link>
              </FadeInOnVisible>
            )}
          </div>
        ))}
        <div className="col-span-4 row-span-1"></div>
      </div>
    );
  }

  // DESKTOP LAYOUT: return grid items for parent grid
  const items: GridItem[] = [
    {
      id: 'title',
      content: (
        <MainTitleAnimation
          text="Insights"
          typeSpeed={60}
          delay={500}
          className="dt-h2"
        />
      ),
      colSpan: 4,
      rowSpan: 2,
      mobileColSpan: 1,
      mobileRowSpan: 2,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
    {
      id: 'categories',
      content: (
        <>
          <FadeInOnVisible>
            <span className="text-[clamp(0.9vw,2.5vh,1.25vw)] font-graphik-semibold leading-[clamp(0.7vw,2vh,1vw)] block">Categories</span>
          </FadeInOnVisible>
          <ul className="text-[clamp(0.9vw,2.5vh,1.25vw)] font-graphik leading-[clamp(0.7vw,2vh,1vw)] space-y-[1.75vh] mt-[4vh]">
            {categories.map((cat) => (
              <li key={cat.href}>
                {cat.comingSoon ? (
                  <FadeInOnVisible>
                    <div className="group flex items-center gap-[1vh]">
                      <UnderlineOnHoverAnimation>
                        <span className="text-black">{cat.label}</span>
                      </UnderlineOnHoverAnimation>
                      <div className="overflow-hidden h-[2.5vh] relative w-fit flex items-center">
                        <span className="block text-[2vh] text-black/50 transform translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                          (Coming Soon)
                        </span>
                      </div>
                    </div>
                  </FadeInOnVisible>
                ) : (
                  <FadeInOnVisible>
                    <Link href={cat.href} className="transition">
                      <UnderlineOnHoverAnimation isActive={cat.href.endsWith(active)}>
                        {cat.label}
                      </UnderlineOnHoverAnimation>
                    </Link>
                  </FadeInOnVisible>
                )}
              </li>
            ))}
          </ul>
        </>
      ),
      colSpan: 2,
      rowSpan: 2,
      mobileColSpan: 1,
      mobileRowSpan: 2,
      landscapeColSpan: 4,
      landscapeRowSpan: 2,
    },
  ];

  return (
    <>
      <div className="grid gap-[2vh] grid-cols-2 [@media(min-width:768px)_and_(min-aspect-ratio:1/1)]:grid-cols-6 auto-rows-[25vh]">
        {items.map((item) => (
          <div key={item.id} className={getGridClasses(item)}>
            {item.content}
          </div>
          
        ))}
      </div>
    </>
  );
}
