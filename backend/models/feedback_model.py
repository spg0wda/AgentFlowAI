from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Text

from database import Base


class Feedback(Base):

    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True)

    response = Column(Text)