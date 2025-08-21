'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PortableText } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import UnderlineOnHoverAnimation from "@/components/underlineOnHoverAnimation";

interface Speaker {
  _id: string;
  name: string;
  summary: PortableTextBlock[];
  bio: PortableTextBlock[];
  image: {
    asset: string;
    alt?: string;
  };
  mailtoSubject?: string;
  email?: string;
}

interface CircularTextSliderProps {
  speakers: Speaker[];
  /** minimum number of labels to render on the ring (will repeat speakers to reach this) */
  minItems?: number;
}

export default function CircularTextSlider({
  speakers,
  minItems = 48,
}: CircularTextSliderProps) {
  const galleryRef = useRef<HTMLDivElement>(null);

  // rotation (degrees)
  const [currentRotation, setCurrentRotation] = useState(0);
  const [targetRotation, setTargetRotation] = useState(0);

  // which item is at the top-center
  const [activeIndex, setActiveIndex] = useState(0);

  // responsive radius
  const getCircleRadius = () => {
    if (typeof window === 'undefined') return 600;
    return Math.min(window.innerWidth, window.innerHeight) * 0.7;
  };
  const [circleRadius, setCircleRadius] = useState(getCircleRadius());

  useEffect(() => {
    const onResize = () => setCircleRadius(getCircleRadius());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Expand the speakers list by repeating items to ensure a dense ring
  const displaySpeakers = useMemo(() => {
    if (!speakers?.length) return [];
    const target = Math.max(minItems, speakers.length);
    const repeats = Math.ceil(target / speakers.length);
    const repeated = Array.from({ length: repeats }, (_, rep) =>
      speakers.map((s) => ({ ...s, __dupKey: `${s._id}__rep${rep}` }))
    ).flat();
    return repeated.slice(0, target);
  }, [speakers, minItems]);

  // degrees per rendered label
  const stepDeg = useMemo(
    () => (displaySpeakers.length ? 360 / displaySpeakers.length : 0),
    [displaySpeakers.length]
  );

  // Smoothly animate currentRotation toward targetRotation
  useEffect(() => {
    let raf = 0;
    const animate = () => {
      setCurrentRotation((prev) => {
        const next = prev + (targetRotation - prev) * 0.18; // easing
        if (Math.abs(next - targetRotation) < 0.01) return targetRotation;
        return next;
      });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [targetRotation]);

  // Determine which item is at the top-center (≈ 270°)
  useEffect(() => {
    if (!displaySpeakers.length) return;
    const target = 270;
    const norm = (a: number) => ((a % 360) + 360) % 360;
    const angDist = (a: number, b: number) => {
      const d = Math.abs(norm(a) - norm(b));
      return Math.min(d, 360 - d);
    };

    let bestIdx = 0;
    let best = Number.POSITIVE_INFINITY;
    for (let i = 0; i < displaySpeakers.length; i++) {
      const base = stepDeg * i;
      const eff = base + currentRotation;
      const dist = angDist(eff, target);
      if (dist < best) {
        best = dist;
        bestIdx = i;
      }
    }
    setActiveIndex(bestIdx);
  }, [currentRotation, displaySpeakers.length, stepDeg]);

  // Arrow handlers — rotate exactly one slot
  const rotateLeft = () => setTargetRotation((prev) => prev + stepDeg);
  const rotateRight = () => setTargetRotation((prev) => prev - stepDeg);

  const activeSpeaker = displaySpeakers[activeIndex];

  return (
    <>
      <style jsx global>{`
          html, body { margin: 0; }                 

          .circular-slider-wrapper {
            position: relative;
            width: 100%;                            
            height: 70vh;
            box-sizing: border-box;
          }

          .circular-slider-container {
            position: relative;
            width: 100%;
            height: 100%;
            pointer-events: all;
            z-index: 100;
            overflow: hidden;
          }

          .gallery {
            position: absolute;
            bottom: -45vh;
            left: 50%;
            width: 0;                              
            height: 0;                              
            transform-origin: center center;        
            pointer-events: all;
          }

        .speaker-item {
          position: absolute;
          top: 0;
          left: 50%;
          transform-origin: 0 0;
          font-size: 3.5vh;
          font-weight: 600;
          letter-spacing: 0.3vh;
          white-space: nowrap;
          cursor: default;
          color: black;
          transition: color 0.2s ease;
          user-select: none;
        }
        .speaker-item::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #dc5a50;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.2s ease;
          z-index: -1;
        }
        .speaker-item.active {
          color: #000;
        }
        .speaker-item.active::before {
          transform: scaleX(1);
        }

        .speaker-info-panel {
          position: absolute;
          top: -15vh;
          left: 80%;
          transform: translateX(-50%) translateY(-2vh);
          width: 30vw;
          max-width: 60rem;
          z-index: 1001;
          display: flex;
          gap: 2vh;
          opacity: 1;
        }
        .speaker-image {
          width: 10vh;
          height: 30vh;
          object-fit: cover;
          flex-shrink: 0;
        }
        .speaker-details {
          flex: 1;
        }
        .speaker-details h3 {
          font-size: 1.8vh;
          margin-bottom: 2vh;
        }
        .speaker-details p {
          font-size: 1.8vh;
          color: #000;
          margin: 0;
        }

        .speaker-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          
        }
        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 3vh;
          height: 3vh;
          display: grid;
          place-items: center;
          line-height: 1;
          cursor: pointer;
          z-index: 1100;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          user-select: none;
        }
        .arrow:active {
          transform: translateY(-50%) scale(0.96);
        }
        .arrow-left {
          left: 16px;
        }
        .arrow-right {
          right: 16px;
        }
      `}</style>

      <div className="circular-slider-wrapper">
        {activeSpeaker && (
          <div className="speaker-info-panel">
            <img
              src={activeSpeaker.image.asset}
              alt={activeSpeaker.image.alt || activeSpeaker.name}
              className="speaker-image"
            />
            <div className="speaker-details">
              <div className="speaker-text">
                <h3>{activeSpeaker.name}</h3>
                <PortableText value={activeSpeaker.summary} />
              </div>
              <div className="mt-[2vh] speaker-actions flex flex-col items-start gap-[2vh]">
                <button className="text-[clamp(0.8vw,2vh,1vw)]  font-bold leading-[clamp(0.8vw,2vh,1vw)]">
                  <UnderlineOnHoverAnimation hasStaticUnderline={true}>Read more</UnderlineOnHoverAnimation></button>
                <div>
                  {activeSpeaker.email && (
                    <a
                      href={`mailto:${activeSpeaker.email}?subject=${encodeURIComponent(
                        activeSpeaker.mailtoSubject || `Booking ${activeSpeaker.name}`
                      )}`} className="text-[clamp(0.8vw,2vh,1vw)]  font-bold leading-[clamp(0.8vw,2vh,1vw)]"
                    >
                      <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                        {activeSpeaker.mailtoSubject}
                      </UnderlineOnHoverAnimation>
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}


        <button
          type="button"
          className="arrow arrow-left"
          aria-label="Previous"
          onClick={rotateLeft}
        >
          <img
            src="/carousel-arrow.png"
            alt="Previous"
            style={{ transform: 'rotate(180deg)', width: '100%', height: '100%' }}
          />
        </button>

        <button
          type="button"
          className="arrow arrow-right"
          aria-label="Next"
          onClick={rotateRight}
        >
          <img
            src="/carousel-arrow.png"
            alt="Next"
            style={{ width: '100%', height: '100%' }}
          />
        </button>


        <div className="circular-slider-container">
          <div
            ref={galleryRef}
            className="gallery"
            style={{
              transform: `translateX(-50%) rotate(${currentRotation}deg)`,
            }}
          >
            {displaySpeakers.map((speaker, index) => {
              const angle = (360 / displaySpeakers.length) * index;
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * circleRadius;
              const y = Math.sin(rad) * circleRadius;
              const isActive = index === activeIndex;

              return (
                <div
                  key={speaker.__dupKey ?? `${speaker._id}-${index}`}
                  className={`speaker-item ${isActive ? 'active' : ''}`}
                  style={{
                    transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
                  }}
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
