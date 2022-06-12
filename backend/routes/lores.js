const express = require('express')
const { protect, authorize } = require('../middleware/auth')
const advancedResults = require('../middleware/advancedResults')

const Lore = require('../models/Lore')

// Include other resource routers
const mapRouter = require('./maps')

const {
  getLores,
  getLore,
  updateLore,
  createLore,
  deleteLore,
} = require('../controllers/lores')

const router = express.Router()

//Re-route into other resource routers
router.use('/:loreId/maps', mapRouter)

router.route('/').get(advancedResults(Lore), getLores).post(protect, createLore)

router
  .route('/:id')
  .get(getLore)
  .put(protect, updateLore)
  .delete(protect, deleteLore)

module.exports = router
