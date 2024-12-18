const express = require('express');
const sqlite3 = require('sqlite3').verbose();

// Initializing express app.
const app = express();

// Getting the path request and sending the response with text.
app.get('/', (req, res) => {
    res.send('Hi, your request has been received');
});

// Start the server.
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});