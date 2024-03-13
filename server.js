const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/med-api';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.use(express.json());
    app.use('/api', routes);
    app.listen(PORT, () => console.log('the server running on 3000'));
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));