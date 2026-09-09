const express = require("express");
const blog = require("./routes/blog");
const app = express();
const port = 3001;

app.use(express.static("public"));
app.use("/blog", blog); //this means any routes that starts with "/blog" will be handled by "blog.js" in routes folder

app.get("/", (req, res) => {
  console.log("hey its a get request");
  res.send("Hello World!!");
});

app.post("/", (req, res) => {
  console.log("This is POST Request");
  res.send("Hellow world post request");
});
app.put("/", (req, res) => {
  console.log("This is PUT Request");
  res.send("Hellow world put request");
});

app.get("/index", (req, res) => {
  res.sendFile("templates/index.html", { root: __dirname }); //this is how you serve an html file
});

app.get("/api", (req, res) => {
  res.json({ a: 1, b: 2, c: 3, d: 4 });
});

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
