import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'whatWeDo',
  title: 'What We Do',
  type: 'document',

  preview: {
    prepare() {
      return {
        title: 'What We Do',
      }
    },
  },

  fieldsets: [
    {
      name: 'intro',
      title: 'Intro Section',
      options: { collapsible: true, collapsed: false },
    },
        {
      name: 'calltoaction',
      title: 'Call to Action',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'statements',
      title: 'Statements',
      options: { collapsible: true, collapsed: false },
    },
  ],

  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'text',
      fieldset: 'intro',
    }),
    defineField({
      name: 'mainline',
      title: 'Mainline',
      type: 'text',
      fieldset: 'intro',
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'string',
      fieldset: 'calltoaction',
    }),
    defineField({
      name: 'mail',
      title: 'Mail',
      type: 'string',
      fieldset: 'calltoaction',
    }),
    defineField({
      name: 'statement1',
      title: 'Statement 1',
      type: 'text',
      fieldset: 'statements',
    }),
    defineField({
      name: 'statement2',
      title: 'Statement 2',
      type: 'text',
      fieldset: 'statements',
    }),
    defineField({
      name: 'statement3',
      title: 'Statement 3',
      type: 'text',
      fieldset: 'statements',
    }),
  ],
})
