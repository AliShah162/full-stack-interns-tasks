const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const products_routes= require("./routes/products")

app.get("/", (req, res) => {
  res.send("Hi, i am Live!");
});

//middleware or to set router
app.use("/api/products",products_routes)//means when someone explicitly types this route they will see data coming from controllers file

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`${PORT} yes i am connected`);
    });
  } catch (error) {
    console.log(error);
  }
};
start()