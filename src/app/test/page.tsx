'use client';

import { useState, useRef, useEffect } from 'react';
import TextAnimation from '@/components/TextAnimation';
import CountingAnimation from '@/components/countingAnimation';
import AudioVisualiser from '@/components/audioVisualiser';
import MindbulletArchive from '@/components/mindbulletsArchive';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(true); // Start as playing
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      console.error('Audio error:', e);
    };
    const handleCanPlay = () => {
      console.log('Audio can play');
      // Auto-play when ready
      audio.play().catch(error => {
        console.warn('Auto-play failed:', error);
      });
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) {
      console.warn('Audio element not found');
      return;
    }

    try {
      if (isPlaying) {
        console.log('Pausing audio');
        audio.pause();
      } else {
        console.log('Playing audio');
        await audio.play();
      }
    } catch (error) {
      console.error('Audio play failed:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
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

      {/* Audio Visualizer Section */}
      <div className="mt-16 w-full max-w-4xl">
        <h2 className="text-3xl font-roboto-bold text-center mb-8">
          <TextAnimation 
            text="Audio Visualizer Demo"
            delay={12}
            letterDelay={0.05}
            duration={0.6}
          />
        </h2>
        
        <div className="flex flex-col items-center gap-8">
          {/* Main Audio Visualizer */}
          <div 
            className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={togglePlayback}
          >
            <AudioVisualiser
              size={300}
              color="#FFFFFF"
              backgroundColor="#000000"
              className="drop-shadow-lg"
              audioElement={audioRef.current}
              isPlaying={isPlaying}
            />
          </div>
          
          {/* Audio Controls */}
          <div className="flex flex-col items-center gap-4 w-full max-w-md">
            <div className="flex items-center gap-4 w-full">
              <button
                onClick={togglePlayback}
                className="flex items-center justify-center w-12 h-12 bg-[#DC5A50] hover:bg-[#c54940] rounded-full transition-colors duration-200"
              >
                {isPlaying ? (
                  <div className="flex gap-1">
                    <div className="w-1 h-4 bg-white rounded"></div>
                    <div className="w-1 h-4 bg-white rounded"></div>
                  </div>
                ) : (
                  <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
                )}
              </button>
              
              <div className="flex-1 text-white text-sm">
                <div className="flex justify-between mb-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1">
                  <div 
                    className="bg-[#DC5A50] h-1 rounded-full transition-all duration-100"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <p className="text-white/70 text-sm text-center">
              Click the visualizer or play button to start/stop audio<br/>
              Real-time frequency analysis with Web Audio API
            </p>
          </div>
        </div>
      </div>

      {/* Audio Element - with autoplay and loop for testing */}
      <audio
        ref={audioRef}
        src="/assets/audio/provocative-scenarios-podcast.mp3"
        preload="metadata"
        controls
        className="mb-4"
        autoPlay
        loop
        muted={false}
      />

      {/* Mindbullets Archive Demo */}
      <MindbulletArchive />

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