import React from "react";
import { Link } from "react-router-dom";

function StartPage() {
  return (
    <div>
      <h2>Welcome to the Start Page</h2>
      <Link to="/subjects">
        <button>Proceed to Subjects</button>
      </Link>
    </div>
  );
}

export default StartPage;