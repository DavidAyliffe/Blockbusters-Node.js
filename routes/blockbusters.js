const express = require("express");
const router = express.Router();
const db = require("../db");
const authenticateToken = require("../middleware/authenticateToken");

/**
 * GET /api/blockbusters/all
 * Returns everything in the database
 */
router.get("/all", authenticateToken, async (req, res) => {
  try {
    const [movies] = await db.query("SELECT * FROM film");
    const [actors] = await db.query("SELECT * FROM actor");
    const [genres] = await db.query("SELECT * FROM category");
    const [roles]  = await db.query("SELECT * FROM staff");

    res.json({
	  user: req.user, // shows who accessed it (optional)
      movies,
      actors,
      genres,
      roles
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

/* ✅ THIS LINE IS REQUIRED */
module.exports = router;
