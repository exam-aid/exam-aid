import React, { useState, useEffect } from "react";

function SpellingTestPage() {
  const [spellingWords, setSpellingWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const storedWords = JSON.parse(localStorage.getItem("spellingWords"));
    if (Array.isArray(storedWords)) {
      setSpellingWords(storedWords);
    } else {
      setSpellingWords([]);
    }
  }, []);

  const handleSubmit = () => {
    if (spellingWords[currentIndex].word.toLowerCase() === userInput.toLowerCase()) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Incorrect! The correct word was: ${spellingWords[currentIndex].word}`);
    }

    if (currentIndex < spellingWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserInput("");
      setFeedback("");
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div>
        <h2>Test Finished</h2>
        <p>Your score: {score} / {spellingWords.length}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!spellingWords.length) {
    return <p>No spelling words loaded.</p>;
  }

  return (
    <div>
      <h2>Spelling Test</h2>
      <h3>{spellingWords[currentIndex].word}</h3>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <p>{feedback}</p>
    </div>
  );
}

export default SpellingTestPage;