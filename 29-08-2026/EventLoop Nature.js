const http = require('fs');
const fs = require('fs');

const server=http.createServer((req,res)=>{
    // 1. FAST operation (synchronous)
    console.log(' Request received!');
    // 2. SLOW operation (asynchronous - non-blocking!)
    fs.readFile('huge-file.txt',(err,data)=>{
        if(err){
            res.end("Error!")
            return
        }
        res.end(data) // Sends file to client if the condition fails, means if there's no errorr...
    })
     // 3. This runs IMMEDIATELY (doesn't wait for file!)
     console.log('File reading started...');
})
server.listen(3000)