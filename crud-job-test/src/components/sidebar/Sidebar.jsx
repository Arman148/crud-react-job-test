import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

const Sidebar = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const goToAnnouncements = () => {
        navigate("/announcements");
    };

    const goToCreateAnnouncement = () => {
        navigate("/announcements/create");
    };

    return (
        <div className="sidebar">
            <div>City Name</div>
            <button
                className={`sidebar-btn ${location.pathname === "/announcements" ? "active" : ""}`}
                onClick={goToAnnouncements}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="20"
                    height="20"
                >
                    <path d="M3 10v4h2l5 5V5L5 10H3z" />
                    <path d="M15 10h4v4h-4z" />
                </svg>
                Announcements
            </button>
            <button
                className={`sidebar-btn ${location.pathname === "/announcements/create" ? "active" : ""}`}
                onClick={goToCreateAnnouncement}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="20"
                    height="20"
                >
                    <path d="M12 5v14M5 12h14" />
                </svg>
                New Announcement
            </button>
        </div>
    );
}

export default Sidebar;