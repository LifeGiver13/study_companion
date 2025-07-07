import React, { useState } from 'react';
import '../styles/Forms.css';
import AuthTemplate from '../components/AuthFormTemplate';
import { Link } from 'react-router-dom';

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [overlay, setOverlay] = useState({
    show: false,
    message: '',
    header: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setOverlay({ header: 'Error', message: 'Passwords do not match.', show: true });
      setTimeout(() => setOverlay({ ...overlay, show: false }), 3000);
      return;
    }

    setLoading(true);
    setOverlay({ ...overlay, show: false });

    try {
      const response = await fetch('https://gce-companion.vercel.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setOverlay({ header: 'Success', message: 'Your account has been created.', show: true });
      setTimeout(() => setOverlay({ ...overlay, show: false }), 3000);
    } catch (error) {
      setOverlay({ header: 'Error', message: error.message, show: true });
      setTimeout(() => setOverlay({ ...overlay, show: false }), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthTemplate imgUrl='/register.jpeg'>
      <div className="form-content">
        <h2>Admin Sign Up</h2>
        <p>Sign Up to GCE Study Companion</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>

          {overlay.message && overlay.show && (
            <div className="message-box">
              <div>
                <div className="message-header">{overlay.header}</div>
                <div className="message-content">{overlay.message}</div>
              </div>
            </div>
          )}
        </form>

        <div className="social-auth">
          <p>Or Sign in With</p>
          <div className="social-buttons">
            <button className="facebook">
              <i className="bi bi-facebook" style={{ color: '#3b5998', fontSize: '24px' }}></i>
            </button>
            <button className="google">
              <i className="bi bi-google" style={{ color: '#db4437', fontSize: '24px' }}></i>
            </button>
            <button className="linkedin">
              <i className="bi bi-linkedin" style={{ color: '#0A66C2', fontSize: '24px' }}></i>
            </button>
          </div>
        </div>

        <div className="signup-note">
          <Link to="/">Already have an account? <i>Login</i></Link>
        </div>
      </div>
    </AuthTemplate>
  );
}
