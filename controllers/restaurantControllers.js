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

    const userToken = req.headers.authorization.split(" ")[1]

    console.log("addRestaurant")
    console.log(req.headers)
    console.log(req.body)
    console.log(userToken)

    if (!userToken) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const userInDB = await User.findOne({ token: userToken })

    console.log(userInDB)

    if (!userInDB) {
        return res.status(401).json({ message: "Unauthorized" })
    }



const { address, postcode, city, country } = req.body;

if (!address || !city || !country) {
    return res.status(400).json({ message: "Address, city, and country are required to fetch geolocation" });
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
        name: req.body.name,
        address: req.body.address,
        postcode: req.body.postcode,
        city: req.body.city,
        country: req.body.country,
        location: {
            type: 'Point',
            coordinates: [lng, lat],
          },
        telephone: req.body.telephone,
        website: req.body.website,
        category: req.body.category,
        meals: req.body.meals,
        dietary: req.body.dietary,
        alcohol: req.body.alcohol,
        welcomes: req.body.welcomes,
        facilities: req.body.facilities,
        tags: req.body.tags,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        googleMapsUrl: req.body.googleMapsUrl,
        priceRange: req.body.priceRange,
        accessibility: req.body.accessibility,
        userId: userInDB._id,
    })

    try {
        const newRestaurant = await restaurant.save()
        res.status(201).json(newRestaurant)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

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
}