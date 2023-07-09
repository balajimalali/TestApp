var cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')


dotenv.config();
const PORT = process.env.PORT || 8080

const app = express()
app.use(cors({
    origin: "http://localhost:8000",
    credentials: true,
}))
app.use(express.json())
app.use('/api', require('./routes/auth'))
app.use('/api/test', require('./routes/qpaper'))
app.use('/api/result', require('./routes/eval'))

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})