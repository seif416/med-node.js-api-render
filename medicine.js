const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  medicinename: {
    type: String,
    required: true
  },
  exp_date: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true

  },
  photo: String,
  description: String
});

const Medicine = mongoose.model('Medicine', MedicineSchema);

module.exports = Medicine;