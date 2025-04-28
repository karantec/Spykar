const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the updatedAt field before saving
ServiceSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Service", ServiceSchema);
