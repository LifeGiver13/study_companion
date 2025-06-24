import express from 'express';
import authRoutes from '../routes/index.js';

const app = express();
app.use(express.json());
app.use(authRoutes);

app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'Serverless is working!' });
});

export default function handler(req, res) {
    app(req, res);
}
