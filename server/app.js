// import express from 'express'
// const app = express()
// const port = 3000

// import authRoute from './routes/index.js'

// app.use(express.json())
// app.use(authRoute)


// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

import express from 'express';
import authRoutes from '../routes/index.js';

const app = express();
app.use(express.json());
app.use(authRoutes);

export default function handler(req, res) {
    app(req, res);
}
