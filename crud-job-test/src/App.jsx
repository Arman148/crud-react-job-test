import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import AnnouncementsPage from "./pages/announcements/AnnouncementsPage";
import EditAnnouncementPage from "./pages/Edit/EditAnnouncementPage";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/announcements/edit/:id" element={<EditAnnouncementPage />} />
            <Route path="*" element={<Navigate to="/announcements" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;