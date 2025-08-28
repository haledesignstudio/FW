import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { defineQuery } from 'next-sanity';

export const runtime = 'edge';

type ArticlePdfDoc = {
  title: string;
  pdfUrl?: string | null;
};

const articlePdfQuery = defineQuery(`
  *[_type == "article" && slug.current == $slug][0]{
    title,
    "pdfUrl": pdfUpload.asset->url
  }
`);

type RouteParams = { slug: string };

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }   
) {
  const { slug } = await params;                

  const data = await client.fetch<ArticlePdfDoc | null>(articlePdfQuery, { slug });
  if (!data?.pdfUrl) {
    return new NextResponse('PDF not found', { status: 404 });
  }

  const url = new URL(request.url);
  const forceDownload = url.searchParams.get('download') === '1';

  const upstream = await fetch(data.pdfUrl);
  if (!upstream.ok || !upstream.body) {
    return new NextResponse('PDF not found on CDN', { status: 404 });
  }

  const cleanTitle = (data.title || 'document')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const res = new NextResponse(upstream.body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `${forceDownload ? 'attachment' : 'inline'}; filename="${cleanTitle}.pdf"`,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });

  const len = upstream.headers.get('content-length');
  if (len) res.headers.set('Content-Length', len);

  return res;
}
