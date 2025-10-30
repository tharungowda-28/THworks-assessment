const API_BASE = "http://127.0.0.1:5000/api";

export async function fetchTasks({ status, priority }) {
  const res = await fetch(`${API_BASE}/tasks?status=${status}&priority=${priority}`);
  const data = await res.json();
  return { ok: res.ok, ...data };
}

export async function fetchInsights() {
  const res = await fetch(`${API_BASE}/insights`);
  const data = await res.json();
  return { ok: res.ok, ...data };
}

export async function createTask(payload) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  let data = {};
  try {
    data = await res.json();
  } catch {
    data = { error: "Invalid JSON from server" };
  }
  return { ok: res.ok, ...data };
}


export async function updateTask(id, payload) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return { ok: res.ok, ...data };
}

export async function deleteTask(id) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return { ok: res.ok, ...data };
}

