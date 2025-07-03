import TextAnimation from '@/components/TextAnimation';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col justify-center items-center gap-12">
      <h1 className="text-4xl font-roboto-bold text-center">
        <TextAnimation 
          text="Welcome to FutureWorld"
          delay={0.5}
          letterDelay={0.06}
          duration={0.8}
        />
      </h1>
      
      <h2 className="text-2xl text-center">
        <TextAnimation 
          text="This is a test animation"
          delay={2}
          letterDelay={0.04}
          duration={0.6}
        />
      </h2>
      
      <p className="text-lg max-w-4xl font-roboto text-center">
        <TextAnimation 
          text="This shit should make each letter slide up from below with a smooth animation effect."
          delay={3.5}
          letterDelay={0.02}
          duration={0.5}
        />
      </p>
      
      <p className="text-lg max-w-4xl font-roboto text-center">
        <TextAnimation 
          text="You can see how each character appears one by one, cuz you got eyes."
          delay={5}
          letterDelay={0.025}
          duration={0.5}
        />
      </p>
      
      <div className="text-xl font-roboto-semibold text-center">
        <TextAnimation 
          text="I think it works"
          delay={7}
          letterDelay={0.08}
          duration={0.7}
        />
      </div>

      <div className="mt-12 flex gap-6">
        <a 
          href="/speakers" 
          className="inline-block px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300 font-roboto-medium"
        >
          View Keynote Speakers
        </a>
        <a 
          href="/accordion" 
          className="inline-block px-8 py-4 bg-blue-600/20 backdrop-blur-md border border-blue-400/30 rounded-lg text-white hover:bg-blue-600/30 transition-all duration-300 font-roboto-medium"
        >
          Horizontal Accordion Menu
        </a>
        <a 
          href="/404" 
          className="inline-block px-8 py-4 bg-red-600/20 backdrop-blur-md border border-red-400/30 rounded-lg text-white hover:bg-red-600/30 transition-all duration-300 font-roboto-medium"
        >
          404 Page
        </a>
      </div>
    </div>
  );
}