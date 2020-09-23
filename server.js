require('dotenv').config()

// Imports
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

// Express
const app = express()

// Express uses
app.use(cors());
app.use(morgan('tiny'))


// MongoDB
const connectionString = process.env.DATABASE_URL || 'mongodb://localhost/subscribers'
mongoose.connect(connectionString, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

// Router
const subscribersRouter = require('./routes/subscribersRouter')
app.use('/subscribers', subscribersRouter)

// Start server
const port = process.env.PORT || 3012
app.listen(port, () => console.log(`Server Started on port ${port}`))