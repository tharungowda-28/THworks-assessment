import React, { useState } from "react";

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!title || !dueDate) {
      alert("Title and due date required");
      return;
    }
    const payload = { title, description, priority, due_date: dueDate };
    const ok = await onCreate(payload);
    if (ok) {
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");
    }
  };

  return (
    <form
      onSubmit={submit}
      style={{
        background: "white",
        borderRadius: 12,
        padding: 20,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        maxWidth: 500,
        margin: "20px auto",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: 16, color: "#2c3e50", textAlign: "center" }}>📝 Create Task</h2>

      {/* Title */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontWeight: 600 }}>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
            marginTop: 4,
            fontSize: 14,
          }}
        />
      </div>

      {/* Description */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontWeight: 600 }}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task details..."
          rows="3"
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
            marginTop: 4,
            fontSize: 14,
            resize: "vertical",
          }}
        />
      </div>

      {/* Priority + Due date */}
      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontWeight: 600 }}>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ccc",
              marginTop: 4,
              fontSize: 14,
            }}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ fontWeight: 600 }}>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ccc",
              marginTop: 4,
              fontSize: 14,
            }}
          />
        </div>
      </div>

      {/* Button */}
      <div style={{ textAlign: "center" }}>
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: 6,
            fontWeight: 600,
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          ➕ Create Task
        </button>
      </div>
    </form>
  );
}
