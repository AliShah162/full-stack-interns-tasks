const http=require('http')

const server=http.createServer((req,res)=>{
    res.send("Hellow World")
})
server.listen(3000)

// this is a basic server