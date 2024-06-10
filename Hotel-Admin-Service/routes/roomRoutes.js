const express = require('express');
const { addRoom, editRoom } = require('../controllers/roomController');
 

const router = express.Router();

router.post('/rooms', addRoom);
router.put('/rooms/:id', editRoom);

module.exports = router;
