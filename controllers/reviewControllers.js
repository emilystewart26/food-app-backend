const Review = require("../Models/Review")
const User = require("../Models/User")
const mongoose = require("mongoose")


exports.getReviews = async (req, res) => {
    try {
            const reviews = await Review.find()
            res.json(reviews)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
}

exports.getReviewsById = async (req, res) => {
   try {
          const review = await Review.findById(req.params.id)
          res.json(review)
      } catch (err) {
          res.status(500).json({ message: err.message })
      }
}


exports.getReviewsByUserId = async (req, res) => {
  try {
          console.log("Route params:", req.params);
          const userId = new mongoose.Types.ObjectId(req.params.userId)
          const reviews = await Review.find({ userId });
          if (reviews.length ===0) {
              return res.status(404).send({ error: "No reviews found." })
          }
          res.json(reviews)
      } catch (error) {
        res.status(500).json({ message: error.message })
      }
}


exports.getReviewsByRestaurantId = async (req, res) => {
    try {
        console.log("Route params:", req.params);
        const restaurantId = new mongoose.Types.ObjectId(req.params.restaurantId);
        const reviews = await Review.find({ restaurantId });
        if (reviews.length ===0) {
         return res.status(200).json([]);
        }
        res.json(reviews)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


exports.addReview = async (req, res) => {
    
   const clerkUserId = req.auth?.userId;
    if (!clerkUserId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    
  const userInDB = await User.findOne({ clerkId: clerkUserId });
      if (!userInDB) {
        return res.status(401).json({ message: "User not found." });
      }
    
   const restaurantId = new mongoose.Types.ObjectId(req.body.restaurantId);//changed req.params.restaurantId
     
   const review = new Review({
    foodReview: req.body.foodReview,
    foodStars: req.body.foodStars,
    ambienceReview: req.body.ambienceReview,
    ambienceStars: req.body.ambienceStars,
    serviceReview: req.body.serviceReview,
    serviceStars: req.body.serviceStars,
    locationReview: req.body.locationReview,
    locationStars: req.body.locationStars,
    userId: userInDB._id,
    restaurantId: restaurantId,//changed restaurantId._id 
  })

  try {
    const newReview = await review.save()
    res.status(201).json(newReview)
} catch (err) {
    res.status(400).json({ message: err.message })
}

}

