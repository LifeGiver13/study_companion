import app from "./server/app.js"

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Local server running on http://localhost:${PORT}`)
})
