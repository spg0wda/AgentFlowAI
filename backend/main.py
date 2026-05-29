from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from database import engine, Base
from db_dependency import get_db

from models.domain_model import Domain
from models.requirement_model import Requirement
from models.feedback_model import Feedback

from agents.domain_classifier import classify_domain
from agents.requirement_agent import generate_questions

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


@app.post("/classify-domain")
def classify(
    user_input: str,
    db: Session = Depends(get_db)
):

    domain = classify_domain(user_input)

    existing_domain = db.query(Domain).filter(
        Domain.name == domain
    ).first()

    if not existing_domain:
        new_domain = Domain(name=domain)

        db.add(new_domain)
        db.commit()

    return {
        "user_input": user_input,
        "domain": domain
    }

@app.post("/requirements")
def get_requirements(
    user_input: str,
    db: Session = Depends(get_db)
):

    domain = classify_domain(user_input)

    existing_domain = db.query(Domain).filter(
        Domain.name == domain
    ).first()

    if not existing_domain:
        new_domain = Domain(name=domain)

        db.add(new_domain)
        db.commit()

    questions = generate_questions(domain)

    return {
        "domain": domain,
        "questions": questions
    }

@app.post("/feedback")
def save_feedback(
    response: str,
    db: Session = Depends(get_db)
):

    item = Feedback(response=response)

    db.add(item)
    db.commit()

    return {
        "message": "Feedback saved"
    }
@app.get("/dashboard/stats")
def dashboard_stats(
    db: Session = Depends(get_db)
):

    total_domains = db.query(Domain).count()

    total_feedback = db.query(Feedback).count()

    return {
        "total_domains": total_domains,
        "total_feedback": total_feedback
    }
@app.get("/dashboard/domains")
def get_domains(
    db: Session = Depends(get_db)
):

    domains = db.query(Domain).all()

    return [
        {
            "id": d.id,
            "name": d.name
        }
        for d in domains
    ]
@app.get("/dashboard/feedback")
def get_feedback(
    db: Session = Depends(get_db)
):

    feedback_list = db.query(Feedback).all()

    return [
        {
            "id": f.id,
            "response": f.response
        }
        for f in feedback_list
    ]