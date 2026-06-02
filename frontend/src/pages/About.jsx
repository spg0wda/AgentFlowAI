function About() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>About AgentFlowAI</h1>
        <p>
          AgentFlowAI is an AI-powered requirement engineering and project
          planning platform built to help users convert raw ideas into
          structured software plans.
        </p>
      </div>

      <div className="about-card">
        <h2>Purpose</h2>
        <p>
          Many students, developers, freelancers, and founders have project
          ideas but struggle to define proper requirements, technology choices,
          feasibility, and planning steps. AgentFlowAI solves this by acting as
          an AI Business Analyst and Project Planning Assistant.
        </p>
      </div>

      <div className="about-card">
        <h2>How It Works</h2>
        <ul>
          <li>User enters a project idea.</li>
          <li>AI classifies the project domain.</li>
          <li>AI generates requirement-gathering questions.</li>
          <li>AI recommends a suitable technology stack.</li>
          <li>AI performs feasibility analysis.</li>
          <li>AI creates a development roadmap.</li>
          <li>The project is stored in MySQL and shown in the dashboard.</li>
          <li>User can download a PDF report.</li>
        </ul>
      </div>

      <div className="about-card">
        <h2>Tech Stack</h2>
        <p>
          React, Vite, React Router, FastAPI, Python, MySQL, SQLAlchemy, Groq
          API, ReportLab, Git, and GitHub.
        </p>
      </div>
    </div>
  );
}

export default About;