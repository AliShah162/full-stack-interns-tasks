// 1. Import the http module
const http = require('http');

// 2. Create a server
// req = request (what browser sends)
// res = response (what we send back)
const server = http.createServer((req, res) => {
    // 3. Send response
    res.end('Hello World!');
});

// 4. Start server on port 3000
server.listen(3000, () => {
    console.log('Server running on port 3000');
});