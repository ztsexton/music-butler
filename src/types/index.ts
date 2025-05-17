// src/types/index.ts

// Re-export types from other files
export type { Song } from '../songs';

// App-wide types
export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  protected?: boolean;
  children?: RouteConfig[];
}

// Player related types
export interface PlaybackState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackSpeed: number;
}

// Add other centralized types as needed