import { defineType, defineField } from 'sanity'

const mindbulletsArchive = defineType({
  name: 'mindbulletsArchive',
  title: 'Mindbullets Archive',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Archive Title',
      type: 'string',
      initialValue: 'Mindbullets Archive',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Archive Description',
      type: 'text',
      description: 'Description of what the Mindbullets archive contains'
    }),
    defineField({
      name: 'categories',
      title: 'Archive Categories',
      type: 'array',
      description: 'Categories for organizing Mindbullets',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Category Name',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'slug',
              title: 'Category Slug',
              type: 'slug',
              options: {
                source: 'name',
                maxLength: 96
              },
              validation: (Rule) => Rule.required()
            },
            {
              name: 'description',
              title: 'Category Description',
              type: 'text'
            },
            {
              name: 'color',
              title: 'Category Color',
              type: 'color',
              options: {
                disableAlpha: true
              }
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'yearRanges',
      title: 'Year Ranges',
      type: 'array',
      description: 'Year ranges for filtering Mindbullets',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Range Label',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'startYear',
              title: 'Start Year',
              type: 'number',
              validation: (Rule) => Rule.required().integer()
            },
            {
              name: 'endYear',
              title: 'End Year',
              type: 'number',
              validation: (Rule) => Rule.required().integer()
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'featuredMindbullets',
      title: 'Featured Mindbullets',
      type: 'array',
      description: 'Mindbullets to feature prominently in the archive',
      of: [
        {
          type: 'reference',
          to: [{ type: 'mindbullet' }]
        }
      ],
      validation: (Rule) => Rule.max(10)
    }),
    defineField({
      name: 'archiveSettings',
      title: 'Archive Display Settings',
      type: 'object',
      fields: [
        {
          name: 'itemsPerPage',
          title: 'Items Per Page',
          type: 'number',
          initialValue: 20,
          validation: (Rule) => Rule.required().integer().positive()
        },
        {
          name: 'defaultSortOrder',
          title: 'Default Sort Order',
          type: 'string',
          options: {
            list: [
              { title: 'Newest First', value: 'newest' },
              { title: 'Oldest First', value: 'oldest' },
              { title: 'Most Popular', value: 'popular' },
              { title: 'Alphabetical', value: 'alphabetical' }
            ]
          },
          initialValue: 'newest'
        },
        {
          name: 'showFilters',
          title: 'Show Category Filters',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'showSearch',
          title: 'Show Search Functionality',
          type: 'boolean',
          initialValue: true
        }
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          validation: (Rule) => Rule.max(160)
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    }
  }
})

export default mindbulletsArchive
