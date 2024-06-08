import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Game from "./components/Game";

function App() {
  const backendUrl = "http://localhost:4000/";

  localStorage.setItem("url", backendUrl);
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Register />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;
