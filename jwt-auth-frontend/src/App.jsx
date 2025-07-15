import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ProtectedPage from "./components/ProtectedPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/protected" element={<ProtectedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
