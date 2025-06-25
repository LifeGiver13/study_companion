import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    const user = await login(email, password);
    if (user) {
      setIsLoggedIn(true);
      setMessage(`Login successful! Welcome back ${user.email}`);
    } else {
      setMessage('Login failed. Please check your credentials.')
    }
  }

  return (
    <div>
      <h1>Login</h1>

      {!isLoggedIn && (
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
      {message !== '' && (
        <p>{message}</p>
      )}
    </div>
  )
}

export default App;