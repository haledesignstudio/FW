export const runtime = 'edge';

import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function GET(req: NextRequest) {
  // optional: validate a secret query param to avoid abuse
  const secret = new URL(req.url).searchParams.get('secret');
  if (secret !== process.env.REVALIDATE_SECRET) return NextResponse.json({ ok: false }, { status: 401 });

  // perform any revalidation logic you need (or simply return OK)
  return NextResponse.json({ ok: true });
}

type WebhookPayload = {
  _type: string
  _id: string
  slug?: {
    current: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<WebhookPayload>(
      request,
      process.env.SANITY_REVALIDATE_SECRET,
    )

    // Validate the webhook signature in production
    if (process.env.NODE_ENV === 'production' && !isValidSignature) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!body?._type) {
      return new NextResponse('Bad Request', { status: 400 })
    }

    // Revalidate based on document type using a mapping to keep this maintainable.
    // Add new page types here if you create more top-level pages in the app.
    const typeToRoute: Record<string, { tag: string; path?: string; dynamic?: boolean }> = {
      homePage: { tag: 'homePage', path: '/' },
      ourWorkPage: { tag: 'ourWorkPage', path: '/our-work' },
      whatWeDoPage: { tag: 'whatWeDoPage', path: '/what-we-do' },
      peoplePage: { tag: 'peoplePage', path: '/people' },
      insightsPage: { tag: 'insightsPage', path: '/insights' },
      contactPage: { tag: 'contactPage', path: '/contact' },
      faqPage: { tag: 'faqPage', path: '/faq' },
      privacyPolicyPage: { tag: 'privacyPolicyPage', path: '/privacy-policy' },
      termsAndConditionsPage: { tag: 'termsAndConditionsPage', path: '/terms-conditions' },
      superchargeTomorrowPage: { tag: 'superchargeTomorrowPage', path: '/supercharge-tomorrow' },
      corporateVenturingPage: { tag: 'corporateVenturingPage', path: '/corporate-venturing' },
      keynotesPage: { tag: 'keynotesPage', path: '/keynotes' },
      mindbulletsPage: { tag: 'mindbulletsPage', path: '/mindbullets' },
      podcastPage: { tag: 'podcastPage', path: '/podcast' },
      theEdgePage: { tag: 'theEdgePage', path: '/the-edge' },
      caseStudy: { tag: 'caseStudy', dynamic: true },
    }

    const mapping = typeToRoute[body._type]

    if (mapping) {
      revalidateTag(mapping.tag)

      if (mapping.dynamic) {
        if (body.slug?.current) {
          revalidatePath(`/case-study/${body.slug.current}`)
        }
      } else if (mapping.path) {
        revalidatePath(mapping.path)
      }
    } else {
      // Revalidate all pages for unknown types
      revalidateTag('content')
      revalidatePath('/')
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
