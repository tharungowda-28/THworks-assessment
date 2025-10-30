from flask import Blueprint, request, jsonify
from datetime import datetime
# from .database import db
from .models import db,Task, PriorityEnum, StatusEnum
from .schemas import validate_task_payload
from .utils import compute_insights

bp = Blueprint("main", __name__)

@bp.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json() or {}
    errors = validate_task_payload(data, require_all=True)
    if errors:
        return jsonify({"ok": False, "errors": errors}), 400

    # parse
    title = data.get("title")
    description = data.get("description")
    priority = data.get("priority", PriorityEnum.MEDIUM.value)
    due_date = datetime.fromisoformat(data["due_date"]).date()
    status = data.get("status", StatusEnum.PENDING.value)

    task = Task(title=title, description=description, priority=priority, due_date=due_date, status=status)
    db.session.add(task)
    db.session.commit()
    return jsonify({"ok": True, "task": task.to_dict()}), 201

@bp.route("/tasks", methods=["GET"])
def list_tasks():
    # support filter by status, priority; sort by due_date asc by default
    status = request.args.get("status")
    priority = request.args.get("priority")
    sort = request.args.get("sort", "due_date")
    q = Task.query
    if status:
        q = q.filter(Task.status == status)
    if priority:
        q = q.filter(Task.priority == priority)

    if sort == "due_date":
        q = q.order_by(Task.due_date.asc())
    elif sort == "created_at":
        q = q.order_by(Task.created_at.desc())

    tasks = q.all()
    return jsonify({"ok": True, "tasks": [t.to_dict() for t in tasks]})

@bp.route("/tasks/<int:task_id>", methods=["PATCH"])
def patch_task(task_id):
    t = Task.query.get(task_id)
    if not t:
        return jsonify({"ok": False, "error": "Task not found"}), 404
    data = request.get_json() or {}

    # only allow updating status, priority, title, description, due_date
    if "status" in data:
        if data["status"] not in [s.value for s in StatusEnum]:
            return jsonify({"ok": False, "error": f"Invalid status; must be one of {[s.value for s in StatusEnum]}"}), 400
        t.status = data["status"]

    if "priority" in data:
        if data["priority"] not in [p.value for p in PriorityEnum]:
            return jsonify({"ok": False, "error": f"Invalid priority; must be one of {[p.value for p in PriorityEnum]}"}), 400
        t.priority = data["priority"]

    if "title" in data:
        t.title = data["title"]
    if "description" in data:
        t.description = data["description"]
    if "due_date" in data:
        try:
            t.due_date = datetime.fromisoformat(data["due_date"]).date()
        except Exception:
            return jsonify({"ok": False, "error": "due_date must be ISO YYYY-MM-DD"}), 400

    db.session.commit()
    return jsonify({"ok": True, "task": t.to_dict()})

@bp.route("/insights", methods=["GET"])
def insights():
    ins = compute_insights()
    return jsonify({"ok": True, "insights": ins})
