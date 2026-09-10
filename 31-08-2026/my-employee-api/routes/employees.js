// const express = require("express");
// const router = express.Router();
// const employeeController = require('../controllers/employeeControllers');

// router.post("/", employeeController.createEmployee);
// router.get("/", employeeController.getAllEmployees);
// router.get("/:id", employeeController.getEmployeeById);
// router.put("/:id", employeeController.updateEmployee);
// router.delete("/:id", employeeController.deleteEmployee);

// module.exports = router;

// // these are all coming from controllers folder now, no need to write all the routes logic in this single file now.

//This code is after setting up the validators thing to validate the user data so that he dont make any mistakes!

const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeControllers");
const {
  createEmployeeRules,
  validateId,
  runValidation,
} = require("../validators/employeeValidator");

router.post(
  "/",
  createEmployeeRules, // ← runs all the body(...) rules
  runValidation, // ← collects errors, 400s if any
  employeeController.createEmployee,
);

router.get("/", employeeController.getAllEmployees);

router.get(
  "/:id",
  validateId,
  runValidation,
  employeeController.getEmployeeById,
);

router.put(
  "/:id",
  validateId,
  runValidation,
  employeeController.updateEmployee,
);

router.delete(
  "/:id",
  validateId,
  runValidation,
  employeeController.deleteEmployee,
);

module.exports = router;
