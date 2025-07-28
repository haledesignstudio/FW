import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'carouselItem',
  title: 'Carousel Item',
  type: 'document',
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
          { title: 'Podcast', value: 'podcast' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'video',
      title: 'Video File',
      type: 'file',
      options: { accept: 'video/*' },
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'podcast',
      title: 'Podcast File',
      type: 'file',
      options: { accept: 'audio/*' },
      hidden: ({ parent }) => parent?.mediaType !== 'podcast',
    }),
    defineField({
      name: 'mediaHeading',
      title: 'Media Heading',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
    }),
    defineField({
      name: 'fullPieceLink',
      title: 'Link to Full Piece',
      type: 'url',
    }),
  ],
});
