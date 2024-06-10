const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
 
const roomRoutes = require('./routes/roomRoutes');
 

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

// UI için rotalar
app.get('/add-room', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'add-Room.html'));
});

app.get('/edit-room', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'editRoom.html'));
});

// API rotaları
app.use('/admin', roomRoutes);
 

app.listen(PORT, () => {
    console.log(`Hotel Admin Service is running on port ${PORT}`);
});
