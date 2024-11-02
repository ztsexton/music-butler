// src/App.tsx

import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import CustomMusicPlayerPage from "./pages/CustomMusicPlayerPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <CustomMusicPlayerPage />
          </Layout>
        }
      />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default App;
