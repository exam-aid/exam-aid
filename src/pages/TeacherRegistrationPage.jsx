import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from 'components/Layout'; // ✅ CORRECT

function TeacherRegistrationPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [grade, setGrade] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (!username || !password || !grade) {
      setError("All fields are required.");
      return;
    }

    // Load existing teachers from localStorage
    const existing = JSON.parse(localStorage.getItem('teacherAccounts')) || [];

    // Check if the username already exists
    const alreadyExists = existing.some(teacher => teacher.username === username);
    if (alreadyExists) {
      setError("A teacher with that username already exists.");
      return;
    }

    // Add new teacher to list
    const newTeacher = { username, password, grade };
    const updated = [...existing, newTeacher];

    localStorage.setItem('teacherAccounts', JSON.stringify(updated));
    alert("Teacher registered successfully!");
    navigate("/teacher-login");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Teacher Registration</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Grade (e.g. Grade 3)"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        /><br />
        <button onClick={handleRegister}>Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
    </div>
  );
}

export default TeacherRegistrationPage;