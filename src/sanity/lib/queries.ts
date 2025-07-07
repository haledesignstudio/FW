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



