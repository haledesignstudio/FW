import { defineType, defineField } from 'sanity'

/**
 * Shared rich text config: blocks + images + simple embeds
 * Render the `embed` object in your front-end PortableText components.
 */
const RICH_TEXT_OF = [
  {
    type: 'block',
    styles: [
      { title: 'Normal', value: 'normal' },
      { title: 'H1', value: 'h1' },
      { title: 'H2', value: 'h2' },
      { title: 'H3', value: 'h3' },
      { title: 'Quote', value: 'blockquote' },
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
    // Simple rich media embed
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
    preview: {
      select: { title: 'title', subtitle: 'provider' },
    },
  },
]

const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    // Core
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
    }),
    defineField({
      name: 'datePublished',
      title: 'Date Published',
      type: 'string',
      description: 'e.g. 2025-08-19',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),

    // Rich text body (images + embeds supported)
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: RICH_TEXT_OF,
    }),

    // File download
    defineField({
      name: 'pdfUpload',
      title: 'PDF Upload',
      type: 'file',
      options: { accept: 'application/pdf' },
    }),
    // Author (now a main section, always visible)
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
    }),
    defineField({
      name: 'authorPosition',
      title: 'Author Position',
      type: 'string',
    }),
    defineField({
      name: 'authorBio',
      title: 'Author Bio',
      type: 'array',
      of: RICH_TEXT_OF,
    }),
    defineField({
      name: 'authorImage',
      title: 'Author Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'authorLinkedin',
      title: 'Author LinkedIn',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),

    // Optional Linked Video
    defineField({
      name: 'hasLinkedVideo',
      title: 'Does this article have any videos you would like to link to?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'linkedVideoTitle',
      title: 'Linked Video Title',
      type: 'string',
      hidden: ({ document }) => !document?.hasLinkedVideo,
    }),
    defineField({
      name: 'linkedVideoSubheading',
      title: 'Linked Video Subheading',
      type: 'string',
      hidden: ({ document }) => !document?.hasLinkedVideo,
    }),
    defineField({
      name: 'linkedVideoDescription',
      title: 'Linked Video Description',
      type: 'array',
      of: RICH_TEXT_OF,
      hidden: ({ document }) => !document?.hasLinkedVideo,
    }),
    defineField({
      name: 'linkedVideoImage',
      title: 'Linked Video Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => !document?.hasLinkedVideo,
    }),
    defineField({
      name: 'linkedVideoLink',
      title: 'Linked Video Link',
      type: 'url',
      hidden: ({ document }) => !document?.hasLinkedVideo,
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'byline',
      media: 'image',
    },
  },
})

export default article
