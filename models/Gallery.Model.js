const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  media: { type: String }, // Array of URLs (can be either images or videos)
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update the updatedAt field before saving
GallerySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Gallery", GallerySchema);
