const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Role title is required"],
        unique: true,
        trim: true,
        enum: ['CEO', 'Manager', 'Senior Developer', 'Developer', 'Junior Developer', 'Intern', 'HR Specialist', 'Sales Rep']
    },
    description: {
        type: String,
        default: ""
    }
}, { 
    timestamps: true  
});

module.exports = mongoose.model("Role", RoleSchema);