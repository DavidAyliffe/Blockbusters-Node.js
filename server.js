require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

// ----------------------
// Logging Setup
// ----------------------

// Create a write stream (append mode) for HTTP requests
const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// ----------------------
// MySQL Pool & Logging
// ----------------------
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Log every new MySQL connection
pool.on("connection", (connection) => {
	const msg = `New MySQL connection established: ${connection.threadId}`;
	console.log(msg);
	fs.appendFileSync(path.join(__dirname, 'access.log'), msg + "\n");
});

// Wrap queries to log every SQL query
function query(sql, params = []) {
	const msg = `Executing SQL: ${sql} | Params: ${JSON.stringify(params)}`;
	console.log(msg);
	fs.appendFileSync(path.join(__dirname, 'access.log'), msg + "\n");
	return pool.promise().query(sql, params); // returns a promise
}

// Export query for routes
global.dbQuery = query;

// ----------------------
// Express App Setup
// ----------------------
const app = express();

app.use(express.json());
app.use(cors());

// Log every HTTP request
app.use(morgan("combined"));

// ----------------------
// Routes
// ----------------------
app.use("/api/auth", require("./auth/auth"));
app.use("/api/actor", require("./routes/actor"));
app.use("/api/country", require("./routes/country"));
app.use("/api/customer", require("./routes/customer"));
app.use("/api/film", require("./routes/film"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api/rental", require("./routes/rental"));
app.use("/api/staff", require("./routes/staff"));
app.use("/api/store", require("./routes/store"));

app.get("/", (req, res) => {
	res.send("Blockbusters API running");
});

// ----------------------
// Global Error Logging
// ----------------------
process.on("unhandledRejection", (reason, promise) => {
	const msg = `Unhandled Rejection at: ${promise} | reason: ${reason}`;
	console.error(msg);
	fs.appendFileSync(path.join(__dirname, 'access.log'), msg + "\n");
});

process.on("uncaughtException", (err) => {
	const msg = `Uncaught Exception: ${err.stack || err}`;
	console.error(msg);
	fs.appendFileSync(path.join(__dirname, 'access.log'), msg + "\n");
});

// ----------------------
// Start Server
// ----------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	const msg = `Server running on port ${PORT}`;
	console.log(msg);
	fs.appendFileSync(path.join(__dirname, 'access.log'), msg + "\n");
});
