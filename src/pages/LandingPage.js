import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login"); // Navigate to login page
  };

  const handleRegistration = () => {
    navigate("/register"); // Navigate to registration page
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Exam-Aid</h1>
        <p>Helping learners succeed — one quiz at a time!</p>
        <button onClick={handleLogin}>Login</button> {/* Login Button */}
        <button onClick={handleRegistration}>Sign Up / Register</button> {/* Register Button */}
      </header>
    </div>
  );
}

export default LandingPage;