import { auth } from "../firebase.js";
export async function passwordReset(req, res) {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const link = await auth.generatePasswordResetLink(email);

        return res.status(200).json({ message: 'Password reset link generated', link });
    } catch (error) {
        console.error('Error generating password reset link:', error.message);
        return res.status(500).json({ error: 'Failed to generate password reset link' });
    }
}
