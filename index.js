// Import Express
const express = require('express');
const app = express();

// Import CORS
const cors = require('cors');

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files from public folder
app.use(express.static('public'));

// Homepage route
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Hello API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Timestamp Microservice API
app.get('/api/:date?', function (req, res) {

  let date;

  // If date parameter is empty, return current date
  if (!req.params.date) {
    date = new Date();
  } else {
    const inputDate = req.params.date;

    // Check whether input is a Unix timestamp
    if (/^-?\d+$/.test(inputDate)) {
      date = new Date(Number(inputDate));
    } else {
      // Parse the input as a date string
      date = new Date(inputDate);
    }
  }

  // Validate the date
  if (isNaN(date.getTime())) {
    return res.json({
      error: 'Invalid Date'
    });
  }

  // Return Unix timestamp and UTC date
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });

});

// Start the server
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});