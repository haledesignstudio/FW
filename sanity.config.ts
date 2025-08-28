'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {colorInput} from '@sanity/color-input'
import {presentationTool} from 'sanity/presentation'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    // Color input plugin for color picker fields
    colorInput(),
    // Presentation tool for live preview
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: `${process.env.CF_PAGES_URL || 'https://fw-hale.pages.dev/'}/api/draft-mode/enable`,
        },
        origin: process.env.CF_PAGES_URL || 'https://fw-hale.pages.dev/',
      },
      // presentationTool({
      // previewUrl: {
      //   previewMode: {
      //     enable: 'https://hale-fw.netlify.app/api/draft-mode/enable',
      //   },
      //   origin: 'https://hale-fw.netlify.app',
      // },
      resolve: {
        mainDocuments: [
          {
            route: '/',
            filter: `_type == "homePage"`,
          },
          {
            route: '/our-work',
            filter: `_type == "ourWorkPage"`,
          },
          {
            route: '/what-we-do',
            filter: `_type == "whatWeDoPage"`,
          },
          {
            route: '/people',
            filter: `_type == "peoplePage"`,
          },
          {
            route: '/insights',
            filter: `_type == "insightsPage"`,
          },
          {
            route: '/contact',
            filter: `_type == "contactPage"`,
          },
          {
            route: '/faq',
            filter: `_type == "faqPage"`,
          },
          {
            route: '/privacy-policy',
            filter: `_type == "privacyPolicyPage"`,
          },
          {
            route: '/terms-conditions',
            filter: `_type == "termsAndConditionsPage"`,
          },
          {
            route: '/supercharge-tomorrow',
            filter: `_type == "superchargeTomorrowPage"`,
          },
          {
            route: '/case-study/[slug]',
            filter: `_type == "caseStudy" && defined(slug.current)`,
          },
        ],
      },
    }),
  ],
})
