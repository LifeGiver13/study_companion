import { db } from '../firebase.js';
import bcrypt from 'bcrypt';
import { collection, where, addDoc, query, getDocs } from 'firebase/firestore';

export async function register(req, res) {
    try {
        let body = req.body;

        if (!body || typeof body !== 'object') {
            try {
                body = JSON.parse(req.body || '{}');
            } catch (e) {
                return res.status(400).json({ error: 'Invalid JSON in request body' });
            }
        }

        const { username, email, password, phoneNumber, role, status } = body;
        if (!username || !email || !password || !phoneNumber) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const usernameQuery = query(collection(db, 'users'), where('username', '==', username));
        const emailQuery = query(collection(db, 'users'), where('email', '==', email));

        const userSnapshot = await getDocs(usernameQuery);
        const emailSnapshot = await getDocs(emailQuery);

        if (!userSnapshot.empty) {
            return res.status(401).json({ error: 'Sorry, Username already exists.' });
        }

        if (!emailSnapshot.empty) {
            return res.status(401).json({ error: 'Sorry, Email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            username: body.username,
            email: body.email,
            phoneNumber: body.phoneNumber,
            password: hashedPassword,
            role: body.role,
            status: body.status,
            createdAt: new Date()
        };

        console.log(newUser)
        const docRef = await addDoc(collection(db, 'users'), newUser);

        res.status(201).json({
            message: 'User created',
            data: { ...newUser },
            docId: docRef.id
        });

        console.log('User registered:', newUser);
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ error: error.message })
    }
}
