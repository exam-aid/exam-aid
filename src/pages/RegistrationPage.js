import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './RegistrationPage.css';  // Add the custom CSS file for the page styling

function RegistrationPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [grade, setGrade] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Validate that all fields are filled in
    if (!name || !surname || !dob || !grade || !username || !password) {
      alert("Please fill in all fields!");
      return;
    }

    // Retrieve existing learners from localStorage (if any)
    const existingLearners = JSON.parse(localStorage.getItem("learners")) || [];

    // Check if the username already exists
    const usernameExists = existingLearners.some((learner) => learner.username === username);

    if (usernameExists) {
      setErrorMessage("Username already taken. Please choose another one.");
      return;
    }

    // If the username is unique, save the new learner's data
    const learnerData = { name, surname, dob, grade, username, password };
    existingLearners.push(learnerData); // Add new learner to the array

    // Save the updated list to localStorage
    localStorage.setItem("learners", JSON.stringify(existingLearners));

    alert("Registration successful!");
    navigate("/login"); // Redirect to login page after registration
  };

  return (
    <div className="registration-page">
      <h2>Register</h2>
      <form onSubmit={e => { e.preventDefault(); handleSubmit(); }} className="form-container">
        <label>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <label>
          Surname:
          <input type="text" value={surname} onChange={e => setSurname(e.target.value)} required />
        </label>
        <label>
          Date of Birth:
          <input type="date" value={dob} onChange={e => setDob(e.target.value)} required />
        </label>
        <label>
          Grade:
          <input type="text" value={grade} onChange={e => setGrade(e.target.value)} required />
        </label>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        
        {/* Display error message if username is already taken */}
        {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}

        <button type="submit" className="register-btn">Register</button>
      </form>
    </div>
  );
}

export default RegistrationPage;