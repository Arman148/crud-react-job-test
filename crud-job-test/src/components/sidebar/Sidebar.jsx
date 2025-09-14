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
            <button onClick={goToAnnouncements}>Announcements</button>
        </div>
    );
}

export default Sidebar;