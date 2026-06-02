import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🤖 AgentFlow<span>AI</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/features">Features</Link>

        <Link to="/about">About</Link>
      </div>

      <Link to="/" className="nav-btn">
        Get Started
      </Link>
    </nav>
  );
}

export default Navbar;