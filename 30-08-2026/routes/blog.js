const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is blog home page");
});
router.get("/about", (req, res) => {
  res.send("This is Blog About page");
});
router.get("/blogpost/:slug", (req, res) => {
  res.send(`fetch the blogpost for ${req.params.slug}`);
});


module.exports=router