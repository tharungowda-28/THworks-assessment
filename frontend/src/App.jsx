import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Insights from "./components/Insights";
import {
  fetchTasks,
  fetchInsights,
  createTask,
  updateTask,
  deleteTask,
} from "./api";

export default function App() {
  // --- STATE MANAGEMENT ---
  const [tasks, setTasks] = useState([]);
  const [insights, setInsights] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  // --- DATA LOADING FUNCTION ---
  const load = async () => {
    // 1. Fetch Tasks
    const tasksRes = await fetchTasks({
      status: filterStatus,
      priority: filterPriority,
    });
    if (tasksRes.ok) {
      setTasks(tasksRes.tasks);
    }

    // 2. Fetch Insights
    const insightsRes = await fetchInsights();
    if (insightsRes.ok) {
      setInsights({
        ...insightsRes.insights,
      });
    }
  };

  // --- EFFECT HOOK: Load data on initial mount and filter change ---
  useEffect(() => {
    load();
    // Re-run whenever filterStatus or filterPriority changes
  }, [filterStatus, filterPriority]);

  // --- HANDLER FUNCTIONS ---

  const onCreate = async (payload) => {
    const res = await createTask(payload);
    if (res.ok) {
      await load();
      return true;
    } else {
      alert("Error creating task: " + JSON.stringify(res.errors || res.error));
      return false;
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    const res = await deleteTask(id);
    if (res.ok) {
      await load();
    } else {
      alert("Error deleting task: " + JSON.stringify(res.error));
    }
  };

  const onUpdate = async (id, payload) => {
    const res = await updateTask(id, payload);
    if (res.ok) {
      await load();
      return true;
    } else {
      alert("Error updating task: " + JSON.stringify(res.error));
      return false;
    }
  };

  // --- RENDER ---
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: 24,
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#f7f9fc",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <header
        style={{
          textAlign: "center",
          marginBottom: 24,
          padding: "16px 0",
          borderBottom: "2px solid #e0e6ed",
        }}
      >
        <h1 style={{ color: "#2c3e50", letterSpacing: 0.5 }}>
          📋 Task Tracker
        </h1>
        <p style={{ color: "#6c757d", fontSize: 15 }}>
          Manage your goals efficiently & stay on track
        </p>
      </header>

      {/* Main Layout: Flex container for Left and Right sections */}
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        {/* Left Section (Tasks + Filters) */}
        <div style={{ flex: 2 }}>
          {/* Task Form */}
          <TaskForm onCreate={onCreate} />

          {/* Filters */}
          <div
            style={{
              backgroundColor: "white",
              padding: 14,
              borderRadius: 10,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              marginTop: 16,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <label style={{ fontWeight: 600 }}>Filter status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: 6,
                borderRadius: 6,
                border: "1px solid #ccc",
                background: "#fff",
              }}
            >
              <option value="">All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <label style={{ fontWeight: 600 }}>Priority:</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              style={{
                padding: 6,
                borderRadius: 6,
                border: "1px solid #ccc",
                background: "#fff",
              }}
            >
              <option value="">All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Task List */}
          <TaskList tasks={tasks} onUpdate={onUpdate} onDelete={onDelete} />
        </div>

        {/* Right Section (Insights + Quick Actions) */}
        <div style={{ flex: 1 }}>
          {/* Insights Component */}
          <div
            style={{
              background: "white",
              borderRadius: 10,
              padding: 16,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <Insights insights={insights} />
          </div>

          {/* Quick Actions / Refresh Button */}
          <div
            style={{
              background: "white",
              borderRadius: 10,
              padding: 16,
              marginTop: 20,
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <h4 style={{ marginBottom: 10, color: "#2c3e50" }}>
              ⚡ Quick Actions
            </h4>
            <button
              onClick={load}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              🔄 Refresh Insights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}