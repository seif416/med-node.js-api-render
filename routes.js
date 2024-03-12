const express = require('express');
const router = express.Router();
const User = require('./user.js');
const Medicine = require('./medicine.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')


router.use(express.json());
router.use(bodyParser.json());



// Registration endpoint
router.post('/signup', async (req, res) => {
  try {
    // Validate incoming data
    const { name, email, password, address, phone } = req.body;
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      phone
    });
    // Save user to database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    // Validate incoming data
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key');
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});







// Donation Endpoint
router.post('/donate', async (req, res) => {
  try {
    const { medicinename, exp_date, address, phone, photo, description } = req.body;
    const medicine = new Medicine({
      medicinename,
      exp_date,
      address,
      phone,
      photo,
      description,
    });
    await medicine.save();
    res.status(201).json({ message: 'Medicine donated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to donate medicine' });
  }
});


// Deletion Endpoint
router.delete('/delete/:medicinename', async (req, res) => {
  try {
    const medicinename = req.params.medicinename;
    const deletedMedicine = await Medicine.deleteOne({ medicinename });
    if (deletedMedicine.deletedCount > 0) {
      res.status(200).json({ message: 'Medicine deleted successfully' });
    } else {
      res.status(404).json({ error: 'Medicine not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete medicine' });
  }
});



router.get('/request/:medicinename', async (req, res) => {
  try {
    const medicinename = req.params.medicinename;
    const requestedMedicine = await Medicine.findOne({ medicinename });
    if (requestedMedicine) {
      res.status(200).json(requestedMedicine);
    } else {
      res.status(404).json({ error: 'Medicine not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to request medicine' });
  }
});



// Dummy medicine data
const medicines = [
  "Aspirin",
  "Acetaminophen",
  "Amoxicillin",
  "Albuterol",
  "Atorvastatin",
  // Add more medicines as needed
];

// Endpoint to search for medicines by first letter
router.get('/api/medicines/:letter', (req, res) => {
  const letter = req.params.letter.toUpperCase();
  const filteredMedicines = medicines.filter(medicine => medicine.startsWith(letter));
  res.json(filteredMedicines);
});




module.exports = router;