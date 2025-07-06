import { db } from '../firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import bcrypt from 'bcrypt';


// Route to handle user login
 export async function login (req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const userQuery = query(collection(db, 'users'), where('username',
'==', username));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    let userData;
    let userDocId;

    querySnapshot.forEach((doc) => {
      userData = doc.data();
      userDocId = doc.id;
    });

    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    return res.status(200).json({ message: 'Login successful', user:
userData, uid: userDocId });

  } catch (error) {
    console.error('Error during login:', error.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

