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
  const [dashboardLoading, setDashboardLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setDashboardLoading(true);

      const [
        statsRes,
        domainsRes,
        feedbackRes,
        projectsRes,
      ] = await Promise.all([
        axios.get(`${API_BASE_URL}/dashboard/stats`),
        axios.get(`${API_BASE_URL}/dashboard/domains`),
        axios.get(`${API_BASE_URL}/dashboard/feedback`),
        axios.get(`${API_BASE_URL}/dashboard/projects`),
      ]);

      setStats(statsRes.data);
      setDomains(domainsRes.data);
      setFeedback(feedbackRes.data);
      setProjects(projectsRes.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setDashboardLoading(false);
    }
  };

  const downloadProjectPDF = async (project) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/download-report`,
        {
          project_idea: project.idea,
          domain: project.domain,
          questions: project.questions
            ? project.questions.split("\n")
            : [],
          tech_stack: project.tech_stack || "Not available in saved dashboard record",
          feasibility: project.feasibility || "Not available in saved dashboard record",
          feedback: "Downloaded from dashboard project history",
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
      fileLink.setAttribute(
        "download",
        `AgentFlowAI_Project_${project.id}.pdf`
      );

      document.body.appendChild(fileLink);
      fileLink.click();
      fileLink.remove();

      window.URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.error("PDF Download Error:", error);
      alert("PDF download failed");
    }
  };

  return (
    <div className="dashboard" id="dashboard">
      <h2>📊 AgentFlowAI Dashboard</h2>

      {dashboardLoading && (
        <p className="dashboard-loading">
          Loading dashboard data...
        </p>
      )}

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

              <div className="questions-box">
                {project.questions
                  ?.split("\n")
                  .map((question, index) => (
                    <p key={index}>
                      • {question}
                    </p>
                  ))}
              </div>

              <button
                className="download-btn"
                onClick={() => downloadProjectPDF(project)}
              >
                📄 Download PDF
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;