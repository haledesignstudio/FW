// /schemas/keynoteTopic.ts

import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'keynoteTopic',
  title: 'Keynote Topic',
  type: 'document',


  fields: [
    defineField({
      name: 'topicTitle',
      title: 'Topic Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'topicHeading',
      title: 'Topic Heading',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'topicImage',
      title: 'Topic Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'topicButtonText',
      title: 'Topic Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'topicMail',
      title: 'Topic Mail',
      type: 'string',
      validation: (Rule) =>
        Rule.required().email().error('Must be a valid email address'),
    }),
    defineField({
      name: 'contents',
      title: 'Contents',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineField({
          name: 'topicContentItem',
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
            select: {
              title: 'topicTitle',
              media: 'topicImage',
            },
          },
});
