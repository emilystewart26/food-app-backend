const express = require("express");
const requireClerkAuth = require("../middleware/requireClerkAuth");
const  { syncUser } = require("../controllers/userController");

const router = express.Router();

router.post("/clerk/sync", requireClerkAuth, syncUser);


module.exports = router;


