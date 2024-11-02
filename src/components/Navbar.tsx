// src/components/Navbar.tsx

import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";

const Navbar: React.FC = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/login";

  return (
    <>
      {showNavbar && (
        <nav className="bg-gray-800 shadow">
          <div className="container mx-auto px-6 py-3 flex items-center justify-between">
            {/* Left Side - Logo and Navigation Links */}
            <div className="flex items-center space-x-6">
              <NavLink
                to="/"
                className="text-white text-2xl font-bold flex items-center"
              >
                <HomeIcon className="h-6 w-6 mr-2" />
                Music Butler
              </NavLink>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
