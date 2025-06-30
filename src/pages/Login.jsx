import React, { useState } from 'react';
import '../styles/Forms.css';
import { Link } from 'react-router-dom';

export default function LoginForm() {
    const [userType, setUserType] = useState('Student');
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUserSwitch = () => {
        setUserType((prev) => (prev === 'Student' ? 'Admin' : 'Student'));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', { userType, ...formData });

        try {
            const response = await fetch('https://gce-companion.vercel.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userType, ...formData })
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data));
            console.log('Login successful:', data);
        } catch (error) {
            console.error('Error during login:', error);
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
                <div className="form-footer">
                    <a href="#">Forgot Password?</a>
                </div>
                <button type="submit">Get Started</button>
            </form>

            <div className="social-auth">
                <p>Or sign in with</p>
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

