import React, { useState } from "react";
import { subjects } from "../data/subjects"; // Ensure this path is correct
import Layout from "../components/Layout"; // Adjust path if needed

function SubjectsPage() {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(3); // Default to Grade 3

  const toggleSubjectSelection = (subject) => {
    setSelectedSubjects((prevState) =>
      prevState.includes(subject)
        ? prevState.filter((s) => s !== subject)
        : [...prevState, subject]
    );
  };

  const handleSubmit = () => {
    localStorage.setItem("selectedSubjects", JSON.stringify({
      grade: selectedGrade,
      subjects: selectedSubjects
    }));
    // Add navigation or feedback if needed
  };

  const filteredSubjects = subjects.filter((subject) =>
    subject.grades.includes(selectedGrade)
  );

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h2>Select Grade</h2>
        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(Number(e.target.value))}
        >
          {[...Array(10)].map((_, i) => {
            const grade = i + 3;
            return (
              <option key={grade} value={grade}>
                Grade {grade}
              </option>
            );
          })}
        </select>

        <h2>Select Subjects</h2>
        {filteredSubjects.map((subject, index) => (
          <div key={index}>
            <input
              type="checkbox"
              onChange={() => toggleSubjectSelection(subject.name)}
              checked={selectedSubjects.includes(subject.name)}
            />
            <label>{subject.name}</label>
          </div>
        ))}

        <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
          Submit
        </button>
      </div>
    </Layout>
  );
}

export default SubjectsPage;