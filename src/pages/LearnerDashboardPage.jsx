// src/pages/LearnerDashboardPage.jsx
import React from 'react';

function LearnerDashboardPage() {
  const loggedInLearner = JSON.parse(localStorage.getItem("loggedInLearner"));

  if (!loggedInLearner) {
    return <div>You need to login first.</div>;
  }

  return (
    <div>
      <h2>Welcome, {loggedInLearner.name}!</h2>
      <p>Grade: {loggedInLearner.grade}</p>
      <p>Date of Birth: {loggedInLearner.dob}</p>
      <p>Username: {loggedInLearner.username}</p>
    </div>
  );
}

export default LearnerDashboardPage;