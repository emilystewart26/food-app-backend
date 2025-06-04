const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    foodReview: {
        type: String,
        required: true,
    },
    foodStars: {
        type: Number,
        required: true,
    },
    ambienceReview: {
        type: String,
        required: true,
    },
    ambienceStars: {
        type: Number,
        required: true,
    },
    serviceReview: {
        type: String,
        required: true,
    },
    serviceStars: {
        type: Number,
        required: true,
    },
    locationReview: {
        type: String,
        required: true,
    },
    locationStars: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    restaurantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
})

module.exports = mongoose.model("Review", reviewSchema)