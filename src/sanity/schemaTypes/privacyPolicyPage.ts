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
          name: 'typesOfDataContent',
          title: 'Types of Data Collected',
          type: 'text',
          description: 'Information about what data is collected',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'personalDataContent',
          title: 'Personal Data',
          type: 'text',
          description: 'Information about personal data collection',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'usageDataContent',
          title: 'Usage Data',
          type: 'text',
          description: 'Information about usage data collection',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'useOfDataContent',
          title: 'Use of Your Personal Data',
          type: 'text',
          description: 'How personal data is used',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'retentionContent',
          title: 'Retention of Your Personal Data',
          type: 'text',
          description: 'How long data is retained',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'transferContent',
          title: 'Transfer of Your Personal Data',
          type: 'text',
          description: 'Information about data transfers',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'disclosureContent',
          title: 'Disclosure of Your Personal Data',
          type: 'text',
          description: 'When and how data may be disclosed',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'securityContent',
          title: 'Security of Your Personal Data',
          type: 'text',
          description: 'How data security is maintained',
          validation: (Rule) => Rule.required()
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
        },
        {
          name: 'contactDetails',
          title: 'Contact Details',
          type: 'object',
          fields: [
            {
              name: 'email',
              title: 'Privacy Contact Email',
              type: 'email',
              description: 'Email for privacy-related inquiries'
            },
            {
              name: 'phone',
              title: 'Privacy Contact Phone',
              type: 'string',
              description: 'Phone number for privacy-related inquiries'
            },
            {
              name: 'address',
              title: 'Company Address',
              type: 'text',
              description: 'Physical address for privacy-related correspondence'
            },
            {
              name: 'website',
              title: 'Website URL',
              type: 'url',
              description: 'Main website URL'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'additionalInformation',
      title: 'Additional Information',
      type: 'object',
      fields: [
        {
          name: 'gdprCompliance',
          title: 'GDPR Compliance Information',
          type: 'text',
          description: 'Additional information about GDPR compliance (if applicable)'
        },
        {
          name: 'ccpaCompliance',
          title: 'CCPA Compliance Information',
          type: 'text',
          description: 'Additional information about CCPA compliance (if applicable)'
        },
        {
          name: 'cookiePolicy',
          title: 'Cookie Policy Reference',
          type: 'text',
          description: 'Reference to separate cookie policy or cookie information'
        },
        {
          name: 'dataProcessingLegalBasis',
          title: 'Legal Basis for Data Processing',
          type: 'text',
          description: 'Legal basis for processing personal data'
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
