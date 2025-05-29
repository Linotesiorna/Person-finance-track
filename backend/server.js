const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // your MySQL root password here
  database: "finance_tracker",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// Login
app.post("/api/login", (req, res) => {
  const { username, password, role } = req.body;
  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ? AND role = ?",
    [username, password, role],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length > 0) res.json(results[0]);
      else res.status(401).json({ message: "Invalid credentials" });
    }
  );
});

// Signup
app.post("/api/signup", (req, res) => {
  const { username, password, role } = req.body;
  db.query(
    "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
    [username, password, role],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId });
    }
  );
});

// Add transaction
app.post("/api/transactions", (req, res) => {
  const { user_id, description, amount, type } = req.body;
  db.query(
    "INSERT INTO transactions (user_id, description, amount, type) VALUES (?, ?, ?, ?)",
    [user_id, description, amount, type],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId });
    }
  );
});

// Get transactions for a user
app.get("/api/transactions/:userId", (req, res) => {
  const { userId } = req.params;
  db.query(
    "SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC",
    [userId],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

// Delete transaction by id
app.delete("/api/transactions/:id", (req, res) => {
  const txId = req.params.id;
  db.query("DELETE FROM transactions WHERE id = ?", [txId], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Transaction not found" });
    res.json({ message: "Transaction deleted" });
  });
});

// Get all users (admin only)
app.get("/api/users", (req, res) => {
  db.query("SELECT id, username, role FROM users", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Delete a user (admin only)
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "User deleted" });
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
