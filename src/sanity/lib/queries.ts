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
  *[_type == "whatWeDo"][0]{
    _id,
    heading,
    subheading,
    cta,
    email,
    statement1,
    statement2,
    statement3,
    accordion{
      heading,
      subheading,
      items[]{
        heading,
        subheading,
        description,
        image{asset},
        prompt,
        entries[]{
          title,
          body
        }
      }
    }
  }
`);


export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0] {
    _id,
    headline,
    subheading,
    body,
    cta,
    email,
    Image {
        asset,
        alt
      },
    section1 {
      section1Title,
      section1Body,
      section1CTA,
      section1Email,
      section1URL
    },
    section2 {
      section2Title,
      section2Body,
      section2Heading1,
      section2Description1,
      section2Heading2,
      section2Description2,
      section2Heading3,
      section2Description3,
      section2Image {
        asset,
        alt
      }
    },
    section3 {
      section3Title,
      section3Body
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
  *[_type == "ourWorkPage"][0]{
    _id,
    title,
    subheading,
    statistics[]{
      statisticName,
      statisticValue
    },
    testimonials[]{
      quote,
      name,
      jobTitle,
      company
    },
    partners[]{
      partnerName,
      partnerImage{
        asset
      }
    },
    accordionSection1{
      heading,
      body,
      mainImage{asset},
      brandImage{asset},
      cta,
    },
    accordionSection2{
      heading,
      body
    }
  }
`);

export const peoplePageQuery = defineQuery(
  `*[_type == "peoplePage"][0]{
  title,
  seo{
    metaTitle,
    metaDescription
  },
  pageHeader{
    mainTitle,
    subheading,
    regularText[]{
      ...,
      markDefs[]{
        ...,
        _type == "link" => {
          ...,
          href
        }
      }
    }
  },
  mainImage{
    asset->{
      _id,
      url
    },
    alt
  },
  sections{
    subheading1,
    leftSection{
      heading,
      text[]{
        ...,
        markDefs[]{
          ...,
          _type == "link" => {
            ...,
            href
          }
        }
      }
    },
    rightSection{
      heading,
      text[]{
        ...,
        markDefs[]{
          ...,
          _type == "link" => {
            ...,
            href
          }
        }
      }
    },
    sideText[]{
      ...,
      markDefs[]{
        ...,
        _type == "link" => {
          ...,
          href
        }
      }
    },
    leftSection2{
      heading,
      text[]{
        ...,
        markDefs[]{
          ...,
          _type == "link" => {
            ...,
            href
          }
        }
      }
    },
    rightSection2{
      heading,
      text[]{
        ...,
        markDefs[]{
          ...,
          _type == "link" => {
            ...,
            href
          }
        }
      }
    },
    whyJoinUsSection{
      mainHeading,
      reasons[]{
        heading,
        text[]{
          ...,
          markDefs[]{
            ...,
            _type == "link" => {
              ...,
              href
            }
          }
        }
      }
    },
    carouselHeading,
    carouselSidebar{
      heading,
      text,
      linkText
    }
  }
}`);

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
    title
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

export const mindbulletsQuery = defineQuery(`
  *[_type == "mindbullet"] | order(datePublished desc) {
    _id,
    title,
    content,
    dateline,
    datePublished,
    image {
      asset,
      alt
    }
  }
`);


