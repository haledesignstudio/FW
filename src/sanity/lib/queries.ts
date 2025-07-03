import { defineQuery } from 'next-sanity';

export const speakersQuery = defineQuery(`
  *[_type == "keynoteSpeaker"] | order(name asc) {
    _id,
    name,
    bio,
    image {
      asset,
      alt
    },
    position,
    company
  }
`);