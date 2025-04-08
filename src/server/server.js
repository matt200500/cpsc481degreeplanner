// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const server = express();
const db = new sqlite3.Database('./mydatabase.db');

server.use(cors())
server.use(bodyParser.json());

// Initialize the database and tables
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");
});

server.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Step 1: Check if user already exists
    const checkSql = `SELECT * FROM users WHERE username = ?`;
    db.get(checkSql, [username], (err, row) => {
        if (err) {
            return res.status(500).send({ message: 'Database error while checking user.' });
        }

        if (row) {
            // User already exists
            return res.status(400).send({ message: 'Username already exists. Please choose another one.' });
        }

        // Step 2: If not exists, insert new user
        const insertSql = `INSERT INTO users (username, password) VALUES (?, ?)`;
        db.run(insertSql, [username, password], function (err) {
            if (err) {
                return res.status(500).send({ message: 'Error registering user.' });
            }
            res.status(201).send({ message: 'User registered', userId: this.lastID });
        });
    });
});

// Endpoint for user login
server.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

    db.get(sql, [username, password], (err, row) => {
        if (err) {
            return res.status(500).send({ message: "Error logging in" });
        }
        if (row) {
            res.send({ message: "Login successful", userId: row.id });
        } else {
            res.status(401).send({ message: "Invalid credentials" });
        }
    });
});

// Start the server on port 3000
server.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});