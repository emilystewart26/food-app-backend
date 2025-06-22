const express = require("express");
const { addToFavourites, removeFromFavourites, getFavourites } = require("../controllers/favouriteControllers");
const requireClerkAuth = require("../middleware/requireClerkAuth");
const authorizeRole = require("../middleware/authorizeRole");
const router = express.Router();

router.get("/", requireClerkAuth, authorizeRole("user"), getFavourites);

router.post("/:restaurantId", requireClerkAuth, authorizeRole("user"), addToFavourites);

router.delete("/:restaurantId", requireClerkAuth, authorizeRole("user"), removeFromFavourites);



module.exports = router;