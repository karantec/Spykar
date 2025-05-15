const { cloudinary } = require("../config/cloudinary");
const Gallery = require("../models/Gallery.Model");

// Create gallery
const createGallery = async (req, res) => {
  try {
    const { media } = req.body;

    if (
      !Array.isArray(media) ||
      media.length === 0 ||
      !media.every((url) => typeof url === "string")
    ) {
      return res.status(400).json({
        message: "Media must be a non-empty array of strings (URLs)",
      });
    }

    const newGallery = new Gallery({ media });
    await newGallery.save();

    res.status(201).json({
      message: "Gallery created successfully",
      gallery: newGallery,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all galleries
const getAllGallery = async (req, res) => {
  try {
    const galleries = await Gallery.find();

    if (!galleries || galleries.length === 0) {
      return res.status(404).json({ message: "No galleries found" });
    }

    res.status(200).json({
      message: "Galleries retrieved successfully",
      data: galleries,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete all galleries
const deleteGallery = async (req, res) => {
  try {
    const result = await Gallery.deleteMany();

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No galleries found to delete" });
    }

    res.status(200).json({
      message: "All galleries deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a single gallery
const deleteSingleGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findByIdAndDelete(id);

    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    res.status(200).json({
      message: "Gallery deleted successfully",
      data: gallery,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update gallery (media array)
const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { media } = req.body;

    if (
      !Array.isArray(media) ||
      media.length === 0 ||
      !media.every((url) => typeof url === "string")
    ) {
      return res.status(400).json({
        message: "Media must be a non-empty array of strings (URLs)",
      });
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(
      id,
      {
        media,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedGallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    res.status(200).json({
      message: "Gallery updated successfully",
      data: updatedGallery,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createGallery,
  getAllGallery,
  deleteGallery,
  deleteSingleGallery,
  updateGallery,
};
