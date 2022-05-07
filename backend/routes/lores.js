const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const Lore = require("../models/Lore");

const {
    getLores,
    getLore,
    updateLore,
    createLore,
    deleteLore,
} = require("../controllers/lores");

const router = express.Router();

router.route("/").get(advancedResults(Lore), getLores).post(protect, createLore);

router
    .route("/:id")
    .get(getLore)
    .put(protect, updateLore)
    .delete(protect, deleteLore);

module.exports = router;
