from datetime import date, timedelta
from sqlalchemy import func
from .models import Task
from .database import db

def compute_insights():
    """
    Returns a dict with:
      - total_tasks
      - counts by status
      - counts by priority
      - due_soon_count (due within next 7 days)
      - busiest_due_date (date with most tasks due)
      - summary (human readable)
    """
    today = date.today()
    in_7_days = today + timedelta(days=7)

    total_tasks = db.session.query(func.count(Task.id)).scalar() or 0

    # status counts
    status_counts = {}
    for s in ["Pending", "In Progress", "Completed"]:
        count = db.session.query(func.count(Task.id)).filter(Task.status == s).scalar()
        status_counts[s] = int(count or 0)

    # priority counts
    priority_counts = {}
    for p in ["Low", "Medium", "High"]:
        count = db.session.query(func.count(Task.id)).filter(Task.priority == p).scalar()
        priority_counts[p] = int(count or 0)

    # due soon
    due_soon_count = db.session.query(func.count(Task.id)).filter(Task.due_date >= today, Task.due_date <= in_7_days).scalar() or 0
    due_soon_count = int(due_soon_count)

    # busiest due date
    busiest_row = (
        db.session.query(Task.due_date, func.count(Task.id).label("c"))
        .group_by(Task.due_date)
        .order_by(func.count(Task.id).desc())
        .first()
    )
    busiest_date = busiest_row[0].isoformat() if busiest_row else None
    busiest_count = int(busiest_row[1]) if busiest_row else 0

    # build a human-readable summary
    most_priority = max(priority_counts, key=lambda k: priority_counts[k]) if total_tasks else None
    summary = "No tasks yet."
    if total_tasks:
        summary = f"You have {total_tasks} tasks. "
        if due_soon_count > 0:
            summary += f"{due_soon_count} due within 7 days. "
        if most_priority:
            summary += f"Most tasks are {most_priority} priority."
        if busiest_date:
            summary += f" Busiest due date: {busiest_date} ({busiest_count} tasks)."

    return {
        "total_tasks": int(total_tasks),
        "status_counts": status_counts,
        "priority_counts": priority_counts,
        "due_soon_count": due_soon_count,
        "busiest_date": busiest_date,
        "busiest_count": busiest_count,
        "summary": summary
    }
