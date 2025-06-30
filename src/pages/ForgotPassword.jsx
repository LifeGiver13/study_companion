import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Forms.css';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const response = await fetch('https://gce-companion.vercel.app/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Reset failed');
            }

            setMessage('✅ Check your email for the password reset link.');
        } catch (err) {
            setMessage(`❌ ${err.message}`);
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <div className="auth-container">
            <h2>Reset Password</h2>
            <p>Enter your email to receive a password reset link</p>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">
                    {loading ? 'Sending Email...' : 'Send Reset Link'}</button>
                <div className="form-footer">
                    <Link to="/"> - Back to login.</Link>
                </div>
                {message && <p style={{ marginTop: '10px', color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>}
            </form>
        </div>
    );
}
