import express from 'express';
import { register } from '../../src/handlers/auth/registration.js';
import { login } from '../../src/handlers/auth/login.js';
import { passwordReset } from '../../src/handlers/auth/passwordReset.js';
import { getUserById } from '../../src/handlers/auth/getUserByID.js';
import { updateUser } from '../../src/handlers/auth/updateUser.js'; 
import { getAllUsers, createUser } from '../../src/handlers/auth/users.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('API is live');
});

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/reset-password', passwordReset);
router.get('/auth/users/:id', getUserById);
router.put('/auth/users/:id', updateUser);
router.get('/auth/users', getAllUsers);
router.post('/auth/users', createUser);

export default router;