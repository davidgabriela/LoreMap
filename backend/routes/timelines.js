const express = require('express')
const { protect, authorize } = require('../middleware/auth')
const advancedResults = require('../middleware/advancedResults')

const Timeline = require('../models/Timeline')

const eventRouter = require('./events')

const {
  getTimelines,
  getTimeline,
  updateTimeline,
  createTimeline,
  deleteTimeline,
} = require('../controllers/timelines')

const router = express.Router({ mergeParams: true })

//Re-route into other resource routers
router.use('/:timelineId/events', eventRouter)

router
  .route('/')
  .get(
    advancedResults(Timeline, {
      path: 'lore',
      select: 'title owner',
    }),
    getTimelines,
  )
  .post(protect, createTimeline)

router
  .route('/:id')
  .get(getTimeline)
  .put(protect, updateTimeline)
  .delete(protect, deleteTimeline)

module.exports = router
