import CaseStudyView from './CaseStudyView';

type PageProps = { params: Promise<{ slug: string }> };
                  
export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;

  return <CaseStudyView slug={slug} />;
}
