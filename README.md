Campus Lost & Found Management System

A web-based platform designed to simplify the process of reporting, searching, and recovering lost items within a campus.

Project Overview

The Campus Lost & Found Management System provides a centralized platform where students can report lost belongings, register found items, and submit ownership claims. Administrators can manage item records, verify claims, and track item movements through a simulated RFID check-in/check-out system.

Features

- Lost Item Reporting: Students can report items they have lost.
- Found Item Registration: Users can register items found on campus.
- Image Uploads: Add photographs to item records.
- Search and Filter: Search items by name, description, location, ID, type, and category.
- Claim Management: Students can submit claims for found items.
- Admin Dashboard: Administrators can review and approve or reject claims.
- Simulated RFID System: Simulate item check-in and check-out using Item IDs.
- Activity Logs: Track important actions performed in the system.
- Responsive Interface: Access the application on desktop and mobile devices.

Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Python, Flask
- Database: MongoDB Atlas
- Other Tools: PyMongo, Python-dotenv

Project Structure

CC_Porject/
├── static/
│   ├── uploads/
│   ├── script.js
│   └── style.css
├── templates/
├── .env.example
├── .gitignore
├── app.py
├── README.txt
└── requirements.txt

Installation and Setup

1. Clone the repository

git clone YOUR_GITHUB_REPOSITORY_URL
cd CC_Porject

2. Install dependencies

python -m pip install -r requirements.txt

3. Configure environment variables

Create a ".env" file in the project root and add:

SECRET_KEY=your_secret_key
ADMIN_USER=your_admin_username
ADMIN_PASS=your_admin_password
MONGO_URI=your_mongodb_atlas_connection_string

Replace the example values with your own credentials.

4. Run the application

python app.py

5. Open the application

Visit:

http://127.0.0.1:5000

Database

The application uses MongoDB Atlas to store item records, claims, and activity logs.

Note

The RFID functionality is simulated through the Admin Dashboard using Item IDs. No physical RFID hardware is required.

---

Campus Lost & Found Management System
Academic Project