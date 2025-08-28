import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'podcast',
  title: 'Podcast',
  type: 'document',
  fields: [
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'headline', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => Rule.required().max(360).error('Max 360 characters'),
    }),
    defineField({
      name: 'embedLink',
      title: 'Embed Link',
      description: 'e.g. https://open.spotify.com/embed/episode/5QNJ4PLy1Hu5LCEnRAqRkJ?utm_source=generator',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'corporate',
      title: 'Corporate',
      type: 'boolean',
      description: 'Should this podcast be included on the Corporate Venturing page?',
      initialValue: false,
      options: { layout: 'switch' },
    }),
  ],
})
