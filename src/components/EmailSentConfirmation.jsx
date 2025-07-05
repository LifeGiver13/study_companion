import { Link } from 'react-router-dom';

export default function EmailSentConfirmation() {
    return (
        <div className="email-sent-container">
            <div style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '40px',
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <img src="/mail_icon.jpeg" alt="Mail Icon" style={{ width: '64px', marginBottom: '20px' }} />
                <h2>Check your mail</h2>
                <p>We have sent a password recover instruction to your email.</p>
                <button
                    style={{
                        backgroundColor: '#0047ab',
                        color: '#fff',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        marginTop: '20px'
                    }}
                    onClick={() => window.open('https://mail.google.com', '_blank')}
                >
                    Open email app
                </button>
                <p style={{ marginTop: '10px' }}>
                    <Link to="/">Skip, I’ll confirm later</Link>
                </p>
            </div>
        </div>
    );
}
