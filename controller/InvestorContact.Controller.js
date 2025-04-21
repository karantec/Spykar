const { cloudinary } = require("../config/cloudinary");

const InvestorContact=require("../models/InvestorContact.Model")
//create a new blog post with the provided data

const createInvestorContact = async (req, res) => {
    try {
      const { FullName, Email, City, Message } = req.body;
  
      // Check if contact already exists using Email
      const existingData = await InvestorContact.findOne({ Email });
  
      if (existingData) {
        return res.status(400).json({ message: "This InvestorContact already exists" });
      }
  
      const newInvestor = new InvestorContact({
        FullName,
        Email,
        City,
        Message,
      });
  
      await newInvestor.save();
  
      res.status(201).json({
        message: "InvestorContact is successfully created",
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };
  


const getallInvestorContact = async (req, res) => {
  try {
    const Investors = await InvestorContactModel.find();

    if (!Investors.length) {
      return res.status(404).json({ message: "No Investor posts found" });
    }
    
    res.status(200).json(Investors ); // Corrected from "blog" to "blogs"
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};





module.exports={
    createInvestorContact,
    getallInvestorContact
    // getallInvestor,
    // getInvestorById,
    // updateInvestor,
    // deleteInvestor
};