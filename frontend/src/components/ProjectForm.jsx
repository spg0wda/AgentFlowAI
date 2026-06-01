import { useState } from "react";
import axios from "axios";
import "../App.css";

function ProjectForm() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/requirements",
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
    }
  };

  const submitFeedback = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/feedback",
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
    }
  };

  return (
    <div className="container">

  <div className="hero-badge">
    🚀 AI Powered Requirement Engineering
  </div>

  <h1 className="title">
    AgentFlowAI
  </h1>

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
        >
          Analyze
        </button>

        {result && (
          <div className="result">
            <h3>Domain: {result.domain}</h3>

            <h4>Questions:</h4>

            <ul>
  {result.questions.map((q, index) => (
    <li key={index}>{q}</li>
  ))}
</ul>

<h4>🛠 Recommended Tech Stack</h4>

<pre className="tech-stack">
  {result.tech_stack}
</pre>
<h4>📈 Feasibility Analysis</h4>

<pre className="feasibility-box">
  {result.feasibility}
</pre>

<textarea
              className="feedback-box"
              rows="5"
              placeholder="Enter your answers..."
              value={feedback}
              onChange={(e) =>
                setFeedback(e.target.value)
              }
            />

            <button
              className="feedback-btn"
              onClick={submitFeedback}
            >
              Submit Feedback
            </button>
          </div>
        )}
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>AI Agents</h3>
          <p>Multi-agent requirement analysis</p>
        </div>

        <div className="feature-card">
          <h3>Smart Questions</h3>
          <p>Generate requirement gathering questions</p>
        </div>

        <div className="feature-card">
          <h3>MySQL Storage</h3>
          <p>Store feedback and learn continuously</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;