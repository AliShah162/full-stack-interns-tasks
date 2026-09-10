const employeeService = require("../services/employeeServices");

async function createEmployee(req, res) {
  try {
    const employee = await employeeService.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getAllEmployees(req, res) {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getEmployeeById(req, res) {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    if (!employee) return res.status(404).json({ error: "Not found" });
    res.status(200).json(employee);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
}

async function updateEmployee(req, res) {
  try {
    const employee = await employeeService.updateEmployee(
      req.params.id,
      req.body
    );
    if (!employee) return res.status(404).json({ error: "Not found" });
    res.status(200).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteEmployee(req, res) {
  try {
    const employee = await employeeService.deleteEmployee(req.params.id);
    if (!employee) return res.status(404).json({ error: "Not found" });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
}

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};