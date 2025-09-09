const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const https = require('https');

const app = express();

// Set up the CORS middleware to allow requests from any origin
app.use(cors());

// Use bodyParser to parse JSON requests
app.use(bodyParser.json());

// Main endpoint for handling booking requests
app.post('/api/booking', (req, res) => {
    // Log the received data to the console
    console.log('Booking request received:');
    console.log(req.body);

    // Send a success response back to the client
    res.status(200).json({ message: 'Booking request successfully received!' });
});

// Load the self-signed certificate files
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

// Create a secure HTTPS server
const port = 3000;
https.createServer(options, app).listen(port, () => {
    console.log(`Server is listening on https://10.144.107.192:${port}`);
    console.log('Waiting for a booking form submission...');
});
