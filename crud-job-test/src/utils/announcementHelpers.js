export const prepareAnnouncementForSubmit = (announcement) => {
    // Validation
    if (!announcement.title.trim()) throw new Error("Title cannot be empty.");
    if (!announcement.content.trim()) throw new Error("Content cannot be empty.");
    if (!announcement.publicationDate) throw new Error("Publication date is required.");
    if (!announcement.categories || announcement.categories.length === 0)
        throw new Error("Please select at least one category.");

    // Categories
    const categories = Array.isArray(announcement.categories)
        ? announcement.categories.map(opt => opt.value)
        : [];

    // Date formatting
    const rawDate = new Date(announcement.publicationDate);
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

    return {
        ...announcement,
        categories,
        formattedDate
    };
};