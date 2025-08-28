import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'

// Export the handler provided by next-sanity which enables draft mode and
// redirects back to the requested preview URL. The Presentation tool will
// call this endpoint to set the app into preview/draft mode.
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
})