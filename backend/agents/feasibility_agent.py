from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def analyze_feasibility(project_idea):

    prompt = f"""
    You are a Senior Software Project Manager.

    Project Idea:
    {project_idea}

    Provide:

    Complexity
    Estimated Duration
    Recommended Team Size
    Risk Level
    Estimated Development Cost

    Keep it concise.
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