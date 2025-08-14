// ./schemas/keynotesPage.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'keynotesPage',
  title: 'Keynotes Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Keynotes',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'topicSection',
      title: 'Keynote Topic Section',
      type: 'object',
      fields: [
        defineField({
          name: 'topicSectionTitle',
          title: 'Topic Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'topicSectionSubtitle',
          title: 'Topic Section Subtitle',
          type: 'array',
          of: [{ type: 'block' }],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'topicContentText',
          title: 'Content Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'topicCTA1',
          title: 'Topic CTA 1',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'topicMail1',
          title: 'Topic Mail 1',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'topicCTA2',
          title: 'Topic CTA 2',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'speakerSection',
      title: 'Keynote Speakers Section',
      type: 'object',
      fields: [
        defineField({
          name: 'speakerSectionTitle',
          title: 'Speakers Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'speakerSectionSubtitle',
          title: 'Speakers Section Subtitle',
          type: 'array',
          of: [{ type: 'block' }],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'speakerContentText',
          title: 'Content Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'speakerCTA1',
          title: 'Topic CTA 1',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'speakerMail1',
          title: 'Topic Mail 1',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'speakerCTA2',
          title: 'Topic CTA 2',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'topicSection.topicSectionTitle',
    },
  },
});
