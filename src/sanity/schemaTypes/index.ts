import { type SchemaTypeDefinition } from 'sanity'
import keynoteSpeaker from './keynoteSpeaker'
import whatWeDoPage from './whatWeDoPage'
import keynoteTopic from './keynoteTopic';
import homePage from './homePage'
import article from './article'
import peoplePage from './peoplePage'
import ourWorkPage from './ourWorkPage'
import contactPage from './contactPage'
import faqPage from './faqPage'
import termsAndConditionsPage from './termsAndConditionsPage'
import privacyPolicyPage from './privacyPolicyPage'
import caseStudy from './caseStudy'
import mindbullet from './mindbullet'
import podcast from './podcast'
import provocativeScenario from './provocativeScenarios'
import superchargeTomorrowPage from './superchargeTomorrowPage'
import mindbulletsPage from './mindbulletsPage'
import keynotesPage from './keynotesPage'
import edgePage from './edgePage'
import podcastPage from './podcastPage'
import corporatePage from './corporatePage'
import shareholderPage from './shareholderPage'
import career from './career'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Main page schemas
    homePage,
    mindbulletsPage,
    keynotesPage,
    edgePage,
    podcastPage,
    peoplePage,
    corporatePage,
    shareholderPage,
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
    caseStudy,
    mindbullet,
    podcast,
    provocativeScenario,
    whatWeDoPage, keynoteTopic,
    career
  ],
}
