const express = require("express")
const router = express.Router()
const { 
    getRestaurants,
    getRestaurantsByLocation, 
    getRestaurantsByName,
    getRestaurantById,
    getRestaurantsByUserId,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant
} = require("../controllers/restaurantController")  

// Get all restaurants + restaurants by different search criteria
router.get("/", getRestaurants)
router.get("/name/:name", getRestaurantsByName)
router.get("/:id", getRestaurantById)
router.get("/userid/:userId", getRestaurantsByUserId)
router.get("/location/:location", getRestaurantsByLocation)  // !!! investigate the logic - e.g using coordinates+search radius ???

// Create restaurant
router.post("/", addRestaurant)

// Update 
router.put("/:id", updateRestaurant)

// Delete 
router.delete("/:id", deleteRestaurant)

module.exports = router