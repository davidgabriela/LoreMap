const Timeline = require('../models/Timeline')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const path = require('path')
const mongoose = require('mongoose')

// @desc    Get all timelines
// @route   GET /api/v1/timelines
// @route   GET /api/v1/lore-collection/:id/timelines
// @access  Public
exports.getTimelines = asyncHandler(async (req, res, next) => {
  if (req.params.loreId) {
    const timelines = await Timeline.find({ lore: req.params.loreId })
    return res.status(200).json({
      success: true,
      count: timelines.length,
      data: timelines,
    })
  } else {
    res.status(200).json(res.advancedResults)
  }
})

// @desc    Get a single timeline
// @route   GET /api/v1/timelines/:id
// @access  Public
exports.getTimeline = asyncHandler(async (req, res, next) => {
  const timeline = await Timeline.findById(req.params.id)

  if (!timeline) {
    return next(
      new ErrorResponse(`Timeline not found with id of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: timeline,
  })
})
// @desc    Create new timeline
// @route   POST /api/v1/timelines
// @access  Private
exports.createTimeline = asyncHandler(async (req, res, next) => {
  const timeline = await Timeline.create(req.body)

  res.status(201).json({
    success: true,
    data: timeline,
  })
})

// @desc    Update timeline
// @route   PUT /api/v1/timelines/:id
// @access  Private
exports.updateTimeline = asyncHandler(async (req, res, next) => {
  let timeline = await Timeline.findById(req.params.id)

  if (!timeline) {
    return next(
      new ErrorResponse(`Timeline not found with id ${req.params.id}`, 404),
    )
  }

  // Check ownership
  // if (timeline.owner.toString() !== req.user.id) {
  //     return next(
  //         new ErrorResponse(
  //             `User ${req.params.id} not authorized to update timeline`,
  //             401
  //         )
  //     );
  // }

  timeline = await Timeline.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({ success: true, data: timeline })
})

// @desc    Delete timeline
// @route   DELETE /api/v1/timelines/:id
// @access  Private
exports.deleteTimeline = asyncHandler(async (req, res, next) => {
  const timeline = await Timeline.findById(req.params.id)

  if (!timeline) {
    return next(
      new ErrorResponse(`Timeline not found with id ${req.params.id}`, 404),
    )
  }

  // Check ownership
  // if (timeline.owner.toString() !== req.user.id) {
  //     return next(
  //         new ErrorResponse(
  //             `User ${req.params.id} not authorized to delete timeline`,
  //             401
  //         )
  //     );
  // }

  timeline.remove()

  res.status(200).json({ success: true, data: {} })
})
