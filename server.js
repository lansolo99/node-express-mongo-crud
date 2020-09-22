require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

app.use(cors());

// MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

// Router
const subscribersRouter = require('./routes/subscribersRouter')
app.use('/subscribers', subscribersRouter)

app.listen(3012, () => console.log('Server Started'))