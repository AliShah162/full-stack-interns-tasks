const getAllProducts=async(req,res)=>{
    res.status(200).json({msg:"I am getAllProducts"})
}
//this is controlllers file which tells what the "getAllProducts" will do when someone visits the "/"
module.exports={getAllProducts}