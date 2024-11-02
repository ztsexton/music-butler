// src/components/SongCard.tsx
import React from "react";
import { Song } from "../songs";

interface SongCardProps {
  song: Song;
  onSelect: (song: Song) => void;
  isSelected: boolean;
}

const SongCard: React.FC<SongCardProps> = ({ song, onSelect, isSelected }) => (
  <div
    className={`p-4 border rounded-md cursor-pointer ${
      isSelected ? "border-blue-500" : "border-gray-300"
    }`}
    onClick={() => onSelect(song)}
  >
    <img
      src={song.cover}
      alt={`${song.name} cover`}
      className="w-full h-32 object-cover rounded-md"
    />
    <h3 className="mt-2 text-lg font-semibold">{song.name}</h3>
    <p className="text-gray-500">{song.artist}</p>
    <p className="text-gray-500">{song.duration}</p>
  </div>
);

export default SongCard;
