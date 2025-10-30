# Design Notes — Task Tracker with Smart Insights

---

## 🧱 Database Design

**Table:** `Task`

| Field | Type | Description |
|--------|------|-------------|
| id | Integer (Primary Key) | Unique identifier |
| title | String | Task title |
| description | Text | Details about the task |
| priority | Enum('Low', 'Medium', 'High') | Task priority |
| status | Enum('Pending', 'In Progress', 'Completed') | Task progress |
| due_date | Date | Deadline for the task |
| created_at | DateTime | Timestamp for creation |

---

## ⚙️ Backend Logic

- **Framework:** Flask  
- **Database:** SQLite using SQLAlchemy ORM  
- Organized routes into:
  - `tasks.py` → Task CRUD operations  
  - `insights.py` → Analytics and smart summary  
- Implemented lightweight analytical logic for `/insights`:
  - Counts total, completed, pending, overdue, and in-progress tasks  
  - Generates a natural-language summary message  

---

## 🧠 Insight Generation Logic

**Example Rule-Based Summary Logic:**
- If most tasks are **High priority** → “Your week looks intense — focus on high-priority tasks first.”
- If multiple **overdue tasks** → “Several tasks are overdue. Reprioritize soon.”
- If most are **completed** → “Great job! You’re staying productive and consistent.”
- Otherwise → “You have a balanced workload ahead.”

---

## 🧩 Frontend Design

- **React + Vite** setup with components:
  - `TaskForm` → Create and edit tasks  
  - `TaskList` → Display tasks with sorting and filtering  
  - `InsightsPanel` → Fetch `/insights` and show summary  
- State management using React Hooks  
- Clean, simple, mobile-friendly layout  
- `api.js` handles API communication with the backend  

---

## 🧮 Improvements & Future Scope

- Add **JWT authentication** for multi-user support  
- Implement **pagination** and **search filters**  
- Visualize insights with **charts (Recharts or Chart.js)**  
- Add **email or notification reminders** for overdue tasks  
- Support **cloud database (PostgreSQL)** for scalability  

---

## 💡 Design Decisions

- Chose **Flask** for simplicity and control over routing logic  
- Used **SQLite** for lightweight local storage  
- Used **rule-based summary generation** instead of LLM for compliance  
- Frontend separated from backend for clean API-driven architecture  
- Used semantic commit structure for maintainability  

---

**Author:** Tharun B  
**Date:** 30 October 2025
