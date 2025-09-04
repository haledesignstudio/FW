// /schemas/shareholderPage.ts
import { defineType, defineField } from 'sanity';

const shareholderPage = defineType({
  name: 'shareholderPage',
  title: 'Shareholder Value Analytics Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Shareholder Value Analytics',
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
      name: 'CTA1',
      title: 'CTA 1',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'Mail1',
      title: 'Mail 1',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iframeSource',
      title: 'iFrame Source URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'IQ_heading',
      title: 'IQ Heading',
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
      name: 'IQ_subheading',
      title: 'IQ Subheading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'IQ_context',
      title: 'Context for IQ',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'CTA2',
      title: 'CTA 2',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'Mail2',
      title: 'Mail 2',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});

export default shareholderPage;
