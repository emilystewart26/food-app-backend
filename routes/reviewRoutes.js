const express = require("express")
const router = express.Router()
const { 
    getReviews,
    getReviewsById,
    getReviewsByUserId,
    getReviewsByRestaurantId, 
    addReview,
} = require("../controllers/reviewControllers");
const {authenticateToken, authorizeRole} = require("../middleware/authMiddleware");  

// Get all reviews + reviews by different search criteria
router.get("/", getReviews)
router.get("/:id", getReviewsById)
router.get("/userid/:userId", authenticateToken, authorizeRole("user"), getReviewsByUserId)
router.get("/restaurantid/:restaurantId", getReviewsByRestaurantId) 

// Create review
 router.post("/", authenticateToken, authorizeRole(["user","admin"]), addReview)
 
router.post("/", addReview)

module.exports = router