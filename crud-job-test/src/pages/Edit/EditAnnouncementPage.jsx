import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/classAPI";
import Form, { categoryOptions } from "../../components/form/AnnouncementForm";
import { prepareAnnouncementForSubmit } from "../../utils/announcementHelpers";

const EditAnnouncementPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [announcement, setAnnouncement] = useState({
        title: "",
        content: "",
        publicationDate: "",
        categories: []
    });

    const [warning, setWarning] = useState("");

    useEffect(() => {
        api.announcements.getByID(id).then(data => {
            let formattedDate = "";

            // Convert stored MM/DD/YYYY HH:mm format to
            // YYYY-MM-DDTHH:mm so it works with <input type="datetime-local">
            if (data.publicationDate) {
                const [datePart, timePart] = data.publicationDate.split(" ");
                const [month, day, year] = datePart.split("/");
                const [hour, minute] = timePart.split(":");
                formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
            }
            // Set the announcement state with the loaded data
            setAnnouncement({
                ...data,
                publicationDate: formattedDate,
                categories: Array.isArray(data.categories)
                    ? data.categories.map(cat => ({ label: cat, value: cat }))
                    : []
            });
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // This handles validation, formats date, and extracts categories
            const { title, content, categories, formattedDate } =
                prepareAnnouncementForSubmit(announcement);

            // Send the updated data to the API
            await api.announcements.update(
                id,
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
            title="Edit the announcement"
            announcement={announcement}
            setAnnouncement={setAnnouncement}
            warning={warning}
            setWarning={setWarning}
            handleSubmit={handleSubmit}
        />
    );
};

export default EditAnnouncementPage;
