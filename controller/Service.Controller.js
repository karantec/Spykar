const Service = require("../models/Services.Model");

// Create a Service
const createService = async (req, res) => {
  try {
    const { title, price, description, image } = req.body;

    // Validation
    if (!title || !price || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate
    const existingService = await Service.findOne({ title });
    if (existingService) {
      return res.status(400).json({ message: "Service already exists" });
    }

    // Create new service
    const newService = new Service({
      title,
      price,
      description,
      image,
    });

    await newService.save();
    res
      .status(201)
      .json({ message: "Service created successfully", service: newService });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all Services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ updatedAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single Service by ID
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid Service ID format" });
    }

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a Service
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, description, image } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid Service ID format" });
    }

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    service.title = title || service.title;
    service.price = price || service.price;
    service.description = description || service.description;
    service.image = image || service.image;
    service.updatedAt = Date.now();

    await service.save();

    res.status(200).json({ message: "Service updated successfully", service });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a Service
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid Service ID format" });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await Service.findByIdAndDelete(id);

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
