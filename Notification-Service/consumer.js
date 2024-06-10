// consumer.js
const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
  if (err) throw err;
  conn.createChannel((err, ch) => {
    if (err) throw err;
    const queue = 'hotel_reservations';

    ch.assertQueue(queue, { durable: true });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    ch.consume(queue, (msg) => {
      if (msg !== null) {
        const reservation = JSON.parse(msg.content.toString());
        console.log(" [x] Received %s", reservation);
        // Burada otel yöneticilerine bildirim gönderme işlevini gerçekleştirebilirsiniz
        ch.ack(msg);
      }
    });
  });
});
