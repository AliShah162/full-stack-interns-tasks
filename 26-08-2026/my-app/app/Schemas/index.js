const mongoose =require("mongoose")

const productSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:[true,"Must be provided"]//these are the validations
    },
    featured:{
        type:Boolean,
        default:true
    },
    rating:{
        type:Number,
        default:4.9
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    company:{
        type:String,
        enum:{
            values:["apple","samsung", "Rdemi","dell"],
            message:`{VALUE} not supported`
        }
    }
})