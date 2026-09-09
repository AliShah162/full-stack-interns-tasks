const express = require("express");
const app = express();
const port = 3001;

app.use(express.static('public')) //this means, anything inthe publc folder will be visible to all of the users, if you search localhost:3000/Ali.txt, u will see that file

app.get("/", (req, res) => {
  console.log("Home page accessed");
  res.send("Hello Ali");
});

app.get("/about", (req, res) => {
  console.log("About page accessed");
  res.send("Hello About");
});

//so if we had 2000 blogs we will not create 2000 different urls, we use "slug"!

app.get('/blog/:slug',(req,res)=>{
    res.send(`Hello ${req.params.slug}`)
})


app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});