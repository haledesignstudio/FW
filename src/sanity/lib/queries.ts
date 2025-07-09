import { defineQuery } from 'next-sanity';

export const speakersQuery = defineQuery(`
  *[_type == "keynoteSpeaker"] | order(name asc) {
    _id,
    name,
    bio,
    image {
      asset,
      alt
    },
    position,
    company
  }
`);

export const whatWeDoQuery = defineQuery(`
  *[_type == "whatWeDo"][0] {
    _id,
    heading,
    mainline,
    cta,
    mail,
    statement1,
    statement2,
    statement3
  }
`);

export const shareholderValueAnalyticsQuery = defineQuery(`
  *[_type == "shareholderValueAnalytics"][0] {
    _id,
    headline,
    question,
    mainline,
    statement1,
    statement2,
    cta1,
    mail1,
    cta2,
    mail2,
    embedLink
  }
`);

export const keynoteQuery = defineQuery(`
  *[_type == "keynote"][0] {
    _id,
    topicHeadline,
    topicMainline,
    topicStatement,
    topicCTA1,
    topicMail1,
    topicCTA2,
    topicCTA3,
    topicMail3,
    topicCarousel[] {
      topicCarouselImage {
        asset,
        alt
      },
      topicCarouselHeadline,
      topicCarouselDescription
    },
    speakerHeadline,
    speakerMainline,
    speakerStatement,
    speakerCTA1,
    speakerMail1,
    speakerCTA2
  }
`);




export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0] {
    _id,
    title,
    seo,
    signalsFromFuture,
    mainHeadline,
    growthSection,
    videoSection {
      backgroundImage {
        asset,
        alt
      },
      videoUrl
    },
    accordionSection {
      benchmarkInnovation {
        title,
        description,
        ctaText,
        dashboardImage {
          asset,
          alt
        },
        backgroundColor
      },
      ourProcess {
        title,
        introText,
        processColumns[] {
          headline,
          subheadline,
          content
        },
        astronautImage {
          asset,
          alt
        },
        backgroundColor
      },
      caseStudies {
        title,
        headline,
        subheadline,
        caseStudyGrid[] {
          asset,
          alt
        },
        featuredCaseStudy {
          image {
            asset,
            alt
          },
          title,
          description,
          readMoreLink
        },
        backgroundColor
      }
    }
  }
`);

export const privacyPolicyQuery = defineQuery(`
  *[_type == "privacyPolicyPage"][0] {
    _id,
    title,
    seo {
      metaTitle,
      metaDescription
    },
    pageHeader {
      mainTitle,
      lastUpdated,
      effectiveDate
    },
    interpretationAndDefinitionsSection {
      sectionTitle,
      interpretationContent,
      definitionsContent
    },
    collectingAndUsingDataSection {
      sectionTitle,
      typesOfDataContent,
      personalDataContent,
      usageDataContent,
      useOfDataContent,
      retentionContent,
      transferContent,
      disclosureContent,
      securityContent
    },
    childrensPrivacySection {
      sectionTitle,
      content
    },
    linksToOtherWebsitesSection {
      sectionTitle,
      content
    },
    changesToPolicySection {
      sectionTitle,
      content
    },
    contactUsSection {
      sectionTitle,
      content,
      contactDetails {
        email,
        phone,
        address,
        website
      }
    }
  }
`);

export const termsAndConditionsQuery = defineQuery(`
  *[_type == "termsAndConditionsPage"][0] {
    _id,
    title,
    seo {
      metaTitle,
      metaDescription
    },
    pageHeader {
      mainTitle,
      introText,
      lastUpdated
    },
    cookiesSection {
      sectionTitle,
      content
    },
    licenseSection {
      sectionTitle,
      content
    },
    hyperlinksSection {
      sectionTitle,
      content
    },
    iframesSection {
      sectionTitle,
      content
    },
    contentLiabilitySection {
      sectionTitle,
      content
    },
    privacySection {
      sectionTitle,
      content
    },
    reservationOfRightsSection {
      sectionTitle,
      content
    },
    removalOfLinksSection {
      sectionTitle,
      content
    },
    disclaimerSection {
      sectionTitle,
      content
    },
    contactInformation {
      sectionTitle,
      contactText,
      email,
      address
    }
  }
`);

export const faqPageQuery = defineQuery(`
  *[_type == "faqPage"][0] {
    _id,
    title,
    seo {
      metaTitle,
      metaDescription
    },
    pageHeader {
      mainTitle,
      subtitle
    },
    faqs[] {
      question,
      answer,
      category,
      featured,
      order,
      lastUpdated
    } | order(order asc),
    searchSettings {
      enableSearch,
      enableCategoryFilter,
      searchPlaceholder,
      noResultsMessage
    },
    contactSection {
      title,
      description,
      contactCTA {
        buttonText,
        buttonLink
      },
      alternativeContact {
        text,
        email
      }
    }
  }
`);

export const insightsPageQuery = defineQuery(`
  *[_type == "insightsPage"][0] {
    title,
    shareholderValueAnalytics {
      title,
      subheading,
      contentText,
      statement1,
      statement2,
      CTA1,
      Mail1,
      CTA2,
      Mail2
    },
    mindbullets {
      title,
      subheading
    },
    keynotes {
      topicSection {
        topicSectionTitle,
        topicSectionSubtitle,
        topicContentText,
        topicCTA1,
        topicMail1,
        topicCTA2
      },
      speakerSection {
        speakerSectionTitle,
        speakerSectionSubtitle,
        speakerContentText,
        speakerCTA1,
        speakerMail1,
        speakerCTA2
      }
    },
    podcast {
      title,
      subheading
    },
    corporateVenturing {
      title,
      subheading,
      contentText,
      CTA1,
      Mail1
    },
    theEdge {
      title,
      subheading,
      contentText
    }
  }
`);

