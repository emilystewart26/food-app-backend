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
    type: [String],  // freetype - max 3-4 fields??
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
   // owner will add a link to embed Google Maps when registering a new restaurant
   // eg. <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1177.4412283087293!2d-1.5809516802827572!3d53.82716690263906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879592368e644c7%3A0x10184eab936d6909!2sFika%20North%20Coffee!5e0!3m2!1sen!2suk!4v1749547015348!5m2!1sen!2suk" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
   googleMapsUrl: {
    type:String,
    required: false
    }, 
    priceRange: {
        type: String,
        required: false,
        enum: ["cheap" , "moderate", "expensive"] //["£", "££","£££"]
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