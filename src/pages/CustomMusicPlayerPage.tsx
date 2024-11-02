// src/pages/CustomMusicPlayerPage.tsx

import React from "react";
import CustomMusicPlayer from "../components/CustomMusicPlayer";

const CustomMusicPlayerPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Custom Music Player</h1>
      <CustomMusicPlayer />
    </div>
  );
};

export default CustomMusicPlayerPage;
