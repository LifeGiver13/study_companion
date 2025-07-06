
import { db } from '../firebase.js';
import { doc, getDoc } from 'firebase/firestore';

export async function getUserById(req, res) {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userData = userSnap.data();

        delete userData.password;
        return res.status(200).json({
            status: 200,
            data: {
                id: userSnap.id,
                ...userData
            }
        });
    } catch (error) {
        console.error('Error fetching user:', error.message);
        return res.status(500).json({ error: 'Server error' });
    }
}

// This function retrieves a user by their ID from the Firestore database.
// It checks if the user ID is provided, fetches the user document, and returns the user data without the password.
// If the user is not found, it returns a 404 error. If an error occurs during the process, it returns a 500 error with a message indicating a server error.