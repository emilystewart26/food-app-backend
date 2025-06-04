const express = require("express")
const router = express.Router()
const { 
    getReviews,
    getReviewsById,
    getReviewsByUserId,
    getReviewsByrestaurantId
} = require("../controllers/reviewController")  

// Get all reviews + reviews by different search criteria
router.get("/", getReviews)
router.get("/:id", getReviewsById)
router.get("/userid/:userId", getReviewsByUserId)
router.get("/restaurantid/:restaurantId", getReviewsByrestaurantId)

// Create review
router.post("/", addReview)

// update ??
// delete ??

module.exports = router