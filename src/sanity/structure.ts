import type { StructureResolver } from 'sanity/structure'
import {
  HomeIcon,
  DocumentTextIcon,
  BarChartIcon,
  CogIcon,
  UserIcon,
  MobileDeviceIcon,
  RobotIcon,
  PresentationIcon,
  FeedbackIcon,
  EyeOpenIcon,
  BillIcon,
} from '@sanity/icons'
// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Dashboard')
    .items([
      // Group: Pages
      S.listItem()
        .title('Main Pages')
        .icon(HomeIcon)
        .child(
          S.list()
            .title('Main Pages')
            .items([
              S.documentTypeListItem('homePage').icon(HomeIcon),
              S.documentTypeListItem('whatWeDoPage').icon(RobotIcon),
              S.documentTypeListItem('mindbulletsPage').icon(BarChartIcon),
              S.documentTypeListItem('keynotesPage').icon(BarChartIcon),
              S.documentTypeListItem('edgePage').icon(BarChartIcon),
              S.documentTypeListItem('podcastPage').icon(BarChartIcon),
              S.documentTypeListItem('corporatePage').icon(BarChartIcon),
              S.documentTypeListItem('shareholderPage').icon(BarChartIcon),
              S.documentTypeListItem('ourWorkPage').icon(PresentationIcon),
              S.documentTypeListItem('peoplePage').icon(UserIcon),
              S.documentTypeListItem('contactPage').icon(MobileDeviceIcon),
              S.documentTypeListItem('superchargeTomorrowPage').icon(MobileDeviceIcon),
            ])
        ),

      // Group: Legal & Support
      S.listItem()
        .title('Legal & Support Pages')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Legal & Support Pages')
            .items([
              S.documentTypeListItem('faqPage').icon(FeedbackIcon),
              S.documentTypeListItem('termsAndConditionsPage').icon(BillIcon),
              S.documentTypeListItem('privacyPolicyPage').icon(EyeOpenIcon),
            ])
        ),

      // Group: Content
      S.listItem()
        .title('Content')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Content Types')
            .items([
              S.documentTypeListItem('keynoteSpeaker'),
              S.documentTypeListItem('keynoteTopic'),
              S.documentTypeListItem('article'),
              S.documentTypeListItem('caseStudy'),
              S.documentTypeListItem('mindbullet'),
              S.documentTypeListItem('podcast'),
              S.documentTypeListItem('provocativeScenario'),
              S.documentTypeListItem('career'),
            ])
        ),

      // Fallback: Other types not explicitly grouped
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'homePage',
            'peoplePage',
            'ourWorkPage',
            'contactPage',
            'faqPage',
            'termsAndConditionsPage',
            'privacyPolicyPage',
            'keynoteSpeaker',
            'keynoteTopic',
            'whatWeDoPage',
            'article',
            'mindbulletsPage',
            'keynotesPage',
            'edgePage',
            'podcastPage',
            'corporatePage',
            'shareholderPage',
            'caseStudy',
            'mindbullet',
            'podcast',
            'provocativeScenario',
            'superchargeTomorrowPage',
            'career',
          ].includes(listItem.getId() || '')
      ),
    ])
