import express from 'express';
import authRoutes from '../routes/index.js';

const app = express();
app.use(express.json());
app.use(authRoutes);

export default function handler(req, res) {
    app(req, res);
}
