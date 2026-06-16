import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'TechmireSolutions CMS',
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Site Settings').id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem().title('Homepage').id('homepage')
              .child(S.document().schemaType('homepage').documentId('homepage')),
            S.divider(),
            S.documentTypeListItem('service').title('Services'),
            S.documentTypeListItem('teamMember').title('Team Members'),
            S.documentTypeListItem('clientLogo').title('Client Logos'),
            S.documentTypeListItem('blogPost').title('Blog Posts'),
            S.documentTypeListItem('academyCourse').title('Academy Courses'),
            S.documentTypeListItem('promiseItem').title('Promise Items'),
            S.documentTypeListItem('valuePillar').title('Value Pillars'),
            S.divider(),
            S.documentTypeListItem('quoteRequest').title('Quote Requests'),
          ]),
    }),
    visionTool(),
  ],
})
