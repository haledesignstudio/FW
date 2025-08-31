import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'

// Export the handler provided by next-sanity which enables draft mode and
// redirects back to the requested preview URL. The Presentation tool will
// call this endpoint to set the app into preview/draft mode.
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
})

// import { NextRequest, NextResponse } from 'next/server';
// import { client } from '@/sanity/lib/client'; // Adjust the path to your Sanity client

// export async function GET(req: NextRequest) {
//   try {
//     console.log('Request received:', req);

//     const { searchParams } = new URL(req.url);
//     const slug = searchParams.get('slug');
//     const type = searchParams.get('type');

//     if (!slug || !type) {
//       // If no slug or type is provided, redirect to the home page
//       return NextResponse.redirect(new URL('/', req.url));
//     }

//     // Fetch the document with the given slug and type
//     const document = await client.fetch(
//       `*[_type == $type && slug.current == $slug][0]`,
//       { type, slug }
//     );

//     if (document) {
//       // Redirect to the document's slug-based route based on type
//       let location = '/';
//       switch (type) {
//         case 'mindbullet':
//           location = `/mindbullets/${document.slug.current}`;
//           break;
//         case 'article':
//           location = `/insights/${document.slug.current}`;
//           break;
//         case 'podcast':
//           location = `/podcast/${document.slug.current}`;
//           break;
//         case 'provocativeScenarios':
//           location = `/the-edge/${document.slug.current}`;
//           break;
//         case 'keynoteSpeaker':
//           location = `/keynotes/${document.slug.current}`;
//           break;
//         case 'caseStudy':
//           location = `/case-study/${document.slug.current}`;
//           break;
//         default:
//           location = '/';
//       }
//       return NextResponse.redirect(new URL(location, req.url));
//     } else {
//       // If no document is found, redirect to the home page
//       return NextResponse.redirect(new URL('/', req.url));
//     }
//   } catch (error) {
//     console.error('Error in GET handler:', error);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }