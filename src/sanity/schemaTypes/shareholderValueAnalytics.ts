// ./shareholderValueAnalytics.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'shareholderValueAnalytics',
  title: 'Shareholder Value Analytics',
  type: 'document',

   preview: {
    prepare() {
      return {
        title: 'Shareholder Value Analytics',
      }
    },
  },

  fieldsets: [
    {
      name: 'content',
      title: 'Main Content',
      options: { collapsible: true, collapsed: false },
    },
  ],

  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'text',
      fieldset: 'content',
    }),
    defineField({
      name: 'question',
      title: 'Question',
      type: 'text',
      fieldset: 'content',
    }),
    defineField({
      name: 'mainline',
      title: 'Mainline',
      type: 'text',
      fieldset: 'content',
    }),
    defineField({
      name: 'statement1',
      title: 'Statement 1',
      type: 'text',
      fieldset: 'content',
    }),
    defineField({
      name: 'statement2',
      title: 'Statement 2',
      type: 'text',
      fieldset: 'content',
    }),
    defineField({
      name: 'cta1',
      title: 'CTA 1',
      type: 'string',
    }),
    defineField({
      name: 'mail1',
      title: 'Mail 1',
      type: 'string',
    }),
    defineField({
      name: 'cta2',
      title: 'CTA 2',
      type: 'string',
    }),
    defineField({
      name: 'mail2',
      title: 'Mail 2',
      type: 'string',
    }),
    defineField({
      name: 'embedLink',
      title: 'Embed Link',
      type: 'string',
    }),
  ],
});
