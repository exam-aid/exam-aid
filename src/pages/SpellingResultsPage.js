import React, { useEffect, useState } from "react";

function SpellingResultsPage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("spellingScores")) || [];
    setResults(stored.reverse()); // Newest first
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Spelling Test Results</h2>
      {results.length === 0 ? (
        <p>No results saved yet.</p>
      ) : (
        <ul>
          {results.map((res, index) => (
            <li key={index}>
              📅 {res.date} — Score: {res.score} / {res.total}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SpellingResultsPage;