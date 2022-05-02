const express = require("express");
const {
    getLores,
    getLore,
    updateLore,
    createLore,
    deleteLore,
} = require("../controllers/lores");

const router = express.Router();

router.route("/").get(getLores).post(createLore);

router.route("/:id").get(getLore).put(updateLore).delete(deleteLore);

module.exports = router;
