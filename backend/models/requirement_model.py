from sqlalchemy import Column, Integer, String, Text

from database import Base


class Requirement(Base):

    __tablename__ = "requirements"

    id = Column(Integer, primary_key=True, index=True)

    domain = Column(String(100))

    user_input = Column(Text)