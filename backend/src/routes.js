const express = require('express');

const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/sessions', SessionController.index);

routes.post('/sessions', SessionController.store);

routes.delete('/sessions/:session_id', SessionController.destroy);

routes.get('/spots', SpotController.index);

routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.delete('/spots/:spot_id', SpotController.destroy);

routes.get('/dashboard', DashboardController.show);

routes.get('/spots/:spot_id/bookings', BookingController.index);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.delete('/spots/:spot_id/bookings/:booking_id', BookingController.destroy);

module.exports = routes;