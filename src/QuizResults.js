import React from 'react';

const QuizResults = () => {
  const quizScores = JSON.parse(localStorage.getItem("quizScores") || "[]");

  return (
    <div>
      <h2>Quiz Results</h2>
      {quizScores.length === 0 ? (
        <p>No results available.</p>
      ) : (
        <ul>
          {quizScores.map((result, index) => (
            <li key={index}>
              <strong>{result.subject}</strong> - Score: {result.score} / {result.total} ({result.date})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizResults;