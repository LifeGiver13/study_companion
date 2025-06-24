import express from 'express'
const app = express()
const port = 3000

import authRoute from './routes/index.js'

app.use(express.json())
app.use(authRoute)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})