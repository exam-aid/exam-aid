import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from 'components/Layout'; // Using your custom layout

function TeacherLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [grade, setGrade] = useState('3');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const savedTeachers = JSON.parse(localStorage.getItem('teacherAccounts')) || [];
    const found = savedTeachers.find(
      (t) => t.username === username && t.password === password && t.grade === grade
    );

    if (found) {
      localStorage.setItem('loggedInTeacher', JSON.stringify(found));
      navigate('/admin');
    } else {
      setError('Invalid credentials or grade.');
    }
  };

  return (
    <Layout>
      <div style={{ textAlign: 'center' }}>
        <h2>Teacher Login</h2>
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
        <label>Select Grade: </label>
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          style={{ padding: '10px', marginBottom: '10px' }}
        >
          {Array.from({ length: 10 }, (_, i) => i + 3).map((gradeOption) => (
            <option key={gradeOption} value={gradeOption}>
              Grade {gradeOption}
            </option>
          ))}
        </select>
        <br />
        <button onClick={handleLogin} style={{ padding: '10px 20px', marginTop: '10px' }}>
          Login
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        <p style={{ marginTop: '20px' }}>
          New teacher?{' '}
          <button onClick={() => navigate("/teacher-register")} style={{ padding: '6px 12px' }}>
            Register here
          </button>
        </p>
      </div>
    </Layout>
  );
}

export default TeacherLoginPage;