import { defineType, defineField } from 'sanity'

const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Homepage',
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
      name: 'signalsFromFuture',
      title: 'Signals from the Future',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'article' }]
        }
      ],
      description: 'Select articles to display in the Signals from the Future section',
      validation: (Rule) => Rule.max(6).warning('Consider limiting to 6 articles for better page performance')
    }),
    defineField({
      name: 'mainHeadline',
      title: 'Main Headline',
      type: 'text',
      description: 'The large headline: "We partner with large organisations to build new, future-relevant businesses, and co-invest in these ventures"',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'growthSection',
      title: 'Growth Section',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Growth Headline',
          type: 'string',
          description: 'e.g., "Growth isn\'t optional."',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'description',
          title: 'Growth Description',
          type: 'text',
          description: 'Main description text about growth and shareholder returns',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'ctaText',
          title: 'Call to Action Text',
          type: 'string',
          description: 'e.g., "Explore what this means for your business."',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'ctaLink',
          title: 'Call to Action Link',
          type: 'url',
          description: 'Link for the CTA button'
        }
      ]
    }),
    defineField({
      name: 'videoSection',
      title: 'Video Section',
      type: 'object',
      fields: [
        {
          name: 'backgroundImage',
          title: 'Video Background Image',
          type: 'image',
          options: { hotspot: true },
          description: 'Background image shown before video plays'
        },
        {
          name: 'videoUrl',
          title: 'Video URL',
          type: 'url',
          description: 'URL of the video to play'
        }
      ]
    }),
    defineField({
      name: 'accordionSection',
      title: 'Accordion Section',
      type: 'object',
      fields: [
        {
          name: 'benchmarkInnovation',
          title: 'Benchmark Your Innovation',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Tab Title',
              type: 'string',
              initialValue: 'Benchmark your innovation',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'description',
              title: 'Description Text',
              type: 'text',
              description: 'Main description about Innovation Quotient'
            },
            {
              name: 'ctaText',
              title: 'CTA Text',
              type: 'string',
              description: 'e.g., "Benchmark your organisation with [person]"'
            },
            {
              name: 'dashboardImage',
              title: 'Analytics Dashboard Image',
              type: 'image',
              options: { hotspot: true },
              description: 'The analytics dashboard/world map image'
            },
            {
              name: 'backgroundColor',
              title: 'Background Color',
              type: 'color',
              options: {
                disableAlpha: true
              },
              initialValue: { hex: '#232323' }
            }
          ]
        },
        {
          name: 'ourProcess',
          title: 'Our Process',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Tab Title',
              type: 'string',
              initialValue: 'Our process',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'introText',
              title: 'Introduction Text',
              type: 'text',
              description: 'Main introduction about the process'
            },
            {
              name: 'processColumns',
              title: 'Process Columns',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'headline',
                      title: 'Column Headline',
                      type: 'string',
                      validation: (Rule) => Rule.required()
                    },
                    {
                      name: 'subheadline',
                      title: 'Column Subheadline',
                      type: 'string',
                      validation: (Rule) => Rule.required()
                    },
                    {
                      name: 'content',
                      title: 'Column Content',
                      type: 'array',
                      of: [{ type: 'block' }]
                    }
                  ],
                  preview: {
                    select: {
                      title: 'headline',
                      subtitle: 'subheadline'
                    }
                  }
                }
              ],
              validation: (Rule) => Rule.length(3).error('Must have exactly 3 columns')
            },
            {
              name: 'astronautImage',
              title: 'Astronaut Image',
              type: 'image',
              options: { hotspot: true },
              description: 'The astronaut image on the right side'
            },
            {
              name: 'backgroundColor',
              title: 'Background Color',
              type: 'color',
              options: {
                disableAlpha: true
              },
              initialValue: { hex: '#DC5A50' }
            }
          ]
        },
        {
          name: 'caseStudies',
          title: 'Case Studies',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Tab Title',
              type: 'string',
              initialValue: 'Case studies',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'headline',
              title: 'Main Headline',
              type: 'string',
              description: 'Large headline for case studies section'
            },
            {
              name: 'subheadline',
              title: 'Subheadline',
              type: 'text',
              description: 'Description text below the headline'
            },
            {
              name: 'caseStudyGrid',
              title: 'Case Study Grid Images',
              type: 'array',
              of: [
                {
                  type: 'image',
                  options: { hotspot: true }
                }
              ],
              validation: (Rule) => Rule.length(5).error('Must have exactly 5 images for the grid')
            },
            {
              name: 'featuredCaseStudy',
              title: 'Featured Case Study',
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Featured Image',
                  type: 'image',
                  options: { hotspot: true }
                },
                {
                  name: 'title',
                  title: 'Case Study Title',
                  type: 'string'
                },
                {
                  name: 'description',
                  title: 'Case Study Description',
                  type: 'text'
                },
                {
                  name: 'readMoreLink',
                  title: 'Read More Link',
                  type: 'url'
                }
              ]
            },
            {
              name: 'backgroundColor',
              title: 'Background Color',
              type: 'color',
              options: {
                disableAlpha: true
              },
              initialValue: { hex: '#F9F7F2' }
            }
          ]
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'mainHeadline'
    }
  }
})

export default homePage
