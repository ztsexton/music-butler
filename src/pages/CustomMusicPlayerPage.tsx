// src/pages/CustomMusicPlayerPage.tsx

import React from 'react';
import CustomMusicPlayer from '../components/CustomMusicPlayer';

const CustomMusicPlayerPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Music Butler</h1>
      <p className="text-gray-600 text-center mb-6">
        Your personal music assistant. Select a song and enjoy high-quality playback with speed control.
      </p>
      <CustomMusicPlayer />
    </div>
  );
};

export default CustomMusicPlayerPage;
