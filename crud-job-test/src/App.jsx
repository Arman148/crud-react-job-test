import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import AnnouncementsPage from "./pages/announcements/AnnouncementsPage";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/announcements" element={<AnnouncementsPage />} />
            {/* redirect root to announcements */}
            <Route path="*" element={<Navigate to="/announcements" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;