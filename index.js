const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { clerkMiddleware } = require('@clerk/express');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
         origin: ["https://food-app-frontend-green.vercel.app/", "https://food-app-frontend-green.vercel.app"],
        //origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }));
app.use(express.json());

app.use(clerkMiddleware());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));



// Routes
const restaurantRoutes = require('./routes/restaurantRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const favouriteRoutes = require('./routes/favouriteRoutes')
const userRoutes = require('./routes/userRoutes');

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/favourites', favouriteRoutes); //changed app.use('/api/users/favourites', favouriteRoutes);
app.use('/api/users', userRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});