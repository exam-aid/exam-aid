import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ScorePage() {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const navigate = useNavigate();

  // Load quiz results from localStorage
  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem("quizResults")) || [];
    setResults(savedResults);
    setFilteredResults(savedResults);
  }, []);

  // Handle subject filtering
  const handleSubjectFilter = (e) => {
    const subject = e.target.value;
    setSelectedSubject(subject);

    if (subject === "") {
      setFilteredResults(results);
    } else {
      const filtered = results.filter((result) => result.subject === subject);
      setFilteredResults(filtered);
    }
  };

  // Sort results by date (newest to oldest)
  const sortedResults = [...filteredResults].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Saved Quiz Results</h2>

      {/* Dropdown for filtering by subject */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="subjectFilter" style={{ fontSize: "16px" }}>Filter by Subject: </label>
        <select
          id="subjectFilter"
          value={selectedSubject}
          onChange={handleSubjectFilter}
          style={{
            padding: "8px",
            marginLeft: "10px",
            fontSize: "16px",
            borderRadius: "5px"
          }}
        >
          <option value="">All Subjects</option>
          <option value="Maths">Maths</option>
          <option value="English">English</option>
          <option value="Afrikaans">Afrikaans</option>
          <option value="Lewensvaardighede">Lewensvaardighede</option>
          <option value="Natuurwetenskappe">Natuurwetenskappe</option>
          <option value="Geografie">Geografie</option>
          <option value="Geskiedenis">Geskiedenis</option>
        </select>
      </div>

      {sortedResults.length === 0 ? (
        <p>No quiz results found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "30px" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Subject</th>
              <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Quiz ID</th>
              <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Score</th>
              <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Out of</th>
              <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>%</th>
              <th style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((res, idx) => (
              <tr key={idx}>
                <td style={{ padding: "8px 0" }}>{res.subject}</td>
                <td>{res.quizId || "N/A"}</td>
                <td>{res.score}</td>
                <td>{res.total}</td>
                <td>{((res.score / res.total) * 100).toFixed(0)}%</td>
                <td>{res.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Navigation Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => navigate("/subjects")}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px"
          }}
        >
          Back to Subjects
        </button>

        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px"
          }}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default ScorePage;