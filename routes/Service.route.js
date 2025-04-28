const express = require("express");
const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controller/Service.Controller");
const router = express.Router();

// Create a service
router.post("/", createService);

// Get all services
router.get("/", getAllServices);

// Get single service by ID
router.get("/:id", getServiceById);

// Update service by ID
router.put("/:id", updateService);

// Delete service by ID
router.delete("/:id", deleteService);

module.exports = router;
