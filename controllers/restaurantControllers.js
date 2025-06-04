const Restaurant = require("../Models/Restaurant")
const User = require("../Models/User")
const mongoose = require("mongoose")

exports.getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find()
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

exports.getRestaurantsByName = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({ name: req.params.name })
        if (restaurants.length ===0) {
            return res.status(404).send({ error: "No restaurants found." })
        }
        res.json(restaurants)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
}

exports.getRestaurantsByCity = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({ name: req.params.city })
        if (restaurants.length ===0) {
            return res.status(404).send({ error: "No restaurants found." })
        }
        res.json(restaurants)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
}

// TODO: exports.getRestaurantsByLocation - look into the logic - maybe how to use coordinates & search radius ???

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

    const restaurant = new Restaurant({
        name: req.body.name,
        address: req.body.address,
        postcode: req.body.postcode,
        city: req.body.city,
        country: req.body.country,
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