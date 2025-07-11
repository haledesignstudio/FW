import { type SchemaTypeDefinition } from 'sanity'
import keynoteSpeaker from './keynoteSpeaker'
import whatWeDo from './whatWeDo'
import shareholderValueAnalytics from './shareholderValueAnalytics';
import keynote from './keynote';
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
import mindbulletsArchive from './mindbulletsArchive'
import mindbullet from './mindbullet'
import podcast from './podcast'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Main page schemas
    homePage,
    insightsPage,
    peoplePage,
    ourWorkPage,
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
    mindbulletsArchive,
    mindbullet,
    podcast,
    whatWeDo, shareholderValueAnalytics, keynote
  ],
}
