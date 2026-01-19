const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router();

router.post("/login", async (req, res) => {
  res.json({ message: "Login route reached" });
});

module.exports = router;