const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  fullName: { type: String, required: true }, // Full Name
  phoneNumber: { type: String, required: true }, // Phone Number
  service: { type: String, required: true }, // Selected Service
  preferredDate: { type: Date, required: true }, // Preferred Date
  preferredTime: { type: String, required: true }, // Preferred Time (string because time slots are usually strings like "10:00 AM", "2:30 PM")
  specialRequests: { type: String }, // Special Requests (optional)
  createdAt: { type: Date, default: Date.now }, // Auto-timestamp
});

module.exports = mongoose.model("Booking", BookingSchema);
