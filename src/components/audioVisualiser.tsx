'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

export interface AudioVisualiserProps {
  audioElement?: HTMLAudioElement | null;
  audioSrc?: string;
  size?: number; // diameter of the circle
  width?: number; // width of the container
  height?: number; // height of the container
  color?: string;
  backgroundColor?: string;
  className?: string;
  isPlaying?: boolean;
}

export default function AudioVisualiser(props: AudioVisualiserProps) {
  // Responsive circle size: clamp between 160px and 320px, 40vw for mobile
  const {
    audioElement: _externalAudioElement,
    audioSrc,
    size = typeof window !== 'undefined' ? Math.max(160, Math.min(320, window.innerWidth * 0.4)) : 240,
    width = size,
    height = size,
    color = '#000000',
    backgroundColor = '#000000',
    className = '',
  } = props;

  // Debug log for audioSrc
  useEffect(() => {
    console.log('[AudioVisualiser] audioSrc:', audioSrc);
  }, [audioSrc]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);

  // 🔹 Keep audioRef in sync with external or internal <audio>
  useEffect(() => {
    if (_externalAudioElement) {
      audioRef.current = _externalAudioElement;
    }
  }, [_externalAudioElement]);

  // Handle play/pause programmatically
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const ensureAudioGraph = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (analyserRef.current && sourceNodeRef.current && sourceNodeRef.current.mediaElement === audio) return;

    if (sourceNodeRef.current && sourceNodeRef.current.mediaElement !== audio) {
      try { sourceNodeRef.current.disconnect(); } catch {}
      sourceNodeRef.current = null;
    }
    if (analyserRef.current) {
      try { analyserRef.current.disconnect(); } catch {}
      analyserRef.current = null;
    }

    try {
      try { (audio as HTMLMediaElement).crossOrigin = 'anonymous'; } catch {}

      let ctx = audioContextRef.current;
      if (!ctx) {
        const AC = window.AudioContext ?? window.webkitAudioContext;
        if (!AC) {
          console.error('Web Audio API not supported in this browser');
          return;
        }
        ctx = new AC();
        audioContextRef.current = ctx;
      }

      if (ctx.state === 'suspended') ctx.resume();

      if (!analyserRef.current || !sourceNodeRef.current) {
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = 0.8;

        const src = ctx.createMediaElementSource(audio);
        src.connect(analyser);
        src.connect(ctx.destination); 
        analyserRef.current = analyser;
        sourceNodeRef.current = src;
      }
    } catch (e) {
      console.error('Audio graph init failed:', e);
    }
  }, []);

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      const dpr = window.devicePixelRatio || 1;
      const cssWidth = width;
      const cssHeight = height; // leave space for controls
      const pxWidth = Math.floor(cssWidth * dpr);
      const pxHeight = Math.floor(cssHeight * dpr);

      if (canvas.width !== pxWidth || canvas.height !== pxHeight) {
        canvas.width = pxWidth;
        canvas.height = pxHeight;
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr); // scale drawing for DPR

      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const cx = cssWidth / 2 ;
      const cy = cssHeight / 2;
      const circleRadius = Math.min(size / 2, cssWidth / 2, cssHeight / 2) - 50;

      ctx.beginPath();
      ctx.arc(cx, cy, circleRadius, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.restore();

      const analyser = analyserRef.current;
      if (analyser && playing) {
        const bufferLength = analyser.frequencyBinCount;
        const data = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(data);

        const barCount = 150;
        const gaussianWidth = 4;
        const barHeights = new Array(barCount).fill(0);

        for (let i = 0; i < barCount; i++) {
          const idxs = [
            Math.floor((i / barCount) * bufferLength * 0.25),
            Math.floor((i / barCount) * bufferLength * 0.5),
            Math.floor((i / barCount) * bufferLength * 0.9),
          ];
          let amp = 0;
          for (const idx of idxs) amp += data[Math.min(idx, bufferLength - 1)] || 0;
          amp /= idxs.length;

          const centerAmp = Math.pow(amp / 255, 1.2) * 25; // more dynamic scaling
          if (centerAmp > 0.2) { // more sensitive
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
          // Calculate max possible extension for this angle
          let maxExtension = 0;
          const cosA = Math.cos(angle);
          const sinA = Math.sin(angle);
          // For horizontal bars (left/right), allow to reach container edge
          if (Math.abs(cosA) > Math.abs(sinA)) {
            maxExtension = (cssWidth / 2) / Math.abs(cosA) - circleRadius;
          } else {
            maxExtension = (cssHeight / 2) / Math.abs(sinA) - circleRadius;
          }
          const h = Math.min(barHeights[i], maxExtension, 120);
          if (h <= 0.5) continue;
          const x1 = cx + cosA * circleRadius;
          const y1 = cy + sinA * circleRadius;
          const x2 = cx + cosA * (circleRadius + h);
          const y2 = cy + sinA * (circleRadius + h);
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

    animationRef.current = requestAnimationFrame(loop);
  }, [size, color, playing, height, width]);


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => {
      ensureAudioGraph();
      setPlaying(true);
      try { audioContextRef.current?.resume(); } catch {}
    };
    const onPause = () => setPlaying(false);
    const onCanPlay = () => setAudioReady(true);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onPause);
    audio.addEventListener('canplay', onCanPlay);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onPause);
      audio.removeEventListener('canplay', onCanPlay);
    };
  }, [ensureAudioGraph, audioSrc]);

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
      try { sourceNodeRef.current?.disconnect(); } catch {}
      try { analyserRef.current?.disconnect(); } catch {}
      try { audioContextRef.current?.close(); } catch {}
      analyserRef.current = null;
      sourceNodeRef.current = null;
      audioContextRef.current = null;
    };
  }, []);

  return (
    <div
      className={`relative flex flex-col items-center justify-center ${className}`}
      style={{ width: '100%', height: '100%', minHeight: size, minWidth: size, backgroundColor, position: 'relative' }}
    >
      <div
        style={{
          width: size,
          height: size,
          maxWidth: '90vw',
          maxHeight: '90vw',
          minWidth: 160,
          minHeight: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
        {audioSrc && (
          <>
            <audio
              ref={audioRef}
              src={audioSrc}
              style={{ display: 'none' }}
              crossOrigin="anonymous"
              preload="auto"
            />
            <button
              type="button"
              onClick={handlePlayPause}
              disabled={!audioReady}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                background: 'rgba(0, 0, 0, 0.8)',
                border: 'none',
                borderRadius: '50%',
                width: 64,
                height: 64,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                cursor: audioReady ? 'pointer' : 'not-allowed',
                outline: 'none',
                fontSize: 32,
                color: color,
              }}
              aria-label={playing ? 'Pause audio' : 'Play audio'}
            >
              {playing ? (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"><rect x="8" y="8" width="5" height="16" rx="2" fill={color} /><rect x="19" y="8" width="5" height="16" rx="2" fill={color} /></svg>
              ) : (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"><polygon points="10,8 26,16 10,24" fill={color} /></svg>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
