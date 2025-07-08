import { defineType, defineField } from 'sanity'

const insightsPage = defineType({
  name: 'insightsPage',
  title: 'Insights Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Insights',
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
      name: 'shareholderValueAnalytics',
      title: 'Shareholder Value Analytics',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Shareholder Value Analytics',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          description: 'Text below the section title'
        },
        {
          name: 'contentText',
          title: 'Content Text',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Main content for this section'
        },
        {
          name: 'sectionImage',
          title: 'Section Image',
          type: 'image',
          options: { hotspot: true }
        },
        {
          name: 'carouselItems',
          title: 'Carousel Items',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'article' }]
            }
          ],
          description: 'Articles to display in the carousel'
        }
      ]
    }),
    defineField({
      name: 'mindbullets',
      title: 'Mindbullets: News From the Future',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Mindbullets: News From the Future',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          description: 'Text below the section title'
        },
        {
          name: 'contentText',
          title: 'Content Text',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Main content for this section'
        },
        {
          name: 'sectionImage',
          title: 'Section Image',
          type: 'image',
          options: { hotspot: true }
        },
        {
          name: 'carouselItems',
          title: 'Carousel Items',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'article' }]
            }
          ],
          description: 'Articles to display in the carousel'
        },
        {
          name: 'archiveReference',
          title: 'Mindbullets Archive Reference',
          type: 'string',
          description: 'Placeholder: Will be updated to reference mindbullets archive when schema is created',
          hidden: true
        }
      ]
    }),
    defineField({
      name: 'keynotes',
      title: 'Keynotes',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Keynotes',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          description: 'Text below the section title'
        },
        {
          name: 'contentText',
          title: 'Content Text',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Main content for this section'
        },
        {
          name: 'sectionImage',
          title: 'Section Image',
          type: 'image',
          options: { hotspot: true }
        },
        {
          name: 'gridArticles',
          title: 'Grid Articles',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'article' }]
            }
          ],
          description: 'Articles to display in the grid layout'
        },
        {
          name: 'speakersSection',
          title: 'Keynote Speakers Section',
          type: 'object',
          fields: [
            {
              name: 'sectionTitle',
              title: 'Speakers Section Title',
              type: 'string',
              description: 'Heading for the keynote speakers section'
            },
            {
              name: 'sectionSubtitle',
              title: 'Speakers Section Subtitle',
              type: 'text',
              description: 'Subtitle/description for the speakers section'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'podcast',
      title: 'Podcast',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Podcast',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          description: 'Text below the section title'
        },
        {
          name: 'contentText',
          title: 'Content Text',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Main content for this section'
        },
        {
          name: 'sectionImage',
          title: 'Section Image',
          type: 'image',
          options: { hotspot: true }
        },
        {
          name: 'carouselItems',
          title: 'Carousel Items',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'article' }]
            }
          ],
          description: 'Podcast episodes/articles to display in the carousel'
        }
      ]
    }),
    defineField({
      name: 'corporateVenturing',
      title: 'Corporate Venturing',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Corporate Venturing',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          description: 'Text below the section title'
        },
        {
          name: 'contentText',
          title: 'Content Text',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Main content for this section'
        },
        {
          name: 'sectionImage',
          title: 'Section Image',
          type: 'image',
          options: { hotspot: true }
        },
        {
          name: 'carouselItems',
          title: 'Carousel Items',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'article' }]
            }
          ],
          description: 'Articles to display in the carousel'
        }
      ]
    }),
    defineField({
      name: 'theEdge',
      title: 'The Edge: Insights Driven by Disruption',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'The Edge: Insights Driven by Disruption',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          description: 'Text below the section title'
        },
        {
          name: 'contentText',
          title: 'Content Text',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Main content for this section'
        },
        {
          name: 'sectionImage',
          title: 'Section Image',
          type: 'image',
          options: { hotspot: true }
        },
        {
          name: 'carouselItems',
          title: 'Carousel Items',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'article' }]
            }
          ],
          description: 'Articles to display in the carousel'
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

export default insightsPage
