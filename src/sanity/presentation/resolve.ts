import { defineLocations, PresentationPluginOptions } from 'sanity/presentation'
console.log('Mindbullet resolve function triggered');

// Map document types to front-end routes used in the Next.js app.
// For singleton page types we link to the canonical path. For content with slugs
// we link to the index + the specific slug route when available.
export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    // Articles / insights
    article: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled', href: `/insights/${doc?.slug}` },
        ],
      }),
    }),

    // Mindbullets
    mindbullet: defineLocations({
      select: { title: 'title', slug: 'slug' },
      resolve: (doc) => {
        const slugStr = typeof doc?.slug === 'string' ? doc.slug : doc?.slug?.current;
        console.log('Resolved mindbullet slug:', slugStr);
        return {
          locations: [
            {
              title: doc?.title || 'Untitled',
              href: slugStr ? `/mindbullets/${slugStr}` : '#',
            },
          ],
        };
      },
    }),

    // The Edge / provocative scenarios
    provocativeScenario: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled', href: `/the-edge/${doc?.slug}` },
        ],
      }),
    }),

    // Case studies
    caseStudy: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled', href: `/case-study/${doc?.slug}` },
        ],
      }),
    }),

    // Podcast
    podcast: defineLocations({
      // map 'headline' to the returned 'title' for typed usage below
      select: { title: 'headline', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled', href: `/podcast/${doc?.slug}` },
        ],
      }),
    }),

    // Keynote speakers (and topics are not slugs used in routes)
    keynoteSpeaker: defineLocations({
      // map 'name' to the returned 'title' for typed usage below
      select: { title: 'name', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled', href: `/keynotes/${doc?.slug}` },
        ],
      }),
    }),

    // Page singletons - link to their canonical front-end paths
    homePage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [{ title: 'Home', href: '/' }] }),
    }),

    ourWorkPage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [{ title: 'Our work', href: '/our-work' }] }),
    }),

    whatWeDoPage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [{ title: 'What we do', href: '/what-we-do' }] }),
    }),

    // Insights page (Shareholder Value Analytics)
    insightsPage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [{ title: 'Insights', href: '/insights' }] }),
    }),

    mindbulletsPage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [{ title: 'Mindbullets Page', href: '/mindbullets' }] }),
    }),

    podcastPage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [{ title: 'Podcast Page', href: '/podcast' }] }),
    }),

    keynotesPage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [{ title: 'Keynotes Page', href: '/keynotes' }] }),
    }),

    peoplePage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [{ title: 'People', href: '/people' }] }),
    }),

    contactPage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [{ title: 'Contact', href: '/contact' }] }),
    }),

    privacyPolicyPage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [{ title: 'Privacy policy', href: '/privacy-policy' }] }),
    }),

    termsAndConditionsPage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [{ title: 'Terms & Conditions', href: '/terms-conditions' }] }),
    }),

    superchargeTomorrowPage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [{ title: 'Supercharge Tomorrow', href: '/supercharge-tomorrow' }] }),
    }),

    faqPage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [{ title: 'FAQ', href: '/faq' }] }),
    }),

    // Edge / singleton page for the insights index
    edgePage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [{ title: 'The Edge', href: '/the-edge' }] }),
    }),

    // Corporate Venturing page
    corporatePage: defineLocations({
      select: { title: 'title' },
      resolve: () => ({ locations: [{ title: 'Corporate Venturing', href: '/corporate-venturing' }] }),
    }),

    // Default fallback for types without a dedicated route mapping: provide
    // a link to the studio content or root so editors can still navigate.
  },
}