import { useState } from "react";
import axios from "axios";
import "../App.css";
import API_BASE_URL from "../config";

function ProjectForm() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) {
      alert("Please enter a project idea");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_BASE_URL}/requirements`,
        null,
        {
          params: {
            user_input: input,
          },
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    } finally {
      setLoading(false);
    }
  };

  const submitFeedback = async () => {
    if (!feedback.trim()) {
      alert("Please enter feedback before submitting");
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/feedback`,
        null,
        {
          params: {
            response: feedback,
          },
        }
      );

      alert("Feedback saved successfully!");
      setFeedback("");
    } catch (error) {
      console.error(error);
      alert("Failed to save feedback");
    }
  };

  const downloadPDF = async () => {
    if (!result) {
      alert("Please analyze a project first");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/download-report`,
        {
          project_idea: input,
          domain: result.domain,
          questions: result.questions || [],
          tech_stack: result.tech_stack || "Not generated",
          feasibility: result.feasibility || "Not generated",
          feedback: feedback || "No feedback submitted",
        },
        {
          responseType: "blob",
        }
      );

      const fileURL = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      const fileLink = document.createElement("a");
      fileLink.href = fileURL;
      fileLink.setAttribute("download", "AgentFlowAI_Report.pdf");

      document.body.appendChild(fileLink);
      fileLink.click();
      fileLink.remove();

      window.URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.error(error);
      alert("PDF download failed");
    }
  };

  return (
    <div className="container">
      <section className="hero" id="home">
        <div className="hero-badge">
          🚀 AI Powered Requirement Engineering
        </div>

        <h1 className="title">AgentFlowAI</h1>

        <p className="subtitle">
          Smart Requirement Analysis using AI Agents
        </p>

        <div className="card">
          <input
            className="input-box"
            type="text"
            placeholder="Enter your project idea..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            className="analyze-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>

          {result && (
            <div className="result">
              <h3>Detected Domain</h3>

              <p className="domain-pill">
                {result.domain}
              </p>

              <h3>Generated Questions</h3>

              <ul className="questions-list">
                {result.questions.map((q, index) => (
                  <li key={index}>
                    {q}
                  </li>
                ))}
              </ul>

              {result.tech_stack && (
                <div className="extra-output">
                  <h3>🛠 Recommended Tech Stack</h3>

                  <div className="ai-output-text">
                    {result.tech_stack}
                  </div>
                </div>
              )}

              {result.feasibility && (
                <div className="extra-output">
                  <h3>📊 Feasibility Analysis</h3>

                  <div className="ai-output-text">
                    {result.feasibility}
                  </div>
                </div>
              )}

              <textarea
                className="feedback-box"
                rows="5"
                placeholder="Enter your answers or feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />

              <div className="action-buttons">
                <button
                  className="feedback-btn"
                  onClick={submitFeedback}
                >
                  Submit Feedback
                </button>

                <button
                  className="pdf-btn"
                  onClick={downloadPDF}
                >
                  Download PDF Report
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="features" id="features">
        <div className="feature-card">
          <h3>AI Agents</h3>
          <p>Multi-agent requirement analysis powered by Groq AI.</p>
        </div>

        <div className="feature-card">
          <h3>Smart Questions</h3>
          <p>Generates project-specific requirement gathering questions.</p>
        </div>

        <div className="feature-card">
          <h3>Tech Stack</h3>
          <p>Recommends frontend, backend, database, and deployment tools.</p>
        </div>

        <div className="feature-card">
          <h3>Feasibility</h3>
          <p>Provides complexity, risks, timeline, and recommendation.</p>
        </div>

        <div className="feature-card">
          <h3>MySQL Storage</h3>
          <p>Stores projects, domains, and feedback securely in MySQL.</p>
        </div>
      </section>
    </div>
  );
}

export default ProjectForm;