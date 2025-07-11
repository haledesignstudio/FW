import { defineType, defineField } from 'sanity'

const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Contact',
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
      name: 'mainTitle',
      title: 'Main Title',
      type: 'string',
      description: 'Main page heading',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'Description text below the main title'
    }),
    defineField({
      name: 'officesAroundTheWorld',
      title: 'Offices Around The World',
      type: 'array',
      validation: (Rule) => Rule.max(6),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Office Name',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'email',
              title: 'Office Email',
              type: 'email',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'image',
              title: 'Office Image',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: (Rule) => Rule.required()
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'bookingKeynote',
      title: 'Booking a Keynote Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'string'
        },
        {
          name: 'text',
          title: 'Section Text',
          type: 'text',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'link',
          title: 'Section Link',
          type: 'url',
          validation: (Rule) => Rule.required()
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'mainTitle'
    }
  }
})

export default contactPage
