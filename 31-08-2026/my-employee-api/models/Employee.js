const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    //these are like the rules and regulations for the data we will recieve, will be in this shape
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String },
    salary: { type: Number },
  },
  { timestamps: true }
);

// 3rd arg = exact collection name
module.exports = mongoose.model("Employee", employeeSchema, "my_employees");