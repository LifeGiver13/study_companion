import React, { useState } from 'react';
import '../styles/Forms.css';
import { Link } from 'react-router-dom';

export default function LoginForm() {
    const [userType, setUserType] = useState('Student');
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);





    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUserSwitch = () => {
        setUserType((prev) => (prev === 'Student' ? 'Admin' : 'Student'));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', { userType, ...formData });
        setError('');
        setSuccess('');
        setLoading(true)

        try {
            const response = await fetch('https://gce-companion.vercel.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userType, ...formData })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            localStorage.setItem('user', JSON.stringify(data));
            console.log('Login successful:', data);
            setSuccess('Login successful!');

        } catch (err) {
            console.error('Login error:', err.message);
            setError(err.message);
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <div className="auth-container">
            <h2>{userType} Login</h2>
            <p>Log in to GCE Study Companion</p>
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
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <div className="form-footer">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in ...' : 'Get Started'}</button>
            </form>

            <div className="social-auth">
                <p>Or sign in with</p>
                <div className="social-buttons">
                    <button className="facebook">f</button>
                    <button className="google">G</button>
                    <button className="linkedin">in</button>
                </div>
            </div>

            <div className="signup-note">
                {userType === 'Student'
                    ? "Ask your teacher to create one for you"
                    : <Link to="./signup">Don't have an account? Sign Up</Link>}
    </div>

            <button onClick={handleUserSwitch} className="user-switch">
                Switch to {userType === 'Student' ? 'Admin' : 'Student'} Login
            </button>
        </div>
    );
};

