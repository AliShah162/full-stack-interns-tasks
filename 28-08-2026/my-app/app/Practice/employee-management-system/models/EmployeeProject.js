const mongoose = require('mongoose');
//This handles the Many-to-Many relationship:


const EmployeeProjectSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  hours_worked: {
    type: Number,
    default: 0,
    min: 0
  },
  role_on_project: {
    type: String,
    default: 'Team Member'
  }
}, {
  timestamps: true
});

// Prevent duplicate assignments
EmployeeProjectSchema.index(
  { employee_id: 1, project_id: 1 },
  { unique: true }
);

module.exports = mongoose.model('EmployeeProject', EmployeeProjectSchema);