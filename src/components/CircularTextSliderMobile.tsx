"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { PortableText } from "@portabletext/react";
import UnderlineOnHoverAnimation from "@/components/underlineOnHoverAnimation";
import { PortableTextBlock } from "@portabletext/types";
import { motion } from "framer-motion";
import Link from "next/link";

interface Speaker {
  _id: string;
  name: string;
  slug?: { current: string } | string;
  summary: PortableTextBlock[];
  bio: PortableTextBlock[];
  image: {
    asset: string;
    alt?: string;
  };
  mailtoSubject?: string;
  email?: string;
}

interface CircularTextSliderMobileProps {
  speakers: Speaker[];
  minItems?: number;
}

const CircularTextSliderMobile: React.FC<CircularTextSliderMobileProps> = ({
  speakers,
  minItems = 48, // less dense for mobile
}) => {
  const router = useRouter();
  const galleryRef = useRef<HTMLDivElement>(null);

  // rotation (degrees)
  const [currentRotation, setCurrentRotation] = useState(0);
  const [targetRotation, setTargetRotation] = useState(0);

  // which item is at the top-center
  const [activeIndex, setActiveIndex] = useState(0);

  // responsive radius
  const getCircleRadius = () => {
    if (typeof window === 'undefined') return 200;
    // Smaller radius for mobile
    return Math.min(window.innerWidth, window.innerHeight) * 0.8;
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
    activeSpeaker && (
      <motion.div
        key={activeSpeaker._id}
        initial={{ opacity: 0.25 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="grid grid-cols-4 w-full bg-[#F9F7F2] relative overflow-x-hidden"
      >
        {/* Speaker Image - col 1-2, row 1-2 */}
        {/* Speaker Image - col 1-2, row 1-2 */}
        <div
          className="col-span-2 row-span-2 object-cover"
          style={{
            gridColumn: "1/3",
            gridRow: "1/3",
            width: '80%',
            height: '80%',
            maxWidth: 240,
            maxHeight: 150,
            minHeight: 150, // Add this - maintains aspect ratio (240*1.2)
            objectPosition: 'top center',
            marginBottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >

          <Image
            src={activeSpeaker.image.asset}
            alt={activeSpeaker.image.alt || activeSpeaker.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
            width={240}
            height={150}
            priority
          />

        </div>

        {/* Top Right: Read More - col 3-4, row 1 */}
        <div className="col-start-3 col-span-2 row-start-1 flex items-start justify-end" id="speakers-mobile">
          <button
            className="dt-btn text-balance text-right"
            onClick={() => {
              const slugStr = typeof activeSpeaker.slug === 'string'
                ? activeSpeaker.slug
                : activeSpeaker.slug?.current;
              if (slugStr) router.push(`/keynotes/${slugStr}`);
            }}>
            <UnderlineOnHoverAnimation hasStaticUnderline={true}>
              {`Read More about ${activeSpeaker.name}`}
            </UnderlineOnHoverAnimation>
          </button>
        </div>

        {/* Book Button - col 3-4, row 2 */}
        <div className="col-start-3 col-span-2 row-start-2 flex items-end justify-end">
          {activeSpeaker.email && (
            <a
              href={`mailto:${activeSpeaker.email}?subject=${encodeURIComponent(
                activeSpeaker.mailtoSubject || `Booking ${activeSpeaker.name}`
              )}`}
              className="dt-btn"
            >
              <UnderlineOnHoverAnimation hasStaticUnderline={true}>
                {activeSpeaker.mailtoSubject}
              </UnderlineOnHoverAnimation>
            </a>
          )}
        </div>

        {/* Speaker Name - col 1-2, row 2 */}
        <div className="col-start-1 col-span-2 row-start-3 dt-body-lg self-end mt-3">
          {activeSpeaker.name}
        </div>

        {/* Speaker Bio - col 1-4, row 3 */}
        <div className="col-start-1 col-span-4 row-start-4 min-h-[15vh] dt-body-sm pt-2 mt-0">
          <PortableText value={activeSpeaker.summary} />
        </div>


        {/* Navigation Arrows Row - col 1-4, row 4 */}
        <div className="col-start-1 col-span-4 flex flex-row items-center justify-between">
          <button
            type="button"
            className="flex items-center justify-center"
            aria-label="Previous"
            onClick={rotateLeft}
          >
            <Image src="/carousel-arrow.png" alt="Previous" width={32} height={32} style={{ transform: "rotate(180deg)", width: "50%", height: "50%" }} priority />
          </button>
          <button
            type="button"
            className="flex items-center justify-center"
            aria-label="Next"
            onClick={rotateRight}
          >
            <Image src="/carousel-arrow.png" alt="Next" width={32} height={32} style={{ width: "50%", height: "50%" }} priority />
          </button>
        </div>

        {/* Wheel - col 1-4, row 5-6 */}
        <div className="col-start-1 col-span-4 row-start-6 row-end-8 w-full h-[48vh] relative overflow-hidden">
          <div
            ref={galleryRef}
            className="absolute left-1/2 bottom-[-12vh]"
            style={{ transform: `translateX(-50%) rotate(${currentRotation}deg)`, touchAction: "pan-x" }}
          >
            {displaySpeakers.map((speaker, index) => {
              const angle = (360 / displaySpeakers.length) * index;
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * circleRadius;
              const y = Math.sin(rad) * circleRadius;
              const isActive = index === activeIndex;

              const slug =
                typeof speaker.slug === "string" ? speaker.slug : speaker.slug?.current;
              const href = slug ? `/keynotes/${slug}` : undefined;

              return (
                <div
                  key={speaker.__dupKey ?? `${speaker._id}-${index}`}
                  className={`speaker-item-mobile absolute top-0 left-0 font-semibold whitespace-nowrap transition-colors duration-200 select-none px-2 py-1 ${isActive ? "text-[#232323] bg-[#dc5a50] z-10" : "text-[#232323]/70"
                    }`}
                  style={{
                    transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
                    fontSize: "2.2vh",
                    letterSpacing: "0.15vh",
                  }}
                >
                  {href ? (
                    <Link
                      href={href}
                      prefetch={false} // avoids prefetching dozens of duplicates
                      className="speaker-link-mobile"
                      aria-label={`Read more about ${speaker.name}`}
                    >
                      {speaker.name}
                    </Link>
                  ) : (
                    <span className="speaker-link-mobile">{speaker.name}</span>
                  )}
                </div>
              );
            })}

            <style jsx>{`
            .speaker-item-mobile {
              left: 0;
              transform-origin: left center;
              text-align: left;
            }
            .speaker-link-mobile {
              position: relative;
              z-index: 1;            /* sit above bg highlight */
              display: inline-block; /* larger tap target */
              padding: 0.15rem 0.35rem;
              color: inherit;
              text-decoration: none;
            }
            `}</style>
          </div>
          {/* Bottom cut-off overlay */}
          <div className="pointer-events-none absolute left-0 bottom-0 w-full h-1/2 bg-[#F9F7F2]" />
        </div>
      </motion.div>
    )
  );
};

export default CircularTextSliderMobile;
