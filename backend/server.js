const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

// User defined logic
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./controllers/loginController');
const exerciseRoutes = require('./routes/exerciseRoutes');
const dayRoutes = require('./routes/dayRoutes');
const programTemplateRoutes = require('./routes/programTemplateRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

mongoose.set("debug", true);
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes go here
app.use("/api/users", userRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/day", dayRoutes);
app.use("/api/template", programTemplateRoutes);
app.use("/api/session", sessionRoutes);

app.listen(3000, () => {
  console.log('The express app is ready!');
});