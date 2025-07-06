import { where, getDocs, query, collection, updateDoc } from "firebase/firestore"
import { db } from '../firebase.js'
export async function setStatus(req, res) {

    //defining acceptable user status
    const ALLOWED_STATUSES = ['active', 'inactive', 'blocked', 'deleted']
    const { username } = req.params
    const { status } = req.body

    if (!ALLOWED_STATUSES.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', username));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Get the first matching doc
        const userDoc = querySnapshot.docs[0];
        const userRef = userDoc.ref;

        await updateDoc(userRef, {
            status,
            statusUpdatedAt: new Date()
        });

        return res.status(200).json({ message: `Status updated to ${status}` });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to update status' });
    }


}