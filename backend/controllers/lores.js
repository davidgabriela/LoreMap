const Lore = require("../models/Lore");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc    Get all lores
// @route   GET /api/v1/lore-collection
// @access  Public
exports.getLores = asyncHandler(async (req, res, next) => {
    const lores = await Lore.find();

    res.status(200).json(res.advancedResults);
});

// @desc    Get a single lore
// @route   GET /api/v1/lore-collection/:id
// @access  Public
exports.getLore = asyncHandler(async (req, res, next) => {
    const lore = await Lore.findById(req.params.id);

    if (!lore) {
        return next(
            new ErrorResponse(`Lore not found with id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: lore,
    });
});
// @desc    Create new lore
// @route   POST /api/v1/lore-collection
// @access  Private
exports.createLore = asyncHandler(async (req, res, next) => {
    // Add owner
    req.body.owner = req.user.id;
    // Add member
    req.body.members = req.user.email;

    const lore = await Lore.create(req.body);

    res.status(201).json({
        success: true,
        data: lore,
    });
});

// @desc    Update lore
// @route   PUT /api/v1/lore-collection/:id
// @access  Private
exports.updateLore = asyncHandler(async (req, res, next) => {
    let lore = await Lore.findById(req.params.id);

    if (!lore) {
        return next(
            new ErrorResponse(`Lore not found with id ${req.params.id}`, 404)
        );
    }

    // Check ownership
    if (lore.owner.toString() !== req.user.id) {
        return next(
            new ErrorResponse(
                `User ${req.params.id} not authorized to update lore`,
                401
            )
        );
    }

    lore = await Lore.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({ success: true, data: lore });
});

// @desc    Delete lore
// @route   DELETE /api/v1/lore-collection/:id
// @access  Private
exports.deleteLore = asyncHandler(async (req, res, next) => {
    const lore = await Lore.findById(req.params.id);

    if (!lore) {
        return next(
            new ErrorResponse(`Lore not found with id ${req.params.id}`, 404)
        );
    }

    // Check ownership
    if (lore.owner.toString() !== req.user.id) {
        return next(
            new ErrorResponse(
                `User ${req.params.id} not authorized to delete lore`,
                401
            )
        );
    }

    lore.remove();

    res.status(200).json({ success: true, data: {} });
});
