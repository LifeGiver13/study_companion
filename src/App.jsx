import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/Login";
import SignUpForm from "./pages/SignUp";

export default function App() {
  return (
    <div className="app-container">
      <h1>GCE Study Companion</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
