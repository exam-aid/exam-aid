import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SubjectSelectionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedSubject = location.state?.subject; // ✅ subject passed from main selection page

  const [subjectQuizzes, setSubjectQuizzes] = useState([]);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);

  useEffect(() => {
    const allQuizzes = JSON.parse(localStorage.getItem("quizQuestions")) || [];
    const quizzesForSubject = allQuizzes.filter((q) => q.subject === selectedSubject);
    setSubjectQuizzes(quizzesForSubject);

    const completed = JSON.parse(localStorage.getItem("completedQuizzes")) || [];
    setCompletedQuizzes(completed);
  }, [selectedSubject]);

  const handleQuizStart = (quizId) => {
    navigate(`/quiz/${selectedSubject}/${quizId}`, {
      state: { subject: selectedSubject, quizId }
    });
  };

  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>{selectedSubject} Quizzes</h1>
      <p style={{ marginBottom: "30px", fontSize: "18px" }}>
        Choose a quiz to start or review your progress.
      </p>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        {subjectQuizzes.length > 0 ? (
          subjectQuizzes.map((quiz, idx) => (
            <button
              key={idx}
              onClick={() => handleQuizStart(quiz.quizId)}
              style={{
                padding: "15px 30px",
                fontSize: "16px",
                borderRadius: "8px",
                backgroundColor: completedQuizzes.includes(quiz.quizId)
                  ? "#8bc34a"
                  : "#f44336",
                color: "white",
                border: "none",
                width: "250px",
                cursor: completedQuizzes.includes(quiz.quizId) ? "not-allowed" : "pointer",
              }}
              disabled={completedQuizzes.includes(quiz.quizId)}
            >
              {quiz.quizId} {completedQuizzes.includes(quiz.quizId) ? "(Completed)" : "(Start Quiz)"}
            </button>
          ))
        ) : (
          <p>No quizzes found for {selectedSubject}.</p>
        )}
      </div>
    </div>
  );
}

export default SubjectSelectionPage;