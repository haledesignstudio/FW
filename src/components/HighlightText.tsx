import React from 'react';

const highlightColor = '#DC5A50';

export function HighlightText({ text }: { text: string }) {
  // Whole word regex, case-insensitive
  const futureRegex = /\bFuture\b/i;
  const growthRegex = /\bGrowth\b/i;
  const tomorrowRegex = /\bTomorrow\b/i;

  let match = text.match(futureRegex);
  if (!match) {
    match = text.match(growthRegex);
  }
  if (!match) {
    match = text.match(tomorrowRegex);
  }
  if (!match) return <>{text}</>;

  const start = match.index!;
  const end = start + match[0].length;

  return (
    <>
      {text.slice(0, start)}
      <span
        style={{
          background: highlightColor,
          padding: '0.1em 0.25em',
          color: 'inherit',
          boxDecorationBreak: 'clone',
        }}
      >
        {text.slice(start, end)}
      </span>
      {text.slice(end)}
    </>
  );
}
