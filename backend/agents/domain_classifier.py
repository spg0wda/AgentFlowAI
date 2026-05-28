import os

from google import genai

from dotenv import load_dotenv

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def classify_domain(user_input: str):

    prompt = f"""
    Classify this project into exactly ONE domain.

    Domains:
    - Healthcare
    - Finance
    - Insurance
    - Education
    - Ecommerce
    - Technology

    Project:
    {user_input}

    Return ONLY domain name.
    """

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )

    return response.text.strip()