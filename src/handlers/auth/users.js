import { db } from '../firebase.js';
import {collection, getDocs, addDoc} from 'firebase/firestore';
import bcrypt from 'bcrypt';

export async function getAllUsers(req, res){
    try{
        const usersCollection = collection(db, 'users');
        const snapshot = await getDocs(usersCollection);
        const users = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({error: "Failed to fetch users"});
    }

}

export async function createUser(req, res){
    const {username, email, phoneNumber, password} = req.body;

    if (!username || !email || !phoneNumber || !password) {
        return res.status(400).json({error: "All fields are required"});
    }

    try{
        const newUser = {
            username,
            email,
            phoneNumber,
            password
        };
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashedPassword;      
        const docRef = await addDoc(collection(db, 'users'), newUser);
        return res.status(201).json({id: docRef.id, ...newUser});
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({error: "Failed to create user"});
    }
}

// This function retrieves all users from the Firestore database.
// It fetches the users collection, maps the documents to an array of user objects, and returns the array.