const express = require('express');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3003;

// PostgreSQL bağlantı bilgileri
const dbConfig = {
  user: 'Gulten',
  host: 'hotels.postgres.database.azure.com',
  database: 'postgres',
  password: 'Maya.5515253',
  port: 5432,
  ssl: true
};

// Veritabanı bağlantı havuzu oluştur
const pool = new Pool(dbConfig);

// JSON isteklere ve statik dosyalara izin ver
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Belirli bir otelin bilgilerini getirme endpoint'i
app.get('/hotel/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const queryText = `
      SELECT *
      FROM hotels
      WHERE id = $1;
    `;
    const result = await pool.query(queryText, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Otel rezervasyonu yapma endpoint'i
app.post('/book', async (req, res) => {
  const { hotelId, startDate, endDate, numPeople } = req.body;

  try {
    // Kapasiteyi güncelle
    const queryText = `
      UPDATE rooms
      SET available = false
      WHERE hotel_id = $1 AND available = true AND startDate <= $2 AND endDate >= $3
      RETURNING *;
    `;
    const result = await pool.query(queryText, [hotelId, startDate, endDate]);

    if (result.rowCount === 0) {
      return res.status(400).json({ error: 'No available rooms for the specified dates' });
    }

    res.status(200).json({ message: 'Booking successful', bookingDetails: result.rows[0] });
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Book Hotel Service is running on port ${port}`);
});
