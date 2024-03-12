"use strict";

var fetch = require('node-fetch');

function donateMedicine() {
  var medicineData, response, responseData;
  return regeneratorRuntime.async(function donateMedicine$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          medicineData = {
            medicinename: 'YourMedicineName',
            // Replace 'YourMedicineName' with the actual name of the medicine
            exp_date: '2024-12-31',
            // Replace with the expiration date of the medicine
            address: '123 Main St',
            // Replace with the address where the medicine is located
            phone: '123-456-7890',
            // Replace with the phone number associated with the medicine
            photo: 'https://example.com/medicine_photo.jpg',
            // Replace with the URL of a photo of the medicine (optional)
            description: 'Description of the medicine' // Replace with a description of the medicine (optional)

          };
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch('https://med-node-js-api-render.onrender.com/donate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicineData)
          }));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          responseData = _context.sent;
          console.log(responseData.message); // Output the response message

          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error('Failed to donate medicine:', _context.t0.message);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}

donateMedicine();