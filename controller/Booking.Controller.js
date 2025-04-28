const Booking = require("../models/Booking.Model");

// Create a Booking
const createBooking = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      service,
      preferredDate,
      preferredTime,
      specialRequests,
    } = req.body;

    const newBooking = new Booking({
      fullName,
      phoneNumber,
      service,
      preferredDate,
      preferredTime,
      specialRequests,
    });

    await newBooking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("❌ Booking Creation Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get All Bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    res.status(200).json({
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    console.error("❌ Fetch Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Single Booking by ID
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking fetched successfully",
      data: booking,
    });
  } catch (error) {
    console.error("❌ Fetch Single Booking Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a Booking
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      phoneNumber,
      service,
      preferredDate,
      preferredTime,
      specialRequests,
    } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      {
        fullName,
        phoneNumber,
        service,
        preferredDate,
        preferredTime,
        specialRequests,
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.error("❌ Update Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete All Bookings
const deleteBooking = async (req, res) => {
  try {
    const bookings = await Booking.deleteMany();

    res.status(200).json({
      message: "All bookings deleted successfully",
      data: bookings,
    });
  } catch (error) {
    console.error("❌ Delete Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
