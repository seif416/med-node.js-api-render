"use strict";

var express = require('express');

var router = express.Router();

var User = require('./user.js');

var Medicine = require('./medicine.js');

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

var bodyParser = require('body-parser');

var dotenv = require('dotenv');

router.use(express.json());
router.use(bodyParser.json()); // Registration endpoint

router.post('/signup', function _callee(req, res) {
  var _req$body, name, email, password, address, phone, existingUser, hashedPassword, newUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Validate incoming data
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, address = _req$body.address, phone = _req$body.phone; // Check if email already exists

          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Email already exists'
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 9:
          hashedPassword = _context.sent;
          // Create new user
          newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            address: address,
            phone: phone
          }); // Save user to database

          _context.next = 13;
          return regeneratorRuntime.awrap(newUser.save());

        case 13:
          res.status(201).json({
            message: 'User registered successfully'
          });
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
}); // Login endpoint

router.post('/login', function _callee2(req, res) {
  var _req$body2, email, password, user, passwordMatch, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // Validate incoming data
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // Find user by email

          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Invalid credentials'
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 9:
          passwordMatch = _context2.sent;

          if (passwordMatch) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Invalid credentials'
          }));

        case 12:
          // Generate JWT token
          token = jwt.sign({
            userId: user._id
          }, 'your_secret_key');
          res.status(200).json({
            token: token
          });
          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
}); // Donation Endpoint

router.post('/donate', function _callee3(req, res) {
  var _req$body3, medicinename, exp_date, address, phone, photo, description, medicine;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body3 = req.body, medicinename = _req$body3.medicinename, exp_date = _req$body3.exp_date, address = _req$body3.address, phone = _req$body3.phone, photo = _req$body3.photo, description = _req$body3.description;
          medicine = new Medicine({
            medicinename: medicinename,
            exp_date: exp_date,
            address: address,
            phone: phone,
            photo: photo,
            description: description
          });
          _context3.next = 5;
          return regeneratorRuntime.awrap(medicine.save());

        case 5:
          res.status(201).json({
            message: 'Medicine donated successfully'
          });
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            error: 'Failed to donate medicine'
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Deletion Endpoint

router["delete"]('/delete/:medicinename', function _callee4(req, res) {
  var medicinename, deletedMedicine;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          medicinename = req.params.medicinename;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Medicine.deleteOne({
            medicinename: medicinename
          }));

        case 4:
          deletedMedicine = _context4.sent;

          if (deletedMedicine.deletedCount > 0) {
            res.status(200).json({
              message: 'Medicine deleted successfully'
            });
          } else {
            res.status(404).json({
              error: 'Medicine not found'
            });
          }

          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            error: 'Failed to delete medicine'
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.get('/request/:medicinename', function _callee5(req, res) {
  var medicinename, requestedMedicine;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          medicinename = req.params.medicinename;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Medicine.findOne({
            medicinename: medicinename
          }));

        case 4:
          requestedMedicine = _context5.sent;

          if (requestedMedicine) {
            res.status(200).json(requestedMedicine);
          } else {
            res.status(404).json({
              error: 'Medicine not found'
            });
          }

          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            error: 'Failed to request medicine'
          });

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Dummy medicine data

var medicines = ["Aspirin", "Acetaminophen", "Amoxicillin", "Albuterol", "Atorvastatin" // Add more medicines as needed
]; // Endpoint to search for medicines by first letter

router.get('/api/medicines/:letter', function (req, res) {
  var letter = req.params.letter.toUpperCase();
  var filteredMedicines = medicines.filter(function (medicine) {
    return medicine.startsWith(letter);
  });
  res.json(filteredMedicines);
});
module.exports = router;