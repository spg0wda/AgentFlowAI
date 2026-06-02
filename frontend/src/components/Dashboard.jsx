import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

function Dashboard() {
  const [stats, setStats] = useState({
    total_domains: 0,
    total_feedback: 0,
    total_projects: 0,
  });

  const [domains, setDomains] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const statsRes = await axios.get(
        `${API_BASE_URL}/dashboard/stats`
      );

      const domainsRes = await axios.get(
        `${API_BASE_URL}/dashboard/domains`
      );

      const feedbackRes = await axios.get(
        `${API_BASE_URL}/dashboard/feedback`
      );

      const projectsRes = await axios.get(
        `${API_BASE_URL}/dashboard/projects`
      );

      setStats(statsRes.data);
      setDomains(domainsRes.data);
      setFeedback(feedbackRes.data);
      setProjects(projectsRes.data);

    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  return (
    <div className="dashboard">

      <h2>📊 AgentFlowAI Dashboard</h2>

      <div className="stats">

        <div className="stat-card">
          <h3>Total Domains</h3>
          <p>{stats.total_domains}</p>
        </div>

        <div className="stat-card">
          <h3>Total Feedback</h3>
          <p>{stats.total_feedback}</p>
        </div>

        <div className="stat-card">
          <h3>Total Projects</h3>
          <p>{stats.total_projects}</p>
        </div>

      </div>

      <div className="section">

        <h3>📁 Domain History</h3>

        {domains.length === 0 ? (
          <p>No domains available.</p>
        ) : (
          <ul>
            {domains.map((domain) => (
              <li key={domain.id}>
                {domain.name}
              </li>
            ))}
          </ul>
        )}

      </div>

      <div className="section">

        <h3>💬 Feedback History</h3>

        {feedback.length === 0 ? (
          <p>No feedback submitted yet.</p>
        ) : (
          <ul>
            {feedback.map((item) => (
              <li key={item.id}>
                {item.response}
              </li>
            ))}
          </ul>
        )}

      </div>

      <div className="section">

        <h3>📄 Project History</h3>

        {projects.length === 0 ? (
          <p>No projects available.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="project-card"
            >

              <h4>{project.idea}</h4>

              <p>
                <strong>Domain:</strong> {project.domain}
              </p>

              <pre>
                {project.questions}
              </pre>

              <a
  className="download-btn"
  href={`${API_BASE_URL}/download-report/${project.id}`}
  target="_blank"
  rel="noopener noreferrer"
>
  📄 Download PDF
</a>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Dashboard;