import express from 'express';
import { register } from '../../src/handlers/auth/registration.js';
import { login } from '../../src/handlers/auth/login.js';
import { passwordReset } from '../../src/handlers/auth/passwordReset.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('API is live');
});

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/reset-password', passwordReset);

export default router;
