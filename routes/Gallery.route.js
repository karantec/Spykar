const express = require("express");
const {
  createGallery,
  getAllGallery,
  deleteGallery,
  deleteSingleGallery,
  updateGallery,
} = require("../controller/Gallery.Controller");

const router = express.Router();

// Create a new gallery
router.post("/create", createGallery);

// Get all galleries
router.get("/", getAllGallery);

// Delete all galleries
router.delete("/gallery", deleteGallery);

// Delete a single gallery by ID
router.delete("/:id", deleteSingleGallery);

// Update entire gallery
router.put("/:id", updateGallery);

// Update specific media items in gallery
module.exports = router;
