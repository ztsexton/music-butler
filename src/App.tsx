// src/App.tsx

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import CustomMusicPlayerPage from "./pages/CustomMusicPlayerPage";
import ProtectedRoute from "./ProtectedRoute";
import { RouteConfig } from "./types";

// Centralized route configuration
const routes: RouteConfig[] = [
  {
    path: "/",
    element: <CustomMusicPlayerPage />,
    protected: false,
  },
];

const App: React.FC = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.protected ? (
              <ProtectedRoute>
                <Layout>{route.element}</Layout>
              </ProtectedRoute>
            ) : (
              <Layout>{route.element}</Layout>
            )
          }
        />
      ))}
      {/* Fallback route for any undefined routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
