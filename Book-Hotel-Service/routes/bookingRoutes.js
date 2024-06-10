const express = require('express');
const BookingController = require('../controllers/bookingController');

const router = express.Router();

router.post('/book', BookingController.bookHotel);

module.exports = router;
