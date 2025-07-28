import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'provocativeScenario',
  title: 'Provocative Scenario',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
    }),
    defineField({
      name: 'boldText',
      title: 'Bold Text',
      type: 'string',
    }),
    defineField({
      name: 'carouselItems',
      title: 'Carousel Items',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'carouselItem' }] }],
    }),
    defineField({
      name: 'podcast',
      title: 'Podcast',
      type: 'object',
      fields: [
        { name: 'info', title: 'Podcast Info', type: 'string' },
        { name: 'audio', title: 'Audio File', type: 'file', options: { accept: 'audio/*' } },
        { name: 'link', title: 'Podcast Link', type: 'url' },
      ],
    }),
    defineField({
      name: 'mindbullets',
      title: 'Mindbullets Carousel Items',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'carouselItem' }] }],
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
  ],
});
