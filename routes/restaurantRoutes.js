const express = require("express")
const router = express.Router()
const { 
    getRestaurants,
    getRestaurantById,
    getRestaurantsByUserId,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
} = require("../controllers/restaurantControllers");  
const requireClerkAuth = require("../middleware/requireClerkAuth");
const authorizeRole = require("../middleware/authorizeRole");

router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);
router.get("/userid/:userId", requireClerkAuth, authorizeRole(["vendor","admin"]), getRestaurantsByUserId); 

router.post("/", requireClerkAuth, authorizeRole(["vendor","admin"]), addRestaurant);

// Not used in MVP but might want to add later!!!
//router.put("/:id", requireClerkAuth, authorizeRole(["vendor","admin"]), updateRestaurant);
// router.delete("/:id", requireClerkAuth, authorizeRole(["vendor","admin"]), deleteRestaurant);


module.exports = router;