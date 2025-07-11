import TextAnimation from '@/components/TextAnimation';
import CountingAnimation from '@/components/countingAnimation';

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

      {/* Counting Animation Test Section */}
      <div className="mt-16 w-full max-w-6xl">
        <h2 className="text-3xl font-roboto-bold text-center mb-12">
          <TextAnimation 
            text="Our Impact in Numbers"
            delay={8}
            letterDelay={0.05}
            duration={0.6}
          />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Corporate Partners */}
          <div className="text-center">
            <div className="flex items-center justify-center">
              <CountingAnimation target={20} fontSize="60px" className="text-blue-400" />
              <span className="text-blue-400 text-6xl font-bold">+</span>
            </div>
            <p className="text-lg font-roboto mt-2">Corporate partners</p>
          </div>
          
          {/* Game-changing Opportunities */}
          <div className="text-center">
            <div className="flex items-center justify-center">
              <CountingAnimation target={400} fontSize="60px" className="text-green-400" />
              <span className="text-green-400 text-6xl font-bold">+</span>
            </div>
            <p className="text-lg font-roboto mt-2">Game-changing opportunities</p>
          </div>
          
          {/* Value Propositions */}
          <div className="text-center">
            <div className="flex items-center justify-center">
              <CountingAnimation target={40} fontSize="60px" className="text-yellow-400" />
              <span className="text-yellow-400 text-6xl font-bold">+</span>
            </div>
            <p className="text-lg font-roboto mt-2">Value propositions</p>
          </div>
          
          {/* Investment Cases */}
          <div className="text-center">
            <div className="flex items-center justify-center">
              <CountingAnimation target={20} fontSize="60px" className="text-purple-400" />
              <span className="text-purple-400 text-6xl font-bold">+</span>
            </div>
            <p className="text-lg font-roboto mt-2">Investment cases</p>
          </div>
          
          {/* New Ventures */}
          <div className="text-center lg:col-span-1 md:col-span-2 lg:col-start-2">
            <CountingAnimation target={16} fontSize="60px" className="text-red-400" />
            <p className="text-lg font-roboto mt-2">New ventures in commercialisation</p>
          </div>
        </div>
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
        <a 
          href="/grid" 
          className="inline-block px-8 py-4 bg-green-600/20 backdrop-blur-md border border-green-400/30 rounded-lg text-white hover:bg-green-600/30 transition-all duration-300 font-roboto-medium"
        >
          Test Grid Page
        </a>
      </div>
    </div>
  );
}