/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type KeynoteSpeaker = {
  _id: string;
  _type: "keynoteSpeaker";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  bio?: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  position?: string;
  company?: string;
};

export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type Slug = {
  _type: "slug";
  current?: string;
  source?: string;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type AllSanitySchemaTypes = KeynoteSpeaker | SanityImagePaletteSwatch | SanityImagePalette | SanityImageDimensions | SanityImageHotspot | SanityImageCrop | SanityFileAsset | SanityImageAsset | SanityImageMetadata | Geopoint | Slug | SanityAssetSourceData;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./src/sanity/lib/queries.ts
// Variable: speakersQuery
// Query: *[_type == "keynoteSpeaker"] | order(name asc) {    _id,    name,    bio,    image {      asset,      alt    },    position,    company  }
export type SpeakersQueryResult = Array<{
  _id: string;
  name: string | null;
  bio: string | null;
  image: {
    asset: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    } | null;
    alt: string | null;
  } | null;
  position: string | null;
  company: string | null;
}>;
// Variable: whatWeDoQuery
// Query: *[_type == "whatWeDo"][0] {    _id,    heading,    mainline,    cta,    mail,    statement1,    statement2,    statement3  }
export type WhatWeDoQueryResult = null;
// Variable: shareholderValueAnalyticsQuery
// Query: *[_type == "shareholderValueAnalytics"][0] {    _id,    headline,    question,    mainline,    statement1,    statement2,    cta1,    mail1,    cta2,    mail2,    embedLink  }
export type ShareholderValueAnalyticsQueryResult = null;
// Variable: keynoteQuery
// Query: *[_type == "keynote"][0] {    _id,    topicHeadline,    topicMainline,    topicStatement,    topicCTA1,    topicMail1,    topicCTA2,    topicCTA3,    topicMail3,    topicCarousel[] {      topicCarouselImage {        asset,        alt      },      topicCarouselHeadline,      topicCarouselDescription    },    speakerHeadline,    speakerMainline,    speakerStatement,    speakerCTA1,    speakerMail1,    speakerCTA2  }
export type KeynoteQueryResult = null;
// Variable: homePageQuery
// Query: *[_type == "homePage"][0] {    _id,    title,    seo,    signalsFromFuture,    mainHeadline,    growthSection,    videoSection {      backgroundImage {        asset,        alt      },      videoUrl    },    accordionSection {      benchmarkInnovation {        title,        description,        ctaText,        dashboardImage {          asset,          alt        },        backgroundColor      },      ourProcess {        title,        introText,        processColumns[] {          headline,          subheadline,          content        },        astronautImage {          asset,          alt        },        backgroundColor      },      caseStudies {        title,        headline,        subheadline,        caseStudyGrid[] {          asset,          alt        },        featuredCaseStudy {          image {            asset,            alt          },          title,          description,          readMoreLink        },        backgroundColor      }    }  }
export type HomePageQueryResult = null;
// Variable: privacyPolicyQuery
// Query: *[_type == "privacyPolicyPage"][0] {    _id,    title,    seo {      metaTitle,      metaDescription    },    pageHeader {      mainTitle,      lastUpdated,      effectiveDate    },    interpretationAndDefinitionsSection {      sectionTitle,      interpretationContent,      definitionsContent    },    collectingAndUsingDataSection {      sectionTitle,      typesOfDataContent,      personalDataContent,      usageDataContent,      useOfDataContent,      retentionContent,      transferContent,      disclosureContent,      securityContent    },    childrensPrivacySection {      sectionTitle,      content    },    linksToOtherWebsitesSection {      sectionTitle,      content    },    changesToPolicySection {      sectionTitle,      content    },    contactUsSection {      sectionTitle,      content,      contactDetails {        email,        phone,        address,        website      }    }  }
export type PrivacyPolicyQueryResult = null;
// Variable: termsAndConditionsQuery
// Query: *[_type == "termsAndConditionsPage"][0] {    _id,    title,    seo {      metaTitle,      metaDescription    },    pageHeader {      mainTitle,      introText,      lastUpdated    },    cookiesSection {      sectionTitle,      content    },    licenseSection {      sectionTitle,      content    },    hyperlinksSection {      sectionTitle,      content    },    iframesSection {      sectionTitle,      content    },    contentLiabilitySection {      sectionTitle,      content    },    privacySection {      sectionTitle,      content    },    reservationOfRightsSection {      sectionTitle,      content    },    removalOfLinksSection {      sectionTitle,      content    },    disclaimerSection {      sectionTitle,      content    },    contactInformation {      sectionTitle,      contactText,      email,      address    }  }
export type TermsAndConditionsQueryResult = null;
// Variable: faqPageQuery
// Query: *[_type == "faqPage"][0] {    _id,    title,    seo {      metaTitle,      metaDescription    },    pageHeader {      mainTitle,      subtitle    },    faqs[] {      question,      answer,      category,      featured,      order,      lastUpdated    } | order(order asc),    searchSettings {      enableSearch,      enableCategoryFilter,      searchPlaceholder,      noResultsMessage    },    contactSection {      title,      description,      contactCTA {        buttonText,        buttonLink      },      alternativeContact {        text,        email      }    }  }
export type FaqPageQueryResult = null;
// Variable: insightsPageQuery
// Query: *[_type == "insightsPage"][0] {    title,    shareholderValueAnalytics {      title,      subheading,      contentText,      statement1,      statement2,      CTA1,      Mail1,      CTA2,      Mail2    },    mindbullets {      title,      subheading    },    keynotes {      topicSection {        topicSectionTitle,        topicSectionSubtitle,        topicContentText,        topicCTA1,        topicMail1,        topicCTA2      },      speakerSection {        speakerSectionTitle,        speakerSectionSubtitle,        speakerContentText,        speakerCTA1,        speakerMail1,        speakerCTA2      }    },    podcast {      title,      subheading    },    corporateVenturing {      title,      subheading,      contentText,      CTA,      Mail    },    theEdge {      title,      subheading,      contentText    }  }
export type InsightsPageQueryResult = null;
// Variable: podcastQuery
// Query: *[_type == "podcast"] | order(_createdAt desc) {    _id,    headline,    description,    embedLink,    headerImage {      asset,      alt    }  }
export type PodcastQueryResult = Array<never>;

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
  interface SanityQueries {
    "\n  *[_type == \"keynoteSpeaker\"] | order(name asc) {\n    _id,\n    name,\n    bio,\n    image {\n      asset,\n      alt\n    },\n    position,\n    company\n  }\n": SpeakersQueryResult;
    "\n  *[_type == \"whatWeDo\"][0] {\n    _id,\n    heading,\n    mainline,\n    cta,\n    mail,\n    statement1,\n    statement2,\n    statement3\n  }\n": WhatWeDoQueryResult;
    "\n  *[_type == \"shareholderValueAnalytics\"][0] {\n    _id,\n    headline,\n    question,\n    mainline,\n    statement1,\n    statement2,\n    cta1,\n    mail1,\n    cta2,\n    mail2,\n    embedLink\n  }\n": ShareholderValueAnalyticsQueryResult;
    "\n  *[_type == \"keynote\"][0] {\n    _id,\n    topicHeadline,\n    topicMainline,\n    topicStatement,\n    topicCTA1,\n    topicMail1,\n    topicCTA2,\n    topicCTA3,\n    topicMail3,\n    topicCarousel[] {\n      topicCarouselImage {\n        asset,\n        alt\n      },\n      topicCarouselHeadline,\n      topicCarouselDescription\n    },\n    speakerHeadline,\n    speakerMainline,\n    speakerStatement,\n    speakerCTA1,\n    speakerMail1,\n    speakerCTA2\n  }\n": KeynoteQueryResult;
    "\n  *[_type == \"homePage\"][0] {\n    _id,\n    title,\n    seo,\n    signalsFromFuture,\n    mainHeadline,\n    growthSection,\n    videoSection {\n      backgroundImage {\n        asset,\n        alt\n      },\n      videoUrl\n    },\n    accordionSection {\n      benchmarkInnovation {\n        title,\n        description,\n        ctaText,\n        dashboardImage {\n          asset,\n          alt\n        },\n        backgroundColor\n      },\n      ourProcess {\n        title,\n        introText,\n        processColumns[] {\n          headline,\n          subheadline,\n          content\n        },\n        astronautImage {\n          asset,\n          alt\n        },\n        backgroundColor\n      },\n      caseStudies {\n        title,\n        headline,\n        subheadline,\n        caseStudyGrid[] {\n          asset,\n          alt\n        },\n        featuredCaseStudy {\n          image {\n            asset,\n            alt\n          },\n          title,\n          description,\n          readMoreLink\n        },\n        backgroundColor\n      }\n    }\n  }\n": HomePageQueryResult;
    "\n  *[_type == \"privacyPolicyPage\"][0] {\n    _id,\n    title,\n    seo {\n      metaTitle,\n      metaDescription\n    },\n    pageHeader {\n      mainTitle,\n      lastUpdated,\n      effectiveDate\n    },\n    interpretationAndDefinitionsSection {\n      sectionTitle,\n      interpretationContent,\n      definitionsContent\n    },\n    collectingAndUsingDataSection {\n      sectionTitle,\n      typesOfDataContent,\n      personalDataContent,\n      usageDataContent,\n      useOfDataContent,\n      retentionContent,\n      transferContent,\n      disclosureContent,\n      securityContent\n    },\n    childrensPrivacySection {\n      sectionTitle,\n      content\n    },\n    linksToOtherWebsitesSection {\n      sectionTitle,\n      content\n    },\n    changesToPolicySection {\n      sectionTitle,\n      content\n    },\n    contactUsSection {\n      sectionTitle,\n      content,\n      contactDetails {\n        email,\n        phone,\n        address,\n        website\n      }\n    }\n  }\n": PrivacyPolicyQueryResult;
    "\n  *[_type == \"termsAndConditionsPage\"][0] {\n    _id,\n    title,\n    seo {\n      metaTitle,\n      metaDescription\n    },\n    pageHeader {\n      mainTitle,\n      introText,\n      lastUpdated\n    },\n    cookiesSection {\n      sectionTitle,\n      content\n    },\n    licenseSection {\n      sectionTitle,\n      content\n    },\n    hyperlinksSection {\n      sectionTitle,\n      content\n    },\n    iframesSection {\n      sectionTitle,\n      content\n    },\n    contentLiabilitySection {\n      sectionTitle,\n      content\n    },\n    privacySection {\n      sectionTitle,\n      content\n    },\n    reservationOfRightsSection {\n      sectionTitle,\n      content\n    },\n    removalOfLinksSection {\n      sectionTitle,\n      content\n    },\n    disclaimerSection {\n      sectionTitle,\n      content\n    },\n    contactInformation {\n      sectionTitle,\n      contactText,\n      email,\n      address\n    }\n  }\n": TermsAndConditionsQueryResult;
    "\n  *[_type == \"faqPage\"][0] {\n    _id,\n    title,\n    seo {\n      metaTitle,\n      metaDescription\n    },\n    pageHeader {\n      mainTitle,\n      subtitle\n    },\n    faqs[] {\n      question,\n      answer,\n      category,\n      featured,\n      order,\n      lastUpdated\n    } | order(order asc),\n    searchSettings {\n      enableSearch,\n      enableCategoryFilter,\n      searchPlaceholder,\n      noResultsMessage\n    },\n    contactSection {\n      title,\n      description,\n      contactCTA {\n        buttonText,\n        buttonLink\n      },\n      alternativeContact {\n        text,\n        email\n      }\n    }\n  }\n": FaqPageQueryResult;
    "\n  *[_type == \"insightsPage\"][0] {\n    title,\n    shareholderValueAnalytics {\n      title,\n      subheading,\n      contentText,\n      statement1,\n      statement2,\n      CTA1,\n      Mail1,\n      CTA2,\n      Mail2\n    },\n    mindbullets {\n      title,\n      subheading\n    },\n    keynotes {\n      topicSection {\n        topicSectionTitle,\n        topicSectionSubtitle,\n        topicContentText,\n        topicCTA1,\n        topicMail1,\n        topicCTA2\n      },\n      speakerSection {\n        speakerSectionTitle,\n        speakerSectionSubtitle,\n        speakerContentText,\n        speakerCTA1,\n        speakerMail1,\n        speakerCTA2\n      }\n    },\n    podcast {\n      title,\n      subheading\n    },\n    corporateVenturing {\n      title,\n      subheading,\n      contentText,\n      CTA,\n      Mail\n    },\n    theEdge {\n      title,\n      subheading,\n      contentText\n    }\n  }\n": InsightsPageQueryResult;
    "\n  *[_type == \"podcast\"] | order(_createdAt desc) {\n    _id,\n    headline,\n    description,\n    embedLink,\n    headerImage {\n      asset,\n      alt\n    }\n  }\n": PodcastQueryResult;
  }
}
