README

Project Overview:
For this task, I had the freedom to store data anywhere I wanted, so I decided to use MockAPI and create a fully functional CRUD application using fetch requests.

Project Setup and Structure:

1. I first set up the API with basic data in the same style provided in the task.
2. Next, I organized the project structure, dividing it into components, pages, api, styles, and utils folders.
3. I implemented classAPI, a utility I had written previously for another CRUD project (available on my GitHub).
4. I created a simple sidebar with buttons for navigation.
5. I implemented the main page for Announcements, which contains a table built with react-table. In the original task, the table only had an edit button.
6. I added a page for editing announcements, initially implementing a form to edit existing data.
7. I continued developing the CRUD functionality by adding delete and create buttons. Each row in the table can now be deleted by ID, and the sidebar includes a button to navigate to the Create Announcement page.
8. To avoid repeating code, I separated the form logic into a reusable component and kept only initialization in the Create and Edit pages.
9. Some data preparation functions were moved to utils, so the data handling for announcements is separate from the submit logic.
10. Finally, I focused on CSS improvements, making the UI cleaner, more user-friendly, and visually closer to the original design, and added comments throughout the code.


Key Implementation Details:

1. Table Sorting and Last Update Logic:
- The table initially sorts by last update.
- When editing, I chose to synchronize last update with publication date to maintain logical consistency.
- Columns can be sorted interactively by clicking on them.

2. Date Handling:
- Original date format was MM/DD/YYYY HH:mm.
- I improved the UI by using <input type="datetime-local">, preventing users from entering invalid dates.
- The format is double-checked before sending data to the API.

3. CRUD Functionality:
- CRUD operations work with the API, not just a local array.
- The Create and Delete buttons manage both backend data and the user interface, giving full control over announcements.

Technologies & Libraries Used:

- React – for building the UI
- React Router – for page navigation
- react-select – for multi-select categories
- @tanstack/react-table – for dynamic, sortable tables
- react-icons – for icons like pencil and trash
- MockAPI – to simulate a backend API
- CSS – for styling and responsive design

Setup Instructions:

- Clone the repository:
    git clone <repository-url>
    cd <project-folder>

- Install dependencies:
    npm install

- Start the development server:
    npm start