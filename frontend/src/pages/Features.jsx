function Features() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>AgentFlowAI Features</h1>
        <p>
          Explore the AI-powered tools that help transform project ideas into
          structured software planning documents.
        </p>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <h3>🎯 Domain Classification</h3>
          <p>
            Automatically identifies the domain of a project idea such as
            Healthcare, Finance, HR Tech, Education, or E-commerce.
          </p>
        </div>

        <div className="feature-card">
          <h3>🧠 Requirement Generation</h3>
          <p>
            Generates smart requirement-gathering questions using Groq AI based
            on the user’s project idea.
          </p>
        </div>

        <div className="feature-card">
          <h3>🛠 Tech Stack Recommendation</h3>
          <p>
            Suggests suitable frontend, backend, database, AI tools, and
            deployment platforms.
          </p>
        </div>

        <div className="feature-card">
          <h3>📈 Feasibility Analysis</h3>
          <p>
            Provides estimated complexity, duration, team size, risk level, and
            development cost.
          </p>
        </div>

        <div className="feature-card">
          <h3>📅 AI Roadmap Generator</h3>
          <p>
            Creates a week-wise development roadmap for planning and execution.
          </p>
        </div>

        <div className="feature-card">
          <h3>📄 PDF Report Export</h3>
          <p>
            Exports project analysis as a downloadable PDF report for
            documentation and sharing.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Features;