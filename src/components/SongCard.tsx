// src/components/SongCard.tsx
import React, { memo } from "react";
import { Song } from "../types";
import { truncateText } from "../utils/formatters";

interface SongCardProps {
  song: Song;
  onSelect: (song: Song) => void;
  isSelected: boolean;
}

/**
 * SongCard component displays a song with its cover, title, artist and duration
 * Optimized with React.memo to prevent unnecessary re-renders
 */
const SongCard: React.FC<SongCardProps> = ({ song, onSelect, isSelected }) => (
  <div
    className={`p-4 border rounded-md cursor-pointer transition-colors duration-200 hover:bg-gray-50 ${
      isSelected ? "border-blue-500 bg-blue-50" : "border-gray-300"
    }`}
    onClick={() => onSelect(song)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(song);
      }
    }}
    tabIndex={0}
    role="button"
    aria-pressed={isSelected}
    aria-label={`Select ${song.name} by ${song.artist}`}
  >
    <img
      src={song.cover}
      alt={`${song.name} album cover`}
      className="w-full h-32 object-cover rounded-md"
      loading="lazy"
    />
    <h3 className="mt-2 text-lg font-semibold" title={song.name}>
      {truncateText(song.name, 20)}
    </h3>
    <p className="text-gray-500" title={song.artist}>
      {truncateText(song.artist, 25)}
    </p>
    <p className="text-gray-500">{song.duration}</p>
  </div>
);

// Use memo to prevent unnecessary re-renders
export default memo(SongCard);
