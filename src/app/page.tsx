import { sanityFetch } from '@/sanity/lib/fetch';
import { homePageQuery } from '@/sanity/lib/queries';
import HomeClient, { type HomePageContent } from './home-client';

export default async function HomePage() {
  try {
    const response = await sanityFetch<HomePageContent>({
      query: homePageQuery,
      tags: ['homePage']
    });

    if (!response.data) {
      return (
        <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center">
          <div className="text-2xl">No homepage data available</div>
        </div>
      );
    }

    return <HomeClient data={response.data} />;
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return (
      <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center">
        <div className="text-2xl">Error loading homepage data</div>
      </div>
    );
  }
}
