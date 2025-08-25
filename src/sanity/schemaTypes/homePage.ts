import { defineType, defineField } from 'sanity'

const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fieldsets: [
    { name: 'mainContent', title: 'Main Content', options: { collapsible: true, collapsed: false } },
    { name: 'section1', title: 'Accordion Section 1', options: { collapsible: true, collapsed: true } },
    { name: 'section2', title: 'Accordion Section 2', options: { collapsible: true, collapsed: true } },
    { name: 'section3', title: 'Accordion Section 3', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
      fieldset: 'mainContent',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
      fieldset: 'mainContent',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
      fieldset: 'mainContent',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'string',
      validation: (Rule) => Rule.required(),
      fieldset: 'mainContent',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required(),
      fieldset: 'mainContent',
    }),

    defineField({
      name: 'Image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),


    defineField({
      name: 'section1',
      title: 'Section 1',
      type: 'object',
      fieldset: 'section1',
      fields: [
        defineField({ name: 'section1Title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'section1Body', title: 'Body', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() }),
        defineField({ name: 'section1CTA', title: 'CTA', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'section1Email', title: 'Email', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'section1URL', title: 'iframe URL', type: 'url', validation: (Rule) => Rule.required() }),
      ],
    }),

    defineField({
      name: 'section2',
      title: 'Section 2',
      type: 'object',
      fieldset: 'section2',
      fields: [
        defineField({ name: 'section2Title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'section2Body', title: 'Body', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() }),
        defineField({ name: 'section2Heading1', title: 'Heading 1', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() }),
        defineField({ name: 'section2Description1', title: 'Description 1', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() }),
        defineField({ name: 'section2Heading2', title: 'Heading 2', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() }),
        defineField({ name: 'section2Description2', title: 'Description 2', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() }),
        defineField({ name: 'section2Heading3', title: 'Heading 3', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() }),
        defineField({ name: 'section2Description3', title: 'Description 3', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() }),
        defineField({ name: 'section2Image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
      ],
    }),

    defineField({
      name: 'section3',
      title: 'Section 3',
      type: 'object',
      fieldset: 'section3',
      fields: [
        defineField({ name: 'section3Title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'section3Body', title: 'Body', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'Homepage',
    },
  },
})

export default homePage
