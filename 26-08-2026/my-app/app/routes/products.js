const express =require("express")
const router =express.Router() 
const {getAllProducts} =require("../controllers/products")


router.route("/").get(getAllProducts)//routes file saying when someone goes to the "/" then execute "getAllProducts"


module.exports=router 


