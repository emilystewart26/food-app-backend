const mongoose = require("mongoose");
const Review = require("../Models/Review");
const Restaurant = require("../Models/Restaurant");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");


exports.addToFavourites = async (req, res) => {
    try {
        const userId = req.user.id; // Extracted from the token by authenticateToken middleware
        const restaurantId = req.params.restaurantId;

        // Check if the restaurant exists
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        // Add the restaurant to the user's favourites
        const user = await User.findById(userId);
        if (!user.favourites.includes(restaurantId)) {
            user.favourites.push(restaurantId);
            await user.save();
        }

        res.status(200).json({ message: "Restaurant added to favourites", favourites: user.favourites });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



    exports.removeFromFavourites = async (req, res) => {
        try {
            const userId = req.user.id; // Extracted from the token by authenticateToken middleware
            const restaurantId = req.params.restaurantId;
    
            // Remove the restaurant from the user's favourites
            const user = await User.findById(userId);
            user.favourites = user.favourites.filter(id => id.toString() !== restaurantId);
            await user.save();
    
            res.status(200).json({ message: "Restaurant removed from favourites", favourites: user.favourites });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    exports.getFavourites = async (req, res) => {
        try {
            const userId = req.user.id; // Extracted from the token by authenticateToken middleware
    
            // Populate the favourites array with restaurant details
            const user = await User.findById(userId).populate("favourites");
            res.status(200).json({ favourites: user.favourites });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };