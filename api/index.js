import express from 'express';
import { login } from '../src/handlers/auth/login.js';
import { register } from '../src/handlers/auth/registration.js';
import { passwordReset } from '../src/handlers/auth/passwordReset.js';
import serverless from 'serverless-http';

const app = express();
app.use(express.json());

app.post('/api/auth/login', login);
app.post('/api/auth/register', register);
app.post('/api/auth/password-reset', passwordReset);

export default serverless(app);
