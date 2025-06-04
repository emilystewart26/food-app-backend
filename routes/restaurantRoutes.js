const express = require("express")
const router = express.Router()
const { 
    getRestaurants,
    getRestaurantsByLocation, 
    getRestaurantsByCity,
    getRestaurantsByName,
    getRestaurantById,
    getRestaurantsByUserId,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
} = require("../controllers/restaurantControllers")  

// Get all restaurants + get restaurants by different search criteria (anyone - no login required)
router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);
router.get("/userid/:userId", getRestaurantsByUserId); // userId = "vendor" user._id
router.get("/name/:name", getRestaurantsByName);
router.get("/city/:city", getRestaurantsByCity);
//router.get("/location/:location", getRestaurantsByLocation); // !!! investigate the logic - e.g using coordinates+search radius ???

// Create restaurant (if logged in as "vendor")
router.post("/", addRestaurant);

// Update (if logged in as "vendor" && if restaurant's owner > if userId in restaurant DB matches the user._id in the user DB)
router.put("/:id", updateRestaurant);

// Delete (if logged in as "vendor" && if restaurant's owner > if userId in restaurant DB matches the user._id in the user DB)
router.delete("/:id", deleteRestaurant);

module.exports = router;