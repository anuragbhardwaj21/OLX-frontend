import React from "react";
import "./App.css";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Dashboard } from "./components/Dashboard";
import { PostClassifieds } from "./components/PostClassifieds";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/browseclassifieds" element={<Dashboard />} />
        <Route path="/postclassifieds" element={<PostClassifieds />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
