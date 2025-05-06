import React, { useEffect, useState } from "react";

function SpellingPage() {
  const [spellingWords, setSpellingWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Speak a word using browser's Text-to-Speech
  const speakWord = (word, language) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = language === "Afrikaans" ? "af-ZA" : "en-US";
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    try {
      const savedWords = JSON.parse(localStorage.getItem("spellingWords"));
      if (Array.isArray(savedWords)) {
        setSpellingWords(savedWords);
      } else {
        setSpellingWords([]);
      }
    } catch (error) {
      console.error("Error loading spelling words:", error);
      setSpellingWords([]);
    }
  }, []);

  useEffect(() => {
    if (spellingWords.length > 0 && !finished) {
      const wordToSpeak = spellingWords[currentWordIndex];
      speakWord(wordToSpeak.word, wordToSpeak.language);
    }
  }, [spellingWords, currentWordIndex, finished]);

  const handleSubmit = () => {
    const correctWord = spellingWords[currentWordIndex].word.trim().toLowerCase();
    const userAnswer = input.trim().toLowerCase();

    if (userAnswer === correctWord) {
      setScore((prev) => prev + 1);
    }

    if (currentWordIndex + 1 < spellingWords.length) {
      setCurrentWordIndex((prev) => prev + 1);
      setInput("");
    } else {
      setFinished(true);
    }
  };

  if (spellingWords.length === 0) {
    return <div style={{ padding: "20px" }}><h2>No spelling words found.</h2></div>;
  }

  if (finished) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Spelling Test Completed</h2>
        <p>Your score: {score} / {spellingWords.length}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Spelling Test</h2>
      <p>Word {currentWordIndex + 1} of {spellingWords.length}</p>

      <button onClick={() => speakWord(spellingWords[currentWordIndex].word, spellingWords[currentWordIndex].language)}>
        🔊 Repeat Word
      </button>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type the word you heard"
        style={{ padding: "10px", marginTop: "10px", width: "100%" }}
      />
      <br />
      <button onClick={handleSubmit} style={{ marginTop: "10px", padding: "10px 20px" }}>
        Submit
      </button>
    </div>
  );
}

export default SpellingPage;