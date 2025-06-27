const express = require("express")
const router = express.Router()
const { 
    getReviews,
    getReviewsById,
    getReviewsByUserId,
    getReviewsByRestaurantId, 
    addReview,
} = require("../controllers/reviewControllers"); 
const requireClerkAuth = require("../middleware/requireClerkAuth");
const authorizeRole = require("../middleware/authorizeRole");


router.get("/", getReviews)
router.get("/:id", getReviewsById)
router.get("/userid/:userId", requireClerkAuth, authorizeRole("user"), getReviewsByUserId)
router.get("/restaurantid/:restaurantId", getReviewsByRestaurantId) 

router.post("/", requireClerkAuth, authorizeRole(["user","admin"]), addReview)
 

module.exports = router