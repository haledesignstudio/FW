export const runtime = 'edge';

import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function GET(req: NextRequest) {
  // optional: validate a secret query param to avoid abuse
  // const secret = new URL(req.url).searchParams.get('secret');
  // if (secret !== process.env.REVALIDATE_SECRET) return NextResponse.json({ ok: false }, { status: 401 });

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

    // Revalidate based on document type
    switch (body._type) {
      case 'homePage':
        revalidateTag('homePage')
        revalidatePath('/')
        break
      case 'ourWorkPage':
        revalidateTag('ourWorkPage')
        revalidatePath('/our-work')
        break
      case 'whatWeDoPage':
        revalidateTag('whatWeDoPage')
        revalidatePath('/what-we-do')
        break
      case 'peoplePage':
        revalidateTag('peoplePage')
        revalidatePath('/people')
        break
      case 'insightsPage':
        revalidateTag('insightsPage')
        revalidatePath('/insights')
        break
      case 'contactPage':
        revalidateTag('contactPage')
        revalidatePath('/contact')
        break
      case 'caseStudy':
        revalidateTag('caseStudy')
        if (body.slug?.current) {
          revalidatePath(`/case-study/${body.slug.current}`)
        }
        break
      default:
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
