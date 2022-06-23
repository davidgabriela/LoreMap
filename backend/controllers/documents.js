const Document = require('../models/Document')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const path = require('path')
const mongoose = require('mongoose')

// @desc    Get all documents
// @route   GET /api/v1/documents
// @route   GET /api/v1/lore-collection/:id/documents
// @access  Public
exports.getDocuments = asyncHandler(async (req, res, next) => {
  let query
  if (req.params.loreId) {
    query = Document.find({ lore: req.params.loreId })
  } else {
    query = Document.find()
  }
  const documents = await query

  res.status(200).json(res.advancedResults)
})

// @desc    Get a single document
// @route   GET /api/v1/documents/:id
// @access  Public
exports.getDocument = asyncHandler(async (req, res, next) => {
  const document = await Document.findById(req.params.id)

  if (!document) {
    return next(
      new ErrorResponse(`Document not found with id of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: document,
  })
})
// @desc    Create new document
// @route   POST /api/v1/documents
// @access  Private
exports.createDocument = asyncHandler(async (req, res, next) => {
  const document = await Document.create(req.body)

  res.status(201).json({
    success: true,
    data: document,
  })
})

// @desc    Update document
// @route   PUT /api/v1/documents/:id
// @access  Private
exports.updateDocument = asyncHandler(async (req, res, next) => {
  let document = await Document.findById(req.params.id)

  if (!document) {
    return next(
      new ErrorResponse(`Document not found with id ${req.params.id}`, 404),
    )
  }

  // Check ownership
  // if (document.owner.toString() !== req.user.id) {
  //     return next(
  //         new ErrorResponse(
  //             `User ${req.params.id} not authorized to update document`,
  //             401
  //         )
  //     );
  // }

  document = await Document.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({ success: true, data: document })
})

// @desc    Delete document
// @route   DELETE /api/v1/documents/:id
// @access  Private
exports.deleteDocument = asyncHandler(async (req, res, next) => {
  const document = await Document.findById(req.params.id)

  if (!document) {
    return next(
      new ErrorResponse(`Document not found with id ${req.params.id}`, 404),
    )
  }

  // Check ownership
  // if (document.owner.toString() !== req.user.id) {
  //     return next(
  //         new ErrorResponse(
  //             `User ${req.params.id} not authorized to delete document`,
  //             401
  //         )
  //     );
  // }

  document.remove()

  res.status(200).json({ success: true, data: {} })
})
