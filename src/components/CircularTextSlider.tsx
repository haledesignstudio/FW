'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Speaker {
  id: string;
  name: string;
  bio: string;
  image: string;
}

interface CircularTextSliderProps {
  speakers?: Speaker[];
}

const defaultSpeakers: Speaker[] = [
  { id: '1', name: 'Anton Musgrave', bio: 'Anton Musgrave is a futurist, strategist, globally acclaimed speaker, entrepreneur, and angel investor who challenges leaders to rethink innovation, strategy, and the future.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face' },
  { id: '2', name: 'Bright Simons', bio: 'Technology innovator and social entrepreneur focused on digital transformation in Africa.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face' },
  { id: '3', name: 'Dr. Chris Kutarna', bio: 'Author and expert on global trends, technology disruption, and societal transformation.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face' },
  { id: '4', name: 'Colin Iles', bio: 'Technology strategist and innovation consultant specializing in emerging markets.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face' },
  { id: '5', name: 'Doug Ostberg', bio: 'Digital transformation expert and thought leader in business innovation.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face' },
  { id: '6', name: 'Gerd Leonhard', bio: 'Futurist and humanist exploring the intersection of technology and humanity.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face' },
  { id: '7', name: 'Matt Law', bio: 'Innovation strategist and technology evangelist focused on future trends.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face' },
  { id: '8', name: 'Neil Jacobsohn', bio: 'Business transformation leader and strategic advisor for digital innovation.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face' },
  { id: '9', name: 'Ming Wong', bio: 'Technology entrepreneur and expert in emerging technologies and digital ecosystems.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face' },
  { id: '10', name: 'Per Ostberg', bio: 'Strategic consultant and thought leader in organizational transformation.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face' },
  { id: '11', name: 'Dr. Vivienne Ming', bio: 'Neuroscientist, technologist, and entrepreneur working on human potential optimization.', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&crop=face' }
];

export default function CircularTextSlider({ speakers = defaultSpeakers }: CircularTextSliderProps) {
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
          top: -20vh;
          left: 50%;
          transform: translateX(-50%) translateY(2vh);
          width: 60vw;
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
          width: 20vh; /* Responsive image size */
          height: 25vh;
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
          <div
            className={`speaker-info-panel ${hoveredSpeaker ? 'visible' : ''}`}
          >
            <img
              src={hoveredSpeaker.image}
              alt={hoveredSpeaker.name}
              className="speaker-image"
            />
            <div className="speaker-details">
              <h3>{hoveredSpeaker.name}</h3>
              <p>{hoveredSpeaker.bio}</p>
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
                  key={`${speaker.id}-${index}`}
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