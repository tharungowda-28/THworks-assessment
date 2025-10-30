from flask import Blueprint, request, jsonify
from .models import db, Task
from datetime import datetime, date, timedelta

api = Blueprint('api', __name__, url_prefix='/api')

# --- Helper function for fetching tasks based on filters ---
def get_filtered_tasks(status_filter, priority_filter):
    query = Task.query

    if status_filter:
        query = query.filter_by(status=status_filter)
    if priority_filter:
        query = query.filter_by(priority=priority_filter)

    return query.all()

# -------------------------------------------------
# 📊 INSIGHTS ROUTE
# -------------------------------------------------
@api.route('/insights', methods=['GET'])
def get_insights():
    tasks = Task.query.all()

    total = len(tasks)
    completed = sum(1 for t in tasks if t.status == 'Completed')
    pending = sum(1 for t in tasks if t.status == 'Pending')
    in_progress = sum(1 for t in tasks if t.status == 'In Progress')
    overdue = sum(
        1 for t in tasks
        if t.due_date and t.due_date.date() < date.today() and t.status != 'Completed'
    )

    due_soon_count = sum(
        1 for t in tasks
        if t.due_date and 0 <= (t.due_date.date() - date.today()).days <= 7
    )

    # --- Generate summary sentence ---
    if total == 0:
        summary = "No tasks yet. Add a few to get started!"
    elif completed == total:
        summary = "All tasks are completed. Excellent work!"
    elif overdue > 0:
        summary = f"{overdue} task(s) are overdue. Try addressing them soon."
    elif due_soon_count > 0:
        summary = f"{due_soon_count} task(s) are due within the next 7 days. Stay proactive!"
    elif in_progress > 0:
        summary = f"{in_progress} task(s) are currently in progress. Keep the momentum going!"
    else:
        summary = "You have some pending tasks. Stay focused and complete them!"

    insights = {
        "total": total,
        "completed": completed,
        "pending": pending,
        "in_progress": in_progress,
        "overdue": overdue,
        "due_soon_count": due_soon_count,
        "summary": summary,
    }

    return jsonify({"ok": True, "insights": insights})

# -------------------------------------------------
# ✅ GET ALL TASKS (with filters)
# -------------------------------------------------
# NOTE: Renamed the route to /tasks to handle the main task list fetch
@api.route('/tasks', methods=['GET'])
def get_all_tasks():
    """Fetches tasks, optionally filtered by status and priority."""
    filter_status = request.args.get('status')
    filter_priority = request.args.get('priority')
    
    tasks = get_filtered_tasks(filter_status, filter_priority)

    return jsonify(
        {"ok": True, "tasks": [t.to_dict() for t in tasks]}
    )

# -------------------------------------------------
# ✅ POST (create new task)
# -------------------------------------------------
@api.route('/tasks', methods=['POST'])
def add_task():
    """Creates a new task from the JSON payload."""
    data = request.get_json()
    
    # Handle optional date formatting
    due_date_str = data.get("due_date")
    due_date_obj = None
    if due_date_str:
        try:
            # Assumes format "YYYY-MM-DD"
            due_date_obj = datetime.strptime(due_date_str, "%Y-%m-%d")
        except ValueError:
            return jsonify({"ok": False, "error": "Invalid date format. Use YYYY-MM-DD."}), 400

    try:
        task = Task(
            title=data.get("title"),
            description=data.get("description"),
            priority=data.get("priority", "Medium"), # Default to Medium
            due_date=due_date_obj,
            status="Pending" # Default status
        )
        db.session.add(task)
        db.session.commit()
        return jsonify({"ok": True, "task": task.to_dict()}), 201

    except Exception as e:
        db.session.rollback()
        # Log the actual exception for debugging in a real application
        return jsonify({"ok": False, "error": f"Database error: {str(e)}"}), 500

# -------------------------------------------------
# ✅ PUT (update existing task)
# -------------------------------------------------
@api.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    """Updates an existing task by ID."""
    task = Task.query.get_or_404(task_id)
    data = request.get_json()
    
    # Update fields only if present in the request data
    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.priority = data.get('priority', task.priority)
    task.status = data.get('status', task.status)
    
    # Optional: Handle due_date update if needed

    db.session.commit()
    return jsonify({"ok": True, "task": task.to_dict()})

# -------------------------------------------------
# ✅ DELETE (task)
# -------------------------------------------------
@api.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    """Deletes a task by ID."""
    task = Task.query.get_or_404(task_id)
    
    db.session.delete(task)
    db.session.commit()
    
    return jsonify({'ok': True, 'message': f'Task {task_id} deleted successfully'})

