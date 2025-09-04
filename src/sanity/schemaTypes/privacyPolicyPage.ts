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
          name: 'content',
          title: 'Section Content',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
              ]
            }
          ],
          description: 'Rich formatted content for this section',
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
          name: 'content',
          title: 'Section Content',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
              ]
            }
          ],
          description: 'Rich formatted content for this section',
          validation: (Rule) => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'childrensPrivacySection',
      title: "Children's Privacy",
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: "Children's Privacy"
        },
        {
          name: 'content',
          title: 'Section Content',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
              ]
            }
          ],
          description: 'Rich formatted content for this section',
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
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
              ]
            }
          ],
          description: 'Rich formatted content for this section',
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
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
              ]
            }
          ],
          description: 'Rich formatted content for this section',
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
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
              ]
            }
          ],
          description: 'Rich formatted content for this section',
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
