# 📢 DigiComplaint & Feedback Portal

A modern and secure **MERN stack application** designed to streamline the process of submitting, tracking, and managing complaints and feedback in institutions like colleges and organizations.

---

## 🚀 Features

### 🎓 Student Side
- 📝 Submit complaints with auto-generated **5-digit unique ID** 
- 🔍 Track complaint status using the ID
- 🗣️ Submit **anonymous feedback**
- 💡 Simple and responsive user interface

### 🛠️ Admin Side
- 📬 View all complaints and feedback submissions
- 📝 Update complaint status (Pending → In Progress → Resolved)
- 🔐 Secure login with role-based access

---

## 🧰 Tech Stack

| Frontend | Backend | Database | Other Tools |
|----------|---------|----------|-------------|
| React.js | Node.js | MongoDB  | Express.js, JWT, Axios, Mongoose |

---

## 📁 Folder Structure

DigiComplaint-Feedback/
├── client/ # React frontend
│ ├── src/
│ ├── public/
│ └── .env # Not included in Git
│
├── backend/ # Express backend
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── uploads/ # For file uploads (excluded from Git)
│ └── .env # Not included in Git
│
├── .gitignore
├── README.md

⚙️ Setup Instructions
1. Clone the Repository

2. Backend Setup
   cd backend
   npm install
   Create a .env file inside backend/:
   MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
  PORT=5000
Start the backend server:
npm start
3. Frontend Setup
   cd ../DigitalComplaint
   npm install
   npm start
📸 Screenshots

![Screenshot (61)](https://github.com/user-attachments/assets/2b79a364-80ec-4907-86ec-a7e424721a0a)
![Screenshot (62)](https://github.com/user-attachments/assets/8bf23336-7248-41c5-9134-fbb708eba47c)
![Screenshot (63)](https://github.com/user-attachments/assets/93ffaebd-5a2a-4e71-8237-b931310fa682)
![Screenshot (64)](https://github.com/user-attachments/assets/28412613-1e58-44de-9d89-a0627b7e6abe)
![Screenshot (65)](https://github.com/user-attachments/assets/17a2eca1-06a7-4afe-88f6-97dcbfda35bb)
![Screenshot (66)](https://github.com/user-attachments/assets/9df4760c-4806-4290-9b72-d3bb0fa21378)
![Screenshot (67)](https://github.com/user-attachments/assets/40aed493-d587-49f3-b343-d87ba1c20059)
![Screenshot (68)](https://github.com/user-attachments/assets/e10ccb8c-6373-4f41-8859-3705f4ecfe7b)

✍️ Author
Ankit Gupta
Computer Science & Engineering
Vignan’s Foundation for Science, Technology & Research

🔗 https://www.linkedin.com/in/ankit-gupta-507b242aa/
