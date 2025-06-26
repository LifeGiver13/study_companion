import { getAuth, signOut } from "firebase/auth";

export async function logout(req, res) {
    try {
        const auth = getAuth(); // server-side, use admin SDK if needed
        await signOut(auth); // only valid on client
        return res.status(200).json({ message: 'Signed out' });
    } catch (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ error: 'Logout failed' });
    }
}
