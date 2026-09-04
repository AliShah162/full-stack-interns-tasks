const EmployeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Firstname is required"],
    trim: true,
  },
  last_name: {
    type: String,
    required: [true, "Lastname is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  hire_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  department_id: {
    type: mongoose.Schema.Types.ObjectId, // This is a special ID type
    ref: 'Department',  // This tells Mongoose: "This points to the Department collection!"
    required: [true, "Department is required"]
  },
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',        
    default: null
  },
  
  manager_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',    // Self-reference
    default: null
  },

  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true  
});

// Indexes
EmployeeSchema.index({ email: 1 });     
EmployeeSchema.index({ department_id: 1 });
EmployeeSchema.index({ manager_id: 1 });

// Virtual: Fullname
EmployeeSchema.virtual('full_name').get(function() {
  return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model('Employee', EmployeeSchema);

// this is happening in atlass:
// so we created manullay a departments collection at atlass and the atlass gave us an _id with every data we inserted, now we used that _id and added another field manually in all the employees named department_id. now that every department_id has its own departement name, like every department name has its own _id. so we used that id to assign departments to all the employees.