const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        // to be display publicly on reviews posted etc.
        type: String, 
        required: true, 
    },
    email: { 
        // look into email validation - send confirmation email when registering???
        // also look into logging in with Google / Facebook accounts
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        // think about password requirements (eg min.length, number, capital, symbol etc.)
        // https://mongoosejs.com/docs/api/schemastring.html#SchemaString.prototype.match()
        type: String, 
        required: true 
    },
    role: {
        type: String,
        required: true,
        enum:["admin", "user","vendor"]  
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    token: { 
        type: String, 
        default: null 
    },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }] // this allows each user to store a list of favourite restaurants by ref in an array
})

module.exports = mongoose.model("User", userSchema)