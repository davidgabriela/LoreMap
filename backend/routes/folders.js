const express = require('express')
const { protect, authorize } = require('../middleware/auth')
const advancedResults = require('../middleware/advancedResults')

const Folder = require('../models/Folder')

const {
  getFolders,
  getFolder,
  updateFolder,
  createFolder,
  deleteFolder,
} = require('../controllers/folders')

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(
    advancedResults(Folder, {
      path: 'children',
      select: 'name lore parent',
    }),
    getFolders,
  )
  .post(protect, createFolder)

router
  .route('/:id')
  .get(
    advancedResults(Folder, {
      path: 'children',
      select: 'name lore parent',
    }),
    getFolder,
  )
  .put(protect, updateFolder)
  .delete(protect, deleteFolder)

module.exports = router
