import { defineType, defineField } from 'sanity'

const insightsPage = defineType({
  name: 'insightsPage',
  title: 'Insights Page',
  type: 'document',
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
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Shareholder Value Analytics',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Text below the section title'
        },
        {
          name: 'contentText',
          title: 'Content Text',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Main content for this section'
        },
        {
          name: 'statement1',
          title: 'Statement 1',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Main content for this section'
        },
        {
          name: 'statement2',
          title: 'Statement 2',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Main content for this section'
        },

        {
          name: 'CTA1',
          title: 'CTA 1',
          type: 'string',
          description: 'Text for first CTA button'
        },
        {
          name: 'Mail1',
          title: 'Mail 1',
          type: 'string',
          description: 'Email for first CTA button'
        },
        {
          name: 'CTA2',
          title: 'CTA 2',
          type: 'string',
          description: 'Text for second CTA button'
        },
                {
          name: 'Mail2',
          title: 'Mail 2',
          type: 'string',
          description: 'Email for second CTA button'
        }

      ]
    }),
    defineField({
      name: 'mindbullets',
      title: 'Mindbullets: News From the Future',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Mindbullets: News From the Future',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Text below the section title'
        },
      ]
    }),
    defineField({
      name: 'keynotes',
      title: 'Keynotes',
      type: 'object',
      fields: [
        {
          name: 'topicSection',
          title: 'Keynote Topic Section',
          type: 'object',
          fields: [
            {
              name: 'topicSectionTitle',
              title: 'Topic Section Title',
              type: 'string',
              description: 'Heading for the keynote topics section'
            },
            {
              name: 'topicSectionSubtitle',
              title: 'Topic Section Subtitle',
              type: 'array',
              of: [{ type: 'block' }],
              description: 'Subtitle/description for the topics section'
            },
            {
              name: 'topicContentText',
              title: 'Content Text',
              type: 'array',
              of: [{ type: 'block' }],
              description: 'Main content for this section'
            },

            {
              name: 'topicCTA1',
              title: 'Topic CTA 1',
              type: 'string',
              description: 'Text for first CTA button'
            },
            {
              name: 'topicMail1',
              title: 'Topic Mail 1',
              type: 'string',
              description: 'Email for first CTA button'
            },
            {
              name: 'topicCTA2',
              title: 'Topic CTA 2',
              type: 'string',
              description: 'Text for second CTA button'
            }
          ]
        },

        {
          name: 'speakerSection',
          title: 'Keynote Speakers Section',
          type: 'object',
          fields: [
            {
              name: 'speakerSectionTitle',
              title: 'Speakers Section Title',
              type: 'string',
              description: 'Heading for the keynote speakers section'
            },
            {
              name: 'speakerSectionSubtitle',
              title: 'Speakers Section Subtitle',
              type: 'array',
              of: [{ type: 'block' }],
              description: 'Subtitle/description for the speakers section'
            },
            {
              name: 'speakerContentText',
              title: 'Content Text',
              type: 'array',
              of: [{ type: 'block' }],
              description: 'Main content for this section'
            },

            {
              name: 'speakerCTA1',
              title: 'Topic CTA 1',
              type: 'string',
              description: 'Text for first CTA button'
            },
            {
              name: 'speakerMail1',
              title: 'Topic Mail 1',
              type: 'string',
              description: 'Email for first CTA button'
            },
            {
              name: 'speakerCTA2',
              title: 'Topic CTA 2',
              type: 'string',
              description: 'Text for second CTA button'
            },
          ]
        }
      ]
    }),
    defineField({
      name: 'podcast',
      title: 'Podcast',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Podcast',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Text below the section title'
        },
      ]
    }),
    defineField({
      name: 'corporateVenturing',
      title: 'Corporate Venturing',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Corporate Venturing',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Text below the section title'
        },
        {
          name: 'contentText',
          title: 'Content Text',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Main content for this section'
        },
        {
          name: 'CTA',
          title: 'CTA',
          type: 'string',
          description: 'Text for first CTA button'
        },
        {
          name: 'Mail',
          title: 'Mail',
          type: 'string',
          description: 'Email for first CTA button'
        },
      ]
    }),
    defineField({
      name: 'theEdge',
      title: 'The Edge: Insights Driven by Disruption',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'The Edge: Insights Driven by Disruption',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Text below the section title'
        },
        {
          name: 'contentText',
          title: 'Content Text',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Main content for this section'
        },
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'pageHeader.mainTitle'
    }
  }
})

export default insightsPage
