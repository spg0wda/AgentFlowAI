from agents.groq_client import client

def generate_questions(domain):

    prompt = f"""
    Generate 5 requirement gathering questions
    for a {domain} project.

    Return only the questions.
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
        q.strip("- ").strip()
        for q in questions
        if q.strip()
    ]