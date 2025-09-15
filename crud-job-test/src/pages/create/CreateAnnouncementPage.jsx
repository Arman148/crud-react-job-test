import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/classAPI";
import Form from "../../components/form/AnnouncementForm";
import { prepareAnnouncementForSubmit } from "../../utils/announcementHelpers";

const CreateAnnouncementPage = () => {
    const navigate = useNavigate();

    const [announcement, setAnnouncement] = useState({
        title: "",
        content: "",
        publicationDate: "",
        categories: []
    });

    const [warning, setWarning] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { title, content, categories, formattedDate } =
                prepareAnnouncementForSubmit(announcement);

            await api.announcements.create(
                title,
                content,
                formattedDate, // publicationDate
                formattedDate, // lastUpdate
                categories
            );

            navigate("/announcements");
        } catch (error) {
            setWarning(error.message);
        }
    };

    return (
        <Form
            title="Create New Announcement"
            announcement={announcement}
            setAnnouncement={setAnnouncement}
            warning={warning}
            setWarning={setWarning}
            handleSubmit={handleSubmit}
        />
    );
};

export default CreateAnnouncementPage;
