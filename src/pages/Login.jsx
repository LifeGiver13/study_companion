import React, { useState } from 'react';
import '../styles/Forms.css';
import { Link } from 'react-router-dom';
import AuthTemplate from '../components/AuthFormTemplate';

import OverlayBox from '../components/MessageBox';

export default function LoginForm() {
    const [userType, setUserType] = useState('Student');
    const [formData, setFormData] = useState({
        identifier: '',  // renamed from username
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const [overlay, setOverlay] = useState({
        header: '',
        message: '',
        show: false,
        isSuccess: false
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUserSwitch = () => {
        setUserType((prev) => (prev === 'Student' ? 'Admin' : 'Student'));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await fetch('https://gce-companion.vercel.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.identifier, // sends identifier as username to match backend
                    password: formData.password,
                    userType
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setOverlay({ header: 'Error', message: errorData?.error || 'Login failed.', show: true, isSuccess: false }
                )
                setTimeout(() => setOverlay({ ...overlay, show: false }), 3000);
                throw new Error(errorData?.error || 'Login failed');
            }

            const { username, email, phonenumber } = data.data;

            // ✅ Store structured user data
            const userPayload = {
                status: 200,
                data: {
                    username,
                    email,
                    phonenumber,
                    uid: data.data.uid || data.uid || null
                }
            };

            localStorage.setItem('user', JSON.stringify(userPayload));
            localStorage.setItem('isLoggedIn', 'true');
            setOverlay({ header: "Success", message: "Login Successful", show: true, isSuccesss: true })
            setTimeout(() => setOverlay({ ...overlay, show: false }), 3000);

            setSuccess('Login successful!');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthTemplate>
            <div className="form-content">
                <h2>{userType} Login</h2>
                <p>Log in to GCE Study Companion</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <input
                        type="text"
                        name="identifier"
                        placeholder="Username / Email / Phone"
                        value={formData.identifier}
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
                        {loading ? 'Logging in ...' : 'Get Started'}
                    </button>
                </form>
                {overlay.message && overlay.show && (
                    <OverlayBox header={overlay.header} message={overlay.message} isSuccess={overlay.isSuccess} />

                )}
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
                        : <Link to="/signup">Don't have an account? Sign Up</Link>}
                </div>

                <button onClick={handleUserSwitch} className="user-switch">
                    Switch to {userType === 'Student' ? 'Admin' : 'Student'} Login
                </button>
            </div>
        </AuthTemplate>
    );
}
