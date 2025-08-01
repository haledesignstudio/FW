// import { client } from '@/sanity/lib/client';
// import { speakersQuery } from '@/sanity/lib/queries';
// import { Speaker } from '@/types/speaker';
import CircularTextSlider from '@/components/CircularTextSlider';

export const revalidate = 60; // Revalidate every minute

// Type for the Sanity query result
// type SanityKeynoteSpeaker = {
//   _id: string;
//   name: string | null;
//   bio: string | null;
//   image: {
//     asset: {
//       _ref: string;
//       _type: 'reference';
//     } | null;
//     alt: string | null;
//   } | null;
//   position: string | null;
//   company: string | null;
// };

// async function getSpeakers(): Promise<Speaker[]> {
//   try {
//     const speakers = await client.fetch<SanityKeynoteSpeaker[]>(speakersQuery);
//     // Transform the Sanity data to match Speaker type, handling null values
//     return speakers?.map((speaker: SanityKeynoteSpeaker) => ({
//       _id: speaker._id,
//       name: speaker.name || 'Unknown Speaker',
//       bio: speaker.bio || undefined,
//       image: speaker.image?.asset ? {
//         asset: speaker.image.asset,
//         alt: speaker.image.alt || undefined
//       } : undefined,
//       position: speaker.position || undefined,
//       company: speaker.company || undefined
//     })) || [];
//   } catch (error) {
//     console.error('Error fetching speakers:', error);
//     return [];
//   }
// }

export default async function SpeakersPage() {
  // const speakers = await getSpeakers();

  // Convert Sanity speakers to the format expected by CircularTextSlider
  // const convertedSpeakers = speakers.map((speaker) => ({
  //   id: speaker._id,
  //   name: speaker.name,
  //   bio: speaker.bio || '',
  //   image: speaker.image ? urlFor(speaker.image).width(300).height(300).url() : 'https://images.unsplash.com/photo-1494790108755-2616b612e93f?w=300&h=300&fit=crop&crop=face'
  // }));


  // Demo speakers as fallback
  const demoSpeakers = [
    {
      id: '1',
      name: 'Anton Musgrave',
      bio: 'Anton Musgrave is a futurist, strategist, globally acclaimed speaker, entrepreneur, and angel investor who challenges leaders to rethink innovation, strategy, and the future.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Bright Simons',
      bio: 'Technology innovator and social entrepreneur focused on digital transformation in Africa.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Dr. Chris Kutarna',
      bio: 'Author and expert on global trends, technology disruption, and societal transformation.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face'
    },
    {
      id: '4',
      name: 'Colin Iles',
      bio: 'Technology strategist and innovation consultant specializing in emerging markets.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face'
    },
    {
      id: '5',
      name: 'Doug Ostberg',
      bio: 'Digital transformation expert and thought leader in business innovation.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    },
    {
      id: '6',
      name: 'Gerd Leonhard',
      bio: 'Futurist and humanist exploring the intersection of technology and humanity.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
    },
    {
      id: '7',
      name: 'Matt Lawn',
      bio: 'Innovation strategist and technology evangelist focused on future trends.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face'
    },
    {
      id: '8',
      name: 'Neil Jacobsohn',
      bio: 'Business transformation leader and strategic advisor for digital innovation.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face'
    },
    {
      id: '9',
      name: 'Ming Wong',
      bio: 'Technology entrepreneur and expert in emerging technologies and digital ecosystems.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    },
    {
      id: '10',
      name: 'Per Ostberg',
      bio: 'Strategic consultant and thought leader in organizational transformation.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
    },
    {
      id: '11',
      name: 'Dr. Vivienne Ming',
      bio: 'Neuroscientist, technologist, and entrepreneur working on human potential optimization.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&crop=face'
    }
  ];

  // const displaySpeakers = convertedSpeakers.length > 0 ? convertedSpeakers : demoSpeakers;
  const displaySpeakers = demoSpeakers;

  return (
    <main className="min-h-screen">
      <CircularTextSlider speakers={displaySpeakers} />
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[150]">
        <a 
          href="/test" 
          className="inline-block px-6 py-3 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-black/60 transition-all duration-300 shadow-lg"
        >
          ← Back to Home
        </a>
      </div>
    </main>
  );
}