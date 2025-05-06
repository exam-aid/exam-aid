import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    // Retrieve learners from localStorage
    const learners = JSON.parse(localStorage.getItem('learners')) || [];

    // Check if username exists and if password matches
    const learner = learners.find(user => user.username === username && user.password === password);

    if (!learner) {
      setErrorMessage('No user registered with these credentials. Please register first.');
      return;
    }

    // Store the login state in localStorage (for session management)
    localStorage.setItem('loggedInUser', JSON.stringify(learner));

    alert('Login successful!');
    console.log("Logged in successfully, redirecting to /subjects");
    navigate('/subjects'); // Navigate to the subjects page after successful login
  };

  return (
    <div>
      <h2>Login Page</h2>
      <div>
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;