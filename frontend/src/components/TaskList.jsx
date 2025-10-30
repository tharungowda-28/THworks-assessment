import React, { useState } from "react";

export default function TaskList({ tasks, onUpdate, onDelete }) {
  const [editTask, setEditTask] = useState(null); // currently editing task
  const [formData, setFormData] = useState({});   // local edits

  if (!tasks) return null;

  const startEditing = (task) => {
    setEditTask(task.id);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
    });
  };

  const cancelEditing = () => {
    setEditTask(null);
    setFormData({});
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (id) => {
    await onUpdate(id, formData);
    cancelEditing();
  };

  return (
    <div style={{ marginTop: 16 }}>
      <h3>Tasks</h3>
      {tasks.length === 0 && <div>No tasks found.</div>}
      {tasks.map((t) => {
        const isEditing = editTask === t.id;
        return (
          <div
            key={t.id}
            style={{
              border: "1px solid #eee",
              padding: 10,
              marginBottom: 8,
              borderRadius: 6,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              backgroundColor:
                t.status === "Completed"
                  ? "#e6ffe6"
                  : t.status === "In Progress"
                  ? "#fffbe6"
                  : "white",
            }}
          >
            {/* Title + Date */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  style={{ flex: 1, marginRight: 8 }}
                />
              ) : (
                <strong>{t.title}</strong>
              )}
              <div>{t.due_date}</div>
            </div>

            {/* Description */}
            <div style={{ marginTop: 6 }}>
              {isEditing ? (
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={2}
                  style={{ width: "100%" }}
                />
              ) : (
                t.description
              )}
            </div>

            {/* Priority & Status */}
            <div style={{ marginTop: 8 }}>
              <small>
                Priority: {t.priority} • Status: {t.status}
              </small>
              <div
                style={{
                  marginTop: 6,
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <select
                  value={isEditing ? formData.status : t.status}
                  disabled={!isEditing}
                  onChange={(e) => handleChange("status", e.target.value)}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>

                <select
                  value={isEditing ? formData.priority : t.priority}
                  disabled={!isEditing}
                  onChange={(e) => handleChange("priority", e.target.value)}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>

                {/* 🧠 Update Button */}
                {isEditing ? (
                  <>
                    <button
                      onClick={() => handleSave(t.id)}
                      style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        padding: "4px 8px",
                        cursor: "pointer",
                      }}
                    >
                      💾 Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      style={{
                        backgroundColor: "#999",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        padding: "4px 8px",
                        cursor: "pointer",
                      }}
                    >
                      ✖ Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => startEditing(t)}
                    style={{
                      backgroundColor: "#2196F3",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      padding: "4px 8px",
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Edit
                  </button>
                )}

                {/* 🗑 Delete Button */}
                <button
                  onClick={() => onDelete(t.id)}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    padding: "4px 8px",
                    cursor: "pointer",
                  }}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
