const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import all models
const Department = require('./models/Department');
const Role = require('./models/Role');
const Employee = require('./models/Employee');
const Project = require('./models/Project');
const EmployeeProject = require('./models/EmployeeProject');
const Salary = require('./models/Salary');
const Attendance = require('./models/Attendance');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ems');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
};

connectDB();

// Export models for use in other files
module.exports = {
  Department,
  Role,
  Employee,
  Project,
  EmployeeProject,
  Salary,
  Attendance
};