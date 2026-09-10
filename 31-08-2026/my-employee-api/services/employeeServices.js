const Employee = require("../models/Employee");

async function createEmployee(data) {
  return await Employee.create(data);
}

async function getAllEmployees() {
  return await Employee.find();
}

async function getEmployeeById(id) {
  return await Employee.findById(id);
}

async function updateEmployee(id, data) {
  return await Employee.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

async function deleteEmployee(id) {
  return await Employee.findByIdAndDelete(id);
}

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};