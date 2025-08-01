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
    statement3,
    accordionHeading,
    accordionItems[] {
      title,
      content,
      color
    }
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
      content
    },
    collectingAndUsingDataSection {
      sectionTitle,
      content
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
      content
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
      CTA1,
      Mail1,
      iframeSource,
      IQ_heading,
      IQ_subheading,
      IQ_context,
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
      CTA,
      Mail
    },
    theEdge {
      title,
      subheading,
      contentText
    }
  }
`);


export const podcastQuery = defineQuery(`
  *[_type == "podcast"] | order(_createdAt desc) {
    _id,
    headline,
    subheading,
    description,
    embedLink,
    slug,
    headerImage {
      asset->{
        url
      },
      alt
    }
  }
`);




export const ourWorkQuery = defineQuery(`
  *[_type == "ourWorkPage"][0] {
    _id,
    title,
    mainTitle,
    subtitle,
    stats {
      corporatePartners,
      gameChangingOpportunities,
      valuePropositions,
      investmentCases,
      newVenturesInCommercialisation
    },
    statLabels {
      corporatePartnersLabel,
      gameChangingOpportunitiesLabel,
      valuePropositionsLabel,
      investmentCasesLabel,
      newVenturesInCommercialisationLabel
    },
    testimonials[] {
      quote,
      clientName,
      clientTitle,
      company
    },
    partneredBrands[] {
      brandName,
      brandLogo {
        asset,
        alt
      }
    },
    accordion[] {
      heading,
      text,
      image {
        asset,
        alt
      },
      color
    }
  }
`);

export const peoplePageQuery = defineQuery(`
  *[_type == "peoplePage"][0] {
    _id,
    title,
    seo,
    pageHeader {
      mainTitle,
      subheading,
      regularText
    },
    mainImage {
      asset,
      alt
    },
    sections {
      subheading1,
      leftSection {
        heading,
        text
      },
      rightSection {
        heading,
        text
      },
      sideText,
      leftSection2 {
        heading,
        text
      },
      rightSection2 {
        heading,
        text
      },
      whyJoinUsSection {
        mainHeading,
        reasons[] {
          heading,
          text
        }
      },
      carouselHeading,
      carouselSidebar {
        heading,
        text,
        linkText
      }
    }
  }
`);

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_type == "contactPage"][0] {
    _id,
    title,
    seo {
      metaTitle,
      metaDescription
    },
    pageHeader {
      mainTitle
    },
    contactFormSubheading,
    contactForm {
      namePlaceholder,
      emailPlaceholder,
      phonePlaceholder,
      companyPlaceholder,
      positionPlaceholder,
      messagePlaceholder
    },
    mainImage {
      asset,
      alt
    },
    contactFormIntro,
    officesAroundTheWorld[] {
      name,
      email,
      image {
        asset,
        alt
      }
    },
    keynoteSubheading,
    bookingKeynote {
      title,
      subtitle,
      text,
      link
    }
  }
`);

export const provocativeScenariosQuery = defineQuery(`
  *[_type == "provocativeScenario"] | order(_createdAt desc) {
    _id,
    title,
    subtitle,
    mainText,
    boldText,
    carouselItems[]-> {
      _id,
      title,
      image {
        asset,
        alt
      },
      description
    },
    podcast {
      info,
      audio {
        asset -> {
          url,
          originalFilename
        }
      },
      link
    },
    mindbullets[]-> {
      _id,
      title,
      image {
        asset,
        alt
      },
      description
    },
    subheading,
    slug
  }
`);

export const topicQuery = defineQuery(`
  *[_type == "keynoteTopic"] | order(topicTitle asc) {
    _id,
    topicTitle,
    topicHeading,
    topicImage {
      asset,
      alt
    },
    topicButtonText,
    topicMail,
    contents[] {
      heading,
      description
    }
  }
`);

