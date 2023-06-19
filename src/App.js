import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import QuizPage from "./pages/QuizPage";
import ScorePage from "./pages/ScorePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/quizPage" element={<QuizPage />} />
        <Route path="/scorePage" element={<ScorePage />} />
      </Routes>
    </Router>
  );
}

export default App;