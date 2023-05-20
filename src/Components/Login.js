import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Footer from "./Footer";
import "./Login.css";
function Login() {
  const [name, setName] = useState("");
  const { setUserName } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLogin = () => {
    if (name.trim() !== "") {
      const firstName = name.trim().split(" ")[0];
      const capitalizedFirstName =
        firstName.charAt(0).toUpperCase() + firstName.slice(1);
      setUserName(capitalizedFirstName);
      navigate("/traindetail");
    } else {
      alert("Enter your name");
    }
  };

  return (
    <div className="login-top">
      <div className="login">
        <div className="title-div">
          <h1 className="title">
            <span> Rail Mitra</span> - Always Help
          </h1>
        </div>
        <div className="login-card">
          <h1>Login</h1>
          <label>Enter your name to login: </label>

          <input type="text" value={name} onChange={handleNameChange} />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
