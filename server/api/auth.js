import express from 'express';
import { register } from '../../src/handlers/auth/registration.js';
import { passwordReset } from '../../src/handlers/auth/passwordReset.js';
import { login } from '../../src/handlers/auth/login.js';

const router = express.Router();

// Registration route
router.post('/api/auth/register', register);
router.post('/api/auth/reset-password', passwordReset);
router.post('/api/auth/login', login)
export default router;
