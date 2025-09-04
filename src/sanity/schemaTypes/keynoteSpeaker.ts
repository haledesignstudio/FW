import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'keynoteSpeaker',
  title: 'Keynote Speaker',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
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
      name: 'bio',
      title: 'Bio',
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
      name: 'image',
      title: 'Speaker Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'domainsOfExcellence',
      title: 'Domains of Excellence',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Select from predefined list of domains',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'x', title: 'X (Twitter)', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'youtube', title: 'YouTube', type: 'url' },
      ],
    }),
    defineField({
      name: 'mailtoSubject',
      title: 'Mailto Subject',
      type: 'string',
      description: 'Subject line for the Book Keynote mailto link',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Email address to link to',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
});