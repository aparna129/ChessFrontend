import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const url = localStorage.getItem("url");

  const navigate = useNavigate();

  const handleLogin = async () => {
    await axios
      .post(`${url}login`, { email, password })
      .then((res) => {
        console.log(res.data);
        navigate("/game");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h2>Login</h2>
      <p>
        Email :{" "}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </p>

      <p>
        Password :{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </p>

      <p>
        <button onClick={handleLogin}>Login</button>
      </p>
    </div>
  );
}

export default Login;
