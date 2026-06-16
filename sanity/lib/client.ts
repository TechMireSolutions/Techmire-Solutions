import { createClient } from 'next-sanity'

const rawId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
// Use 'placeholder' only if the env var is missing or still a placeholder string
const projectId = /^[a-z0-9][a-z0-9-]{3,}$/.test(rawId) ? rawId : 'placeholder'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})
