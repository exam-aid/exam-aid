import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LearnerLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const learners = JSON.parse(localStorage.getItem("learners")) || [];

    // Check if any learner matches the entered username and password
    const learner = learners.find((learner) => learner.username === username && learner.password === password);

    if (learner) {
      // Successfully logged in, save the logged-in user to localStorage
      localStorage.setItem("loggedInLearner", JSON.stringify(learner));
      navigate("/learner-dashboard"); // Redirect to learner dashboard or home page
    } else {
      setError("Incorrect username or password.");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Learner Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '10px', marginBottom: '10px' }}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: '10px', marginBottom: '10px' }}
      />
      <br />
      <button onClick={handleLogin} style={{ padding: '10px 20px' }}>Login</button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}

export default LearnerLoginPage;