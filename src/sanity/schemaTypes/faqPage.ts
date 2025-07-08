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
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          description: 'Description text below the main title'
        }
      ]
    }),
    defineField({
      name: 'faqCategories',
      title: 'FAQ Categories',
      type: 'array',
      description: 'Categories to organize FAQs',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'categoryName',
              title: 'Category Name',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'categoryDescription',
              title: 'Category Description',
              type: 'text',
              description: 'Optional description for this FAQ category'
            },
            {
              name: 'color',
              title: 'Category Color',
              type: 'color',
              options: {
                disableAlpha: true
              }
            }
          ]
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
    defineField({
      name: 'searchSettings',
      title: 'Search & Filter Settings',
      type: 'object',
      fields: [
        {
          name: 'enableSearch',
          title: 'Enable Search',
          type: 'boolean',
          description: 'Allow users to search through FAQs',
          initialValue: true
        },
        {
          name: 'enableCategoryFilter',
          title: 'Enable Category Filter',
          type: 'boolean',
          description: 'Allow users to filter FAQs by category',
          initialValue: true
        },
        {
          name: 'searchPlaceholder',
          title: 'Search Placeholder Text',
          type: 'string',
          initialValue: 'Search FAQs...'
        },
        {
          name: 'noResultsMessage',
          title: 'No Results Message',
          type: 'string',
          initialValue: 'No FAQs found matching your search.'
        }
      ]
    }),
    defineField({
      name: 'contactSection',
      title: 'Contact Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Still Have Questions?'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          initialValue: 'Can\'t find what you\'re looking for? Get in touch with our team.'
        },
        {
          name: 'contactCTA',
          title: 'Contact Call to Action',
          type: 'object',
          fields: [
            {
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Contact Us'
            },
            {
              name: 'buttonLink',
              title: 'Button Link',
              type: 'url'
            }
          ]
        },
        {
          name: 'alternativeContact',
          title: 'Alternative Contact',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Alternative Text',
              type: 'string',
              initialValue: 'Or email us directly at'
            },
            {
              name: 'email',
              title: 'Contact Email',
              type: 'email'
            }
          ]
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

export default faqPage
