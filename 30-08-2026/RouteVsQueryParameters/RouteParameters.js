// What are Route Parameters?
// Route parameters = Dynamic parts of the URL path

// https://example.com/users/5
                        //  ─
                        //  │
                    // Route Parameter (id = 5)    

const express = require('express');
const app = express();

// :id is a route parameter
app.get('/users/:id', (req, res) => {
    const userId = req.params.id; // Get the parameter
    res.send(`User ID: ${userId}`);
});

app.listen(3002);                    

