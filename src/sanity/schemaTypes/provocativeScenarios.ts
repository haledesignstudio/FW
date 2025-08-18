import { defineType, defineField, type SanityDocument } from 'sanity';

// Helper to read the toggle without fighting the Sanity types
type AudioChoice = 'yes' | 'no';
const getHasAudio = (doc?: SanityDocument): AudioChoice =>
  ((doc as unknown as { hasAudio?: AudioChoice })?.hasAudio ?? 'no');

export default defineType({
  name: 'provocativeScenario',
  title: 'Provocative Scenario',
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
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'contentText',
      title: 'Content Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    // --- ArticleContents (exactly 3 items) ---
    defineField({
      name: 'articleContents',
      title: 'Article Contents',
      type: 'array',
      of: [
        defineField({
          name: 'articleItem',
          title: 'Article Content',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{ type: 'block' }],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(3)
          .error('You must provide exactly three Article Contents items.'),
    }),
    // --- /ArticleContents ---

    defineField({
      name: 'pdfMobile',
      title: 'PDF (Mobile)',
      type: 'file',
      options: { accept: 'application/pdf' },
    }),
    defineField({
      name: 'pdfDesktop',
      title: 'PDF (Desktop)',
      type: 'file',
      options: { accept: 'application/pdf' },
    }),

    defineField({
      name: 'hasAudio',
      title: 'Does this article have an audio section?',
      type: 'string',
      initialValue: 'no',
      options: {
        list: [
          { title: 'Yes', value: 'yes' },
          { title: 'No', value: 'no' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'audioDescription',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      hidden: ({ document }) => getHasAudio(document) !== 'yes',
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const hasAudio = getHasAudio(ctx.document);
          if (hasAudio === 'yes' && (!val || (Array.isArray(val) && val.length === 0))) {
            return 'Description is required when audio section is enabled.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      options: { accept: 'audio/*' },
      hidden: ({ document }) => getHasAudio(document) !== 'yes',
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const hasAudio = getHasAudio(ctx.document);
          if (hasAudio === 'yes' && !val) {
            return 'Audio file is required when audio section is enabled.';
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
});
