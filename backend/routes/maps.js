const express = require('express')
const { protect, authorize } = require('../middleware/auth')
const advancedResults = require('../middleware/advancedResults')

const Map = require('../models/Map')

const {
  getMaps,
  getMap,
  updateMap,
  createMap,
  deleteMap,
  mapPhotoUpload,
  uploadFiles,
  getListFiles,
} = require('../controllers/maps')

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(
    advancedResults(Map, {
      path: 'lore',
      select: 'title owner',
    }),
    getMaps,
  )
  .post(protect, createMap)

router
  .route('/:id')
  .get(getMap)
  .put(protect, updateMap)
  .delete(protect, deleteMap)

router.route('/:id/upload').put(mapPhotoUpload)

module.exports = router
