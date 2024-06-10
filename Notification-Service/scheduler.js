// scheduler.js
const cron = require('node-cron');
const amqp = require('amqplib/callback_api');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'Gulten',
  host: 'hotels.postgres.database.azure.com',
  database: 'postgres',
  password: 'Maya.5515253',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

// Gece yarısı otel kapasitelerini kontrol eden görev
cron.schedule('0 0 * * *', async () => {
  console.log('Running capacity check...');
  try {
    const result = await pool.query(`
      SELECT h.name, COUNT(r.id) as available_rooms
      FROM hotels AS h
      JOIN rooms AS r ON h.id = r.hotel_id
      WHERE r.available = true
      GROUP BY h.name
    `);
    
    result.rows.forEach(hotel => {
      const totalRooms = 100; // Varsayalım ki her otelde 100 oda var
      const availableRooms = hotel.available_rooms;
      const capacity = (availableRooms / totalRooms) * 100;

      if (capacity < 20) {
        console.log(`Notify ${hotel.name}: Capacity below 20%`);
        // Burada otel yöneticisine bildirim gönderebilirsiniz
      }
    });
  } catch (error) {
    console.error('Error checking capacity:', error);
  }
});

// Mesaj kuyruğundaki yeni rezervasyonları işleyen görev
cron.schedule('*/5 * * * *', () => {
  console.log('Checking for new reservations...');
  amqp.connect('amqp://localhost', (err, conn) => {
    if (err) throw err;
    conn.createChannel((err, ch) => {
      if (err) throw err;
      const queue = 'hotel_reservations';

      ch.assertQueue(queue, { durable: true });
      ch.consume(queue, (msg) => {
        if (msg !== null) {
          const reservation = JSON.parse(msg.content.toString());
          console.log(" [x] Processing reservation %s", reservation);
          // Burada otel yöneticisine rezervasyon detaylarını gönderebilirsiniz
          ch.ack(msg);
        }
      });
    });
  });
});
