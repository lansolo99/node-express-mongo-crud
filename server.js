require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

// MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

// Router
const subscribersRouter = require('./routes/subscribersRouter')
app.use('/subscribers', subscribersRouter)

app.listen(3000, () => console.log('Server Started'))