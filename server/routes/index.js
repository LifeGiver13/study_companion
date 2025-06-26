import express from 'express';
import { register } from '../../src/handlers/auth/registration.js';
import { passwordReset } from '../../src/handlers/auth/passwordReset.js';
import { login } from '../../src/handlers/auth/login.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from Vercel!')
});

router.post('/auth/register', register);
router.post('/auth/reset-password', passwordReset);
router.post('/auth/login', login)
export default router;
