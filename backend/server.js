const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const exerciseLibraryController = require('./controllers/exerciseLibraryController');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
app.use(logger('dev'));

// Routes go here
app.use('/exercise-library', exerciseLibraryController);



app.listen(3000, () => {
  console.log('The express app is ready!');
});