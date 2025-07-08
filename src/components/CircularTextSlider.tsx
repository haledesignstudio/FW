'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

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
  { id: '7', name: 'Matt Lawn', bio: 'Innovation strategist and technology evangelist focused on future trends.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face' },
  { id: '8', name: 'Neil Jacobsohn', bio: 'Business transformation leader and strategic advisor for digital innovation.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face' },
  { id: '9', name: 'Ming Wong', bio: 'Technology entrepreneur and expert in emerging technologies and digital ecosystems.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face' },
  { id: '10', name: 'Per Ostberg', bio: 'Strategic consultant and thought leader in organizational transformation.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face' },
  { id: '11', name: 'Dr. Vivienne Ming', bio: 'Neuroscientist, technologist, and entrepreneur working on human potential optimization.', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&crop=face' }
];

export default function CircularTextSlider({ speakers = defaultSpeakers }: CircularTextSliderProps) {
  // Configuration - easily adjustable
  const centerPointFromBottom = 300; // Distance from bottom of screen to circle center
  const circleRadius = 400; // Radius of the circle
  
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  const [hoveredSpeaker, setHoveredSpeaker] = useState<Speaker | null>(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [targetRotation, setTargetRotation] = useState(0);

  // Handle wheel events
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setTargetRotation(prev => prev + e.deltaY * 0.1);
  };

  useEffect(() => {
    const gallery = galleryRef.current;

    if (!gallery) return;

    // Smooth rotation animation loop
    const animateRotation = () => {
      const newRotation = currentRotation + (targetRotation - currentRotation) * 0.1; // Slightly faster smoothing
      setCurrentRotation(newRotation);
      gsap.set(gallery, { 
        rotation: newRotation,
        transformOrigin: '50% 0%' // Rotate around the top center of the gallery
      });
      requestAnimationFrame(animateRotation);
    };
    
    const animationId = requestAnimationFrame(animateRotation);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [currentRotation, targetRotation]);

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: white;
          color: black;
          font-family: 'Inter', 'Arial', sans-serif;
          overflow-x: hidden;
          height: 300vh; /* Ensure there's enough height to scroll */
        }

        .circular-slider-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100vw;
          height: ${centerPointFromBottom * 2}px; /* Make container taller to show more of the circle */
          pointer-events: all;
          z-index: 100;
          overflow: hidden;
        }

        .gallery {
          position: absolute;
          bottom: -300px; /* Position so the center of the 100px gallery is at the container bottom */
          left: 50%;
          width: 100px;
          height: 100px;
          transform: translateX(-50%);
          pointer-events: all;
        }

        .speaker-item {
          position: absolute;
          top: 0;
          left: 50%;
          transform-origin: 0 0;
          font-size: 22px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          white-space: nowrap;
          cursor: pointer;
          color: black;
          transition: color 0.2s ease;
          padding: 8px 12px; /* Increased padding for larger hover area */
          user-select: none;
          border-radius: 4px; /* Slightly rounded corners for better hover detection */
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

        .speaker-item:hover {
          color: white;
        }

        .speaker-item:hover::before {
          transform: scaleX(1);
        }

        .cursor {
          display: none; /* Hide the separate cursor */
        }

        .speaker-info-panel {
          position: fixed;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 30px;
          z-index: 1001;
          pointer-events: none;
          display: flex;
          gap: 20px;
          align-items: center;
          opacity: 0;
          transform: translateX(-50%) translateY(-20px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .speaker-info-panel.visible {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .speaker-image {
          width: 200px;
          height: 250px;
          object-fit: cover;
          object-position: center;
          flex-shrink: 0;
        }

        .speaker-details {
          flex: 1;
        }

        .speaker-details h3 {
          margin: 0 0 15px 0;
          font-size: 24px;
          font-weight: 700;
          color: black;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .speaker-details p {
          margin: 0;
          font-size: 16px;
          line-height: 1.6;
          color: #666;
        }

        @media (max-width: 768px) {
          .gallery {
            width: 500px;
            height: 250px;
          }
          
          .speaker-item {
            font-size: 18px;
            padding: 8px 15px;
          }
          
          .speaker-info-panel {
            width: 90%;
            padding: 20px;
            flex-direction: column;
            text-align: center;
          }

          .speaker-image {
            width: 150px;
            height: 200px;
          }
        }

        @media (max-width: 480px) {
          .gallery {
            width: 400px;
            height: 200px;
          }
          
          .speaker-item {
            font-size: 14px;
            padding: 6px 12px;
            letter-spacing: 2px;
          }

          .speaker-info-panel {
            width: 95%;
            padding: 15px;
          }

          .speaker-image {
            width: 120px;
            height: 160px;
          }

          .speaker-details h3 {
            font-size: 18px;
          }

          .speaker-details p {
            font-size: 14px;
          }
        }
      `}</style>

      <div 
        className="circular-slider-container" 
        ref={containerRef}
        onWheel={handleWheel}
      >
        <div className="gallery" ref={galleryRef}>
          {[...speakers, ...speakers, ...speakers, ...speakers].map((speaker, index) => {
            const totalSpeakers = speakers.length * 4; // Quadruple the count since we're repeating 4 times
            // Spread speakers around the full circle (360 degrees) with duplicates
            const angle = (360 / totalSpeakers) * index;
            
            const angleRad = (angle * Math.PI) / 180;
            const x = Math.cos(angleRad) * circleRadius;
            const y = Math.sin(angleRad) * circleRadius;
            
            const textRotation = angle;
            
            return (
              <div
                key={`${speaker.id}-${index}`}
                className="speaker-item"
                style={{
                  transform: `translate(${x}px, ${y}px) rotate(${textRotation}deg)`,
                  transformOrigin: '0 0'
                }}
                onMouseEnter={() => setHoveredSpeaker(speaker)}
                onMouseLeave={() => setHoveredSpeaker(null)}
              >
                {speaker.name}
              </div>
            );
          })}
        </div>
      </div>

      {/* Combined speaker info panel */}
      {hoveredSpeaker && (
        <div className={`speaker-info-panel ${hoveredSpeaker ? 'visible' : ''}`}>
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
    </>
  );
}
