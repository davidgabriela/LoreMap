const Folder = require('../models/Folder')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const path = require('path')
const mongoose = require('mongoose')

// @desc    Get all folders
// @route   GET /api/v1/folders
// @route   GET /api/v1/lore-collection/:id/folders
// @access  Public
exports.getFolders = asyncHandler(async (req, res, next) => {
  let query
  if (req.params.loreId) {
    query = Folder.find({ lore: req.params.loreId })
  } else {
    query = Folder.find()
  }
  const folders = await query

  res.status(200).json(res.advancedResults)
})

// @desc    Get a single folder
// @route   GET /api/v1/folders/:id
// @access  Public
exports.getFolder = asyncHandler(async (req, res, next) => {
  const folder = await Folder.findById(req.params.id)

  if (!folder) {
    return next(
      new ErrorResponse(`Folder not found with id of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: folder,
  })
})
// @desc    Create new folder
// @route   POST /api/v1/folders
// @access  Private
exports.createFolder = asyncHandler(async (req, res, next) => {
  const folder = await Folder.create(req.body)

  res.status(201).json({
    success: true,
    data: folder,
  })
})

// @desc    Update folder
// @route   PUT /api/v1/folders/:id
// @access  Private
exports.updateFolder = asyncHandler(async (req, res, next) => {
  let folder = await Folder.findById(req.params.id)

  if (!folder) {
    return next(
      new ErrorResponse(`Folder not found with id ${req.params.id}`, 404),
    )
  }

  // Check ownership
  // if (folder.owner.toString() !== req.user.id) {
  //     return next(
  //         new ErrorResponse(
  //             `User ${req.params.id} not authorized to update folder`,
  //             401
  //         )
  //     );
  // }

  folder = await Folder.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({ success: true, data: folder })
})

// @desc    Delete folder
// @route   DELETE /api/v1/folders/:id
// @access  Private
exports.deleteFolder = asyncHandler(async (req, res, next) => {
  const folder = await Folder.findById(req.params.id)

  if (!folder) {
    return next(
      new ErrorResponse(`Folder not found with id ${req.params.id}`, 404),
    )
  }

  // Check ownership
  // if (folder.owner.toString() !== req.user.id) {
  //     return next(
  //         new ErrorResponse(
  //             `User ${req.params.id} not authorized to delete folder`,
  //             401
  //         )
  //     );
  // }

  folder.remove()

  res.status(200).json({ success: true, data: {} })
})
