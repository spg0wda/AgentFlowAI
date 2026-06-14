from agents.groq_client import client


def generate_questions(project_idea: str):

    prompt = f"""
    You are a senior business analyst.

    Project Idea:
    {project_idea}

    Generate exactly 8 requirement gathering questions.

    Return only the questions as a numbered list.
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    text = response.choices[0].message.content

    questions = text.split("\n")

    return [
        q.strip()
        for q in questions
        if q.strip()
    ]


def generate_tech_stack(project_idea: str):

    prompt = f"""
    You are a senior software architect.

    Project Idea:
    {project_idea}

    Recommend a suitable tech stack.

    Include:
    - Frontend
    - Backend
    - Database
    - AI/ML Tools
    - Deployment
    - Additional Tools

    Keep it concise and practical.
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content.strip()


def generate_feasibility(project_idea: str):

    prompt = f"""
    You are a project feasibility analyst.

    Project Idea:
    {project_idea}

    Provide a short feasibility analysis.

    Include:
    - Complexity
    - Estimated Development Time
    - Required Team
    - Key Challenges
    - Risk Level
    - Final Recommendation

    Keep it clear and beginner friendly.
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content.strip()