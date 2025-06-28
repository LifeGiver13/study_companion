import express from 'express';
import authRoutes from './routes/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', authRoutes);

if (process.env.RENDER === 'true' || process.env.VERCEL !== '1') {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

export default app;
