'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface AudioVisualiserProps {
  audioElement?: HTMLAudioElement | null;
  audioSrc?: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  className?: string;
  isPlaying?: boolean;
}

export default function AudioVisualiser({
  audioElement: externalAudioElement,
  audioSrc,
  size = 300,
  color = '#FFFFFF',
  backgroundColor = '#000000',
  className = '',
  isPlaying = false
}: AudioVisualiserProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isSetup, setIsSetup] = useState(false);
  const [internalAudioElement, setInternalAudioElement] = useState<HTMLAudioElement | null>(null);

  const setupAudio = useCallback(async () => {
    const audioElement = externalAudioElement || internalAudioElement;
    if (!audioElement || isSetup) return;

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const context = new AudioContextClass();
      
      if (context.state === 'suspended') {
        await context.resume();
      }

      const analyser = context.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;

      const source = context.createMediaElementSource(audioElement);
      source.connect(analyser);
      analyser.connect(context.destination);

      audioContextRef.current = context;
      analyserRef.current = analyser;
      setIsSetup(true);

      console.log('Audio setup complete');
    } catch (error) {
      console.error('Audio setup failed:', error);
    }
  }, [externalAudioElement, internalAudioElement, isSetup]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    
    if (!canvas || !analyser || !isPlaying) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 50;

    const animate = () => {
      if (!isPlaying) return;

      analyser.getByteFrequencyData(dataArray);

      // Clear canvas
      ctx.clearRect(0, 0, size, size);

      // Draw background circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Draw frequency bars with Gaussian distribution
      const barCount = 150; // Increased for better coverage
      const gaussianWidth = 4; // How wide each Gaussian spread is (in bars)
      const barHeights = new Array(barCount).fill(0); // Store heights for each bar position
      
      // Calculate overall audio activity level for silence detection
      let totalAudioActivity = 0;
      for (let i = 0; i < bufferLength; i++) {
        totalAudioActivity += dataArray[i];
      }
      const averageAudioLevel = totalAudioActivity / bufferLength;
      const silenceThreshold = 5; // Threshold below which we consider it silence
      
      // Only draw if there's actual audio activity
      if (averageAudioLevel > silenceThreshold) {
        // First pass: calculate Gaussian contributions for each frequency
        for (let i = 0; i < barCount; i++) {
          const frequencyMappings = [
            Math.floor((i / barCount) * bufferLength * 0.3), // Low frequencies
            Math.floor((i / barCount) * bufferLength * 0.5), // Mid frequencies  
            Math.floor((i / barCount) * bufferLength * 0.8), // Higher frequencies
          ];
          
          // Get average from multiple frequency ranges for better distribution
          let totalAmplitude = 0;
          frequencyMappings.forEach(freqIndex => {
            const clampedIndex = Math.min(freqIndex, bufferLength - 1);
            totalAmplitude += dataArray[clampedIndex] || 0;
          });
          
          const averageAmplitude = totalAmplitude / frequencyMappings.length;
          const centerAmplitude = (averageAmplitude / 255) * 12;
          
          // Higher threshold for individual bars to prevent noise
          if (centerAmplitude > 3) {
            // Apply Gaussian distribution around this frequency point
            for (let j = 0; j < barCount; j++) {
              const distance = Math.abs(j - i);
              const wrappedDistance = Math.min(distance, barCount - distance); // Handle circular wrapping
              
              // Gaussian formula: e^(-(x²)/(2σ²))
              const sigma = gaussianWidth / 3; // Standard deviation
              const gaussianValue = Math.exp(-(wrappedDistance * wrappedDistance) / (2 * sigma * sigma));
              
              // Add this frequency's contribution to the bar height
              barHeights[j] += centerAmplitude * gaussianValue;
            }
          }
        }
        
        // Second pass: draw the bars with accumulated Gaussian heights
        for (let i = 0; i < barCount; i++) {
          const angle = (i / barCount) * 2 * Math.PI;
          const barHeight = Math.min(barHeights[i], 60); // Cap maximum height
          
          // Only draw bars that are above the minimum threshold
          if (barHeight > 2) {
            const x1 = centerX + Math.cos(angle) * radius;
            const y1 = centerY + Math.sin(angle) * radius;
            const x2 = centerX + Math.cos(angle) * (radius + barHeight);
            const y2 = centerY + Math.sin(angle) * (radius + barHeight);

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            // Vary opacity based on height for smoother blending
            ctx.globalAlpha = Math.min(0.4 + (barHeight / 60) * 0.6, 1);
            ctx.stroke();
          }
        }
      }
      
      // Reset global alpha
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  }, [isPlaying, size, color]);

  useEffect(() => {
    const audioElement = externalAudioElement || internalAudioElement;
    if (audioElement && !isSetup) {
      setupAudio();
    }
  }, [externalAudioElement, internalAudioElement, setupAudio, isSetup]);

  // If audioSrc is provided, create and manage an internal audio element
  useEffect(() => {
    if (audioSrc) {
      const audio = new window.Audio(audioSrc);
      setInternalAudioElement(audio);
      return () => {
        audio.pause();
        setInternalAudioElement(null);
      };
    } else {
      setInternalAudioElement(null);
    }
  }, [audioSrc]);

  useEffect(() => {
    if (isSetup && isPlaying) {
      draw();
    } else if (!isPlaying && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [isSetup, isPlaying, draw]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div 
      className={`relative ${className}`} 
      style={{ width: size, height: size, backgroundColor }}
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="absolute inset-0"
      />
      {/* If using internal audio, render controls for play/pause */}
      {audioSrc && internalAudioElement && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
          <audio controls src={audioSrc} style={{ width: size - 40 }} />
        </div>
      )}
      {/* Play/Pause indicator in center */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ pointerEvents: 'none' }}
      >
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: color, opacity: 0.8 }}
        >
          {isPlaying ? (
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-black rounded"></div>
              <div className="w-1 h-4 bg-black rounded"></div>
            </div>
          ) : (
            <div className="w-0 h-0 border-l-[6px] border-l-black border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
          )}
        </div>
      </div>
    </div>
  );
}
