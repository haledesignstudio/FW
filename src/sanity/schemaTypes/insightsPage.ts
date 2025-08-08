import { defineType, defineField } from 'sanity'

const insightsPage = defineType({
  name: 'insightsPage',
  title: 'Insights Page',
  type: 'document',
  fieldsets: [
    { name: 'shareholder', title: 'Shareholder Value Analytics', options: { collapsible: true, collapsed: true } },
    { name: 'mindbullets', title: 'Mindbullets', options: { collapsible: true, collapsed: true } },
    { name: 'keynotes', title: 'Keynotes', options: { collapsible: true, collapsed: true } },
    { name: 'podcast', title: 'Podcast', options: { collapsible: true, collapsed: true } },
    { name: 'corporateVenturing', title: 'Corporate Venturing', options: { collapsible: true, collapsed: true } },
    { name: 'theEdge', title: 'The Edge', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Insights',
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: 'shareholderValueAnalytics',
      title: 'Shareholder Value Analytics',
      type: 'object',
      fieldset: 'shareholder',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'Shareholder Value Analytics', validation: (Rule) => Rule.required() },
        { name: 'subheading', title: 'Subheading', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() },
        { name: 'contentText', title: 'Content Text', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'CTA1', title: 'CTA 1', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'Mail1', title: 'Mail 1', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'iframeSource', title: 'iFrame Source URL', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'IQ_heading', title: 'IQ Heading', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() },
        { name: 'IQ_subheading', title: 'IQ Subheading', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'IQ_context', title: 'Context for IQ', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'CTA2', title: 'CTA 2', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'Mail2', title: 'Mail 2', type: 'string', validation: (Rule) => Rule.required() },
      ]
    }),

    defineField({
      name: 'mindbullets',
      title: 'Mindbullets: News From the Future',
      type: 'object',
      fieldset: 'mindbullets',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'Mindbullets: News From the Future', validation: (Rule) => Rule.required() },
        { name: 'subheading', title: 'Subheading', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() },
      ]
    }),

    defineField({
      name: 'keynotes',
      title: 'Keynotes',
      type: 'object',
      fieldset: 'keynotes',
      fields: [
        {
          name: 'topicSection',
          title: 'Keynote Topic Section',
          type: 'object',
          fields: [
            { name: 'topicSectionTitle', title: 'Topic Section Title', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'topicSectionSubtitle', title: 'Topic Section Subtitle', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() },
            { name: 'topicContentText', title: 'Content Text', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'topicCTA1', title: 'Topic CTA 1', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'topicMail1', title: 'Topic Mail 1', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'topicCTA2', title: 'Topic CTA 2', type: 'string', validation: (Rule) => Rule.required() },
          ]
        },
        {
          name: 'speakerSection',
          title: 'Keynote Speakers Section',
          type: 'object',
          fields: [
            { name: 'speakerSectionTitle', title: 'Speakers Section Title', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'speakerSectionSubtitle', title: 'Speakers Section Subtitle', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() },
            { name: 'speakerContentText', title: 'Content Text', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'speakerCTA1', title: 'Topic CTA 1', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'speakerMail1', title: 'Topic Mail 1', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'speakerCTA2', title: 'Topic CTA 2', type: 'string', validation: (Rule) => Rule.required() },
          ]
        }
      ]
    }),

    defineField({
      name: 'podcast',
      title: 'Podcast',
      type: 'object',
      fieldset: 'podcast',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'Podcast', validation: (Rule) => Rule.required() },
        { name: 'subheading', title: 'Subheading', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() },
      ]
    }),

    defineField({
      name: 'corporateVenturing',
      title: 'Corporate Venturing',
      type: 'object',
      fieldset: 'corporateVenturing',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'Corporate Venturing', validation: (Rule) => Rule.required() },
        { name: 'subheading', title: 'Subheading', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() },
        { name: 'contentText', title: 'Content Text', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'CTA', title: 'CTA', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'Mail', title: 'Mail', type: 'string', validation: (Rule) => Rule.required() },
      ]
    }),

    defineField({
      name: 'theEdge',
      title: 'The Edge: Insights Driven by Disruption',
      type: 'object',
      fieldset: 'theEdge',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'The Edge: Insights Driven by Disruption', validation: (Rule) => Rule.required() },
        { name: 'subheading', title: 'Subheading', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() },
        { name: 'contentText', title: 'Content Text', type: 'string', validation: (Rule) => Rule.required() },
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'pageHeader.mainTitle'
    }
  }
})

export default insightsPage
