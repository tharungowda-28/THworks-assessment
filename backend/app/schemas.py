from datetime import datetime
from .models import PriorityEnum, StatusEnum

def validate_task_payload(data, require_all=True):
    errors = []
    title = data.get("title")
    due_date = data.get("due_date")
    priority = data.get("priority")
    status = data.get("status")

    if require_all and not title:
        errors.append("title is required")
    if require_all and not due_date:
        errors.append("due_date is required (YYYY-MM-DD)")

    # validate date parse
    if due_date:
        try:
            datetime.fromisoformat(due_date)
        except Exception:
            errors.append("due_date must be ISO format YYYY-MM-DD")

    if priority and priority not in [p.value for p in PriorityEnum]:
        errors.append(f"priority must be one of {[p.value for p in PriorityEnum]}")

    if status and status not in [s.value for s in StatusEnum]:
        errors.append(f"status must be one of {[s.value for s in StatusEnum]}")

    return errors
