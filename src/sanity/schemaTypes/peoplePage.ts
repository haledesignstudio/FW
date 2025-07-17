import { defineType, defineField } from 'sanity'

const peoplePage = defineType({
  name: 'peoplePage',
  title: 'People Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'People',
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
          description: 'Main page heading with underline animation',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          description: 'Subheading in columns 2-4, anchored to bottom'
        },
        {
          name: 'regularText',
          title: 'Regular Text',
          type: 'text',
          description: 'Regular text in columns 5-6, anchored to top left'
        }
      ]
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'Large image spanning rows 3-5, columns 1-6',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'sections',
      title: 'Content Sections',
      type: 'object',
      fields: [
        {
          name: 'subheading1',
          title: 'Subheading 1 (Row 6)',
          type: 'string',
          description: 'Subheading in row 6, columns 5-6'
        },
        {
          name: 'leftSection',
          title: 'Left Section (Row 7)',
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
              description: 'Heading in column 1, anchored to top right'
            },
            {
              name: 'text',
              title: 'Text',
              type: 'text',
              description: 'Text in column 2, anchored to top left'
            }
          ]
        },
        {
          name: 'rightSection',
          title: 'Right Section (Row 7)',
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
              description: 'Heading in column 3, anchored to top right'
            },
            {
              name: 'text',
              title: 'Text',
              type: 'text',
              description: 'Text in column 4, anchored to top left'
            }
          ]
        },
        {
          name: 'sideText',
          title: 'Side Text (Row 7)',
          type: 'text',
          description: 'Small text in row 7, column 6, anchored to top left'
        },
        {
          name: 'leftSection2',
          title: 'Left Section (Row 8)',
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
              description: 'Heading in column 1, anchored to top right'
            },
            {
              name: 'text',
              title: 'Text',
              type: 'text',
              description: 'Text in column 2, anchored to top left'
            }
          ]
        },
        {
          name: 'rightSection2',
          title: 'Right Section (Row 8)',
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
              description: 'Heading in column 3, anchored to top right'
            },
            {
              name: 'text',
              title: 'Text',
              type: 'text',
              description: 'Text in column 4, anchored to top left'
            }
          ]
        },
        {
          name: 'whyJoinUsSection',
          title: 'Why Join Us Section (Row 10)',
          type: 'object',
          fields: [
            {
              name: 'mainHeading',
              title: 'Main Heading',
              type: 'string',
              description: 'Main heading in columns 1-2, anchored to top left'
            },
            {
              name: 'reasons',
              title: 'Reasons to Join',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'heading',
                      title: 'Heading',
                      type: 'string'
                    },
                    {
                      name: 'text',
                      title: 'Text',
                      type: 'text'
                    }
                  ]
                }
              ],
              validation: (Rule) => Rule.max(4).min(1),
              description: 'Up to 4 reasons (columns 3-6), each with heading and text'
            }
          ]
        },
        {
          name: 'carouselHeading',
          title: 'Carousel Heading',
          type: 'string',
          description: 'Heading in row 11, column 1, anchored to bottom left'
        },
        {
          name: 'carouselSidebar',
          title: 'Carousel Sidebar',
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string'
            },
            {
              name: 'text',
              title: 'Text',
              type: 'text'
            },
            {
              name: 'linkText',
              title: 'Link Text',
              type: 'string',
              description: 'Text for the mailto button (links to careers@futureworld.org)'
            }
          ]
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

export default peoplePage
