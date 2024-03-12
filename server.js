const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://seifadelelpop:ZVTQ3uIL3BkZsCa8@cluster0.uuq3ewo.mongodb.net/';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.use(express.json());
    app.use('/api', routes);
    app.listen(PORT, () => console.log('Server is running on port 3000'));
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));