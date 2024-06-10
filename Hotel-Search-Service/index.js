const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3006;

// Veritabanı Bağlantısı
const dbConfig = {
  user: "Gulten",
  host: "hotels.postgres.database.azure.com",
  database: "postgres",
  password: "Maya.5515253",
  port: 5432,
  ssl: true,
};

const pool = new Pool(dbConfig);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// Kullanıcı oluşturma fonksiyonu
async function createUser(name, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO Users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
    [name, email, hashedPassword]
  );
  return result.rows[0];
}

// Email ile kullanıcı bulma fonksiyonu
async function findUserByEmail(email) {
  const result = await pool.query(`SELECT * FROM Users WHERE email = $1`, [
    email,
  ]);
  return result.rows[0];
}

// Şifre doğrulama fonksiyonu
async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Routes
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await createUser(name, email, password);
    req.session.user = newUser;
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    req.session.user = user;
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});
app.get("/", async (req, res) => {
  try {
    const query = `
      SELECT id, name, location
      FROM hotels
    `;
    const result = await pool.query(query);
    const hotels = result.rows;
    res.render("index", { hotels }); // hotels verisini index.html'e iletiyoruz
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels", error: error.message });
  }
});


app.get("/search", async (req, res) => {
  const { destination, startDate, endDate, numPeople } = req.query;
  try {
    const query = `
      SELECT r.id, r.roomType, r.price, r.available, h.name, h.location
      FROM rooms AS r
      JOIN hotels AS h ON r.hotel_id = h.id
      WHERE h.location = $1 AND r.available = true AND r.startDate <= $2 AND r.endDate >= $3
    `;
    const result = await pool.query(query, [destination, startDate, endDate]);

    // Kullanıcı giriş yapmışsa %10 indirim uygula
    if (req.session.user) {
      result.rows.forEach(room => {
        room.price *= 0.9;
      });
    }

    res.json({ rooms: result.rows });
  } catch (error) {
    res.status(500).json({ message: "Error searching hotels", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
