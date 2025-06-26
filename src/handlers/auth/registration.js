export async function register(req, res) {
    try {
        const { username, email, password, classLevel, subjects } = req.body;

        if (!username || !email || !password || !classLevel) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!Array.isArray(subjects) || subjects.length < 1) {
            return res.status(400).json({ error: 'Please add at least one subject.' });
        }

        const usernameQuery = query(collection(db, 'users'), where('username', '==', username));
        const emailQuery = query(collection(db, 'users'), where('email', '==', email));

        const userSnapshot = await getDocs(usernameQuery);
        const emailSnapshot = await getDocs(emailQuery);

        if (!userSnapshot.empty) {
            return res.status(409).json({ error: 'Sorry, Username already exists.' });
        }

        if (!emailSnapshot.empty) {
            return res.status(409).json({ error: 'Sorry, Email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            username,
            email,
            password: hashedPassword,
            class: classLevel,
            subjects
        };

        const docRef = await addDoc(collection(db, 'users'), newUser);

        res.status(201).json({
            message: 'User created',
            data: newUser,
            docId: docRef.id
        });

        console.log(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
}
