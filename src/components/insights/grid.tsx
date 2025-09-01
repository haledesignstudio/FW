// src/components/insights/grid.tsx
import React from 'react';

export type GridItem = {
  id: string;
  // Optional content so layout-only items can reuse the helper
  content?: React.ReactNode;

  // Desktop (md+ with aspect ratio >= 1/1)
  colSpan?: number;
  rowSpan?: number;

  // Mobile (<= 1080px)
  mobileColSpan?: number;
  mobileRowSpan?: number;

  // Landscape small screens (max-height: 600px and max-width: 1080px)
  landscapeColSpan?: number;
  landscapeRowSpan?: number;
};

export const getGridClasses = (item: GridItem) => {
  // Remove flex classes that interfere with grid sizing
  const base = ['min-h-0']; // Keep min-h-0 for text overflow, remove flex

  // --- Mobile (<= 1080px) ---
  if (item.mobileColSpan === 0 || item.mobileRowSpan === 0) {
    base.push('block', '[@media(max-width:1080px)]:hidden');
  } else {
    base.push(
      `col-span-${item.mobileColSpan ?? 2}`,
      `row-span-${item.mobileRowSpan ?? 1}`
    );
  }

  // --- Landscape small screens (max-h:600px & max-w:1080px) ---
  if (item.landscapeColSpan === 0 || item.landscapeRowSpan === 0) {
    base.push('[@media(max-height:600px)_and_(max-width:1080px)]:hidden');
  } else {
    base.push(
      `[@media(max-height:600px)_and_(max-width:1080px)]:col-span-${item.landscapeColSpan ?? 6}`,
      `[@media(max-height:600px)_and_(max-width:1080px)]:row-span-${item.landscapeRowSpan ?? 1}`
    );
  }

  // --- Desktop (md+ with aspect ratio >= 1/1) ---
  if (item.colSpan === 0 || item.rowSpan === 0) {
    base.push('[@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:hidden');
  } else {
    base.push(
      `[@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:col-span-${item.colSpan ?? 6}`,
      `[@media(min-width:1080px)_and_(min-aspect-ratio:1/1)]:row-span-${item.rowSpan ?? 1}`
    );
  }

  return base.join(' ');
};