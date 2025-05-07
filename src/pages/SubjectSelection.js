import React from "react";
import { useNavigate } from "react-router-dom";

function SubjectSelection() {
  const navigate = useNavigate();

  const subjects = [
    "Maths",
    "English",
    "Afrikaans",
    "Lewensvaardighede",
    "Natuurwetenskappe",
    "Geografie",
    "Geskiedenis"
  ];

  const handleSubjectClick = (subject) => {
    navigate("/subject-selection", { state: { subject } });
  };

  const buttonStyle = {
    padding: "15px 30px",
    fontSize: "16px",
    borderRadius: "8px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    width: "250px",
    marginBottom: "15px",
    cursor: "pointer"
  };

  const adminButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336"
  };

  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to Exam Aid</h1>
      <p style={{ marginBottom: "30px", fontSize: "18px" }}>
        Choose a subject to see all available quizzes.
      </p>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {subjects.map((subject, idx) => (
          <button
            key={idx}
            onClick={() => handleSubjectClick(subject)}
            style={buttonStyle}
          >
            {subject}
          </button>
        ))}

        <button
          onClick={() => navigate("/spelling-test")}
          style={buttonStyle}
        >
          Start Spelling Test
        </button>

        <button
          onClick={() => navigate("/teacher-login")}
          style={adminButtonStyle}
        >
          Go to Admin Page (Teachers Only)
        </button>
      </div>
    </div>
  );
}

export default SubjectSelection;