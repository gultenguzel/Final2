const { Pool } = require('pg');

const dbConfig = {
  user: 'Gulten',
  host: 'hotels.postgres.database.azure.com',
  database: 'postgres',
  password: 'Maya.5515253',
  port: 5432,
  ssl: true
};

const pool = new Pool(dbConfig);

const createRoom = async (roomType, price, available, startDate, endDate, hotel_id) => {
  const result = await pool.query(
    'INSERT INTO rooms (roomType, price, available, startDate, endDate, hotel_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [roomType, price, available, startDate, endDate, hotel_id]
  );
  return result.rows[0];
};

const updateRoom = async (id, roomType, price, available, startDate, endDate) => {
  const result = await pool.query(
    'UPDATE rooms SET roomType = $1, price = $2, available = $3, startDate = $4, endDate = $5 WHERE id = $6 RETURNING *',
    [roomType, price, available, startDate, endDate, id]
  );
  return result.rows[0];
};

module.exports = {
  createRoom,
  updateRoom,
};
