// src/components/CustomMusicPlayer.tsx

import React from "react";
import CircularSlider from "react-circular-slider-svg";
import songs from "../songs";
import SongCard from "./SongCard";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { formatTime } from "../utils/formatters";

const CustomMusicPlayer: React.FC = () => {
  const {
    audioRef,
    selectedSong,
    playbackState,
    selectSong,
    togglePlayPause,
    seek,
    setPlaybackSpeed,
  } = useAudioPlayer();

  // Handle seeking within the audio
  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.target.value);
    seek(newTime);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Song Selection Section */}
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Select a Song:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {songs.map((song) => (
            <SongCard
              key={song.name}
              song={song}
              onSelect={selectSong}
              isSelected={selectedSong?.name === song.name}
            />
          ))}
        </div>
      </div>

      {/* Audio Player Section */}
      {selectedSong && (
        <div>
          {/* Audio Element */}
          <audio ref={audioRef}>
            <source src={selectedSong.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          {/* Playback Controls */}
          <div className="w-full mt-4">
            {/* Progress Bar */}
            <input
              type="range"
              min="0"
              max={playbackState.duration}
              step="0.1"
              value={playbackState.currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              aria-label="Seek Slider"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatTime(playbackState.currentTime)}</span>
              <span>{formatTime(playbackState.duration)}</span>
            </div>
          </div>

          {/* Play/Pause Button and Playback Speed Controls */}
          <div className="flex flex-col items-center mt-4">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-4"
              aria-label={playbackState.isPlaying ? "Pause" : "Play"}
            >
              {playbackState.isPlaying ? "Pause" : "Play"}
            </button>

            {/* Playback Speed Control */}
            <div className="w-full flex flex-col items-center">
              <label className="font-medium text-gray-700 mb-2">
                Playback Speed ({playbackState.playbackSpeed}%)
              </label>
              <CircularSlider
                handle1={{
                  value: playbackState.playbackSpeed,
                  onChange: (v) => setPlaybackSpeed(v),
                }}
                minValue={50}
                maxValue={150}
                arcColor="#3b82f6"
                arcBackgroundColor="#d1d5db"
                trackWidth={10}
                handleSize={20}
                size={200}
                startAngle={50}
                endAngle={310}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomMusicPlayer;
