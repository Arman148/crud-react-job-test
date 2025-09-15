import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Sidebar = () => {

    const navigate = useNavigate();

    const goToAnnouncements = () => {
        navigate("/announcements");
    };

    return (
        <div className="sidebar">
            <div>City Name</div>
            <button onClick={goToAnnouncements}>
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
        </div>
    );
}

export default Sidebar;