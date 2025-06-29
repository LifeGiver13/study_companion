import express from 'express';
import authRoutes from './routes/index.js';
import cors from 'cors';


const app = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use('/api', authRoutes);

if (process.env.RENDER === 'true' || process.env.VERCEL !== '1') {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

export default app;
