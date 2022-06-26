const Map = require('../models/Map')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const path = require('path')
const mongoose = require('mongoose')

// @desc    Get all maps
// @route   GET /api/v1/maps
// @route   GET /api/v1/lore-collection/:id/maps
// @access  Public
exports.getMaps = asyncHandler(async (req, res, next) => {
  if (req.params.loreId) {
    const maps = await Map.find({ lore: req.params.loreId })
    return res.status(200).json({
      success: true,
      count: maps.length,
      data: maps,
    })
  } else {
    res.status(200).json(res.advancedResults)
  }
})

// @desc    Get a single map
// @route   GET /api/v1/maps/:id
// @access  Public
exports.getMap = asyncHandler(async (req, res, next) => {
  const map = await Map.findById(req.params.id)

  if (!map) {
    return next(
      new ErrorResponse(`Map not found with id of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: map,
  })
})
// @desc    Create new map
// @route   POST /api/v1/maps
// @access  Private
exports.createMap = asyncHandler(async (req, res, next) => {
  // Add owner
  // req.body.owner = req.user.id;

  // Add member
  //req.body.members = req.user.email;

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400))
  }
  console.log(req.files)

  const objId = mongoose.Types.ObjectId()
  req.files['_id'] = objId

  const uploadFile = req.files.imageFile

  if (!uploadFile.mimetype.startsWith('image')) {
    return next(
      new ErrorResponse(`Please upload an image file (PNG, JPG/JPEG)`, 400),
    )
  }

  //Check filesize
  if (uploadFile.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400,
      ),
    )
  }

  // Create custom filename
  uploadFile.name = `photo_${objId}${path.parse(uploadFile.name).ext}`

  uploadFile.mv(
    `${process.env.FILE_UPLOAD_PATH}/${uploadFile.name}`,
    async (err) => {
      if (err) {
        console.error(err)
        return next(new ErrorResponse(`Problem with file upload`, 500))
      }

      const map = await Map.create(req.files)

      res.status(201).json({ success: true, data: map })
    },
  )
})

// @desc    Update map
// @route   PUT /api/v1/maps/:id
// @access  Private
exports.updateMap = asyncHandler(async (req, res, next) => {
  let map = await Map.findById(req.params.id)

  if (!map) {
    return next(
      new ErrorResponse(`Map not found with id ${req.params.id}`, 404),
    )
  }

  // Check ownership
  // if (map.owner.toString() !== req.user.id) {
  //     return next(
  //         new ErrorResponse(
  //             `User ${req.params.id} not authorized to update map`,
  //             401
  //         )
  //     );
  // }

  map = await Map.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({ success: true, data: map })
})

// @desc    Delete map
// @route   DELETE /api/v1/maps/:id
// @access  Private
exports.deleteMap = asyncHandler(async (req, res, next) => {
  const map = await Map.findById(req.params.id)

  if (!map) {
    return next(
      new ErrorResponse(`Map not found with id ${req.params.id}`, 404),
    )
  }

  // Check ownership
  // if (map.owner.toString() !== req.user.id) {
  //     return next(
  //         new ErrorResponse(
  //             `User ${req.params.id} not authorized to delete map`,
  //             401
  //         )
  //     );
  // }

  map.remove()

  res.status(200).json({ success: true, data: {} })
})

// @desc    Upload photo for map
// @route   PUT /api/v1/maps/:id/upload
// @access  Private
exports.mapPhotoUpload = asyncHandler(async (req, res, next) => {
  const map = await Map.findById(req.params.id)

  if (!map) {
    return next(
      new ErrorResponse(`Map not found with id ${req.params.id}`, 404),
    )
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400))
  }
  console.log(req.files)

  const uploadFile = req.files[Object.keys(req.files)[0]]

  if (!uploadFile.mimetype.startsWith('image')) {
    return next(
      new ErrorResponse(`Please upload an image file (PNG, JPG/JPEG)`, 400),
    )
  }

  //Check filesize
  if (uploadFile.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400,
      ),
    )
  }

  // Create custom filename
  uploadFile.name = `photo_${map._id}${path.parse(uploadFile.name).ext}`

  uploadFile.mv(
    `${process.env.FILE_UPLOAD_PATH}/${uploadFile.name}`,
    async (err) => {
      if (err) {
        console.error(err)

        return next(new ErrorResponse(`Problem with file upload`, 500))
      }

      await Map.findByIdAndUpdate(req.params.id, { imageFile: uploadFile.name })

      res.status(200).json({ success: true, data: uploadFile.name })
    },
  )
})
