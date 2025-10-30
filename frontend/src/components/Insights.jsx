import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

export default function Insights({ insights }) {
  if (!insights) {
    return <div>Loading insights...</div>;
  }

  const statusData = [
    { name: "Completed", value: insights.completed },
    { name: "Pending", value: insights.pending },
    { name: "In Progress", value: insights.in_progress },
  ];

  const COLORS = ["#00C49F", "#FFBB28", "#0088FE"]; // Green, Yellow, Blue for Status

  const overdueData = [
    {
      name: "Total",
      total: insights.total,
      overdue: insights.overdue,
    },
  ];

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 16,
        borderRadius: 8,
        background: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: 10 }}>
        📊 Task Insights
      </h3>

      {/* PIE CHART - Task Status Distribution */}
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART - Total vs. Overdue */}
      <div style={{ height: 180, marginTop: 20 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={overdueData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#0088FE" name="Total Tasks" />
            <Bar dataKey="overdue" fill="#FF4C4C" name="Overdue" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* STATS - Quick Numbers */}
      <div
        style={{ marginTop: 10, textAlign: "center", fontSize: 14 }}
      >
        <p>
          <strong>Total:</strong> {insights.total}
        </p>
        <p>
          <strong>Overdue:</strong> {insights.overdue}
        </p>
        <p>
          <strong>Due Soon (7 days):</strong> {insights.due_soon_count}
        </p>
      </div>

      {/* SMART SUMMARY */}
      <div
        style={{
          marginTop: 16,
          backgroundColor: "#f0f9ff",
          borderLeft: "5px solid #0088FE",
          padding: "10px 12px",
          borderRadius: 6,
          fontStyle: "italic",
          color: "#034078",
        }}
      >
        🧠 {insights.summary}
      </div>
    </div>
  );
}