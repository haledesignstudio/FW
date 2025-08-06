import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'mindbullet',
  title: 'Mindbullet',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'dateline',
      title: 'Dateline',
      type: 'string',
      description: 'e.g., “New York, 2042”',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'datePublished',
      title: 'Date Published',
      type: 'date',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: Rule => Rule.required()
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    }
  }
});
