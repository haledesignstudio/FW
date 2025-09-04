import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mindbullet',
  title: 'Mindbullet',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 250,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      validation: (Rule) => Rule.required(),
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'string',
      description: 'Date Published',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateline',
      title: 'Dateline',
      type: 'string',
      description: 'Futuristic or fictional date associated with the post content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'byLine',
      title: 'Byline',
      type: 'string',
      description: 'Author credit or source of the article',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
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

    // 🔽 Added field
    defineField({
      name: 'RelatedStories',
      title: 'Related Stories',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'relatedStory',
          title: 'Related Story',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'url',
              description: 'Full URL to the related story',
              validation: (Rule) =>
                Rule.uri({
                  allowRelative: false,
                  scheme: ['http', 'https'],
                }),
            }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
    defineField({
      name: 'corporate',
      title: 'Should this article be included on the Corporate Venturing page?',
      type: 'boolean',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
