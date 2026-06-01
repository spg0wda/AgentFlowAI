from sqlalchemy import Column, Integer, String, Text, DateTime
from database import Base
from datetime import datetime

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    idea = Column(Text)
    domain = Column(String(100))
    questions = Column(Text)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )