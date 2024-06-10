const RoomModel = require('./roomModel');

class SearchController {
  static async searchHotels(req, res) {
    const { destination, startDate, endDate, numPeople } = req.query;
    try {
      const rooms = await RoomModel.searchAvailableRooms(destination, startDate, endDate, numPeople);

      // Varsayılan olarak kullanıcı oturum açmamış kabul edilir.
      if (req.user) {
        // Assume user is logged in and apply 10% discount
        rooms.forEach(room => {
          room.price *= 0.9;
        });
      }

      res.json({ rooms });
    } catch (error) {
      res.status(500).json({ message: 'Error searching for hotels', error: error.message });
    }
  }
}

module.exports = SearchController;
