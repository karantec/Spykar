const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  media: { type: [String], required: true }, // Corrected to an array of strings
  updatedAt: { type: Date, default: Date.now },
});

GallerySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Gallery", GallerySchema);
