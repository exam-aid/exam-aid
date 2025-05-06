import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../assets/logo.jpg';

function QuizPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const subject = queryParams.get("subject");
  const quizId = queryParams.get("quizId");

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const allQuizzes = JSON.parse(localStorage.getItem("quizQuestions")) || [];

    const lowerSubject = subject?.toLowerCase();
    const lowerQuizId = quizId?.toLowerCase();

    const currentQuiz = allQuizzes.find(
      (q) =>
        q.subject.toLowerCase() === lowerSubject &&
        q.quizId.toLowerCase() === lowerQuizId
    );

    if (currentQuiz) {
      setQuestions(currentQuiz.questions);
      setTimeLeft(currentQuiz.timer || 30);
    } else {
      alert(`Quiz not found for subject "${subject}" and ID "${quizId}".`);
      navigate("/subjects");
    }
  }, [subject, quizId, navigate]);

  const saveResultAndComplete = (finalScore) => {
    const results = JSON.parse(localStorage.getItem("quizResults")) || [];
    const newResult = {
      subject,
      quizId,
      score: finalScore,
      total: questions.length,
      date: new Date().toLocaleString(),
    };
    localStorage.setItem("quizResults", JSON.stringify([...results, newResult]));

    const completedQuizzes = JSON.parse(localStorage.getItem("completedQuizzes")) || [];
    if (!completedQuizzes.includes(quizId)) {
      localStorage.setItem("completedQuizzes", JSON.stringify([...completedQuizzes, quizId]));
    }

    setCompleted(true);
  };

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      setTimeLeft(questions[nextIndex]?.timer || 30);
    } else {
      saveResultAndComplete(score);
    }
  }, [currentIndex, questions, score]);

  useEffect(() => {
    if (timeLeft === null || completed) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleNext, completed]);

  const handleAnswer = (index) => {
    const isCorrect = index === questions[currentIndex].correctIndex;
    setScore((prev) => (isCorrect ? prev + 1 : prev));
    handleNext();
  };

  if (questions.length === 0) {
    return <div style={{ padding: "20px" }}>Loading quiz...</div>;
  }

  if (completed) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "10px",
            width: "300px",
            fontSize: "16px"
          }}
        />

        {/* ✅ Print-only area */}
        <div className="print-area">
          <img
            src={logo}
            alt="Quiz Platform Logo"
            style={{ height: "60px", marginBottom: "20px" }}
          />

          <h2>🎉 Quiz Completed!</h2>
          <p><strong>Name:</strong> {name}</p>
          <p>
            You scored <strong>{score}</strong> out of <strong>{questions.length}</strong> (
            {Math.round((score / questions.length) * 100)}%)
          </p>
          <p><strong>Subject:</strong> {subject}</p>
          <p><strong>Quiz ID:</strong> {quizId}</p>
          <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
        </div>

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => navigate("/subjects")}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          >
            Back to Subjects
          </button>
          <button
            onClick={() => navigate("/score")}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              backgroundColor: "#2196f3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          >
            View Scores
          </button>
          <button
            onClick={() => window.print()}
            style={{
              padding: "10px 20px",
              backgroundColor: "#fbc02d",
              color: "#333",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          >
            🖨️ Print Results
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>{subject} Quiz - {quizId}</h2>
      <div
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "red",
          marginBottom: "10px",
        }}
      >
        Time left: {timeLeft} seconds
      </div>

      <h3>{currentQuestion.question}</h3>
      {currentQuestion.options.map((opt, idx) => (
        <button
          key={idx}
          onClick={() => handleAnswer(idx)}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "10px",
            width: "100%",
            textAlign: "left",
          }}
        >
          {opt}
        </button>
      ))}

      <p style={{ marginTop: "20px" }}>
        Question {currentIndex + 1} of {questions.length}
      </p>
    </div>
  );
}

export default QuizPage;