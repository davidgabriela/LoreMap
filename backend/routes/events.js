const express = require('express')
const { protect, authorize } = require('../middleware/auth')
const advancedResults = require('../middleware/advancedResults')

const Event = require('../models/Event')

const {
  getEvents,
  getEvent,
  updateEvent,
  createEvent,
  deleteEvent,
} = require('../controllers/events')

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(
    advancedResults(Event, {
      path: 'timeline',
      select: 'name lore',
    }),
    getEvents,
  )
  .post(protect, createEvent)

router
  .route('/:id')
  .get(getEvent)
  .put(protect, updateEvent)
  .delete(protect, deleteEvent)

module.exports = router
