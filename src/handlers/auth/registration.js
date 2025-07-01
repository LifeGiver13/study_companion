import { db } from '../firebase';
import bcrypt from 'bcrypt';
import { collection, where, addDoc, query, getDocs } from 'firebase/firestore';

export async function register(req, res) {
    try {
        const { username, email, phoneNumber, password  } = req.body;
        if (!username || !email || !password || !phoneNumber) return res.status(400).json({ error: 'All fields are required' })


        const usernameQuery = query(collection(db, 'users'), where('username', '==', username))
        const emailQuery = query(collection(db, 'users'), where('email', '==', email))

        const userSnapshot = await getDocs(usernameQuery)
        const emailSnapshot = await getDocs(emailQuery)

        if (!userSnapshot.empty) return res.status(409).json({ error: 'Username already exists.' });
        if (!emailSnapshot.empty) return res.status(409).json({ error: 'Email already exists.' });

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = {
            username: username,
            email: email,
            password: hashedPassword,
            phoneNumber: phoneNumber
        };

        const docRef = await addDoc(collection(db, 'users'), newUser);

        return res.status(201).json({
            message: 'User created',
            data: newUser,
            docId: docRef.id
        });

} catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ error: 'Failed to create user' });
    }
}