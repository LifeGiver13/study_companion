import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Forms.css';
import AuthTemplate from '../components/AuthFormTemplate';
import EmailSentConfirmation from '../components/EmailSentConfirmation';
import OverlayBox from '../components/MessageBox';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [overlay, setOverlay] = useState({
        show: false,
        header: '',
        message: '',
        isSuccess: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setOverlay({ show: false, header: '', message: '', isSuccess: false });
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

            setEmailSent(true);
        } catch (err) {
            setOverlay({
                show: true,
                header: 'Reset Failed',
                message: err.message,
                isSuccess: false
            });
            setTimeout(() => {
                setOverlay({ show: false, header: '', message: '', isSuccess: false });
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthTemplate imgUrl='/forgotenPassword.jpeg'>
            {emailSent ? (
                <EmailSentConfirmation />
            ) : (
                <div className="form-content">
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
                        <button type="submit" disabled={loading}>
                            {loading ? 'Sending Email...' : 'Send Reset Link'}
                        </button>
                        <div className="form-footer">
                            <Link to="/"> - Back to login.</Link>
                        </div>
                    </form>
                    {overlay.show && (
                        <OverlayBox
                            header={overlay.header}
                            message={overlay.message}
                            isSuccess={overlay.isSuccess}
                        />
                    )}
                </div>
            )}
        </AuthTemplate>
    );
}
