import db from '../../../firebase.js';
import bcrypt from 'bcrypt';
import { collection, where, addDoc, query, getDocs } from 'firebase/firestore';

export async function register(req, res) {
    try {
        const { username, email, password, classLevel, subjects } = req.body;
        if (!username || !email || !password || !classLevel) return res.status(400).json({ error: 'All fields are required' })

        if (subjects.length < 1) {
            throw new Error('Please, add atleast a subject.')
        }
        const usernameQuery = query(collection(db, 'users'), where('username', '==', username))
        const emailQuery = query(collection(db, 'users'), where('email', '==', email))

        const userSnapshot = await getDocs(usernameQuery)
        const emailSnapshot = await getDocs(emailQuery)

        if (!userSnapshot.empty) return res.status(401).json({ error: 'Sorry, Username already exists.' })
        if (!emailSnapshot.empty) return res.status(401).json({ error: 'Sorry, Email already exists.' })

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = {
            username: username,
            email: email,
            password: hashedPassword,
            class: classLevel,
            subjects: subjects
        };

        const docRef = await addDoc(collection(db, 'users'), newUser);

        res.status(201).json({
            message: 'User created',
            data: newUser,
            docId: docRef.id
        });

        console.log(newUser);
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ error: 'Failed to create user' });
    }
}