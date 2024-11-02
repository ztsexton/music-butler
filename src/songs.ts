// src/songs.ts
import waltz from "./assets/jeon-su-yeon.mp3";
import waltzCover from "./assets/jeon-su-yeon.jpg"; // Import album art

interface Song {
  name: string;
  artist: string;
  duration: string;
  cover: string;
  url: string;
}

const songs: Song[] = [
  {
    name: "Winding Line",
    artist: "Jeon Su Yeon",
    duration: "2:11",
    cover: waltzCover,
    url: waltz,
  },
  // Add other songs here
];

export default songs;

export type { Song };
