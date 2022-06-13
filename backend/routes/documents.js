const express = require('express')
const { protect, authorize } = require('../middleware/auth')
const advancedResults = require('../middleware/advancedResults')

const Document = require('../models/Document')

const {
  getDocuments,
  getDocument,
  updateDocument,
  createDocument,
  deleteDocument,
} = require('../controllers/documents')

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(
    advancedResults(Document, {
      path: 'lore',
      select: 'title owner',
    }),
    getDocuments,
  )
  .post(protect, createDocument)

router
  .route('/:id')
  .get(getDocument)
  .put(protect, updateDocument)
  .delete(protect, deleteDocument)

module.exports = router
