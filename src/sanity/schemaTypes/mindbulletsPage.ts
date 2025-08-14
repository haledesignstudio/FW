// ./schemas/mindbulletsPage.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'mindbulletsPage',
  title: 'Mindbullets Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Mindbullets: News From the Future',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
