from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def recommend_tech_stack(project_idea):

    prompt = f"""
    You are a Senior Software Architect.

    Project Idea:
    {project_idea}

    Recommend:

    Frontend
    Backend
    Database
    Cloud Platform
    AI Tools (if required)

    Keep the response concise.
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

    return response.choices[0].message.content