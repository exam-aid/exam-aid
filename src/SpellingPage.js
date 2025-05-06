import React, { useState, useEffect } from "react";
import Layout from 'components/Layout'; // ✅ CORRECT

function SpellingPage() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [voices, setVoices] = useState([]);

  const subject = "Spelling";

  const spellingWords = [
    { word: "kat", language: "af-ZA" }, // Afrikaans word
    { word: "dog", language: "en-US" }, // English word
    { word: "appel", language: "af-ZA" }, // Afrikaans word
  ];

  const [typedWords, setTypedWords] = useState(Array(spellingWords.length).fill(""));

  // Load available voices when the page loads
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    // If voices are already loaded, no need to wait
    if (window.speechSynthesis.getVoices().length !== 0) {
      loadVoices();
    } else {
      // Wait for the voices to be loaded
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleChange = (index, value) => {
    const newTypedWords = [...typedWords];
    newTypedWords[index] = value;
    setTypedWords(newTypedWords);
  };

  const handleSubmit = () => {
    let calculatedScore = 0;

    spellingWords.forEach((wordItem, index) => {
      if (typedWords[index].toLowerCase() === wordItem.word.toLowerCase()) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setTotalQuestions(spellingWords.length);

    const previousScores = JSON.parse(localStorage.getItem("pastScores")) || [];

    const newScoreEntry = {
      subject: subject,
      score: calculatedScore,
      total: spellingWords.length,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem("pastScores", JSON.stringify([...previousScores, newScoreEntry]));
  };

  // Updated speakWord function to handle dynamic language selection
  const speakWord = (word, language) => {
    const utterance = new SpeechSynthesisUtterance(word);
    
    // Set the language dynamically based on word's language
    utterance.lang = language;

    // Try to find the correct voice based on the language
    const selectedVoice = voices.find(voice => voice.lang === language);

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Speak the word
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <h2>Spelling Test</h2>

      {spellingWords.map((wordItem, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <p>Word {index + 1}:</p>

          {/* Pass the language dynamically when the button is clicked */}
          <button onClick={() => speakWord(wordItem.word, wordItem.language)}>🔊 Hear Word</button><br />
          <input
            type="text"
            value={typedWords[index]}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        </div>
      ))}

      <button onClick={handleSubmit}>Submit Test</button>

      {totalQuestions > 0 && (
        <div style={{ padding: 20, textAlign: "center" }}>
          <h2>Test Complete!</h2>
          <p style={{ fontSize: "18px" }}>
            Your Score: <strong>{score}</strong> / <strong>{totalQuestions}</strong>
          </p>
          <div style={{ marginTop: 20 }}>
            <button style={{ margin: 10 }} onClick={() => window.location.reload()}>
              Retry Test
            </button>
            <button style={{ margin: 10 }} onClick={() => (window.location.href = "/")}>
              Back to Home
            </button>
            <button style={{ margin: 10 }} onClick={() => (window.location.href = "/view-scores")}>
              View All Scores
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpellingPage;