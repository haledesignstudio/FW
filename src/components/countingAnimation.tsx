'use client';

import React, { useEffect, useMemo, useState } from 'react';

interface CountingAnimationProps {
  target: number | string;
  duration?: number;
  className?: string;
  as?: React.ElementType;
  start?: boolean;          // <- only animate when this is true
  triggerOnce?: boolean;    // optional: animate once only
}

function normalizeTarget(t: number | string) {
  if (typeof t === 'number' && Number.isFinite(t)) return { value: t, suffix: '' };
  const raw = String(t).trim();
  const m = raw.match(/^([\d,]+(?:\.\d+)?)(\+)?$/);
  if (m) {
    const value = Number(m[1].replace(/,/g, ''));
    return { value: Number.isFinite(value) ? value : 0, suffix: m[2] ?? '' };
  }
  const hasPlus = /\+$/.test(raw);
  const digits = raw.replace(/[^\d.]/g, '');
  const value = Number(digits);
  return { value: Number.isFinite(value) ? value : 0, suffix: hasPlus ? '+' : '' };
}

export default function CountingAnimation({
  target,
  duration = 3000, // Reduced from 6000ms to 3000ms for faster completion
  className = '',
  as: Tag = 'span',
  start = false,
  triggerOnce = true,
}: CountingAnimationProps) {
  const [{ value: targetValue, suffix }, depsKey] = useMemo(() => {
    const norm = normalizeTarget(target);
    return [norm, `${norm.value}|${norm.suffix}`] as const;
  }, [target]);

  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Detect mobile for performance optimization
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const targetFPS = isMobile ? 30 : 60; // Half the frame rate on mobile
  const frameInterval = 1000 / targetFPS;
  const optimizedDuration = isMobile ? Math.min(duration * 0.6, 2000) : duration; // 40% faster on mobile, max 2s

  useEffect(() => {
    if (!start) return;
    if (triggerOnce && hasAnimated) return;

    const startTime = Date.now();
    let lastFrameTime = 0;
    let raf = 0;

    const tick = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      
      // Throttle frame rate for mobile performance
      if (now - lastFrameTime < frameInterval) {
        raf = requestAnimationFrame(tick);
        return;
      }
      lastFrameTime = now;

      const progress = Math.min(elapsed / optimizedDuration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * targetValue);
      
      // Only update if the value actually changed to reduce DOM thrashing
      if (current !== count) {
        setCount(current);
      }
      
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(targetValue);
        setHasAnimated(true);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, depsKey, optimizedDuration, targetValue, triggerOnce, hasAnimated, frameInterval]);

  return <Tag className={className}>{count}{suffix}</Tag>;
}
