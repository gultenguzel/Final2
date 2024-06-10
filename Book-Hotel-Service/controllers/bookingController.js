const { Pool } = require('pg');

// Veritabanı bağlantı bilgileri
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

// Otel rezervasyon işlemi
const bookHotel = async (req, res) => {
  const { roomId, startDate, endDate } = req.body;

  try {
    // Odanın mevcut olup olmadığını kontrol et
    const roomCheckResult = await pool.query('SELECT * FROM rooms WHERE id = $1 AND available = true', [roomId]);
    if (roomCheckResult.rowCount === 0) {
      return res.status(400).json({ message: 'Room not available' });
    }

    // Oda rezervasyonu yap
    const bookingResult = await pool.query(
      'INSERT INTO bookings (room_id, start_date, end_date) VALUES ($1, $2, $3) RETURNING *',
      [roomId, startDate, endDate]
    );

    // Odanın durumunu güncelle
    await pool.query('UPDATE rooms SET available = false WHERE id = $1', [roomId]);

    res.status(201).json({ message: 'Room booked successfully', booking: bookingResult.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Error booking room', error: err.message });
  }
};

module.exports = {
  bookHotel,
};
