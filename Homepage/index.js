const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3005;

// PostgreSQL connection
const pool = new Pool({
  user: 'Gulten',
  host: 'hotels.postgres.database.azure.com',
  database: 'postgres',
  password: 'Maya.5515253',
  port: 5432,
  ssl: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)));

// Route for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for login.html
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Route for register.html
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

// Handle login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                res.send('Login successful');
            } else {
                res.status(401).send('Invalid credentials');
            }
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Handle registration
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO Users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);
        res.send('Registration successful');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Handle search
app.get('/search', (req, res) => {
    const { destination, startDate, endDate, guests } = req.query;
    // Search logic here
    res.send('Search results');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
