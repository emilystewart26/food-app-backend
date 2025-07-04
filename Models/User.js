const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true,
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user", "vendor"],
    default: "user" 
  },
  clerkId: {
    type: String,
    unique: true,
    sparse: true,
  },
  
  // changed favourites: [String],

  favourites: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Restaurant"
}],

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
