import Link from 'next/link';
import MainTitleAnimation from '@/components/MainTitleAnimation';
import FadeInOnVisible from '@/components/FadeInOnVisible';
import UnderlineOnHoverAnimation from '@/components/underlineOnHoverAnimation';
import { GridItem } from '@/components/insights/grid';

const categories = [
  { href: '/insights',  label: 'Shareholder Value Analytics' },
  { href: '/mindbullets', label: 'Mindbullets: News From the Future' },
  { href: '/keynotes',    label: 'Keynotes' },
  { href: '/podcast',     label: 'Podcast', comingSoon: true },
  { href: '/corporate-venturing',   label: 'Corporate Venturing', comingSoon: true },
  { href: '/the-edge',        label: 'The Edge: Insights Driven by Disruption' },
];

export function commonHeader(title: string, active: string): GridItem[] {
  return [
    {
      id: 'title',
      content: (
        <MainTitleAnimation
          text="Insights"
          typeSpeed={60}
          delay={500}
          className="text-[clamp(4vw,10vh,5vw)] font-graphik leading-tight"
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
            <span className="text-[2.5vh] font-bold block">Categories</span>
          </FadeInOnVisible>
          <ul className="text-[2.5vh] leading-[2vh] space-y-[1.75vh] mt-[2vh]">
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
}
