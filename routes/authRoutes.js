const express = require("express");
const { login, register } = require("../controllers/authControllers");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



router.post("/login", login)

router.post("/register", register)

module.exports = router