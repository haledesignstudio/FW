import { defineType, defineField } from 'sanity'
// default case study schema for now while we wait to migrate the content from FW site
const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Case Study Title',
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
      title: 'Executive Summary',
      type: 'text',
      description: 'Brief overview of the case study',
      validation: (Rule) => Rule.max(300)
    }),
    defineField({
      name: 'client',
      title: 'Client Information',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Client Name',
          type: 'string',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'industry',
          title: 'Industry',
          type: 'string',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'size',
          title: 'Company Size',
          type: 'string',
          options: {
            list: [
              { title: 'Startup (1-50 employees)', value: 'startup' },
              { title: 'Small (51-200 employees)', value: 'small' },
              { title: 'Medium (201-1000 employees)', value: 'medium' },
              { title: 'Large (1001-5000 employees)', value: 'large' },
              { title: 'Enterprise (5000+ employees)', value: 'enterprise' }
            ]
          }
        },
        {
          name: 'logo',
          title: 'Client Logo',
          type: 'image'
        }
      ]
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'object',
      fields: [
        {
          name: 'overview',
          title: 'Challenge Overview',
          type: 'text',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'keyPoints',
          title: 'Key Challenge Points',
          type: 'array',
          of: [{ type: 'string' }]
        },
        {
          name: 'goals',
          title: 'Project Goals',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    }),
    defineField({
      name: 'approach',
      title: 'Our Approach',
      type: 'object',
      fields: [
        {
          name: 'methodology',
          title: 'Methodology Overview',
          type: 'text',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'phases',
          title: 'Project Phases',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Phase Title',
                  type: 'string',
                  validation: (Rule) => Rule.required()
                },
                {
                  name: 'description',
                  title: 'Phase Description',
                  type: 'text',
                  validation: (Rule) => Rule.required()
                },
                {
                  name: 'duration',
                  title: 'Duration',
                  type: 'string'
                },
                {
                  name: 'deliverables',
                  title: 'Key Deliverables',
                  type: 'array',
                  of: [{ type: 'string' }]
                }
              ]
            }
          ]
        },
        {
          name: 'tools',
          title: 'Tools & Technologies',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    }),
    defineField({
      name: 'solution',
      title: 'The Solution',
      type: 'object',
      fields: [
        {
          name: 'overview',
          title: 'Solution Overview',
          type: 'text',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'keyFeatures',
          title: 'Key Solution Features',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Feature Title',
                  type: 'string',
                  validation: (Rule) => Rule.required()
                },
                {
                  name: 'description',
                  title: 'Feature Description',
                  type: 'text',
                  validation: (Rule) => Rule.required()
                },
                {
                  name: 'image',
                  title: 'Feature Image',
                  type: 'image',
                  options: {
                    hotspot: true
                  }
                }
              ]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'results',
      title: 'Results & Impact',
      type: 'object',
      fields: [
        {
          name: 'overview',
          title: 'Results Overview',
          type: 'text',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'metrics',
          title: 'Key Metrics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'metric',
                  title: 'Metric Name',
                  type: 'string',
                  validation: (Rule) => Rule.required()
                },
                {
                  name: 'value',
                  title: 'Metric Value',
                  type: 'string',
                  validation: (Rule) => Rule.required()
                },
                {
                  name: 'improvement',
                  title: 'Improvement Description',
                  type: 'string'
                }
              ]
            }
          ]
        },
        {
          name: 'qualitativeResults',
          title: 'Qualitative Results',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Testimonial Quote',
          type: 'text',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'author',
          title: 'Author Name',
          type: 'string',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'authorTitle',
          title: 'Author Title',
          type: 'string',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'authorImage',
          title: 'Author Photo',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
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
          name: 'totalDuration',
          title: 'Total Duration',
          type: 'string'
        }
      ]
    }),
    defineField({
      name: 'team',
      title: 'Project Team',
      type: 'object',
      fields: [
        {
          name: 'teamSize',
          title: 'Team Size',
          type: 'string'
        },
        {
          name: 'keyRoles',
          title: 'Key Team Roles',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    }),
    defineField({
      name: 'learnings',
      title: 'Key Learnings',
      type: 'object',
      fields: [
        {
          name: 'insights',
          title: 'Key Insights',
          type: 'array',
          of: [{ type: 'string' }]
        },
        {
          name: 'challenges',
          title: 'Challenges Overcome',
          type: 'array',
          of: [{ type: 'string' }]
        },
        {
          name: 'futureRecommendations',
          title: 'Future Recommendations',
          type: 'text'
        }
      ]
    }),
    defineField({
      name: 'media',
      title: 'Case Study Media',
      type: 'object',
      fields: [
        {
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          options: {
            hotspot: true
          },
          validation: (Rule) => Rule.required()
        },
        {
          name: 'gallery',
          title: 'Image Gallery',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true
              }
            }
          ]
        },
        {
          name: 'documents',
          title: 'Related Documents',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Document Title',
                  type: 'string',
                  validation: (Rule) => Rule.required()
                },
                {
                  name: 'file',
                  title: 'Document File',
                  type: 'file'
                },
                {
                  name: 'description',
                  title: 'Document Description',
                  type: 'text'
                }
              ]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'featured',
      title: 'Featured Case Study',
      type: 'boolean',
      description: 'Mark as featured to show prominently',
      initialValue: false
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }]
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
      subtitle: 'client.name',
      media: 'media.heroImage'
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

export default caseStudy
