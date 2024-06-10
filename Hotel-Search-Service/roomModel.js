const { Pool } = require('pg');

const dbConfig = {
  user: 'Gulten',
  host: 'hotels.postgres.database.azure.com',
  database: 'postgres',
  password: 'Maya.5515253',
  port: 5432,
  ssl: { rejectUnauthorized: false }
};

const pool = new Pool(dbConfig);

class RoomModel {
  static async searchAvailableRooms(destination, startDate, endDate, numPeople) {
    try {
      const result = await pool.query(`
      SELECT r.id, r.roomType, r.price, r.available, h.name, h.location
      FROM rooms AS r
      JOIN hotels AS h ON r.hotel_id = h.id
      WHERE h.location = $1 AND r.available = true AND r.startDate <= $2 AND r.endDate >= $3
    `, [destination, startDate, endDate]);
      return result.rows;
    } catch (error) {
      throw new Error('Error searching for available rooms: ' + error.message);
    }
  }
}

module.exports = RoomModel;
