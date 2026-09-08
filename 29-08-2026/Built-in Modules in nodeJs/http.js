const http = require('http');

// ----- CREATE SERVER -----
const server = http.createServer((req, res) => {
    // req = request (what client sends)
    // res = response (what we send back)
    
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Hello World!</h1>');
    } else if (req.url === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello API!' }));
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});

// ----- MAKE HTTP REQUESTS (GET) -----
http.get('http://jsonplaceholder.typicode.com/posts/1', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        console.log(JSON.parse(data));
    });
});

// ----- MAKE HTTP REQUESTS (POST) -----
const request = http.request({
    hostname: 'jsonplaceholder.typicode.com',
    path: '/posts',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
}, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => console.log(JSON.parse(data)));
});

request.write(JSON.stringify({ title: 'My Post' })); //Like putting your letter in the envelope
// You can call this multiple times for large data
request.end();
// Like sealing the envelope and sending it

// Tells the server: "I'm done sending data, now give me the response"