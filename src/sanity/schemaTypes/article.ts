import { defineType, defineField } from 'sanity'

type ValidationCtx = {
  document?: {
    hasPdf?: boolean
    hasAuthor?: boolean
    hasRelatedStories?: boolean
  }
}

const RICH_TEXT_OF = [
  {
    type: 'block',
    styles: [
      { title: 'Normal', value: 'normal' },
    ],
    marks: {
      decorators: [
        { title: 'Strong', value: 'strong' },
        { title: 'Emphasis', value: 'em' },
        { title: 'Underline', value: 'underline' },
      ],
      annotations: [
        {
          name: 'link',
          type: 'object',
          title: 'Link',
          fields: [
            { name: 'href', type: 'url', title: 'URL' },
            { name: 'openInNewTab', type: 'boolean', title: 'Open in new tab' },
          ],
        },
      ],
    },
  },
  { type: 'image', options: { hotspot: true } },
  {
    name: 'embed',
    title: 'Embed',
    type: 'object',
    fields: [
      { name: 'title', type: 'string', title: 'Title' },
      {
        name: 'provider',
        type: 'string',
        title: 'Provider',
        options: {
          list: ['YouTube', 'Vimeo', 'SoundCloud', 'Spotify', 'Other'],
          layout: 'dropdown',
        },
      },
      {
        name: 'url',
        type: 'url',
        title: 'URL',
        description: 'Paste the share/embed URL',
      },
    ],
    preview: { select: { title: 'title', subtitle: 'provider' } },
  },
]

const article = defineType({
  name: 'article',
  title: 'Article',
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
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'byline',
      title: 'Byline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'datePublished',
      title: 'Date Published',
      type: 'string',
      description: 'e.g. 04 July 2022',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: RICH_TEXT_OF,
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'hasPdf',
      title: 'Does this article have a pdf version?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'pdfUpload',
      title: 'PDF Upload',
      type: 'file',
      options: { accept: 'application/pdf' },
      hidden: ({ document }) => !document?.hasPdf,
      validation: (Rule) =>
        Rule.custom((file, ctx) => {
          const hasPdf = (ctx as ValidationCtx).document?.hasPdf
          if (hasPdf && !file) return 'PDF is required when this section is enabled.'
          return true
        }),
    }),

    defineField({
      name: 'hasAuthor',
      title: 'Does this article have a notable author?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      hidden: ({ document }) => !document?.hasAuthor,
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const enabled = (ctx as ValidationCtx).document?.hasAuthor
          if (enabled && !val) return 'Author Name is required.'
          return true
        }),
    }),
    defineField({
      name: 'authorPosition',
      title: 'Author Position',
      type: 'string',
      hidden: ({ document }) => !document?.hasAuthor,
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const enabled = (ctx as ValidationCtx).document?.hasAuthor
          if (enabled && !val) return 'Author Position is required.'
          return true
        }),
    }),
    defineField({
      name: 'authorBio',
      title: 'Author Bio',
      type: 'array',
      of: RICH_TEXT_OF,
      hidden: ({ document }) => !document?.hasAuthor,
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const enabled = (ctx as ValidationCtx).document?.hasAuthor
          if (enabled && (!Array.isArray(val) || val.length === 0)) {
            return 'Author Bio is required.'
          }
          return true
        }),
    }),
    defineField({
      name: 'authorImage',
      title: 'Author Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => !document?.hasAuthor,
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const enabled = (ctx as ValidationCtx).document?.hasAuthor
          if (enabled && !val) return 'Author Image is required.'
          return true
        }),
    }),
    defineField({
      name: 'authorLinkedin',
      title: 'Author LinkedIn',
      type: 'url',
      hidden: ({ document }) => !document?.hasAuthor,
      validation: (Rule) =>
        Rule.custom((val: string | undefined, ctx) => {
          const enabled = (ctx as ValidationCtx).document?.hasAuthor
          if (!enabled) return true
          if (!val) return 'Author LinkedIn is required.'
          try {
            const u = new URL(val)
            if (!['http:', 'https:'].includes(u.protocol)) return 'Invalid URL scheme.'
          } catch {
            return 'Enter a valid URL.'
          }
          return true
        }),
    }),

    defineField({
      name: 'hasRelatedStories',
      title: 'Does this article have any related stories to include?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'relatedStories',
      title: 'Related Stories',
      type: 'array',
      hidden: ({ document }) => !document?.hasRelatedStories,
      of: [
        {
          type: 'object',
          name: 'relatedStory',
          title: 'Related Story',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              title: 'Link',
              type: 'url',
              validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
            },
          ],
          preview: { select: { title: 'title', subtitle: 'link' } },
        },
      ],
      validation: (Rule) =>
        Rule.custom((arr, ctx) => {
          const enabled = (ctx as ValidationCtx).document?.hasRelatedStories
          if (!enabled) return true
          if (!Array.isArray(arr) || arr.length === 0) {
            return 'Add at least one related story.'
          }
          return true
        }),
    }),
    defineField({
      name: 'corporate',
      title: 'Should this article be included on the Corporate Venturing page?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'video',
      title: 'Does this article contain a video?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})

export default article
