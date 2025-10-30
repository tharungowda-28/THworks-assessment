# 🧠 Task Tracker with Smart Insights

A clean and functional **Full-Stack Web Application** built with **Flask (Python)** and **React (Vite)**.  
This project allows users to **create, update, and manage tasks** while providing **smart, AI-like insights** about productivity and workload balance.

---

## 🧾 Overview

The **Task Tracker with Smart Insights** helps users stay organized by managing daily tasks and priorities, while a lightweight analytical engine summarizes how busy the upcoming week looks — all without any AI or LLMs.

---

## 🛠️ Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React (Vite), Tailwind CSS |
| **Backend** | Flask (Python) |
| **Database** | SQLite with SQLAlchemy ORM |
| **Language** | JavaScript + Python |
| **Build Tools** | Vite, npm |
| **Version Control** | Git + GitHub |

---

## 🚀 Features

✅ Create, edit, and view tasks (Title, Description, Priority, Due Date, Status)  
✅ Filter and sort tasks by **priority**, **status**, or **due date**  
✅ View a real-time **summary dashboard** with task insights  
✅ Lightweight **“AI-style” rule-based summary generator**  
✅ Modular backend routes and clean frontend integration  
✅ Uses **SQLite** for persistent storage  

---

## 🗂️ Project Structure

```

thworks-assessment/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── app.db
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── routes_tasks.py
│   │   ├── routes.py
│   │   ├── schemas.py
│   │   └── utils.py
│   ├── migrations/
│   ├── thenv/
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── Insights.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
│
├── README.md
├── DECLARATION.md
└── notes.md

````

---

## ⚙️ Backend Setup (Flask API)

### 1️⃣ Create Virtual Environment
```bash
cd backend
python -m venv thenv
thenv\Scripts\activate     # For Windows
# or source thenv/bin/activate (for macOS/Linux)
````

### 2️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 3️⃣ Run the Server

```bash
flask run
```

By default, the backend runs on 👉 **[http://localhost:5000](http://localhost:5000)**

---

## 🌐 Frontend Setup (React + Vite)

### 1️⃣ Install Dependencies

```bash
cd frontend
npm install
```

### 2️⃣ Start Development Server

```bash
npm run dev
```

Frontend runs at 👉 **[http://localhost:5173](http://localhost:5173)**

---

## 🔗 API Endpoints

| Method  | Endpoint     | Description                                  |
| ------- | ------------ | -------------------------------------------- |
| `POST`  | `/tasks`     | Add a new task                               |
| `GET`   | `/tasks`     | Get all tasks (with optional filters)        |
| `PATCH` | `/tasks/:id` | Update an existing task’s status or priority |
| `GET`   | `/insights`  | Generate smart insights summary              |

---

## 🧠 Insight Example

Example JSON response from `/insights`:

```json
{
  "ok": true,
  "insights": {
    "total": 10,
    "completed": 4,
    "pending": 3,
    "in_progress": 2,
    "overdue": 1
  },
  "summary": "You have 10 tasks — 4 completed, 3 pending, and 1 overdue. Focus on high-priority tasks to stay ahead this week."
}
```

---

## 📊 Insight Logic Explanation

The backend dynamically computes task statistics:

* Total, completed, pending, in-progress, and overdue tasks
* Due date comparison with the current date
* A natural-language “summary” string generated via **rule-based logic**

Example summaries:

* 🟢 “Your week looks productive — most tasks are already completed.”
* 🟠 “You have several high-priority tasks approaching soon.”
* 🔴 “Multiple overdue tasks — consider reprioritizing your schedule.”

---

## 🧱 Database Schema

**Table:** `Task`

| Field         | Type                                        | Description             |
| ------------- | ------------------------------------------- | ----------------------- |
| `id`          | Integer (Primary Key)                       | Unique identifier       |
| `title`       | String                                      | Task title              |
| `description` | Text                                        | Task details            |
| `priority`    | Enum('Low', 'Medium', 'High')               | Priority level          |
| `status`      | Enum('Pending', 'In Progress', 'Completed') | Current state           |
| `due_date`    | Date                                        | Task deadline           |
| `created_at`  | DateTime                                    | Task creation timestamp |

---

## 🧩 Example Workflow

1. Open the app in the browser
2. Create a new task (set title, description, and due date)
3. Filter by “Pending” or “High Priority”
4. Visit the **Insights Panel** — you’ll see summary text like:

   > “You have 12 open tasks — most are High priority and due within 3 days.”

---

## 💡 Design Highlights

* Modular Flask architecture with Blueprints
* SQLAlchemy ORM for DB abstraction
* React Hooks for clean state management
* Centralized API handler (`api.js`)
* Fully decoupled frontend and backend for scalability

---

## 🧮 Future Enhancements

🚀 Add **JWT Authentication** for multi-user management
📊 Include **charts/graphs** (Recharts or Chart.js) for visual insights
📧 Add **email or notification reminders** for overdue tasks
🔍 Implement **pagination and search filters**
☁️ Move to **PostgreSQL** or **MongoDB** for production deployment


---

## 🧑‍💻 Author

**Name:** Tharun B
**Expertise:** Python, Flask, React.js, Full-Stack Development

---

## 🪪 License

This project is licensed under the **MIT License** — feel free to modify and use it for learning or interviews.

---

## ✅ Declaration

This project was developed **independently**, without using any AI tools or code-generation assistance.

**Signed:** Tharun B
**Date:** 30 October 2025

```
## Demo Video
🎬 [Watch the Demo](https://drive.google.com/file/d/1gLC-w9DDNbvShzlUDxy8sR5ZynbSkl9M/view?usp=sharing)


