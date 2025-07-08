import { defineType, defineField } from 'sanity'
// default mindbullet schema for now while we wait to migrate the content from FW site
const mindbullet = defineType({
  name: 'mindbullet',
  title: 'Mindbullet',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Mindbullet Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'Brief summary of the Mindbullet',
      validation: (Rule) => Rule.required().max(300)
    }),
    defineField({
      name: 'content',
      title: 'Full Content',
      type: 'text',
      description: 'Complete Mindbullet content',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Technology', value: 'technology' },
          { title: 'Business', value: 'business' },
          { title: 'Society', value: 'society' },
          { title: 'Environment', value: 'environment' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Finance', value: 'finance' },
          { title: 'Education', value: 'education' },
          { title: 'Transportation', value: 'transportation' },
          { title: 'Energy', value: 'energy' },
          { title: 'Space', value: 'space' },
          { title: 'AI & Robotics', value: 'ai-robotics' },
          { title: 'Biotechnology', value: 'biotechnology' }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords and tags for this Mindbullet'
    }),
    defineField({
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'date',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'futureDate',
      title: 'Future Date',
      type: 'date',
      description: 'The date this prediction is expected to come true'
    }),
    defineField({
      name: 'timeframe',
      title: 'Timeframe',
      type: 'string',
      options: {
        list: [
          { title: 'Short-term (1-2 years)', value: 'short' },
          { title: 'Medium-term (3-5 years)', value: 'medium' },
          { title: 'Long-term (5-10 years)', value: 'long' },
          { title: 'Far future (10+ years)', value: 'far' }
        ]
      }
    }),
    defineField({
      name: 'impact',
      title: 'Impact Level',
      type: 'string',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Medium', value: 'medium' },
          { title: 'High', value: 'high' },
          { title: 'Transformational', value: 'transformational' }
        ]
      }
    }),
    defineField({
      name: 'probability',
      title: 'Probability',
      type: 'string',
      options: {
        list: [
          { title: 'Low (10-30%)', value: 'low' },
          { title: 'Medium (30-60%)', value: 'medium' },
          { title: 'High (60-80%)', value: 'high' },
          { title: 'Very High (80%+)', value: 'very-high' }
        ]
      }
    }),
    defineField({
      name: 'industries',
      title: 'Affected Industries',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Technology', value: 'technology' },
          { title: 'Finance', value: 'finance' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Manufacturing', value: 'manufacturing' },
          { title: 'Retail', value: 'retail' },
          { title: 'Energy', value: 'energy' },
          { title: 'Transportation', value: 'transportation' },
          { title: 'Education', value: 'education' },
          { title: 'Government', value: 'government' },
          { title: 'Entertainment', value: 'entertainment' },
          { title: 'Agriculture', value: 'agriculture' }
        ]
      }
    }),
    defineField({
      name: 'regions',
      title: 'Affected Regions',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Global', value: 'global' },
          { title: 'North America', value: 'north-america' },
          { title: 'Europe', value: 'europe' },
          { title: 'Asia Pacific', value: 'asia-pacific' },
          { title: 'Latin America', value: 'latin-america' },
          { title: 'Middle East & Africa', value: 'mena' },
          { title: 'Emerging Markets', value: 'emerging' },
          { title: 'Developed Markets', value: 'developed' }
        ]
      }
    }),
    defineField({
      name: 'evidence',
      title: 'Supporting Evidence',
      type: 'object',
      fields: [
        {
          name: 'keyTrends',
          title: 'Key Supporting Trends',
          type: 'array',
          of: [{ type: 'string' }]
        },
        {
          name: 'earlySignals',
          title: 'Early Signals',
          type: 'array',
          of: [{ type: 'string' }]
        },
        {
          name: 'researchSources',
          title: 'Research Sources',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Source Title',
                  type: 'string'
                },
                {
                  name: 'url',
                  title: 'Source URL',
                  type: 'url'
                },
                {
                  name: 'description',
                  title: 'Source Description',
                  type: 'text'
                }
              ]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'implications',
      title: 'Implications',
      type: 'object',
      fields: [
        {
          name: 'businessImplications',
          title: 'Business Implications',
          type: 'array',
          of: [{ type: 'string' }]
        },
        {
          name: 'societalImplications',
          title: 'Societal Implications',
          type: 'array',
          of: [{ type: 'string' }]
        },
        {
          name: 'opportunities',
          title: 'Opportunities',
          type: 'array',
          of: [{ type: 'string' }]
        },
        {
          name: 'risks',
          title: 'Risks',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Author or research team'
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active Prediction', value: 'active' },
          { title: 'Partially Realized', value: 'partial' },
          { title: 'Fully Realized', value: 'realized' },
          { title: 'Unlikely/Revised', value: 'revised' }
        ]
      },
      initialValue: 'active'
    }),
    defineField({
      name: 'statusUpdates',
      title: 'Status Updates',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'date',
              title: 'Update Date',
              type: 'date',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'update',
              title: 'Update Description',
              type: 'text',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'evidence',
              title: 'Supporting Evidence',
              type: 'text'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'relatedMindbullets',
      title: 'Related Mindbullets',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'mindbullet' }]
        }
      ]
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'article' }]
        }
      ]
    }),
    defineField({
      name: 'featured',
      title: 'Featured Mindbullet',
      type: 'boolean',
      description: 'Mark as featured to show prominently',
      initialValue: false
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      }
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
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title,
        subtitle: subtitle ? `Category: ${subtitle}` : undefined,
        media
      }
    }
  }
})

export default mindbullet
