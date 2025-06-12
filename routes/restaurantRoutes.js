const express = require("express")
const router = express.Router()
const { 
    getRestaurants,
    //getRestaurantsByCity,
    //getRestaurantsByName,
    getRestaurantById,
    getRestaurantsByUserId,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getRestaurantsWithinRadius,
} = require("../controllers/restaurantControllers")  
const {authenticateToken, authorizeRole}  = require("../middleware/authMiddleware");



// Get all restaurants + get restaurants by different search criteria (anyone - no login required)
router.get("/", getRestaurants);
router.get("/nearby", getRestaurantsWithinRadius);
router.get("/:id", getRestaurantById);
router.get("/userid/:userId", getRestaurantsByUserId); // userId = "vendor" user._id
//router.get("/name/:name", getRestaurantsByName);  *** now handled via buildFilterObject.js in utils ***
//router.get("/city/:city", getRestaurantsByCity);  *** now handled via buildFilterObject.js in utils ***


// Create restaurant (if logged in as "vendor")
router.post("/", authenticateToken, authorizeRole("vendor"), addRestaurant);

// Update (if logged in as "vendor" && if restaurant's owner > if userId in restaurant DB matches the user._id in the user DB)
router.put("/:id", authenticateToken, authorizeRole("vendor"), updateRestaurant);

// Delete (if logged in as "vendor" && if restaurant's owner > if userId in restaurant DB matches the user._id in the user DB)
router.delete("/:id", authenticateToken, authorizeRole("vendor"), deleteRestaurant);

module.exports = router;