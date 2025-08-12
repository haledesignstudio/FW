import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'whatWeDoPage',
  title: 'What We Do Page',
  type: 'document',

  fieldsets: [
    { name: 'intro', title: 'Intro', options: { collapsible: true, collapsed: false } },
    { name: 'cta', title: 'Call to Action', options: { collapsible: true, collapsed: false } },
    { name: 'statements', title: 'Statements', options: { collapsible: true, collapsed: false } },
    { name: 'accordion', title: 'Accordion', options: { collapsible: true, collapsed: false } },
  ],

  fields: [
    // Heading
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      fieldset: 'intro',
      validation: (Rule) => Rule.required(),
    }),

    // Subheading (textblock)
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'array',
      of: [{ type: 'block' }],
      fieldset: 'intro',
      validation: (Rule) => Rule.required().min(1),
    }),

    // CTA
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'string',
      fieldset: 'cta',
      validation: (Rule) => Rule.required(),
    }),

    // Email
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      fieldset: 'cta',
      validation: (Rule) =>
        Rule.required().regex(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          { name: 'email', invert: false }
        ),
    }),

    // Statement 1 (textblock)
    defineField({
      name: 'statement1',
      title: 'Statement 1',
      type: 'array',
      of: [{ type: 'block' }],
      fieldset: 'statements',
      validation: (Rule) => Rule.required().min(1),
    }),

    // Statement 2 (textblock)
    defineField({
      name: 'statement2',
      title: 'Statement 2',
      type: 'array',
      of: [{ type: 'block' }],
      fieldset: 'statements',
      validation: (Rule) => Rule.required().min(1),
    }),

    // Statement 3 (textblock)
    defineField({
      name: 'statement3',
      title: 'Statement 3',
      type: 'array',
      of: [{ type: 'block' }],
      fieldset: 'statements',
      validation: (Rule) => Rule.required().min(1),
    }),

    // Accordion (object)
    defineField({
      name: 'accordion',
      title: 'Accordion',
      type: 'object',
      fieldset: 'accordion',
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'array',
          of: [{ type: 'block' }],
          validation: (Rule) => Rule.required().min(1),
        },

        // Exactly three subitems
        {
          name: 'items',
          title: 'Items',
          type: 'array',
          validation: (Rule) => Rule.required().min(3).max(3),
          of: [
            {
              name: 'accordionItem',
              type: 'object',
              fields: [
                {
                  name: 'heading',
                  title: 'Heading',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'subheading',
                  title: 'Subheading',
                  type: 'array',
                  of: [{ type: 'block' }],
                  validation: (Rule) => Rule.required().min(1),
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'array',
                  of: [{ type: 'block' }],
                  validation: (Rule) => Rule.required().min(1),
                },
                {
                  name: 'image',
                  title: 'Main Image',
                  type: 'image',
                  options: { hotspot: true },
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'prompt',
                  title: 'Prompt',
                  type: 'array',
                  of: [{ type: 'block' }],
                  validation: (Rule) => Rule.required().min(1),
                },

                // Inner list: exactly three items, each with Title + Body (textblocks)
                {
                  name: 'entries',
                  title: 'Entries',
                  type: 'array',
                  validation: (Rule) => Rule.required().min(3).max(3),
                  of: [
                    {
                      name: 'entry',
                      type: 'object',
                      fields: [
                        {
                          name: 'title',
                          title: 'Title',
                          type: 'array',
                          of: [{ type: 'block' }],
                          validation: (Rule) => Rule.required().min(1),
                        },
                        {
                          name: 'body',
                          title: 'Body',
                          type: 'array',
                          of: [{ type: 'block' }],
                          validation: (Rule) => Rule.required().min(1),
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],

  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'What We Do' }
    },
  },
})
