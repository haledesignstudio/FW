// ./schemas/corporatePage.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'corporatePage',
  title: 'Corporate Venturing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Corporate Venturing',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
          ]
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentText',
      title: 'Content Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'CTA',
      title: 'CTA',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'Mail',
      title: 'Mail',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
});
