import { defineType, defineField } from 'sanity'

const termsAndConditionsPage = defineType({
  name: 'termsAndConditionsPage',
  title: 'Terms & Conditions Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Terms & Conditions',
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
          name: 'introText',
          title: 'Introduction Text',
          type: 'text',
          description: 'Text below the main heading',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'lastUpdated',
          title: 'Last Updated Date',
          type: 'date',
          description: 'When these terms were last updated'
        }
      ]
    }),
    defineField({
      name: 'cookiesSection',
      title: 'Cookies',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Cookies'
        },
        {
          name: 'content',
          title: 'Section Content',
          type: 'text',
          validation: (Rule) => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'licenseSection',
      title: 'License',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'License'
        },
        {
          name: 'content',
          title: 'Section Content',
          type: 'text',
          validation: (Rule) => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'hyperlinksSection',
      title: 'Hyperlinks to our content',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Hyperlinks to our content'
        },
        {
          name: 'content',
          title: 'Section Content',
          type: 'text',
          validation: (Rule) => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'iframesSection',
      title: 'iFrames',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'iFrames'
        },
        {
          name: 'content',
          title: 'Section Content',
          type: 'text',
          validation: (Rule) => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'contentLiabilitySection',
      title: 'Content Liability',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Content Liability'
        },
        {
          name: 'content',
          title: 'Section Content',
          type: 'text',
          validation: (Rule) => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'privacySection',
      title: 'Your Privacy',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Your Privacy'
        },
        {
          name: 'content',
          title: 'Section Content',
          type: 'text',
          validation: (Rule) => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'reservationOfRightsSection',
      title: 'Reservation of Rights',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Reservation of Rights'
        },
        {
          name: 'content',
          title: 'Section Content',
          type: 'text',
          validation: (Rule) => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'removalOfLinksSection',
      title: 'Removal of links from our website',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Removal of links from our website'
        },
        {
          name: 'content',
          title: 'Section Content',
          type: 'text',
          validation: (Rule) => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'disclaimerSection',
      title: 'Disclaimer',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Disclaimer'
        },
        {
          name: 'content',
          title: 'Section Content',
          type: 'text',
          validation: (Rule) => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'contactInformation',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Contact Information'
        },
        {
          name: 'contactText',
          title: 'Contact Text',
          type: 'text',
          description: 'Text about contacting regarding these terms'
        },
        {
          name: 'email',
          title: 'Contact Email',
          type: 'email'
        },
        {
          name: 'address',
          title: 'Company Address',
          type: 'text'
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

export default termsAndConditionsPage
