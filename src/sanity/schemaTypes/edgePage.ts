// ./schemas/edgePage.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'edgePage',
  title: 'Edge Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'The Edge',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'titleByline',
      title: 'Title Byline',
      type: 'string',
      initialValue: 'Insights Driven by Disruption',
      validation: (Rule) => Rule.required().min(1),
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
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'contentText',
      title: 'Content Text',
      type: 'string',
      validation: (Rule) => Rule.required().min(1),
    }),


    defineField({
      name: 'whatBlewYourMind',
      title: 'What Blew Your Mind',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'embedLink',
          title: 'Embed Link',
          type: 'url',
          description:
            'Full embed or playlist URL (e.g. https://www.youtube-nocookie.com/embed/... or a playlist link).',
          validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
          name: 'cta',
          title: 'CTA',
          type: 'string',
          description: 'Button/Link label, e.g. “Watch now”.',
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'ctaLink',
          title: 'CTA Link',
          type: 'url',
          description: 'Destination for the CTA (YouTube playlist/video or internal URL).',
          validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
              ]
            }
          ],
          description: 'Short blurb shown next to the embed (Portable Text).',
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
