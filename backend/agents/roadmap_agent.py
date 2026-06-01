from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def generate_roadmap(project_idea):

    prompt = f"""
    Project:
    {project_idea}

    Create a 6-week development roadmap.

    Format:
    Week 1:
    tasks

    Week 2:
    tasks

    Continue until Week 6.
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