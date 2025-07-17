import { defineType, defineField } from 'sanity'

const ourWorkPage = defineType({
  name: 'ourWorkPage',
  title: 'Our Work Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Our Work',
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
      name: 'mainTitle',
      title: 'Main Title',
      type: 'string',
      description: 'Main page heading',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'Description text below the main title'
    }),
    defineField({
      name: 'stats',
      title: 'Statistics Section',
      type: 'object',
      fields: [
        {
          name: 'corporatePartners',
          title: 'Corporate Partners',
          type: 'number',
          validation: (Rule) => Rule.required().integer().min(0)
        },
        {
          name: 'gameChangingOpportunities',
          title: 'Game Changing Opportunities',
          type: 'number',
          validation: (Rule) => Rule.required().integer().min(0)
        },
        {
          name: 'valuePropositions',
          title: 'Value Propositions',
          type: 'number',
          validation: (Rule) => Rule.required().integer().min(0)
        },
        {
          name: 'investmentCases',
          title: 'Investment Cases',
          type: 'number',
          validation: (Rule) => Rule.required().integer().min(0)
        },
        {
          name: 'newVenturesInCommercialisation',
          title: 'New Ventures in Commercialisation',
          type: 'number',
          validation: (Rule) => Rule.required().integer().min(0)
        }
      ]
    }),
    defineField({
      name: 'statLabels',
      title: 'Statistics Labels',
      type: 'object',
      description: 'Custom labels for the statistics',
      fields: [
        {
          name: 'corporatePartnersLabel',
          title: 'Corporate Partners Label',
          type: 'string',
          initialValue: 'Corporate Partners'
        },
        {
          name: 'gameChangingOpportunitiesLabel',
          title: 'Game Changing Opportunities Label',
          type: 'string',
          initialValue: 'Game Changing Opportunities'
        },
        {
          name: 'valuePropositionsLabel',
          title: 'Value Propositions Label',
          type: 'string',
          initialValue: 'Value Propositions'
        },
        {
          name: 'investmentCasesLabel',
          title: 'Investment Cases Label',
          type: 'string',
          initialValue: 'Investment Cases'
        },
        {
          name: 'newVenturesInCommercialisationLabel',
          title: 'New Ventures in Commercialisation Label',
          type: 'string',
          initialValue: 'New Ventures in Commercialisation'
        }
      ]
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Testimonial Quote',
              type: 'text',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'clientName',
              title: 'Client Name',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'clientTitle',
              title: 'Client Title/Position',
              type: 'string'
            },
            {
              name: 'company',
              title: 'Company',
              type: 'string',
              validation: (Rule) => Rule.required()
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'partneredBrands',
      title: 'Partnered Brands',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'brandName',
              title: 'Brand Name',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'brandLogo',
              title: 'Brand Logo',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: (Rule) => Rule.required()
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'accordion',
      title: '3-Layer Accordion',
      type: 'array',
      validation: (Rule) => Rule.max(3),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Accordion Heading',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'text',
              title: 'Accordion Text',
              type: 'text',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'image',
              title: 'Accordion Image',
              type: 'image',
              options: {
                hotspot: true
              },
              validation: (Rule) => Rule.required()
            },
            {
              name: 'color',
              title: 'Background Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Light Beige', value: '#F9F7F2' },
                  { title: 'Red', value: '#DC5A50' },
                  { title: 'Dark Grey', value: '#232323' },
                  { title: 'White', value: '#FFFFFF' },
                  { title: 'Black', value: '#000000' }
                ],
                layout: 'radio'
              },
              validation: (Rule) => Rule.required(),
              initialValue: '#F9F7F2'
            }
          ]
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'mainTitle'
    }
  }
})

export default ourWorkPage
