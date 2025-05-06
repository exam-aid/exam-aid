import React from "react";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function FrontPage() {
  const navigate = useNavigate();
  const [latestScore, setLatestScore] = useState(null);

  useEffect(() => {
    const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
    if (scores.length > 0) {
      const last = scores[scores.length - 1];
      setLatestScore(last);
    }
  }, []);
  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to Exam Aid</h1>
      <p style={{ marginBottom: "30px", fontSize: "18px" }}>
        Choose a subject to start your quiz or spelling test.
      </p>
      {latestScore && (
        <div style={{ marginBottom: "20px", fontSize: "16px", color: "#333" }}>
         Last Score: {latestScore.subject} – {latestScore.score}/{latestScore.total}
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        <button 
          onClick={() => navigate("/maths")}  // Start Math
          style={{ padding: "15px 30px", fontSize: "16px", borderRadius: "8px", backgroundColor: "#4caf50", color: "white", border: "none" }}
        >
          Start Math
        </button>
        <button 
          onClick={() => navigate("/english")}  // Start English
          style={{ padding: "15px 30px", fontSize: "16px", borderRadius: "8px", backgroundColor: "#f44336", color: "white", border: "none" }}
        >
          Start English
        </button>
        <button 
          onClick={() => navigate("/afrikaans")}  // Start Afrikaans
          style={{ padding: "15px 30px", fontSize: "16px", borderRadius: "8px", backgroundColor: "#ff9800", color: "white", border: "none" }}
        >
          Start Afrikaans
        </button>
        <button 
          onClick={() => navigate("/lewengvaardighede")}  // Start Lewensvaardighede
          style={{ padding: "15px 30px", fontSize: "16px", borderRadius: "8px", backgroundColor: "#9c27b0", color: "white", border: "none" }}
        >
          Start Lewensvaardighede
        </button>
        <button 
          onClick={() => navigate("/natuurwetenskappe")}  // Start Natuurwetenskappe
          style={{ padding: "15px 30px", fontSize: "16px", borderRadius: "8px", backgroundColor: "#3f51b5", color: "white", border: "none" }}
        >
          Start Natuurwetenskappe
        </button>
        <button 
          onClick={() => navigate("/geografie")}  // Start Geografie
          style={{ padding: "15px 30px", fontSize: "16px", borderRadius: "8px", backgroundColor: "#2196f3", color: "white", border: "none" }}
        >
          Start Geografie
        </button>
        <button 
          onClick={() => navigate("/geskiedenis")}  // Start Geskiedenis
          style={{ padding: "15px 30px", fontSize: "16px", borderRadius: "8px", backgroundColor: "#009688", color: "white", border: "none" }}
        >
          Start Geskiedenis
        </button>
        
        {/* Add the Start Spelling button */}
        <button 
          onClick={() => navigate("/spelling-test")}
          style={{ padding: "15px 30px", fontSize: "16px", borderRadius: "8px", backgroundColor: "#8bc34a", color: "white", border: "none" }}
        >
          Start Spelling Test
        </button>

        <button 
          onClick={() => navigate("/scores")}
          style={{ padding: "15px 30px", fontSize: "16px", borderRadius: "8px", backgroundColor: "#607d8b", color: "white", border: "none" }}
        >
          View My Scores
        </button>
        
      </div>
    </div>
  );
}

export default FrontPage;