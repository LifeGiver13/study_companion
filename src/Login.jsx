import React, { useState } from 'react';
import './Forms.css';

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

        try{
            const response = await fetch('https://gce-companion.vercel.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userType, ...formData })
            });
            if (!response.ok){
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
        <div className="login-container">
            <h2>{userType} Login</h2>
            <p>Log in to GCE Study Companion</p>
            <form onSubmit={handleSubmit} className="login-form">
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

            <div className="social-login">
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
                    : <a href="/sign-up">Don't have an account? Sign Up</a>}
            </div>

            <button onClick={handleUserSwitch} className="user-switch">
                Switch to {userType === 'Student' ? 'Admin' : 'Student'} Login
            </button>
        </div>
    );
};

