import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import api from "../../api/classAPI";
import WarningWindow from "../../components/warningWindow/WarningWindow";
import "./style.css";

// same
const categoryOptions = [
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

const EditAnnouncementPage = () => {

    const { id } = useParams();
    const navigate = useNavigate(); // same

    //same
    const [announcement, setAnnouncement] = useState({
        title: "",
        content: "",
        publicationDate: "",
        categories: []
    });

    //same
    const [warning, setWarning] = useState("");

    // useEffect does not repeat
    useEffect(() => {
        api.announcements.getByID(id).then(data => {

            let formattedDate = "";

            // changing MM/DD/YYYY HH:mm format to YYYY-MM-DDTHH:MM so the date field will read the old publication date
            if (data.publicationDate) {
                const [datePart, timePart] = data.publicationDate.split(" ");
                const [month, day, year] = datePart.split("/");
                const [hour, minute] = timePart.split(":");

                formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
            }

            setAnnouncement({
                ...data,
                publicationDate: formattedDate,
                categories: Array.isArray(data.categories)
                    ? data.categories.map(cat => ({ label: cat, value: cat }))
                    : []
            });
            console.log(announcement);
        });
    }, [id]);

    // same
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnnouncement(prev => ({ ...prev, [name]: value }));
        console.log("Changing field:", name, "=>", value);
    };

    // same
    const handleCategoriesChange = (selectedOptions) => {
        setAnnouncement(prev => ({
            ...prev,
            categories: selectedOptions
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!announcement.title.trim()) return setWarning("Title cannot be empty.");
        if (!announcement.content.trim()) return setWarning("Content cannot be empty.");
        if (!announcement.publicationDate) return setWarning("Publication date is required.");
        if (!announcement.categories || announcement.categories.length === 0) return setWarning("Please select at least one category.");

        const categories = Array.isArray(announcement.categories)
            ? announcement.categories.map(opt => opt.value)
            : []

        const rawDate = new Date(announcement.publicationDate);

        // hardcoded
        const datePart = rawDate.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric"
        });
        const timePart = rawDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });
        const formattedDate = `${datePart} ${timePart}`;

        api.announcements.update(
            id,
            announcement.title,
            announcement.content,
            formattedDate,
            formattedDate,
            categories
        );

        navigate("/announcements");
    };

    return (
        <div className="edit-announcement">
            <h2>Edit the announcement</h2>
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

export default EditAnnouncementPage;
