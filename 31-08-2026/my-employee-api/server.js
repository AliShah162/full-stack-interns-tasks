require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const employeeRoutes = require("./routes/employees");

const app = express();
app.use(express.json());

connectDB();

// Mount routes
app.use("/employees", employeeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
// server.js is the entry point / composition root. Its job is to wire everything together, not define logic itself.
// we mount all the routes in the server.js file