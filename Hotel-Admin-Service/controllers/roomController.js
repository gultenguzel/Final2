const { createRoom, updateRoom } = require('../models/Room');

const addRoom = async (req, res) => {
  const { roomType, price, available, startDate, endDate, hotel_id } = req.body;
  try {
    const room = await createRoom(roomType, price, available, startDate, endDate, hotel_id);
    res.status(201).json({ room });
  } catch (err) {
    res.status(500).json({ message: 'Error creating room', error: err.message });
  }
};

const editRoom = async (req, res) => {
  const { id } = req.params;
  const { roomType, price, available, startDate, endDate } = req.body;
  try {
    const room = await updateRoom(id, roomType, price, available, startDate, endDate);
    res.json({ room });
  } catch (err) {
    res.status(500).json({ message: 'Error updating room', error: err.message });
  }
};

module.exports = {
  addRoom,
  editRoom,
};
