const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

const app = express();

// Routes
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const dayRoutes = require('./routes/dayRoutes');
const programTemplateRoutes = require('./routes/programTemplateRoutes');
const programRoutes = require('./routes/programRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

//Middleware
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Debug middleware (see incoming data)
app.use((req, res, next) => {
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Body:", req.body);
  next();
});

// Connect MongoDB
mongoose.set("debug", true);
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

mongoose.connection.on('error', (err) => {
  console.error("MongoDB error:", err);
});

// Routes go here
app.use("/api/users", userRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/days", dayRoutes);
app.use("/api/templates", programTemplateRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/programs", programRoutes);

// 404 HANDLER (ROUTE ERROR HANDLER)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// ERROR HANDLER (Shows Error message)
app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);

  res.status(400).json({
    error: err.message
  });
});

app.listen(3000, () => {
  console.log('Server: http://localhost:3000');
});