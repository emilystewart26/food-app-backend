const express = require("express");
const { addToFavourites, removeFromFavourites, getFavourites } = require("../controllers/favouriteControllers");
const { authenticateToken, authorizeRole } = require("../middleware/authMiddleware");
const router = express.Router();



router.post("/:restaurantId", authenticateToken, authorizeRole("user"), addToFavourites)

router.delete("/:restaurantId", authenticateToken, authorizeRole("user"), removeFromFavourites)

router.get("/", authenticateToken, authorizeRole("user"), getFavourites)

module.exports = router;