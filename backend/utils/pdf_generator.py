from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import getSampleStyleSheet


def generate_project_report(
    filename,
    project
):

    doc = SimpleDocTemplate(filename)

    styles = getSampleStyleSheet()

    content = []

    content.append(
        Paragraph(
            "AgentFlowAI Project Report",
            styles["Title"]
        )
    )

    content.append(Spacer(1, 20))

    content.append(
        Paragraph(
            f"<b>Project Idea:</b> {project.idea}",
            styles["BodyText"]
        )
    )

    content.append(
        Paragraph(
            f"<b>Domain:</b> {project.domain}",
            styles["BodyText"]
        )
    )

    content.append(
    Paragraph(
        "<b>Requirement Questions:</b>",
        styles["Heading2"]
    )
)

    content.append(
        Paragraph(
            project.questions.replace("\n", "<br/>"),
            styles["BodyText"]
        )
    )

    content.append(
        Spacer(1, 20)
    )

    doc.build(content)

    return filename