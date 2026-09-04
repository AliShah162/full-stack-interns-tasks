const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  check_in_time: {
    type: Date,
    required: true
  },
  check_out_time: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'half-day'],
    default: 'present'
  }
}, {
  timestamps: true
});

// One record per employee per day
AttendanceSchema.index(
  { employee_id: 1, date: 1 },
  { unique: true }
);

module.exports = mongoose.model('Attendance', AttendanceSchema);