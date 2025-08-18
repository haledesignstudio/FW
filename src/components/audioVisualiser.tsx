'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}


export interface AudioVisualiserProps {
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
  isPlaying,
}: AudioVisualiserProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationRef = useRef<number | null>(null);
  const [internalAudioElement, setInternalAudioElement] = useState<HTMLAudioElement | null>(null);
  const [autoPlaying, setAutoPlaying] = useState(false);

  const playing = typeof isPlaying === 'boolean' ? isPlaying : autoPlaying;

  const ensureAudioGraph = useCallback(async () => {
    const audio = externalAudioElement || internalAudioElement;
    if (!audio) return;
    if (analyserRef.current && audioContextRef.current) return;

    try {
      try { (audio as HTMLMediaElement).crossOrigin = 'anonymous'; } catch { }

      const AC = window.AudioContext ?? window.webkitAudioContext;
      if (!AC) {
        console.error('Web Audio API not supported in this browser');
        return;
      }
      const ctx = new AC();

      if (ctx.state === 'suspended') await ctx.resume();

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.8;

      const src = ctx.createMediaElementSource(audio);
      src.connect(analyser);
      analyser.connect(ctx.destination);

      audioContextRef.current = ctx;
      analyserRef.current = analyser;
    } catch (e) {
      console.error('Audio graph init failed:', e);
    }
  }, [externalAudioElement, internalAudioElement]);

 
  useEffect(() => {
    if (!audioSrc) {
      setInternalAudioElement(null);
      return;
    }
    const a = new Audio(audioSrc);
    a.crossOrigin = 'anonymous';
    a.preload = 'auto';
    setInternalAudioElement(a);
    return () => {
      try { a.pause(); } catch { }
      setInternalAudioElement(null);
    };
  }, [audioSrc]);


  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      
      const dpr = window.devicePixelRatio || 1;
      const cssSize = size;
      const pxSize = Math.floor(cssSize * dpr);
      if (canvas.width !== pxSize || canvas.height !== pxSize) {
        canvas.width = pxSize;
        canvas.height = pxSize;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      
      ctx.clearRect(0, 0, cssSize, cssSize);

      const cx = cssSize / 2;
      const cy = cssSize / 2;
      const radius = cssSize / 2 - 50;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;
      ctx.stroke();
      ctx.globalAlpha = 1;

      const analyser = analyserRef.current;
      if (analyser && playing) {
        const bufferLength = analyser.frequencyBinCount;
        const data = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(data);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) sum += data[i];
        const avg = sum / bufferLength;

        const barCount = 150;
        const gaussianWidth = 4;
        const barHeights = new Array(barCount).fill(0);

        if (avg > 3) {
          for (let i = 0; i < barCount; i++) {
            const idxs = [
              Math.floor((i / barCount) * bufferLength * 0.25),
              Math.floor((i / barCount) * bufferLength * 0.5),
              Math.floor((i / barCount) * bufferLength * 0.9),
            ];
            let amp = 0;
            for (const idx of idxs) amp += data[Math.min(idx, bufferLength - 1)] || 0;
            amp /= idxs.length;

            const centerAmp = (amp / 255) * 12;
            if (centerAmp > 2) {
              for (let j = 0; j < barCount; j++) {
                const dist = Math.abs(j - i);
                const wrap = Math.min(dist, barCount - dist);
                const sigma = gaussianWidth / 3;
                const g = Math.exp(-(wrap * wrap) / (2 * sigma * sigma));
                barHeights[j] += centerAmp * g;
              }
            }
          }

          for (let i = 0; i < barCount; i++) {
            const angle = (i / barCount) * Math.PI * 2;
            const h = Math.min(barHeights[i], 60);
            if (h <= 1) continue;
            const x1 = cx + Math.cos(angle) * radius;
            const y1 = cy + Math.sin(angle) * radius;
            const x2 = cx + Math.cos(angle) * (radius + h);
            const y2 = cy + Math.sin(angle) * (radius + h);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.globalAlpha = Math.min(0.4 + (h / 60) * 0.6, 1);
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
        }
      }
    }

    animationRef.current = requestAnimationFrame(loop);
  }, [size, color, playing]);

  useEffect(() => {
    const audio = externalAudioElement || internalAudioElement;
    if (!audio) return;

    const onPlay = async () => {
      setAutoPlaying(true);
      await ensureAudioGraph();
      try { await audioContextRef.current?.resume(); } catch { }
    };
    const onPause = () => setAutoPlaying(false);
    const onEnded = () => setAutoPlaying(false);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
    };
  }, [externalAudioElement, internalAudioElement, ensureAudioGraph]);


  useEffect(() => {
    if (!animationRef.current) {
      animationRef.current = requestAnimationFrame(loop);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    };
  }, [loop]);


  useEffect(() => {
    return () => {
      try { audioContextRef.current?.close(); } catch { }
      analyserRef.current = null;
      audioContextRef.current = null;
    };
  }, []);

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size, backgroundColor }}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      {audioSrc && internalAudioElement && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 w-[calc(100%-40px)]">
          <audio controls src={audioSrc} className="w-full" />
        </div>
      )}
    </div>
  );
}
