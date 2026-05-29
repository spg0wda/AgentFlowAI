import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    total_domains: 0,
    total_feedback: 0,
  });

  const [domains, setDomains] = useState([]);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const statsRes = await axios.get(
        "http://127.0.0.1:8000/dashboard/stats"
      );

      const domainsRes = await axios.get(
        "http://127.0.0.1:8000/dashboard/domains"
      );

      const feedbackRes = await axios.get(
        "http://127.0.0.1:8000/dashboard/feedback"
      );

      setStats(statsRes.data);
      setDomains(domainsRes.data);
      setFeedback(feedbackRes.data);
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

    </div>
  );
}

export default Dashboard;