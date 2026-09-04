const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  effective_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  is_current: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Only one current salary per employee
SalarySchema.index(
  { employee_id: 1, is_current: 1 },
  { unique: true, partialFilterExpression: { is_current: true } }
);

module.exports = mongoose.model('Salary', SalarySchema);