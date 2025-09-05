import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import LandingPage from "./Components/LandingPage";
import Dashboard from "./Components/Dashboard";
import MindMapGenerator from "./Components/MindMapGenerator";
import MindMapWorkspace from "./Components/MindMapWorkspace";
import MyMindMaps from "./Components/MyMindMaps";
import ProfileSettings from "./Components/ProfileSettings";

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/landing" element={<LandingPage />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/mindmap/new" element={<MindMapGenerator />} />

        <Route path="/mindmap/workspace" element={<MindMapWorkspace />} />

        <Route path="/mymindmaps" element={<MyMindMaps />} />

        <Route path="/profile" element={<ProfileSettings />} />

        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
}
