from agents.groq_client import client

def classify_domain(user_input):

    prompt = f"""
    Classify the following project into one domain.

    Project:
    {user_input}

    Examples:
    Hospital Management -> Healthcare
    Stock Prediction -> Finance
    Food Delivery -> E-commerce
    Learning App -> Education

    Return only the domain.
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