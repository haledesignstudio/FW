import { type SchemaTypeDefinition } from 'sanity'
import keynoteSpeaker from './keynoteSpeaker'
import whatWeDoPage from './whatWeDoPage'
import shareholderValueAnalytics from './shareholderValueAnalytics';
import keynoteTopic from './keynoteTopic';
import homePage from './homePage'
import article from './article'
import insightsPage from './insightsPage'
import peoplePage from './peoplePage'
import ourWorkPage from './ourWorkPage'
import contactPage from './contactPage'
import faqPage from './faqPage'
import termsAndConditionsPage from './termsAndConditionsPage'
import privacyPolicyPage from './privacyPolicyPage'
import project from './project'
import caseStudy from './caseStudy'
import mindbullet from './mindbullet'
import podcast from './podcast'
import provocativeScenario from './provocativeScenarios'
import carouselItem from './carouselItem'
import superchargeTomorrowPage from './superchargeTomorrowPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Main page schemas
    homePage,
    insightsPage,
    peoplePage,
    ourWorkPage,
    superchargeTomorrowPage,
    contactPage,
    
    // Legal & Support page schemas
    faqPage,
    termsAndConditionsPage,
    privacyPolicyPage,

    // Content schemas
    keynoteSpeaker,
    article,
    project,
    caseStudy,
    mindbullet,
    podcast,
    provocativeScenario,
    carouselItem,
    whatWeDoPage, shareholderValueAnalytics, keynoteTopic
  ],
}
