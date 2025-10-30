# from datetime import datetime
# from sqlalchemy import Enum as SAEnum
# import enum
# from .database import db

# class PriorityEnum(str, enum.Enum):
#     LOW = "Low"
#     MEDIUM = "Medium"
#     HIGH = "High"

# class StatusEnum(str, enum.Enum):
#     PENDING = "Pending"
#     IN_PROGRESS = "In Progress"
#     COMPLETED = "Completed"

# class Task(db.Model):
#     __tablename__ = "tasks"
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(200), nullable=False)
#     description = db.Column(db.Text, nullable=True)
#     priority = db.Column(db.String(20), nullable=False, default=PriorityEnum.MEDIUM.value)
#     due_date = db.Column(db.Date, nullable=False)
#     status = db.Column(db.String(20), nullable=False, default=StatusEnum.PENDING.value)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
#     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "title": self.title,
#             "description": self.description,
#             "priority": self.priority,
#             "due_date": self.due_date.isoformat(),
#             "status": self.status,
#             "created_at": self.created_at.isoformat(),
#             "updated_at": self.updated_at.isoformat() if self.updated_at else None
#         }
# app/models.py
from datetime import datetime
from .database import db

class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    priority = db.Column(db.String(20))
    due_date = db.Column(db.DateTime, nullable=True)  # ✅ changed from False to True
    status = db.Column(db.String(20), default="Pending")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "priority": self.priority,
            "due_date": self.due_date.strftime("%Y-%m-%d") if self.due_date else None,
            "status": self.status,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S")
        }
