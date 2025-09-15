import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import api from "../../api/classAPI";
import "./style.css";

const categoryOptions = [
    { value: "City", label: "City" },
    { value: "Community events", label: "Community events" },
    { value: "Crime and Safety", label: "Crime and Safety" },
    { value: "Culture", label: "Culture" },
    { value: "Discounts & Benefits", label: "Discounts & Benefits" },
    { value: "Emergencies", label: "Emergencies" },
    { value: "For Seniors", label: "For Seniors" },
    { value: "Health", label: "Health" },
    { value: "Kids & Family", label: "Kids & Family" },



];

const EditAnnouncementPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [announcement, setAnnouncement] = useState({
        title: "",
        content: "",
        publicationDate: "",
        categories: []
    });

    useEffect(() => {
        api.announcements.getByID(id).then(data => {
            setAnnouncement({
                ...data,
                categories: data.categories.map(cat => ({ label: cat, value: cat }))
            });
            console.log(announcement);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnnouncement(prev => ({ ...prev, [name]: value }));
        console.log("Changing field:", name, "=>", value);
    };

    const handleCategoriesChange = (selectedOptions) => {
        setAnnouncement(prev => ({
            ...prev,
            categories: selectedOptions
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const categories = announcement.categories.map(opt => opt.value);
        api.announcements.update(
            id,
            announcement.title,
            announcement.content,
            categories,
            announcement.publicationDate
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
                    <input
                        type="text"
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
        </div>
    );
};

export default EditAnnouncementPage;
