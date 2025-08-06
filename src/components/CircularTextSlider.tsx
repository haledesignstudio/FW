'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PortableText } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';

interface Speaker {
  _id: string;
  name: string;
  bio: PortableTextBlock[];
  image: {
    asset: string; // Assuming image is resolved to URL
    alt?: string;
  };
}


interface CircularTextSliderProps {
  speakers: Speaker[];
}

export default function CircularTextSlider({ speakers }: CircularTextSliderProps) {





  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const [hoveredSpeaker, setHoveredSpeaker] = useState<Speaker | null>(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [targetRotation, setTargetRotation] = useState(0);

  // Use viewport units for circle radius - much larger wheel
  const getCircleRadius = () => {
    if (typeof window !== 'undefined') {
      return Math.min(window.innerWidth, window.innerHeight) * 0.7; // 60% of smaller viewport dimension
    }
    return 600; // fallback
  };

  const handleWheel = (e: WheelEvent) => {
    if (!containerRef.current) return;

    const bounds = containerRef.current.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.bottom - (45 * window.innerHeight / 100); // Account for -45vh bottom position

    // Calculate distance from cursor to circle center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Reduce scrollable area to 60% of the visual circle radius
    const scrollableRadius = circleRadius * 0.6;

    // Only allow scrolling if cursor is within the smaller scrollable radius
    if (distanceFromCenter <= scrollableRadius) {
      e.preventDefault();
      setTargetRotation(prev => prev + e.deltaY * 0.1);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const animateRotation = () => {
      const newRotation = currentRotation + (targetRotation - currentRotation) * 0.1;
      setCurrentRotation(newRotation);

      if (gallery) {
        gallery.style.transform = `translateX(-50%) rotate(${newRotation}deg)`;
        gallery.style.transformOrigin = '50% 0%';
      }

      requestAnimationFrame(animateRotation);
    };

    const animationId = requestAnimationFrame(animateRotation);
    return () => cancelAnimationFrame(animationId);
  }, [currentRotation, targetRotation]);

  const circleRadius = getCircleRadius();

  return (
    <>
      <style jsx global>{`
        .circular-slider-wrapper {
          position: relative;
          width: 100vw;
          height: 70vh;
        }
        .circular-slider-container {
          position: relative;
          width: 100vw;
          height: 70vh; /* Use viewport height instead of fixed pixels */
          pointer-events: all;
          z-index: 100;
          overflow: hidden;
        }
        .gallery {
          position: absolute;
          bottom: -45vh; /* Position using viewport units */
          left: 50%;
          width: 10vh;
          height: 10vh;
          transform: translateX(-50%);
          pointer-events: all;
        }
        .speaker-item {
          position: absolute;
          top: 0;
          left: 50%;
          transform-origin: 0 0;
          font-size: 3.5vh; /* Responsive font size */
          font-weight: 600;
          letter-spacing: 0.3vh;
          white-space: nowrap;
          cursor: pointer;
          color: black;
          transition: color 0.2s ease;
          user-select: none;
        }
        .speaker-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #DC5A50;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.2s ease;
          z-index: -1;
        }
        .speaker-item:hover::before {
          transform: scaleX(1);
        }
        .speaker-info-panel {
          position: absolute;
          top: -25vh;
          left: 50%;
          transform: translateX(-50%) translateY(2vh);
          width: 30vw;
          max-width: 60rem;
          z-index: 1001;
          pointer-events: none;
          display: flex;
          gap: 2vh;
          align-items: center;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .speaker-info-panel.visible {
          opacity: 1;
          transform: translateX(-50%) translateY(-2vh);
        }

        .speaker-image {
          width: 10vh; /* Responsive image size */
          height: 30vh;
          object-fit: cover;
          flex-shrink: 0;
        }
        .speaker-details {
          flex: 1;
        }
        .speaker-details h3 {
          font-size: 2.8vh; /* Responsive heading */
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1vh;
          margin-bottom: 1vh;
        }
        .speaker-details p {
          font-size: 1.8vh; /* Responsive text */
          line-height: 1.6;
          color: #666;
          margin: 0;
        }
      `}</style>

      <div className="circular-slider-wrapper">
        {/* Speaker info panel is now outside the overflow:hidden container */}
        {hoveredSpeaker && (
          <div className={`speaker-info-panel visible`}>
            <Image
              src={hoveredSpeaker.image.asset}
              alt={hoveredSpeaker.image.alt || hoveredSpeaker.name}
              className="speaker-image"
              width={400}
              height={500}
              priority
              unoptimized={false}
            />
            <div className="speaker-details">
              <h3>{hoveredSpeaker.name}</h3>
              <PortableText value={hoveredSpeaker.bio} />
            </div>
          </div>
        )}


        <div className="circular-slider-container" ref={containerRef}>
          <div className="gallery" ref={galleryRef}>
            {[...speakers, ...speakers, ...speakers, ...speakers].map((speaker, index) => {
              const total = speakers.length * 4;
              const angle = (360 / total) * index;
              const angleRad = (angle * Math.PI) / 180;
              const x = Math.cos(angleRad) * circleRadius;
              const y = Math.sin(angleRad) * circleRadius;
              const textRotation = angle;
              return (
                <div
                  key={`${speaker._id}-${index}`}
                  className="speaker-item"
                  style={{
                    transform: `translate(${x}px, ${y}px) rotate(${textRotation}deg)`
                  }}
                  onMouseEnter={() => {
                    setHoveredSpeaker(speaker);
                  }}

                  onMouseLeave={() => setHoveredSpeaker(null)}
                >
                  {speaker.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}