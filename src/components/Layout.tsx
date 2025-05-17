// src/components/Layout.tsx

import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout component that wraps all pages with common elements like navigation
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white text-center py-4 text-sm">
        <p>© {new Date().getFullYear()} Music Butler. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
