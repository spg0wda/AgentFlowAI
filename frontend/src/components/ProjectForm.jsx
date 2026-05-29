import { useState } from "react";
import axios from "axios";

function ProjectForm() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

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

  return (
    <div className="container">
      <h2>AgentFlowAI</h2>

      <input
        type="text"
        placeholder="Enter project idea..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Analyze
      </button>

      {result && (
        <div>
          <h3>Domain: {result.domain}</h3>

          <h4>Questions:</h4>

          <ul>
            {result.questions.map((q, index) => (
              <li key={index}>{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProjectForm;