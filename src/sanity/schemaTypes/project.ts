import { defineType, defineField } from 'sanity'
// default project schema for now while we wait to migrate the content from FW site. don't even know if we need this but I just put it in for now
const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
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
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      description: 'Brief description for cards and previews',
      validation: (Rule) => Rule.max(200)
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      description: 'Detailed project description'
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          { title: 'Technology', value: 'technology' },
          { title: 'Finance', value: 'finance' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Manufacturing', value: 'manufacturing' },
          { title: 'Retail', value: 'retail' },
          { title: 'Energy', value: 'energy' },
          { title: 'Government', value: 'government' },
          { title: 'Education', value: 'education' },
          { title: 'Other', value: 'other' }
        ]
      }
    }),
    defineField({
      name: 'categories',
      title: 'Project Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Strategy', value: 'strategy' },
          { title: 'Innovation', value: 'innovation' },
          { title: 'Research', value: 'research' },
          { title: 'Analytics', value: 'analytics' },
          { title: 'Digital Transformation', value: 'digital-transformation' },
          { title: 'Future Planning', value: 'future-planning' },
          { title: 'Market Intelligence', value: 'market-intelligence' }
        ]
      }
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          { title: 'Consulting', value: 'consulting' },
          { title: 'Research', value: 'research' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Long-term Partnership', value: 'partnership' },
          { title: 'Assessment', value: 'assessment' }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'timeline',
      title: 'Project Timeline',
      type: 'object',
      fields: [
        {
          name: 'startDate',
          title: 'Start Date',
          type: 'date'
        },
        {
          name: 'endDate',
          title: 'End Date',
          type: 'date'
        },
        {
          name: 'duration',
          title: 'Duration Description',
          type: 'string',
          description: 'e.g., "6 months", "Ongoing"'
        }
      ]
    }),
    defineField({
      name: 'services',
      title: 'Services Provided',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of services provided for this project'
    }),
    defineField({
      name: 'results',
      title: 'Key Results',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'metric',
              title: 'Metric/Result',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'value',
              title: 'Value/Impact',
              type: 'string',
              validation: (Rule) => Rule.required()
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Mark as featured to show prominently',
      initialValue: false
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Technologies, tools, or methodologies used'
    }),
    defineField({
      name: 'challenges',
      title: 'Challenges Addressed',
      type: 'text',
      description: 'Key challenges this project addressed'
    }),
    defineField({
      name: 'solution',
      title: 'Our Solution',
      type: 'text',
      description: 'How we approached and solved the challenges'
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Testimonial Quote',
          type: 'text'
        },
        {
          name: 'author',
          title: 'Author Name',
          type: 'string'
        },
        {
          name: 'authorTitle',
          title: 'Author Title',
          type: 'string'
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
      name: 'isPublic',
      title: 'Public Project',
      type: 'boolean',
      description: 'Whether this project can be shown publicly',
      initialValue: true
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
      subtitle: 'client',
      media: 'featuredImage'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title,
        subtitle: subtitle ? `Client: ${subtitle}` : undefined,
        media
      }
    }
  }
})

export default project
