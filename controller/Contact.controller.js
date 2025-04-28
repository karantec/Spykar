const ContactForm = require("../models/Contact.Models");

// Create a new contact form submission
const createContactForm = async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;

    // Validation process
    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    // Check if the same email has submitted recently (optional)
    const existingSubmission = await ContactForm.findOne({
      email,
      createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // Within 24 hours
    });

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message:
          "You have already submitted a contact form recently. Please wait 24 hours before submitting again.",
      });
    }

    // Create new contact form submission
    const newContactForm = new ContactForm({
      fullName,
      email,
      subject,
      message,
    });

    await newContactForm.save();

    res.status(201).json({
      success: true,
      message: "Your message has been successfully submitted",
      data: newContactForm,
    });
  } catch (error) {
    console.error("Error in createContactForm:", error);
    res.status(500).json({
      success: false,
      message:
        error.name === "ValidationError"
          ? error.message
          : "Internal server error",
      error: error.message,
    });
  }
};

// Get all contact form submissions
const getAllContactForms = async (req, res) => {
  try {
    const contactForms = await ContactForm.find()
      .sort({ createdAt: -1 })
      .select("-__v"); // Excluding version key

    if (!contactForms.length) {
      return res.status(404).json({
        success: false,
        message: "No contact form submissions found",
      });
    }

    res.status(200).json({
      success: true,
      count: contactForms.length,
      data: contactForms,
    });
  } catch (error) {
    console.error("Error in getAllContactForms:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createContactForm,
  getAllContactForms,
};
