const express = require('express');
const SearchController = require('./searchController');

const router = express.Router();

router.get('/', SearchController.searchHotels);

module.exports = router;
