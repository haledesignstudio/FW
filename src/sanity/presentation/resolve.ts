import { defineLocations, defineDocuments } from 'sanity/presentation'

// Map document types to front-end routes used in the Next.js app.
// For singleton page types we link to the canonical path. For content with slugs
// we link to the index + the specific slug route when available.
export const locations = {
    // Articles / insights
    article: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled', href: `/insights/${doc?.slug.current}` },
          { title: 'Article Index', href: '/insights' },
        ],
      }),
    }),

    // Mindbullets
    mindbullet: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => {
        console.log('Resolved mindbullet slug:', doc?.slug);
        return {
          locations: [
            {
              title: doc?.title || 'Untitled',
              href: doc?.slug ? `/mindbullets/${doc.slug.current}` : '#',
            },
            {
              title: 'Mindbullets Index',
              href: '/mindbullets',
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
          { title: doc?.title || 'Untitled', href: `/the-edge/${doc?.slug.current}` },
          { title: 'The Edge Index', href: '/the-edge' },
        ],
      }),
    }),

    // Case studies
    caseStudy: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled', href: `/case-study/${doc?.slug.current}` },
          { title: 'Case Study Index', href: '/case-study' },
        ],
      }),
    }),

    // Podcast
    podcast: defineLocations({
      // map 'headline' to the returned 'title' for typed usage below
      select: { title: 'headline', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled', href: `/podcast/${doc?.slug.current}` },
          { title: 'Podcast Index', href: '/podcast' },
        ],
      }),
    }),
    
    // Keynote speakers (and topics are not slugs used in routes)
    keynoteSpeaker: defineLocations({
      // map 'name' to the returned 'title' for typed usage below
      select: { title: 'name', slug: 'slug.current' },
      resolve: (doc) => {
        return {
          locations: [
            { title: doc?.title || 'Untitled', href: `/keynotes/${doc?.slug.current}` },
            { title: 'Keynotes Index', href: '/keynotes' },
          ],
        };
      },
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
  }

export const mainDocuments = defineDocuments([
          {
            route: '/',
            filter: `_type == "homePage"`,
          },
          {
            route: '/our-work',
            filter: `_type == "ourWorkPage"`,
          },
          {
            route: '/what-we-do',
            filter: `_type == "whatWeDoPage"`,
          },
          {
            route: '/people',
            filter: `_type == "peoplePage"`,
          },
          {
            route: '/insights',
            filter: `_type == "shareholderPage"`,
          },
          {
            route: '/insights/[slug]',
            filter: `_type == "article" && defined(slug.current)`,
          },
          {
            route: '/mindbullets',
            filter: `_type == "mindbulletsPage"`,
          },
          {
            route: '/mindbullets/[slug]',
            filter: `_type == "mindbullet" && defined(slug.current)`,
          },
          {
            route: '/podcast',
            filter: `_type == "podcastPage"`,
          },
          {
            route: '/podcast/[slug]',
            filter: `_type == "podcast" && defined(slug.current)`,
          },
          {
            route: '/the-edge',
            filter: `_type == "edgePage"`,
          },
          {
            route: '/the-edge/[slug]',
            filter: `_type == "provocativeScenarios" && defined(slug.current)`,
          },
          {
            route: '/keynotes',
            filter: `_type == "keynotesPage"`,
          },
          {
            route: '/keynotes/[slug]',
            filter: `_type == "keynoteSpeaker" && defined(slug.current)`,
          },
          {
            route: '/corporate-venturing',
            filter: `_type == "corporatePage"`,
          },
          {
            route: '/contact',
            filter: `_type == "contactPage"`,
          },
          {
            route: '/faq',
            filter: `_type == "faqPage"`,
          },
          {
            route: '/privacy-policy',
            filter: `_type == "privacyPolicyPage"`,
          },
          {
            route: '/terms-conditions',
            filter: `_type == "termsAndConditionsPage"`,
          },
          {
            route: '/supercharge-tomorrow',
            filter: `_type == "superchargeTomorrowPage"`,
          },
          {
            route: '/case-study/[slug]',
            filter: `_type == "caseStudy" && defined(slug.current)`,
          },
])