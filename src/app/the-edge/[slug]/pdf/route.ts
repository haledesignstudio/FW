import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { defineQuery } from 'next-sanity';

type ScenarioPdfDoc = {
  title: string;
  pdfMobileUrl?: string | null;
  pdfDesktopUrl?: string | null;
};

const scenarioQuery = defineQuery(`
  *[_type == "provocativeScenario" && slug.current == $slug][0]{
    title,
    "pdfMobileUrl": pdfMobile.asset->url,
    "pdfDesktopUrl": pdfDesktop.asset->url
  }
`);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> } // <- Promise per your generated types
) {
  const { slug } = await params;

  const url = new URL(request.url);
  const device = (url.searchParams.get('device') ?? 'desktop') as 'mobile' | 'desktop';

  const data = await client.fetch<ScenarioPdfDoc | null>(scenarioQuery, { slug });
  if (!data) return new NextResponse('PDF not found', { status: 404 });

  const pdfUrl = device === 'mobile' ? data.pdfMobileUrl : data.pdfDesktopUrl;
  if (!pdfUrl) return new NextResponse('PDF not available for this device', { status: 404 });

  try {
    const pdfResponse = await fetch(pdfUrl);
    if (!pdfResponse.ok) return new NextResponse('PDF not found on CDN', { status: 404 });

    const pdfBuffer = await pdfResponse.arrayBuffer();
    const cleanTitle = (data.title || 'document')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${cleanTitle}-${device}.pdf"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': String(pdfBuffer.byteLength),
      },
    });
  } catch (err) {
    console.error('Error fetching PDF:', err);
    return new NextResponse('Error loading PDF', { status: 500 });
  }
}
