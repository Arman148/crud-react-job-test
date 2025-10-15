// src/components/form/Form.jsx
import React from "react";
import Select from "react-select";
import WarningWindow from "../warningWindow/WarningWindow";
import "./style.css";

// shared categories for both pages
export const categoryOptions = [
    { value: "City", label: "City" },
    { value: "Community events", label: "Community events" },
    { value: "Crime and Safety", label: "Crime and Safety" },
    { value: "Culture", label: "Culture" },
    { value: "Discounts & Benefits", label: "Discounts & Benefits" },
    { value: "Emergencies", label: "Emergencies" },
    { value: "Environment", label: "Environment" },
    { value: "Transportation", label: "Transportation" },
    { value: "Technology", label: "Technology" },
    { value: "Volunteer", label: "Volunteer" },
    { value: "Youth Programs", label: "Youth Programs" },
    { value: "Arts & Culture", label: "Arts & Culture" },
    { value: "For Seniors", label: "For Seniors" },
    { value: "Health & Wellness", label: "Health" },
    { value: "Kids & Family", label: "Kids & Family" },
];

const Form = ({ announcement, setAnnouncement, warning, setWarning, handleSubmit, title }) => {

    // Handles changes for text inputs (title, content, publicationDate)
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update only the field that changed while keeping other fields intact
        setAnnouncement(prev => ({ ...prev, [name]: value }));
    };

    // Handles changes for the multi-select categories
    const handleCategoriesChange = (selectedOptions) => {


        setAnnouncement(prev => ({ ...prev, categories: selectedOptions }));


    };





    return (
        <div className="edit-announcement">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={announcement.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea
                        name="content"
                        value={announcement.content}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <Select
                        isMulti
                        name="categories"
                        value={announcement.categories}
                        onChange={handleCategoriesChange}
                        options={categoryOptions}
                        className="react-select-container"
                        classNamePrefix="react-select"
                    />
                </div>
                <div className="form-group">
                    <label>Publication date</label>
                    <input
                        type="datetime-local"
                        name="publicationDate"
                        value={announcement.publicationDate}
                        onChange={handleChange}
                    />
                </div>
                <button className="publish-btn" type="submit">Publish</button>
            </form>
            <WarningWindow message={warning} onClose={() => setWarning("")} />
        </div>
    );
};

export default Form;
