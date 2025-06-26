// import express from 'express';
// import { register } from '../../src/handlers/auth/registration.js';
// import { login } from '../../src/handlers/auth/login.js';
// import { passwordReset } from '../../src/handlers/auth/passwordReset.js';

// const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('Hello from API!')
// });

// router.post('/auth/register', register);
// router.post('/auth/login', login);
// router.post('/auth/reset-password', passwordReset);

// export default router;
// TEMP TEST VERSION OF routes/index.js
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('API is working!');
});

router.post('/auth/register', (req, res) => {
    res.json({ message: 'Registered (mock)' });
});

router.post('/auth/login', (req, res) => {
    res.json({ message: 'Logged in (mock)' });
});

router.post('/auth/reset-password', (req, res) => {
    res.json({ message: 'Password reset (mock)' });
});

export default router;

