import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from 'components/Layout';
import LogoutButton from "components/LogoutButton";
import { subjects } from "data/subjects";

function AdminPage() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("Maths");
  const [quizIdRaw, setQuizIdRaw] = useState("");
  const [timer, setTimer] = useState(30);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [spellingWords, setSpellingWords] = useState([""]);
  const [error, setError] = useState("");

  const quizId = quizIdRaw.toLowerCase();
  const loggedIn = JSON.parse(localStorage.getItem("loggedInTeacher"));
  const teacherGrade = loggedIn?.grade || "";

  useEffect(() => {
    if (!quizId || !teacherGrade) {
      setQuestions([]);
      setSpellingWords([""]);
      return;
    }

    const savedQuizzes = JSON.parse(localStorage.getItem("quizQuestions")) || [];

    const existing = savedQuizzes.find(
      (q) =>
        q.subject.toLowerCase() === subject.toLowerCase() &&
        q.quizId === quizId &&
        q.grade === teacherGrade
    );

    if (existing) {
      if (subject.toLowerCase() === "spelling") {
        setSpellingWords(existing.questions.map((q) => q.word));
      } else {
        setQuestions(existing.questions || []);
      }
    } else {
      setQuestions([]);
      setSpellingWords([""]);
    }
  }, [subject, quizId, teacherGrade]);

  if (!teacherGrade) {
    return <div>Please log in to access the admin panel.</div>;
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddQuestion = () => {
    if (!question || options.some(opt => opt.trim() === "") || correctIndex === undefined) {
      setError("Please fill out the question and all options, and select the correct answer.");
      return;
    }

    const newQuestion = {
      question,
      options,
      correctIndex,
    };

    setQuestions((prev) => [...prev, newQuestion]);
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(0);
    setError("");
  };

  const handleAddSpellingWord = (index, value) => {
    const updated = [...spellingWords];
    updated[index] = value;
    setSpellingWords(updated);
  };

  const handleAddNewSpellingRow = () => {
    setSpellingWords((prev) => [...prev, ""]);
  };

  const handleSave = () => {
    if (!quizIdRaw) {
      setError("Quiz ID is required.");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("quizQuestions")) || [];

    const newQuiz = {
      subject,
      quizId,
      timer,
      grade: teacherGrade,
      questions:
        subject.toLowerCase() === "spelling"
          ? spellingWords.filter((word) => word.trim() !== "").map((word) => ({ word }))
          : questions,
    };

    const updated = existing.filter(
      (q) =>
        !(
          q.subject.toLowerCase() === subject.toLowerCase() &&
          q.quizId === quizId &&
          q.grade === teacherGrade
        )
    );

    updated.push(newQuiz);
    localStorage.setItem("quizQuestions", JSON.stringify(updated));

    alert(`${subject} "${quizId}" saved successfully!`);
    setQuestions([]);
    setSpellingWords([""]);
    setError("");
  };

  return (
    <Layout>
      <div style={{ maxWidth: "800px", margin: "auto" }}>
        <h2 style={{ color: "#00796B" }}>Admin Panel: Create or Edit Quiz</h2>
        <h4>Logged in for: Grade {teacherGrade}</h4>

        <div style={{ marginBottom: "20px" }}>
          <LogoutButton />
        </div>

        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

        <div style={{ marginBottom: "15px" }}>
          <label>Subject: </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{ padding: "6px", marginLeft: "8px" }}
          >
            {subjects
              .filter((subj) => subj.grades.includes(Number(teacherGrade)))
              .map((subj) => (
                <option key={subj.name} value={subj.name}>
                  {subj.name}
                </option>
              ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Quiz ID: </label>
          <input
            value={quizIdRaw}
            onChange={(e) => setQuizIdRaw(e.target.value)}
            style={{ padding: "6px", width: "60%" }}
          />
        </div>

        {subject.toLowerCase() !== "spelling" && (
          <>
            <div style={{ marginBottom: "15px" }}>
              <label>Timer per question (seconds): </label>
              <input
                type="number"
                value={timer}
                onChange={(e) => setTimer(Number(e.target.value))}
                style={{ padding: "6px", width: "100px" }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Question: </label>
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>

            <div>
              {options.map((opt, idx) => (
                <div key={idx} style={{ marginBottom: "8px" }}>
                  <label>Option {idx + 1}: </label>
                  <input
                    value={opt}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    style={{ padding: "6px", width: "70%" }}
                  />
                </div>
              ))}
              <div style={{ marginBottom: "12px" }}>
                <label>Correct Answer (1–4): </label>
                <input
                  type="number"
                  value={correctIndex + 1}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 1 && val <= 4) {
                      setCorrectIndex(val - 1);
                    }
                  }}
                  min={1}
                  max={4}
                  style={{ width: "60px", padding: "6px" }}
                />
              </div>
              <button onClick={handleAddQuestion} style={{ padding: "8px 16px", marginBottom: "20px" }}>
                ➕ Add Question
              </button>
            </div>

            <ul>
              {questions.map((q, i) => (
                <li key={i}>{q.question}</li>
              ))}
            </ul>
          </>
        )}

        {subject.toLowerCase() === "spelling" && (
          <>
            <h3>Spelling Words</h3>
            {spellingWords.map((word, idx) => (
              <input
                key={idx}
                value={word}
                onChange={(e) => handleAddSpellingWord(idx, e.target.value)}
                placeholder={`Word ${idx + 1}`}
                style={{ display: "block", marginBottom: "10px", padding: "6px", width: "100%" }}
              />
            ))}
            <button onClick={handleAddNewSpellingRow} style={{ padding: "8px 12px", marginTop: "10px" }}>
              ➕ Add Another Word
            </button>
          </>
        )}

        <div style={{ marginTop: "30px" }}>
          <button
            onClick={handleSave}
            style={{
              padding: "12px 24px",
              backgroundColor: "#00796B",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            💾 Save Quiz/Spelling
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default AdminPage;