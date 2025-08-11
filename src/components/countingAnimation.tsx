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
  duration = 6000,
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

  useEffect(() => {
    if (!start) return;
    if (triggerOnce && hasAnimated) return;

    const startTime = Date.now();
    let raf = 0;

    const tick = () => {
      const progress = Math.min((Date.now() - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * targetValue);
      setCount(current);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(targetValue);
        setHasAnimated(true);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, depsKey, duration, targetValue, triggerOnce, hasAnimated]);

  return <Tag className={className}>{count}{suffix}</Tag>;
}
