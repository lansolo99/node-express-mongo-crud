const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

// Basic test route
// router.get('/', async (req, res) => {
//   try {
//     res.send('hello')
//   } catch (err) {
//   }
// })

// Getting all
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  } 
})

// Getting One
router.get('/:id', getSubscriber, (req, res) => {
  // return all documents
  res.send(res.subscriber)
})

// Creating one
router.post('/', async (req, res) => {
  console.log('post request received');
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })
  try {
    const newSubscriber = await subscriber.save()

    // return created document
    res.status(201).json(newSubscriber)
  } catch (err) {
    res.status(400).json({ message: err })
  }
})

// Updating One
router.patch('/:id', getSubscriber, async (req, res) => {
  // Only change properties passed through request body
  if (req.body.name != null) {
    res.subscriber.name = req.body.name
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel
  }
  try {
    const updatedSubscriber = await res.subscriber.save()

    // return updated document
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove()

    // return deleted confirmation message
    res.json({ message: 'Deleted Subscriber' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


// Common middleware
async function getSubscriber(req, res, next) {
  let subscriber
  try {

    // Get by prop -> name
    subscriber = await (await Subscriber.findOne({name: req.params.id }))

    // Get by prop -> _id
    // subscriber = await Subscriber.findById(req.params.id)

    // Document is null
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

// Bind subscriber document to res object
  res.subscriber = subscriber

  // Move on to the request
  next()
}

module.exports = router