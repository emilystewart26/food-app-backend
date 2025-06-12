const express = require("express");
const { addToFavourites, removeFromFavourites, getFavourites } = require("../controllers/favouriteControllers");
const { authenticateToken, authorizeRole } = require("../middleware/authMiddleware");
const router = express.Router();



router.get("/", authenticateToken, authorizeRole("user"), getFavourites);

router.post("/:restaurantId", authenticateToken, authorizeRole("user"), addToFavourites);

router.delete("/:restaurantId", authenticateToken, authorizeRole("user"), removeFromFavourites);



module.exports = router;