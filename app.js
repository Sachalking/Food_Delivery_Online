// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

const app = express();

// Connect to MongoDB (use your own connection string or a local instance)
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/foodpanda_clone';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to EJS and define views folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Import Routes
const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');

// Use Routes
app.use('/', indexRoutes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
