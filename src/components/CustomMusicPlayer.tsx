// src/components/CustomMusicPlayer.tsx

import React, { useRef, useState, useEffect } from "react";
import songs from "../songs";
import CircularSlider from "react-circular-slider-svg";
import SongCard from "./SongCard";

interface Song {
  name: string;
  url: string;
}

const CustomMusicPlayer: React.FC = () => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(100); // Default to 100%
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  /**
   * useEffect to handle song selection.
   * Sets up event listeners for the audio element when a new song is selected.
   */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset currentTime and duration when a new song is selected
    setCurrentTime(0);
    setDuration(0);

    // Set the playback rate based on current playbackSpeed
    audio.playbackRate = playbackSpeed / 100;

    // Event handler to update currentTime state
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    // Event handler to set duration when metadata is loaded
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    // Event handlers to sync isPlaying state
    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    // Event handler for when the song ends
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    // Event handler for audio errors
    const handleError = () => {
      console.error("Error loading audio.");
      setIsPlaying(false);
    };

    // Attach event listeners
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    // Cleanup event listeners on component unmount or when selectedSong changes
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [selectedSong, playbackSpeed]); // Depend on selectedSong and playbackSpeed

  /**
   * useEffect to handle playback speed changes.
   * Updates the audio element's playbackRate without affecting currentTime or duration.
   */
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = playbackSpeed / 100; // Convert percentage to decimal
    }
  }, [playbackSpeed]); // Depend only on playbackSpeed

  /**
   * Handles seeking within the audio.
   * Updates both the audio element's currentTime and the component's currentTime state.
   */
  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = parseFloat(event.target.value);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  /**
   * Handles song selection.
   * Sets the selected song, resets playback states, and loads the new song.
   */
  const handleSongSelect = (song: Song) => {
    setSelectedSong(song);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load(); // Load the new song
      // Optional: Automatically play the new song upon selection
      // audioRef.current.play().catch((error) => {
      //   console.error("Error playing audio:", error);
      // });
    }
  };

  /**
   * Handles play/pause toggle.
   * Plays or pauses the audio based on the current isPlaying state.
   */
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        // setIsPlaying(false); // This is now handled by the 'pause' event listener
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
        // setIsPlaying(true); // This is now handled by the 'play' event listener
      }
    }
  };

  /**
   * Formats time from seconds to mm:ss format.
   * @param time - Time in seconds
   * @returns Formatted time string
   */
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
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
              onSelect={handleSongSelect}
              isSelected={selectedSong?.name === song.name}
            />
          ))}
        </div>
      </div>

      {/* Audio Player Section */}
      {selectedSong && (
        <div>
          {/* Audio Element */}
          <audio ref={audioRef} onEnded={() => setIsPlaying(false)}>
            <source src={selectedSong.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          {/* Playback Controls */}
          <div className="w-full mt-4">
            {/* Progress Bar */}
            <input
              type="range"
              min="0"
              max={duration}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              aria-label="Seek Slider"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Play/Pause Button and Playback Speed Controls */}
          <div className="flex flex-col items-center mt-4">
            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-4"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>

            {/* Playback Speed Control */}
            <div className="w-full flex flex-col items-center">
              <label className="font-medium text-gray-700 mb-2">
                Playback Speed ({playbackSpeed}%)
              </label>
              <CircularSlider
                handle1={{
                  value: playbackSpeed,
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
