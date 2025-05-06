import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from './Layout'; // ✅ If in same folder

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const loggedInTeacher = JSON.parse(localStorage.getItem("loggedInTeacher"));
    const loggedInLearner = JSON.parse(localStorage.getItem("loggedInLearner")); // ✅ Use the correct key

    if (loggedInTeacher) {
      localStorage.removeItem("loggedInTeacher");
      navigate("/teacher-login"); // Redirect to teacher login
    } else if (loggedInLearner) {
      localStorage.removeItem("loggedInLearner"); // ✅ Correct key for learner logout
      navigate("/login"); // Redirect to learner login
    } else {
      // Optional: fallback if no one is logged in
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "10px 20px",
        backgroundColor: "red",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
}

export default LogoutButton;