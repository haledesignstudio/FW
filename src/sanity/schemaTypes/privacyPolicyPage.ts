import { defineType, defineField } from 'sanity'

const privacyPolicyPage = defineType({
  name: 'privacyPolicyPage',
  title: 'Privacy Policy Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Privacy Policy',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          validation: (Rule) => Rule.max(160)
        }
      ]
    }),
    defineField({
      name: 'pageHeader',
      title: 'Page Header',
      type: 'object',
      fields: [
        {
          name: 'mainTitle',
          title: 'Main Title',
          type: 'string',
          description: 'Main page heading',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'lastUpdated',
          title: 'Last Updated Date',
          type: 'date',
          description: 'When this privacy policy was last updated',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'effectiveDate',
          title: 'Effective Date',
          type: 'date',
          description: 'When this privacy policy became effective'
        }
      ]
    }),
    defineField({
      name: 'interpretationAndDefinitionsSection',
      title: 'Interpretation and Definitions',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Interpretation and Definitions'
        },
        {
          name: 'interpretationContent',
          title: 'Interpretation Content',
          type: 'text',
          description: 'Text explaining how to interpret this policy',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'definitionsContent',
          title: 'Definitions Content',
          type: 'text',
          description: 'Definitions of key terms used in this policy',
          validation: (Rule) => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'collectingAndUsingDataSection',
      title: 'Collecting and Using Your Personal Data',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Collecting and Using Your Personal Data'
        },
        {
          name: 'typesOfDataCollected',
          title: 'Types of Data Collected',
          type: 'object',
          fields: [
            {
              name: 'subsectionTitle',
              title: 'Subsection Title',
              type: 'string',
              initialValue: 'Types of Data Collected'
            },
            {
              name: 'personalData',
              title: 'Personal Data',
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  initialValue: 'Personal Data'
                },
                {
                  name: 'content',
                  title: 'Content',
                  type: 'text',
                  description: 'Information about personal data collection including email, name, phone, address',
                  validation: (Rule) => Rule.required()
                }
              ]
            },
            {
              name: 'usageData',
              title: 'Usage Data',
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  initialValue: 'Usage Data'
                },
                {
                  name: 'content',
                  title: 'Content',
                  type: 'text',
                  description: 'Information about usage data collection including IP address, browser info, device data',
                  validation: (Rule) => Rule.required()
                }
              ]
            }
          ]
        },
        {
          name: 'trackingTechnologiesAndCookies',
          title: 'Tracking Technologies and Cookies',
          type: 'object',
          fields: [
            {
              name: 'subsectionTitle',
              title: 'Subsection Title',
              type: 'string',
              initialValue: 'Tracking Technologies and Cookies'
            },
            {
              name: 'introContent',
              title: 'Introduction Content',
              type: 'text',
              description: 'General information about tracking technologies and cookies',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'cookieTypes',
              title: 'Cookie Types',
              type: 'object',
              fields: [
                {
                  name: 'browserCookies',
                  title: 'Browser Cookies',
                  type: 'text',
                  description: 'Information about browser cookies'
                },
                {
                  name: 'flashCookies',
                  title: 'Flash Cookies',
                  type: 'text',
                  description: 'Information about Flash cookies'
                },
                {
                  name: 'webBeacons',
                  title: 'Web Beacons',
                  type: 'text',
                  description: 'Information about web beacons'
                }
              ]
            },
            {
              name: 'cookieCategories',
              title: 'Cookie Categories',
              type: 'object',
              fields: [
                {
                  name: 'essentialCookies',
                  title: 'Essential Cookies',
                  type: 'text',
                  description: 'Information about essential/necessary cookies'
                },
                {
                  name: 'acceptanceCookies',
                  title: 'Acceptance Cookies',
                  type: 'text',
                  description: 'Information about cookie acceptance cookies'
                },
                {
                  name: 'functionalityCookies',
                  title: 'Functionality Cookies',
                  type: 'text',
                  description: 'Information about functionality cookies'
                }
              ]
            }
          ]
        },
        {
          name: 'useOfPersonalData',
          title: 'Use of Your Personal Data',
          type: 'object',
          fields: [
            {
              name: 'subsectionTitle',
              title: 'Subsection Title',
              type: 'string',
              initialValue: 'Use of Your Personal Data'
            },
            {
              name: 'purposes',
              title: 'Purposes for Using Data',
              type: 'text',
              description: 'List of purposes for which personal data is used',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'sharingScenarios',
              title: 'Data Sharing Scenarios',
              type: 'text',
              description: 'When and how personal data may be shared',
              validation: (Rule) => Rule.required()
            }
          ]
        },
        {
          name: 'retentionOfPersonalData',
          title: 'Retention of Your Personal Data',
          type: 'object',
          fields: [
            {
              name: 'subsectionTitle',
              title: 'Subsection Title',
              type: 'string',
              initialValue: 'Retention of Your Personal Data'
            },
            {
              name: 'content',
              title: 'Content',
              type: 'text',
              description: 'How long personal data is retained and why',
              validation: (Rule) => Rule.required()
            }
          ]
        },
        {
          name: 'transferOfPersonalData',
          title: 'Transfer of Your Personal Data',
          type: 'object',
          fields: [
            {
              name: 'subsectionTitle',
              title: 'Subsection Title',
              type: 'string',
              initialValue: 'Transfer of Your Personal Data'
            },
            {
              name: 'content',
              title: 'Content',
              type: 'text',
              description: 'Information about international data transfers and safeguards',
              validation: (Rule) => Rule.required()
            }
          ]
        },
        {
          name: 'disclosureOfPersonalData',
          title: 'Disclosure of Your Personal Data',
          type: 'object',
          fields: [
            {
              name: 'subsectionTitle',
              title: 'Subsection Title',
              type: 'string',
              initialValue: 'Disclosure of Your Personal Data'
            },
            {
              name: 'businessTransactions',
              title: 'Business Transactions',
              type: 'text',
              description: 'Data disclosure during business transactions'
            },
            {
              name: 'lawEnforcement',
              title: 'Law Enforcement',
              type: 'text',
              description: 'Data disclosure to law enforcement'
            },
            {
              name: 'legalRequirements',
              title: 'Other Legal Requirements',
              type: 'text',
              description: 'Other legal requirements for data disclosure'
            }
          ]
        },
        {
          name: 'securityOfPersonalData',
          title: 'Security of Your Personal Data',
          type: 'object',
          fields: [
            {
              name: 'subsectionTitle',
              title: 'Subsection Title',
              type: 'string',
              initialValue: 'Security of Your Personal Data'
            },
            {
              name: 'content',
              title: 'Content',
              type: 'text',
              description: 'Information about data security measures and limitations',
              validation: (Rule) => Rule.required()
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'childrensPrivacySection',
      title: 'Children\'s Privacy',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Children\'s Privacy'
        },
        {
          name: 'content',
          title: 'Section Content',
          type: 'text',
          description: 'Policy regarding children\'s data and privacy',
          validation: (Rule) => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'linksToOtherWebsitesSection',
      title: 'Links to Other Websites',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Links to Other Websites'
        },
        {
          name: 'content',
          title: 'Section Content',
          type: 'text',
          description: 'Policy regarding external links and third-party websites',
          validation: (Rule) => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'changesToPolicySection',
      title: 'Changes to this Privacy Policy',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Changes to this Privacy Policy'
        },
        {
          name: 'content',
          title: 'Section Content',
          type: 'text',
          description: 'How policy changes are handled and communicated',
          validation: (Rule) => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'contactUsSection',
      title: 'Contact Us',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Contact Us'
        },
        {
          name: 'content',
          title: 'Section Content',
          type: 'text',
          description: 'Information about contacting regarding privacy concerns',
          validation: (Rule) => Rule.required()
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'pageHeader.mainTitle'
    }
  }
})

export default privacyPolicyPage
