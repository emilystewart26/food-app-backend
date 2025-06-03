const mongoose = require("mongoose")

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    postcode: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: false,
    },
    website: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true,
        enum: ["cafe", "bar", "restaurant","gastropub","takeaway"],
    },
   meals: {
    type: String,
    required: true,
    enum: ["breakfast", "brunch", "lunch", "dinner"],
},
   dietary:{
    type: String,
    required: false,
    enum: ["vegetarian", "vegan", "glutenfree", "dairyfree", "halal", "kosher"],
   },
   alcohol:{
    type: Boolean,
    required: true,
   },
   welcomes:{
   type: String,
   required: false,
   enum: ["children","dogs"]
   },
   facilities:{
    type: String,
   required: false,
   enum: ["toilets", "garden", "wifi"]
   },
   tags:{
    type: [String],
    required: false
   },
  

    // TODO: look into photo upload with cloudinary - pictures stored as URL??? >> add to Schema

    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
})

module.exports = mongoose.model("Restaurant", restaurantSchema)