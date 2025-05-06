import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import logo from '../assets/logo.jpg';

function ViewScoresPage() {
  const [quizResults, setQuizResults] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem("quizResults")) || [];
    setQuizResults(savedResults);
  }, []);

  const handleClearScores = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all scores? This cannot be undone."
    );
    if (confirmDelete) {
      localStorage.removeItem("quizResults");
      setQuizResults([]);
    }
  };

  return (
    <Layout>
      <div style={{ padding: 20 }}>
        <h2>📊 Past Quiz Scores</h2>

        {/* ✅ Name Input */}
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "10px",
            width: "300px",
            fontSize: "16px",
            display: "block",
          }}
        />

        {/* ✅ Print Button */}
        <button
          onClick={() => window.print()}
          style={{
            marginBottom: 20,
            backgroundColor: "#fbc02d",
            color: "#333",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        >
          🖨️ Print Scores
        </button>

        {/* ✅ Printable Area */}
        <div className="print-area">
          {/* ✅ Logo */}
          <img
            src={logo}
            alt="Quiz Platform Logo"
            style={{ height: "60px", marginBottom: "20px" }}
          />

          {name && (
            <p>
              <strong>Name:</strong> {name}
            </p>
          )}

          {quizResults.length === 0 ? (
            <p>No past scores available yet.</p>
          ) : (
            <ul style={{ padding: 0, listStyle: "none" }}>
              {quizResults.map((result, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "15px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                >
                  <strong>Subject:</strong> {result.subject} <br />
                  <strong>Quiz ID:</strong> {result.quizId} <br />
                  <strong>Score:</strong> {result.score} / {result.total} (
                  {Math.round((result.score / result.total) * 100)}%) <br />
                  <strong>Date:</strong> {result.date}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Clear Button */}
        <button
          onClick={handleClearScores}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          🗑️ Clear All Scores
        </button>
      </div>
    </Layout>
  );
}

export default ViewScoresPage;