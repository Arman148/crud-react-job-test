import React from "react";
import "./style.css";

const WarningWindow = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div className="warning-overlay">
            <div className="warning-box">
                <h3>Warning</h3>
                <p>{message}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    )
}

export default WarningWindow;