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
      name: 'pageHeader',
      title: 'Page Header',
      type: 'object',
      fields: [
        {
          name: 'mainTitle',
          title: 'Main Title',
          type: 'string',
          validation: (Rule) => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'contactFormSubheading',
      title: 'Contact Form Subheading',
      type: 'string',
      description: 'Subheading for the contact form (row 2, columns 4-6)'
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image (Row 3)',
      type: 'image',
      options: { hotspot: true },
      description: 'Image displayed in the third row of the contact page grid.'
    }),
    {
      name: 'contactFormIntro',
      type: 'string',
      title: 'Contact Form Intro',
      description: 'Introductory text above the contact form (e.g. "We’d love to connect. We just need to know:")',
    },
    defineField({
      name: 'contactForm',
      title: 'Contact Form Placeholders',
      type: 'object',
      fields: [
        { name: 'namePlaceholder', title: 'Name and Surname Placeholder', type: 'string' },
        { name: 'emailPlaceholder', title: 'Email Placeholder', type: 'string' },
        { name: 'phonePlaceholder', title: 'Phone Number Placeholder', type: 'string' },
        { name: 'companyPlaceholder', title: 'Company Placeholder', type: 'string' },
        { name: 'positionPlaceholder', title: 'Position Placeholder', type: 'string' },
        { name: 'messagePlaceholder', title: 'Message Placeholder', type: 'string' }
      ]
    }),
    defineField({
      name: 'keynoteSubheading',
      title: 'Keynote Section Subheading',
      type: 'string',
      description: 'Subheading for the keynote booking section'
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
