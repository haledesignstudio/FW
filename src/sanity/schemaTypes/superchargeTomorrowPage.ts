import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'superchargeTomorrowPage',
    title: 'Supercharge Tomorrow Page',
    type: 'document',

    fieldsets: [
        { name: 'intro', title: 'Intro', options: { collapsible: true, collapsed: false } },
        { name: 'accordionSection1', title: 'Accordion Section 1', options: { collapsible: true, collapsed: false } },
        { name: 'accordionSection2', title: 'Accordion Section 2', options: { collapsible: true, collapsed: false } },
        { name: 'accordionSection3', title: 'Accordion Section 3', options: { collapsible: true, collapsed: false } },
    ],

    fields: [
        // Title
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            fieldset: 'intro',
            validation: (Rule) => Rule.required(),
        }),

        // Heading
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            fieldset: 'intro',
            validation: (Rule) => Rule.required(),
        }),

        // Subheading (textblock)
        defineField({
            name: 'subheading',
            title: 'Subheading',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                    ]
                }
            ],
            fieldset: 'intro',
            validation: (Rule) => Rule.required().min(1),
        }),

        /**
         * Accordion Section 1
         */
        defineField({
            name: 'accordionSection1',
            title: 'Accordion Section 1',
            type: 'object',
            fieldset: 'accordionSection1',
            fields: [
                defineField({
                    name: 'heading',
                    title: 'Heading',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'subheading',
                    title: 'Subheading',
                    type: 'array',
                    of: [
                        {
                            type: 'block',
                            styles: [
                                { title: 'Normal', value: 'normal' },
                            ]
                        }
                    ],
                    validation: (Rule) => Rule.required().min(1),
                }),
                defineField({
                    name: 'description',
                    title: 'Description',
                    type: 'array',
                    of: [
                        {
                            type: 'block',
                            styles: [
                                { title: 'Normal', value: 'normal' },
                            ]
                        }
                    ],
                    validation: (Rule) => Rule.required().min(1),
                }),
                defineField({
                    name: 'image',
                    title: 'Image',
                    type: 'image',
                    options: { hotspot: true },
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'cta',
                    title: 'CTA',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'email',
                    title: 'Email',
                    type: 'string',
                    validation: (Rule) =>
                        Rule.required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
                            name: 'email',
                            invert: false,
                        }),
                }),

                // Statements: exactly 4 items, each with Body (textblock)
                defineField({
                    name: 'statements',
                    title: 'Statements',
                    type: 'array',
                    validation: (Rule) => Rule.required().min(4).max(4),
                    of: [
                        defineField({
                            name: 'statement',
                            title: 'Statement',
                            type: 'object',
                            fields: [
                                defineField({
                                    name: 'body',
                                    title: 'Body',
                                    type: 'array',
                                    of: [
                                        {
                                            type: 'block',
                                            styles: [
                                                { title: 'Normal', value: 'normal' },
                                            ]
                                        }
                                    ],
                                    validation: (Rule) => Rule.required().min(1),
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        }),

        /**
         * Accordion Section 2
         */
        defineField({
            name: 'accordionSection2',
            title: 'Accordion Section 2',
            type: 'object',
            fieldset: 'accordionSection2',
            fields: [
                defineField({
                    name: 'heading',
                    title: 'Heading',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'subheading',
                    title: 'Subheading',
                    type: 'array',
                    of: [
                        {
                            type: 'block',
                            styles: [
                                { title: 'Normal', value: 'normal' },
                            ]
                        }
                    ],
                    validation: (Rule) => Rule.required().min(1),
                }),
                defineField({
                    name: 'cta',
                    title: 'CTA',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'email',
                    title: 'Email',
                    type: 'string',
                    validation: (Rule) =>
                        Rule.required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
                            name: 'email',
                            invert: false,
                        }),
                }),

                // Subset: Section 1
                defineField({
                    name: 'section1',
                    title: 'Section 1',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'description',
                            title: 'Description',
                            type: 'array',
                            of: [
                                {
                                    type: 'block',
                                    styles: [
                                        { title: 'Normal', value: 'normal' },
                                    ]
                                }
                            ],
                            validation: (Rule) => Rule.required().min(1),
                        }),
                        defineField({
                            name: 'statements',
                            title: 'Statements',
                            type: 'array',
                            validation: (Rule) => Rule.required().min(3).max(3),
                            of: [
                                defineField({
                                    name: 'statement',
                                    title: 'Statement',
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'heading',
                                            title: 'Heading',
                                            type: 'array',
                                            of: [
                                                {
                                                    type: 'block',
                                                    styles: [
                                                        { title: 'Normal', value: 'normal' },
                                                    ]
                                                }
                                            ],
                                            validation: (Rule) => Rule.required().min(1),
                                        }),
                                        defineField({
                                            name: 'body',
                                            title: 'Body',
                                            type: 'array',
                                            of: [
                                                {
                                                    type: 'block',
                                                    styles: [
                                                        { title: 'Normal', value: 'normal' },
                                                    ]
                                                }
                                            ],
                                            validation: (Rule) => Rule.required().min(1),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),

                // Subset: Section 2
                defineField({
                    name: 'section2',
                    title: 'Section 2',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'description',
                            title: 'Description',
                            type: 'array',
                            of: [
                                {
                                    type: 'block',
                                    styles: [
                                        { title: 'Normal', value: 'normal' },
                                    ]
                                }
                            ],
                            validation: (Rule) => Rule.required().min(1),
                        }),
                        defineField({
                            name: 'statements',
                            title: 'Statements',
                            type: 'array',
                            validation: (Rule) => Rule.required().min(2).max(2),
                            of: [
                                defineField({
                                    name: 'statement',
                                    title: 'Statement',
                                    type: 'object',
                                    fields: [
                                        defineField({
                                            name: 'heading',
                                            title: 'Heading',
                                            type: 'array',
                                            of: [
                                                {
                                                    type: 'block',
                                                    styles: [
                                                        { title: 'Normal', value: 'normal' },
                                                    ]
                                                }
                                            ],
                                            validation: (Rule) => Rule.required().min(1),
                                        }),
                                        defineField({
                                            name: 'body',
                                            title: 'Body',
                                            type: 'array',
                                            of: [
                                                {
                                                    type: 'block',
                                                    styles: [
                                                        { title: 'Normal', value: 'normal' },
                                                    ]
                                                }
                                            ],
                                            validation: (Rule) => Rule.required().min(1),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        }),

        /**
         * Accordion Section 3
         */
        defineField({
            name: 'accordionSection3',
            title: 'Accordion Section 3',
            type: 'object',
            fieldset: 'accordionSection3',
            fields: [
                defineField({
                    name: 'heading',
                    title: 'Heading',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'subheading',
                    title: 'Subheading',
                    type: 'array',
                    of: [
                        {
                            type: 'block',
                            styles: [
                                { title: 'Normal', value: 'normal' },
                            ]
                        }
                    ],
                    validation: (Rule) => Rule.required().min(1),
                }),
                defineField({
                    name: 'description',
                    title: 'Description',
                    type: 'array',
                    of: [
                        {
                            type: 'block',
                            styles: [
                                { title: 'Normal', value: 'normal' },
                            ]
                        }
                    ],
                    validation: (Rule) => Rule.required().min(1),
                }),
                defineField({
                    name: 'image',
                    title: 'Image',
                    type: 'image',
                    options: { hotspot: true },
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'cta',
                    title: 'CTA',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'email',
                    title: 'Email',
                    type: 'string',
                    validation: (Rule) =>
                        Rule.required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
                            name: 'email',
                            invert: false,
                        }),
                }),
            ],
        }),
    ],

    preview: {
        prepare() {
            return { title: 'Supercharge Tomorrow Page' }
        },
    },

})
