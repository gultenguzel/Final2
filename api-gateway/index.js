
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Mikro servis URL'lerini environment değişkenlerinden alın
const HOTEL_ADMIN_SERVICE_URL = process.env.HOTEL_ADMIN_SERVICE_URL;
const HOTEL_SEARCH_SERVICE_URL = process.env.HOTEL_SEARCH_SERVICE_URL;
const BOOK_HOTEL_SERVICE_URL = process.env.BOOK_HOTEL_SERVICE_URL;
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL;

// Proxy middleware'i ayarlayın
app.use('/admin', createProxyMiddleware({ target: HOTEL_ADMIN_SERVICE_URL, changeOrigin: true }));
app.use('/search', createProxyMiddleware({ target: HOTEL_SEARCH_SERVICE_URL, changeOrigin: true }));
app.use('/book', createProxyMiddleware({ target: BOOK_HOTEL_SERVICE_URL, changeOrigin: true }));
app.use('/notify', createProxyMiddleware({ target: NOTIFICATION_SERVICE_URL, changeOrigin: true }));

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
