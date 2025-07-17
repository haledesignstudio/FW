import { defineType, defineField } from 'sanity'
// default case study schema for now while we wait to migrate the content from FW site
const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Case study Title (row 1, cols 1-4)'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
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
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      description: 'Subheading (row 1, cols 5-6, right aligned)'
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Case study heading (row 3, cols 1-3)'
    }),
    defineField({
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      description: 'Abstract (row 3, cols 5-6)'
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main image (rows 4-5, cols 1-6)'
    }),
    defineField({
      name: 'concept',
      title: 'The Concept',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Section 1: The Concept (col 1)'
    }),
    defineField({
      name: 'methodology',
      title: 'Methodology and Execution',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Section 2: Methodology and Execution (col 2)'
    }),
    defineField({
      name: 'impact',
      title: 'Impact and Outcome',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Section 3: Impact and Outcome (col 3)'
    }),
    defineField({
      name: 'transformation',
      title: 'Transformation Potential',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Section 4: Transformation Potential (col 4)'
    }),
    defineField({
      name: 'conclusion',
      title: 'Conclusion',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Section 5: Conclusion (col 5)'
    }),
    
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client.name',
      media: 'media.heroImage'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title,
        subtitle: subtitle ? `Client: ${subtitle}` : undefined,
        media
      }
    }
  }
})

export default caseStudy
