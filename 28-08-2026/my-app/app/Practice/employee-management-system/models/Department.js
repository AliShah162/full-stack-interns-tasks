const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Department name is required"],
        unique: true,
        trim: true
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        trim: true
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model("Department", DepartmentSchema);