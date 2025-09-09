const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Set up the CORS middleware to explicitly allow any origin
// This is the simplest and most effective solution for a form submission
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: ['POST', 'OPTIONS'], // Explicitly allow POST and OPTIONS methods
    allowedHeaders: ['Content-Type'] // Explicitly allow Content-Type header
};

// Use bodyParser to parse JSON requests
app.use(bodyParser.json());

// Main endpoint for handling booking requests.
// We apply the CORS middleware directly to the route handler.
app.post('/api/booking', cors(corsOptions), (req, res) => {
    // Log the received data to the console
    console.log('Booking request received:');
    console.log(req.body);

    // Send a success response back to the client
    res.status(200).json({ message: 'Booking request successfully received!' });
});

// A separate route handler to respond to the preflight OPTIONS request
// This is crucial for fixing the CORS error
app.options('/api/booking', cors(corsOptions));

// Use the PORT environment variable provided by Render, or default to 3000 for local development.
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
    console.log('Waiting for a booking form submission...');
});
