import express from 'express';
import cors from 'cors';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js'
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api', usersRoute)
app.get('/', (req, res) => {
    res.send('Welcome to the API! Use /api/auth for authentication routes.');
});

if (process.env.RENDER === 'true' || process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

export default app;