const { body, param, validationResult } = require("express-validator");

// ─────────────────────────────────────────────
// Rules for CREATE — all fields required
// ─────────────────────────────────────────────
const createEmployeeRules = [
  body("name")
    .isString().withMessage("Name must be a string")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2, max: 50 }).withMessage("Name must be 2-50 characters"),

  body("email")
    .isString().withMessage("Email must be a string")
    .trim()
    .isEmail().withMessage("Must be a valid email")
    .normalizeEmail(),

  body("position")
    .isString().withMessage("Position must be a string")
    .trim()
    .notEmpty().withMessage("Position is required"),

  body("salary")
    .isFloat({ min: 0 }).withMessage("Salary must be a positive number"),
];

// ─────────────────────────────────────────────
// Rules for :id param
// ─────────────────────────────────────────────
const validateId = [
  param("id").isMongoId().withMessage("Invalid employee ID"),
];

// ─────────────────────────────────────────────
// Runs after the rules — collects errors and 400s if any
// ─────────────────────────────────────────────
function runValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = {
  createEmployeeRules,
  validateId,
  runValidation,
};

// this validates all the errors that a use can possibly make