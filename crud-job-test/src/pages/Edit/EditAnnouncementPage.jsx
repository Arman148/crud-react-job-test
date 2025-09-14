import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/classAPI";

const EditAnnouncementPage = () => {
    const { id } = useParams(); // Get announcement ID from URL
    const navigate = useNavigate();

    const [announcement, setAnnouncement] = useState({
        title: "",
        publicationDate: "",
        lastUpdate: "",
        categories: []
    });

    useEffect(() => {
        api.announcements.getByID(id).then(data => {
            setAnnouncement(data);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnnouncement(prev => ({ ...prev, [name]: value }));
    };

    const handleCategoriesChange = (e) => {
        const value = e.target.value;
        setAnnouncement(prev => ({
            ...prev,
            categories: value.split(",").map(cat => cat.trim())
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.announcements.update(
            id,
            announcement.title,
            announcement.publicationDate,
            announcement.lastUpdate,
            announcement.categories
        );
        navigate("/announcements"); // Return to announcements table after saving
    };

    return (
        <div>
            <h2>Edit Announcement</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={announcement.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <input
                        type="text"
                        name="content"
                        value={announcement.content}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Categories</label>
                    <input
                        type="text"
                        value={announcement.categories.join(", ")}
                        onChange={handleCategoriesChange}
                    />
                </div>
                <div>
                    <label>Publication Date:</label>
                    <input
                        type="text"
                        name="publicationDate"
                        value={announcement.publicationDate}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditAnnouncementPage;
