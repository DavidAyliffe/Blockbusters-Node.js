const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try
  {
    //  comment this out for now just to get it working.
    // const [rows] = await db.query( "select staff_id as user_id, email, password_hash, manager_id, 'staff' as role from staff where email = ? UNION ALL select customer_id as user_id, email, password_hash, 1, 'customer' as role from customer where email = ?", [email, email] );
    // if (rows.length === 0) {
    //   return res.status(401).json({ error: "Email address not found" });
    // }

    // const user = rows[0];
    // const valid = await bcrypt.compare( password, user.password_hash );

    //  comment this out for now just to get it working.
	  // if (!valid) {
    //   return res.status(401).json({ error: "Invalid credentials" });
    // }

    // const payload = {
    //   id: user.id,
    //   email: user.email,
	  //   role: user.role };

    const payload = {
      id: "test",
      email: "test@test.com",
	    role: "tester" };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
	
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;