const express = require("express");
const router = express.Router();
const {
  create,
  getAllTestimonial,
  getTestimonialByID,
  updateTestimonial,
  deleteTestimonial,
} = require("../controller/Testimonial.Controller");
// Route to create a testimonial
router.post("/create", create);

// Route to get all testimonials
router.get("/", getAllTestimonial);

// Route to get a single testimonial by ID
router.get("/:id", getTestimonialByID);

// Route to update a testimonial by ID
router.put("/:id", updateTestimonial);

// Route to delete a testimonial by ID
router.delete("/:id", deleteTestimonial);

module.exports = router;
