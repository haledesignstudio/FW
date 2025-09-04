import { defineType, defineField } from 'sanity'

const ourWorkPage = defineType({
  name: 'ourWorkPage',
  title: 'Our Work Page',
  type: 'document',
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // Subheading (Portable Text)
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

    // Statistics (Exactly 5 items)
    defineField({
      name: 'statistics',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          name: 'statItem',
          type: 'object',
          fields: [
            {
              name: 'statisticName',
              title: 'Statistic Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'statisticValue',
              title: 'Statistic Value',
              type: 'string', // change to 'number' if you want numeric-only
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(5).max(5),
    }),

    // Testimonials
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          name: 'testimonial',
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
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
            },
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'jobTitle',
              title: 'Job Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'company',
              title: 'Company',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // Partners
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [
        {
          name: 'partner',
          type: 'object',
          fields: [
            {
              name: 'partnerName',
              title: 'Partner Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'partnerImage',
              title: 'Partner Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // Accordion Section 1
    defineField({
      name: 'accordionSection1',
      title: 'Accordion Section 1',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
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
          validation: (Rule) => Rule.required().min(1),
        },
        {
          name: 'mainImage',
          title: 'Main Image',
          type: 'image',
          options: { hotspot: true },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'brandImage',
          title: 'Brand Image',
          type: 'image',
          options: { hotspot: true },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'cta',
          title: 'CTA',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Accordion Section 2
    defineField({
      name: 'accordionSection2',
      title: 'Accordion Section 2',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
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
          validation: (Rule) => Rule.required().min(1),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})

export default ourWorkPage
