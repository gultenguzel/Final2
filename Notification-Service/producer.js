// producer.js
const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
  if (err) throw err;
  conn.createChannel((err, ch) => {
    if (err) throw err;
    const queue = 'hotel_reservations';
    const msg = JSON.stringify({
      reservationId: 123,
      customerName: 'John Doe',
      hotelName: 'Hotel California',
      checkInDate: '2024-07-01',
      checkOutDate: '2024-07-05'
    });

    ch.assertQueue(queue, { durable: true });
    ch.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });

  setTimeout(() => { conn.close(); process.exit(0) }, 500);
});
