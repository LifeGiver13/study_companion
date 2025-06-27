import express from 'express';
import authRoutes from './routes/index.js';

const app = express();

app.use(express.json());
app.use('/api', authRoutes);

if (process.env.RENDER === 'true' || process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running in development mode on port ${port}`);
    })
}
export default app;
