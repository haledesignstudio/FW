import { defineType, defineField } from 'sanity'

const faqPage = defineType({
  name: 'faqPage',
  title: 'FAQ Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
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
        }
      ]
    }),
    defineField({
      name: 'faqs',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'category',
              title: 'FAQ Category',
              type: 'string',
              options: {
                list: [
                  { title: 'General', value: 'general' },
                  { title: 'Services', value: 'services' },
                  { title: 'Pricing', value: 'pricing' },
                  { title: 'Process', value: 'process' },
                  { title: 'Technical', value: 'technical' },
                  { title: 'Support', value: 'support' },
                  { title: 'Billing', value: 'billing' },
                  { title: 'Account', value: 'account' }
                ]
              },
              validation: (Rule) => Rule.required()
            },
            {
              name: 'featured',
              title: 'Featured FAQ',
              type: 'boolean',
              description: 'Mark as featured to show prominently',
              initialValue: false
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order within category (lower numbers first)'
            },
            {
              name: 'relatedFaqs',
              title: 'Related FAQs',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Keywords or topics related to this FAQ'
            },
            {
              name: 'lastUpdated',
              title: 'Last Updated',
              type: 'date',
              description: 'When this FAQ was last updated'
            }
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'category'
            }
          }
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'pageHeader.mainTitle'
    }
  }
})

export default faqPage
