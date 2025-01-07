import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'; // Import updated CSS file

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { email, password });
      if (response.data.success) {
        navigate('/login'); // Navigate to the login page
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Signup failed');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left: Signup Form */}
        <div className="form-container">
          <h2>Signup</h2>
          <p>Join us and explore your opportunities!</p>
          <button className="google-signup-btn">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google"
            />
            Sign up with Google
          </button>
          <form onSubmit={handleSignup}>
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
            <button type="submit" className="btn btn-primary">Sign up</button>
          </form>
          <p>
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>

        {/* Right: Illustration */}
        <div className="image-container">
          <img src="/path-to-your-image.jpg" alt="Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
