import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import updated CSS
import loginImage from './login.jpg'; // Replace with the actual image path

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      if (response.data.success) {
        navigate('/dashboard');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left: Login Form */}
        <div className="form-container">
          <h2>Login</h2>
          <p>See your growth and get support!</p>
          <button className="google-login-btn">

            Sign in with Google
          </button>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-footer">
              <div>
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me"> Remember me</label>
              </div>
              <a href="/forgot-password">Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <p>
            Not registered yet? <a href="/signup">Create a new account</a>
          </p>
        </div>

        {/* Right: Illustration */}
        <div className="image-container">
          <img src={loginImage} alt="Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;
