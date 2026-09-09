const express = require("express");
const app = express();
const port = 3002;

app.get('/product',(req,res)=>{
    // query parameters allow a server to receive optional key-value pairs passed at the end of a URL to modify, filter, or sort data
    console.log(req.query); //go in the url and "/product?search=ali" this way u can see ur search
    res.send(`user searcherd for ${req.query.search}`)
})

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});