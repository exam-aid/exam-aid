import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import "./App.css";
import QuizPage from "./components/QuizPage";
import SpellingPage from "./pages/SpellingPage";
import AdminPage from "./pages/AdminPage";
import SpellingResultsPage from "./pages/SpellingResultsPage";
import ViewScoresPage from "./pages/ViewScoresPage";
import RegistrationPage from "./pages/RegistrationPage";
import ErrorBoundary from './ErrorBoundary';
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LogoutButton from './components/LogoutButton';
import ScorePage from "./pages/ScorePage";
import TeacherLoginPage from "./pages/TeacherLoginPage";
import TeacherRegistrationPage from "./pages/TeacherRegistrationPage";
import SubjectsPage from "./pages/SubjectsPage";
import Layout from './components/Layout'; // Fixed import path

function SubjectSelection() {
  const navigate = useNavigate();

  const buttonStyle = {
    padding: "15px 30px",
    fontSize: "16px",
    borderRadius: "8px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    width: "250px"
  };

  const adminButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336"
  };

  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to Exam Aid</h1>
      <p style={{ marginBottom: "30px", fontSize: "18px" }}>
        Choose a subject to start your quiz or spelling test.
      </p>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        <button onClick={() => navigate("/quiz?subject=Maths&quizId=quiz1")} style={buttonStyle}>Start Maths</button>
        <button onClick={() => navigate("/quiz?subject=English&quizId=quiz1")} style={buttonStyle}>Start English</button>
        <button onClick={() => navigate("/quiz?subject=Afrikaans&quizId=quiz1")} style={buttonStyle}>Start Afrikaans</button>
        <button onClick={() => navigate("/quiz?subject=Lewensvaardighede&quizId=quiz1")} style={buttonStyle}>Start Lewensvaardighede</button>
        <button onClick={() => navigate("/quiz?subject=Natuurwetenskappe&quizId=quiz1")} style={buttonStyle}>Start Natuurwetenskappe</button>
        <button onClick={() => navigate("/quiz?subject=Geografie&quizId=quiz1")} style={buttonStyle}>Start Geografie</button>
        <button onClick={() => navigate("/quiz?subject=Geskiedenis&quizId=quiz1")} style={buttonStyle}>Start Geskiedenis</button>
        <button onClick={() => navigate("/spelling-test")} style={buttonStyle}>Start Spelling Test</button>
        <button onClick={() => navigate("/teacher-login")} style={adminButtonStyle}>
          Go to Admin Page (Teachers Only)
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <LogoutButton />
        <Routes>
          <Route path="/" element={<Layout><LandingPage /></Layout>} />
          <Route path="/register" element={<Layout><RegistrationPage /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route
            path="/subjects"
            element={
              <ProtectedRoute>
                <Layout><SubjectSelection /></Layout>
              </ProtectedRoute>
            }
          />
          <Route path="/quiz" element={<Layout><QuizPage /></Layout>} />
          <Route path="/spelling-test" element={<Layout><SpellingPage /></Layout>} />
          <Route path="/admin" element={<Layout><AdminPage /></Layout>} />
          <Route path="/results" element={<Layout><SpellingResultsPage /></Layout>} />
          <Route path="/view-scores" element={<Layout><ViewScoresPage /></Layout>} />
          <Route path="/score" element={<Layout><ScorePage /></Layout>} />
          <Route path="/result" element={<Layout><ScorePage /></Layout>} />
          <Route path="/teacher-login" element={<Layout><TeacherLoginPage /></Layout>} />
          <Route path="/teacher-register" element={<Layout><TeacherRegistrationPage /></Layout>} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
