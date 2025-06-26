const Restaurant = require("../Models/Restaurant");
const User = require("../Models/User");
const mongoose = require("mongoose");
const geocodeWithNominatim = require("../utils/geocode");
const buildFilterObject = require('../utils/buildFilterObject');


exports.getRestaurants = async (req, res) => {

    const { lat, lng, radius = 5000 } = req.query; // !! review - set radius value to default 5k here or front end ??
    const filter = buildFilterObject(req.query);

    try {
        // Check if geolocation used
        if (lat && lng) {
          const results = await Restaurant.aggregate([
              {
                $geoNear: {
                  near: {
                    type: 'Point',
                    coordinates: [parseFloat(lng), parseFloat(lat)],
                  },
                  distanceField: 'distance',
                  maxDistance: parseInt(radius),
                  spherical: true,
                  query: filter,
                },
              },
            ]);
            return res.json(results);
          }

        // Without geolocation 
        const restaurants = await Restaurant.find(filter)

        if (restaurants.length === 0) {
            return res.status(404).send({ error: "No restaurants found." })
         };
         
        res.json(restaurants)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


exports.getRestaurantById = async (req, res) => {
  try {
      const restaurant = await Restaurant.findById(req.params.id)
      res.json(restaurant)
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
}

exports.getRestaurantsByUserId = async (req, res) => {
  try {
      console.log("Route params:", req.params);
      const userId = new mongoose.Types.ObjectId(req.params.userId)
      const restaurants = await Restaurant.find({ userId });
      if (restaurants.length ===0) {
          return res.status(404).send({ error: "No restaurants found." })
      }
      res.json(restaurants)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


exports.addRestaurant = async (req, res) => {

console.log("Received data:", req.body);

const { user } = req; 
    
 // Sanitize helper (for input data)
 const sanitize = (val) => {
    if (typeof val !== "string") return val;
    const trimmed = val.trim();
    return trimmed === "" ? null : trimmed;
  };

 const address = sanitize(req.body.address);
 const postcode = sanitize(req.body.postcode);
 const city = sanitize(req.body.city);
 const country = sanitize(req.body.country);

if (!address || !city || !country) {
    return res.status(400).json({ message: "Address, city, and country are required to fetch geolocation" });
}
if (!req.body.name || !req.body.category) {
    return res.status(400).json({ message: "Name and category are required" });
  }

 const fullAddress = `${address}, ${postcode || ""}, ${city}, ${country}`.trim();
 let lng, lat;
    try {
        const geolocation = await geocodeWithNominatim(fullAddress);
        lng = geolocation.lng;
        lat = geolocation.lat;
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch geolocation" });
    }

    const restaurant = new Restaurant({
        name: sanitize(req.body.name),
        address,
        postcode,
        city,
        country,
        location: {
            type: 'Point',
            coordinates: [lng, lat],
          },
        telephone: sanitize(req.body.telephone),
        website: sanitize(req.body.website),
        category: sanitize(req.body.category),
        meals: Array.isArray(req.body.meals) ? req.body.meals : [],
        dietary: Array.isArray(req.body.dietary) ? req.body.dietary : [],
        alcohol: req.body.alcohol,
        welcomes: Array.isArray(req.body.welcomes) ? req.body.welcomes : [],
        facilities: Array.isArray(req.body.facilities) ? req.body.facilities : [],
        tags: Array.isArray(req.body.tags) ? req.body.tags : [],
        description: sanitize(req.body.description),
        imageUrl: sanitize(req.body.imageUrl),
        googleMapsUrl: sanitize(req.body.googleMapsUrl),
        priceRange: sanitize(req.body.priceRange),
        accessibility: Array.isArray(req.body.accessibility) ? req.body.accessibility : [],
        userId: user._id, // from Middleware
    })

    try {
        const newRestaurant = await restaurant.save()
        res.status(201).json(newRestaurant)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

/**  Not used in MVP but might want to add later  (check if needs refactoring) !!! 
exports.updateRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        if (!restaurant) {
            return res.status(404).send({ error: "Restaurant not found" })
        }
        res.send(restaurant)
    } catch (error) {
        res.status(500).send({ error: "Failed to update details" })
    }
}

exports.deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id)
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" })
        }
        res.json({ message: "Deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}*/