// src/hooks/useAudioPlayer.ts

import { useState, useRef, useEffect } from 'react';
import { Song, PlaybackState } from '../types';

export function useAudioPlayer() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [playbackState, setPlaybackState] = useState<PlaybackState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    playbackSpeed: 100, // Default to 100%
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle song selection
  const selectSong = (song: Song) => {
    setSelectedSong(song);
    setPlaybackState(prevState => ({
      ...prevState,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
    }));

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  };

  // Handle play/pause toggle
  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (playbackState.isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    }
  };

  // Handle seeking
  const seek = (time: number) => {
    if (!audioRef.current) return;
    
    audioRef.current.currentTime = time;
    setPlaybackState(prevState => ({
      ...prevState,
      currentTime: time,
    }));
  };

  // Handle playback speed changes
  const setPlaybackSpeed = (speed: number) => {
    setPlaybackState(prevState => ({
      ...prevState,
      playbackSpeed: speed,
    }));
  };

  // Set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set the playback rate based on current playbackSpeed
    audio.playbackRate = playbackState.playbackSpeed / 100;

    // Event handlers
    const handleTimeUpdate = () => {
      setPlaybackState(prevState => ({
        ...prevState,
        currentTime: audio.currentTime,
      }));
    };

    const handleLoadedMetadata = () => {
      setPlaybackState(prevState => ({
        ...prevState,
        duration: audio.duration,
      }));
    };

    const handlePlay = () => {
      setPlaybackState(prevState => ({
        ...prevState,
        isPlaying: true,
      }));
    };

    const handlePause = () => {
      setPlaybackState(prevState => ({
        ...prevState,
        isPlaying: false,
      }));
    };

    const handleEnded = () => {
      setPlaybackState(prevState => ({
        ...prevState,
        isPlaying: false,
        currentTime: 0,
      }));
    };

    const handleError = () => {
      console.error("Error loading audio.");
      setPlaybackState(prevState => ({
        ...prevState,
        isPlaying: false,
      }));
    };

    // Attach event listeners
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Cleanup event listeners
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [selectedSong, playbackState.playbackSpeed]);

  // Update playback rate when speed changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackState.playbackSpeed / 100;
    }
  }, [playbackState.playbackSpeed]);

  return {
    audioRef,
    selectedSong,
    playbackState,
    selectSong,
    togglePlayPause,
    seek,
    setPlaybackSpeed,
  };
}