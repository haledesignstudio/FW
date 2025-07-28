"use client";
import React, { useState } from 'react';
import AudioVisualiser from '@/components/audioVisualiser';

interface Podcast {
  info?: string;
  audio?: {
    asset?: {
      url?: string;
    };
  };
}

export default function PodcastSection({ podcast }: { podcast: Podcast }) {
  const [showPodcast, setShowPodcast] = useState(!!podcast);
  if (!podcast) return null;
  return (
    <div className="flex flex-col">
      <label>
        <input type="radio" checked={showPodcast} onChange={() => setShowPodcast(!showPodcast)} /> Show Podcast
      </label>
      {showPodcast && (
        <div className="grid grid-cols-6 gap-4 w-full">
          {/* Cols 1-3: Podcast info */}
          <div className="col-span-3">
            <div>{podcast.info}</div>
          </div>
          {/* Col 4-6: Media player with AudioVisualiser */}
          <div className="col-span-3">
            <AudioVisualiser audioSrc={podcast.audio?.asset?.url} />
          </div>
        </div>
      )}
    </div>
  );
}
