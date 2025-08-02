# Expense Tracker
A full-featured **Expense Tracking Web App** built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).  
This app helps users track **inventory, sales, expenses, and profits** with charts to visualize trends.

> 📌 Inspired by the [Build a Full-Stack MERN Expense Tracker](https://www.youtube.com/watch?v=PQnbtnsYUho&list=LL&index=3&t=3335s),  
> with additional features, improvements, and personal customizations.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Credits](#credits)

## Features
- Track inventory, sales, and expenses
- Date and product search filtering
- Charts and analytics for trends and insights

## Tech Stack
**Frontend:** React.js, TailwindCSS, Recharts  
**Backend:** Node.js, Express.js, MongoDB

## Project Structure
expense-tracker/
│── backend/
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── controllers/ # Business logic
│ ├── server.js # Main server entry
│
│── frontend/
│ ├── components/ # Reusable UI components
│ ├── pages/ # React pages
│ ├── utils/ # Utility/helper functions
│ ├── hooks/ # Custom React hooks
│ ├── context/ # Global state management (React Context API)
│ ├── App.js # Main app file
│ ├── main.js # Entry point
│
│── package.json
│── README.md


## Installation & Setup
```bash
### 1. Download Project
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker

### 2. Install Dependencies
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

### 3. Configure Enviroment Variables
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=8000
```

## Usage 
```
## Backend
cd backend
npm run dev
## Frontend
cd frontend
npm run dev
```

## Credits
This project was initially inspired by and based on the tutorial:
[Build a Full-Stack MERN Expense Tracker](https://www.youtube.com/watch?v=PQnbtnsYUho&list=LL&index=3&t=3335s)
I followed the tutorial for the base implementation and then added my own features, improvements, and customizations.

