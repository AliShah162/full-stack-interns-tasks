const express = require('express');
const app = express();
const PORT = 3000;

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start server
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});