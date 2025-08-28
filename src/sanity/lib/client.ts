import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false for draft mode and real-time updates
  token: process.env.SANITY_API_READ_TOKEN,
})
