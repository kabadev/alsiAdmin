import React from "react";
import "./login.css";
import image from "../../login.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // client-side validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      // send data to server for validation
      const response = await axios.post("/users/login", { email, password });
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setLoading(false);
        window.location.href = "/";
      } else {
        setError(response.response.data.message);
        setLoading(false);
      }
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__content">
          <div className="login__header">
            <div className="brand">
              <div className="logo">
                <img
                  src="https://stackstream-production-spaces.s3.eu-central-1.amazonaws.com/6426d66c411c74cfde55ce37/991179540a850d356d0dedc6821b8932b13cc6c8-profile.jpeg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <h3 className="login__title">Login</h3>

          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <div className="input">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="action__btn__center">
                {error && <p className="error">{error}</p>}
                <button className="btn btn__primary" disabled={loading}>
                  {loading ? "Loading.." : "Login"}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="login__banner">
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
