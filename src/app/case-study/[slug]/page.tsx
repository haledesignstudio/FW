import CaseStudyView from './CaseStudyView';

export const runtime = 'edge';

type PageProps = { params: Promise<{ slug: string }> };
                  
export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;

  return <CaseStudyView slug={slug} />;
}
