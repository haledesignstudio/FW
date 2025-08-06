import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'provocativeScenario',
  title: 'Provocative Scenario',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
  ],
});
