// /schemas/keynote.ts

import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'keynote',
  title: 'Keynote',
  type: 'document',

  preview: {
    prepare() {
      return {
        title: 'Keynote',
      }
    },
  },

  fieldsets: [
    {
      name: 'topics',
      title: 'Topics',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'speakers',
      title: 'Speakers',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'carousel',
      title: 'Carousel',
      options: { collapsible: true, collapsed: false },
    },
  ],

  fields: [
    // TOPICS Group
    defineField({
      name: 'topicHeadline',
      title: 'Topic Headline',
      type: 'text',
      fieldset: 'topics',
    }),
    defineField({
      name: 'topicMainline',
      title: 'Topic Mainline',
      type: 'text',
      fieldset: 'topics',
    }),
    defineField({
      name: 'topicStatement',
      title: 'Topic Statement',
      type: 'text',
      fieldset: 'topics',
    }),
    defineField({
      name: 'topicCTA1',
      title: 'Topic CTA 1',
      type: 'string',
      fieldset: 'topics',
    }),
    defineField({
      name: 'topicMail1',
      title: 'Topic Mail 1',
      type: 'string',
      fieldset: 'topics',
    }),
    defineField({
      name: 'topicCTA2',
      title: 'Topic CTA 2',
      type: 'string',
      fieldset: 'topics',
    }),
    defineField({
      name: 'topicCTA3',
      title: 'Topic CTA 3',
      type: 'string',
      fieldset: 'topics',
    }),
    defineField({
      name: 'topicMail3',
      title: 'Topic Mail 3',
      type: 'string',
      fieldset: 'topics',
    }),

    // CAROUSEL Group (array of objects)
    defineField({
      name: 'topicCarousel',
      title: 'Topic Carousel',
      type: 'array',
      fieldset: 'carousel',
      of: [
        {
          type: 'object',
          name: 'topicCarouselItem',
          fields: [
            defineField({
              name: 'topicCarouselImage',
              title: 'Topic Carousel Image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'topicCarouselHeadline',
              title: 'Topic Carousel Headline',
              type: 'string',
            }),
            defineField({
              name: 'topicCarouselDescription',
              title: 'Topic Carousel Description',
              type: 'text',
            }),
          ],
          preview: {
            select: {
              title: 'topicCarouselHeadline',
              media: 'topicCarouselImage',
            },
          },
        },
      ],
    }),

    // SPEAKERS Group
    defineField({
      name: 'speakerHeadline',
      title: 'Speaker Headline',
      type: 'text',
      fieldset: 'speakers',
    }),
    defineField({
      name: 'speakerMainline',
      title: 'Speaker Mainline',
      type: 'text',
      fieldset: 'speakers',
    }),
    defineField({
      name: 'speakerStatement',
      title: 'Speaker Statement',
      type: 'text',
      fieldset: 'speakers',
    }),
    defineField({
      name: 'speakerCTA1',
      title: 'Speaker CTA 1',
      type: 'string',
      fieldset: 'speakers',
    }),
    defineField({
      name: 'speakerMail1',
      title: 'Speaker Mail 1',
      type: 'string',
      fieldset: 'speakers',
    }),
    defineField({
      name: 'speakerCTA2',
      title: 'Speaker CTA 2',
      type: 'string',
      fieldset: 'speakers',
    }),
  ],
});