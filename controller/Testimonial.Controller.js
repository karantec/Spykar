const { cloudinary } = require("../config/cloudinary");
const Testimonial = require("../models/Testimonial.Model");

// Create a testimonial
const create = async (req, res) => {
  try {
    const { image } = req.body; // image should be passed as a URL or path

    if (!image) {
      return res.status(400).json({ message: "Please provide an image" });
    }

    const newTestimonial = new Testimonial({
      image,
    });

    await newTestimonial.save();

    res.status(201).json({
      message: "Testimonial is successfully created",
      data: newTestimonial,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all testimonials
const getAllTestimonial = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();

    if (!testimonials.length) {
      return res.status(404).json({ message: "No testimonials found" });
    }

    res.status(200).json({
      message: "Testimonials fetched successfully",
      data: testimonials,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single testimonial by ID
const getTestimonialByID = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({ message: "No testimonial found" });
    }

    res.status(200).json({
      message: "Testimonial fetched successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update testimonial
const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Please provide an image" });
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      { image },
      { new: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json({
      message: "Testimonial updated successfully",
      data: updatedTestimonial,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete testimonial
const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid testimonial ID format" });
    }

    const existingTestimonial = await Testimonial.findById(id);
    if (!existingTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    // Delete the testimonial
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    res.status(200).json({
      message: "Testimonial deleted successfully",
      data: deletedTestimonial,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  create,
  getAllTestimonial,
  getTestimonialByID,
  updateTestimonial,
  deleteTestimonial,
};
