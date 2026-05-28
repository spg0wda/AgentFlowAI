from fastapi import FastAPI, Depends

from sqlalchemy.orm import Session

from database import engine, Base

from models.domain_model import Domain

from db_dependency import get_db

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():

    return {
        "message": "AgentFlowAI Backend Running with MySQL"
    }

@app.post("/save-domain")
def save_domain(
    name: str,
    db: Session = Depends(get_db)
):

    new_domain = Domain(name=name)

    db.add(new_domain)

    db.commit()

    db.refresh(new_domain)

    return {
        "message": "Domain saved successfully",
        "domain": new_domain.name
    }