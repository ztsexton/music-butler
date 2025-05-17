// src/components/Navbar.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">Music Butler</Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-blue-200 transition-colors">
              Home
            </Link>
            {/* Add more navigation links as your app grows */}
            {/* <Link to="/playlists" className="hover:text-blue-200 transition-colors">
              Playlists
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
