def generate_questions(domain):

    questions = {

        "Healthcare": [
            "Who are the users?",
            "Do you need appointment booking?",
            "Should doctors have separate login?",
            "Do you need patient records?"
        ],

        "Finance": [
            "Do users need bank accounts?",
            "Do you need transaction history?",
            "Should admin approve transactions?"
        ],

        "Insurance": [
            "Do users submit claims?",
            "Should agents verify claims?",
            "Need policy management?"
        ],

        "Education": [
            "Do students need login?",
            "Should teachers upload courses?",
            "Need exams module?"
        ],

        "Technology": [
            "What type of software is required?",
            "Do users need authentication?",
            "Need cloud deployment?"
        ]
    }

    return questions.get(
        domain,
        ["Provide more project details."]
    )