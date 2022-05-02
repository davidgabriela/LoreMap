const Lore = require("../models/Lore");

// @desc    Get all lores
// @route   GET /lore-collection
// @access  Public
exports.getLores = async (req, res, next) => {
    try {
        const lores = await Lore.find();

        res.status(200).json({
            success: true,
            count: lores.length,
            data: lores,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
        });
    }
};

// @desc    Get a single lores
// @route   GET /lore-collection/:id
// @access  Public
exports.getLore = async (req, res, next) => {
    try {
        const listing = await Lore.findById(req.params.id);

        res.status(200).json({
            success: true,
            data: listing,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
        });
    }
};

// @desc    Create new lores
// @route   POST /lore-collection
// @access  Private
exports.createLore = async (req, res, next) => {
    const listing = await Lore.create(req.body);
    res.status(201).json({
        success: true,
        data: listing,
    });
};

// @desc    Update a lores
// @route   PUT /lore-collection/:id
// @access  Private
exports.updateLore = async (req, res, next) => {
    try {
        const listing = await Lore.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!listing) {
            res.status(400).json({
                success: false,
            });
        }
        res.status(200).json({
            success: true,
            data: listing,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
        });
    }
};

// @desc    Delete a listing
// @route   DELETE /lore-collection/:id
// @access  Private
exports.deleteLore = async (req, res, next) => {
    try {
        const listing = await Lore.findByIdAndDelete(req.params.id);
        if (!listing) {
            res.status(400).json({
                success: false,
            });
        }
        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        res.status(400).json({
            success: false,
        });
    }
};
