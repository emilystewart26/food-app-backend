const mongoose = require("mongoose")

// ** schema needs review for data types, check matching frontend data input & expected data across the whole frontend  

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
    location: {
        type: {
          type: String,
          enum: ['Point'],
          required: true,
        },
        coordinates: {
          type: [Number], // [lng, lat]
          required: true,
        },
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
        type: [String],
        required: true,
        enum: ["cafe", "bar", "restaurant","gastropub","takeaway"],
    },
   meals: {
    type: [String],
    required: true,
    enum: ["breakfast", "brunch", "lunch", "dinner"],
},
   dietary:{
    type: [String],
    required: false,
    enum: ["vegetarian", "vegan", "glutenfree", "dairyfree", "halal", "kosher"],
   },
   alcohol:{
    type: Boolean,
    required: true,
   },
   welcomes:{
   type: [String],
   required: false,
   enum: ["children","dogs"]
   },
   facilities:{
    type: [String],
   required: false,
   enum: ["toilets", "garden", "wifi"]
   },
   tags:{
    type: [String],  
    required: false
   },
   description:{
    type: String,
    required: false
   },
   imageUrl:{
    type:[String],
    required: false
   },
   googleMapsUrl: {
    type:String,
    required: false
    }, 
    priceRange: {
        type: String,
        required: false,
        enum: ["cheap" , "moderate", "expensive"] 
    },
    accessibility: {
        type:[String],
        required: false,
        enum: ["wheelchair","disabled bathroom"]
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
})

// Geospatial index for distance queries
restaurantSchema.index({ location: '2dsphere' });

module.exports = mongoose.model("Restaurant", restaurantSchema)