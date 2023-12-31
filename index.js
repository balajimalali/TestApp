var cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const path = require("path");

dotenv.config();
const PORT = process.env.PORT || 8080

const app = express()
app.use(cors({
    origin: process.env.CORS_ALLOW,
    credentials: true,
}))
app.use(express.json())

app.use(express.static(path.join(__dirname, "frontend", "build")));

app.use('/api', require('./routes/auth'))
app.use('/api/test', require('./routes/qpaper'))
app.use('/api/result', require('./routes/eval'))

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})
