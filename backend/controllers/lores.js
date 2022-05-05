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

// @desc    Get a single lore
// @route   GET /lore-collection/:id
// @access  Public
exports.getLore = async (req, res, next) => {
    try {
        const lore = await Lore.findById(req.params.id);

        res.status(200).json({
            success: true,
            data: lore,
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
    // Add user to req.body
    req.body.owner = req.user.id;

    const lore = await Lore.create(req.body);
    res.status(201).json({
        success: true,
        data: lore,
    });
};

// @desc    Update a lores
// @route   PUT /lore-collection/:id
// @access  Private
exports.updateLore = async (req, res, next) => {
    try {
        let lore = await Lore.findById(req.params.id);
        if (!lore) {
            res.status(400).json({
                success: false,
            });
        }

        // Check ownership
        if (lore.owner.toString() !== req.user.id) {
            return next(
                new ErrorResponse(
                    `User ${req.params.id} not authorized to update lore collection`,
                    401
                )
            );
        }

        lore = await Lore.findOneAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: lore,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
        });
    }
};

// @desc    Delete a lore
// @route   DELETE /lore-collection/:id
// @access  Private
exports.deleteLore = async (req, res, next) => {
    try {
        const lore = await Lore.findByIdAndDelete(req.params.id);
        if (!lore) {
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
