import { db } from '../firebase.js';
import { doc, updateDoc } from 'firebase/firestore';
import bcrypt from 'bcrypt';

export async function updateUser(req, res) {
    try {
        const {
            uid,
            username,
            email,
            phonenumber,
            password,
            classLevel,
            subjectsOffered,
        } = req.body;

        if (!uid) {
            return res.status(400).json({ status: 400, error: 'User ID (uid) is required' });
        }

        const userRef = doc(db, 'users', uid);
        const updateData = {};

        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (phonenumber) updateData.phonenumber = phonenumber;
        if (classLevel) updateData.classLevel = classLevel;
        if (subjectsOffered) updateData.subjectsOffered = subjectsOffered;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        await updateDoc(userRef, updateData);

        return res.status(200).json({
            status: 200,
            message: 'User updated successfully',
            updated: updateData,
        });

    } catch (error) {
        console.error('Error updating user:', error.message);
        return res.status(500).json({ status: 500, error: 'Server error' });
    }
}
// This function updates a user's information in the Firestore database.
// It checks if the user ID is provided, updates the specified fields, hashes the password if provided, and returns a success message with the updated data.
// If an error occurs during the process, it returns a 500 error with a message indicating a server error.
// If the user ID is not provided, it returns a 400 error indicating that the user ID is required.
// The function supports updating the username, email, phone number, class level, subjects offered, and password.
// It uses bcrypt to hash the password before storing it in the database.
